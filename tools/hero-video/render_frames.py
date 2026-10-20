import os
import sys
import time
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
import imageio_ffmpeg
from PIL import Image, ImageStat, ImageChops

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

SCRIPT_DIR = Path(__file__).resolve().parent
HTML_PATH = SCRIPT_DIR / "index.html"
FRAMES_DIR = SCRIPT_DIR / "frames"
PUBLIC_VIDEOS = Path(__file__).resolve().parent.parent.parent / "public" / "videos"

TOTAL_FRAMES = 288 # 12.0s * 24fps
FPS = 24
TOTAL_TIME = 12.0

def render_and_encode():
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_VIDEOS.mkdir(parents=True, exist_ok=True)

    print(f"Using FFmpeg: {FFMPEG_EXE}")
    print(f"Output frames dir: {FRAMES_DIR}")
    print(f"Public videos dir: {PUBLIC_VIDEOS}")

    # 1. Capture 288 frames via Playwright
    print("\n--- STEP 1: RENDERING 288 LOSSLESS FRAMES VIA PLAYWRIGHT ---")
    start_render = time.time()
    
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        file_url = HTML_PATH.as_uri()
        page.goto(file_url)
        page.wait_for_timeout(1000)

        # Stop animation loop in page so we control time explicitly and set zero padding
        page.evaluate("""() => {
            if (typeof isPlaying !== 'undefined') isPlaying = false;
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            const container = document.getElementById('viewport-container');
            if (container) {
                container.style.maxWidth = 'none';
                container.style.maxHeight = 'none';
                container.style.width = '1920px';
                container.style.height = '1080px';
                container.style.borderRadius = '0';
                container.style.boxShadow = 'none';
            }
        }""")

        canvas = page.locator("#render-canvas")

        for f in range(TOTAL_FRAMES):
            t = f / FPS
            page.evaluate(f"window.renderFrame({t})")
            
            frame_path = FRAMES_DIR / f"{f:04d}.png"
            canvas.screenshot(path=str(frame_path))

            if f % 48 == 0 or f == TOTAL_FRAMES - 1:
                print(f"Rendered frame {f:03d}/{TOTAL_FRAMES} (t = {t:.2f}s)")

        # Render frame 288 (t = 12.0s = wrap to t = 0.0s) for seam check
        page.evaluate("window.renderFrame(12.0)")
        wrap_frame_path = FRAMES_DIR / "wrap_test.png"
        canvas.screenshot(path=str(wrap_frame_path))

        browser.close()

    render_duration = time.time() - start_render
    print(f"Completed 288 frames render in {render_duration:.1f}s")

    # 2. Seam test & Average Luminance test
    print("\n--- STEP 2: MATHEMATICAL SEAM & LUMINANCE AUDIT ---")
    img_first = Image.open(FRAMES_DIR / "0000.png").convert("L")
    stat = ImageStat.Stat(img_first)
    mean_lum_0 = stat.mean[0] / 255.0
    print(f"Frame 0000 average luminance: {mean_lum_0:.4f} (Pure white is 1.0000, 3% bound is >= 0.9700)")
    assert mean_lum_0 >= 0.970, f"Average luminance {mean_lum_0} must be within 3% of white!"

    # Compare frame 0 (t = 0.0s) with wrap_test (t = 12.0s)
    img_wrap = Image.open(FRAMES_DIR / "wrap_test.png").convert("L")
    diff = ImageChops.difference(img_first, img_wrap)
    diff_stat = ImageStat.Stat(diff)
    max_diff = diff_stat.extrema[0][1]
    mean_diff = diff_stat.mean[0]
    print(f"Loop seam test: delta between t=0.0s and t=12.0s: max pixel diff = {max_diff}, mean diff = {mean_diff:.6f}")
    assert max_diff == 0, f"Seamless loop requirement failed: frame(0) != frame(12.0s), max diff = {max_diff}"
    print("Seamless loop verified: frame(0) == frame(T) with 100% exact parity!")

    # 3. FFmpeg Encode: MP4
    print("\n--- STEP 3: ENCODING MP4 (H.264 + TEMPORAL NOISE DITHER) ---")
    mp4_out = PUBLIC_VIDEOS / "hero-bg.mp4"
    cmd_mp4 = [
        FFMPEG_EXE,
        "-y",
        "-framerate", str(FPS),
        "-i", str(FRAMES_DIR / "%04d.png"),
        "-vf", "noise=alls=2:allf=t,format=yuv420p",
        "-c:v", "libx264",
        "-crf", "23",
        "-preset", "slow",
        "-movflags", "+faststart",
        "-an",
        str(mp4_out)
    ]
    subprocess.run(cmd_mp4, check=True)
    mp4_size_kb = os.path.getsize(mp4_out) / 1024
    print(f"MP4 generated: {mp4_out} ({mp4_size_kb:.1f} KB)")
    assert mp4_size_kb < 1500, f"MP4 budget exceeded: {mp4_size_kb} KB > 1500 KB"

    # 4. FFmpeg Encode: WebM
    print("\n--- STEP 4: ENCODING WEBM (VP9 + TEMPORAL NOISE DITHER) ---")
    webm_out = PUBLIC_VIDEOS / "hero-bg.webm"
    cmd_webm = [
        FFMPEG_EXE,
        "-y",
        "-framerate", str(FPS),
        "-i", str(FRAMES_DIR / "%04d.png"),
        "-vf", "noise=alls=2:allf=t",
        "-c:v", "libvpx-vp9",
        "-crf", "34",
        "-b:v", "0",
        "-an",
        str(webm_out)
    ]
    subprocess.run(cmd_webm, check=True)
    webm_size_kb = os.path.getsize(webm_out) / 1024
    print(f"WebM generated: {webm_out} ({webm_size_kb:.1f} KB)")
    assert webm_size_kb < 1200, f"WebM budget exceeded: {webm_size_kb} KB > 1200 KB"

    # 5. Extract WebP Poster at t = 3.0s
    print("\n--- STEP 5: EXTRACTING WEBP POSTER (t = 3.0s) ---")
    poster_out = PUBLIC_VIDEOS / "hero-bg-poster.webp"
    cmd_poster = [
        FFMPEG_EXE,
        "-y",
        "-i", str(mp4_out),
        "-ss", "3.0",
        "-frames:v", "1",
        str(poster_out)
    ]
    subprocess.run(cmd_poster, check=True)
    poster_size_kb = os.path.getsize(poster_out) / 1024
    print(f"Poster generated: {poster_out} ({poster_size_kb:.1f} KB)")
    assert poster_size_kb < 60, f"Poster budget exceeded: {poster_size_kb} KB > 60 KB"

    print("\n=== ALL ASSETS GENERATED AND VERIFIED SUCCESSFULLY ===")
    print(f"MP4 Size:    {mp4_size_kb:.1f} KB (Budget: < 1500 KB) -> PASS")
    print(f"WebM Size:   {webm_size_kb:.1f} KB (Budget: < 1200 KB) -> PASS")
    print(f"Poster Size: {poster_size_kb:.1f} KB (Budget: < 60 KB)   -> PASS")

if __name__ == "__main__":
    render_and_encode()

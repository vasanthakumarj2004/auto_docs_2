# Docsynecx Hero Ambient Video Generator

Deterministic, pure-code generated ambient background video for the Docsynecx homepage hero.

## Specification

- **Resolution**: 1920x1080 (16:9), 24 fps, 288 frames ($T = 12.0$ seconds).
- **Canvas Base**: Pure white `#ffffff`. Blended on-site using `mix-blend-mode: multiply` so `#ffffff` is completely invisible, leaving only the faint document outlines and ledger nodes.
- **Keep-Out Zones** (elements strictly masked/faded out, max alpha $\le 2\%$):
  - Left text column: $x \in [115, 902]$, $y \in [130, 950]$
  - Right product panel: $x \in [960, 1824]$, $y \in [108, 972]$
- **Motion Channels**:
  - Top lane: $y \approx 62\text{px}$
  - Bottom lane: $y \approx 1018\text{px}$
  - Center vertical gutter: $x \approx 938\text{px}$
  - Outer margins: $x < 115\text{px}$ and $x > 1824\text{px}$
- **Motion Elements**:
  - 3 abstract document cards per lane (tax invoice, bill of lading with teal tint, voucher with ledger lines)
  - 3 ledger node pulse markers at $x = 1860\text{px}$
  - 1 soft blue radial pulse ($80\text{px}$) traveling every 6s along the top lane
  - $24\text{px}$ dot grid drifting $2\text{px}$ diagonally over $12\text{s}$

## FFmpeg Encoding Commands

```bash
# MP4 (H.264 + temporal dither noise to prevent 8-bit banding)
ffmpeg -framerate 24 -i frames/%04d.png -vf "noise=alls=2:allf=t,format=yuv420p" -c:v libx264 -crf 23 -preset slow -movflags +faststart -an public/videos/hero-bg.mp4

# WebM (VP9 + temporal noise)
ffmpeg -framerate 24 -i frames/%04d.png -vf "noise=alls=2:allf=t" -c:v libvpx-vp9 -crf 34 -b:v 0 -an public/videos/hero-bg.webm

# Poster (t = 3.0s)
ffmpeg -i public/videos/hero-bg.mp4 -ss 3.0 -frames:v 1 public/videos/hero-bg-poster.webp
```

## How to Re-render

```bash
python tools/hero-video/render_frames.py
```

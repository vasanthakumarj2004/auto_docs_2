# Docsynecx UI

> **Grow the business, not the data-entry desk.**
> Re-developed from [https://html-app-development-dugv.bolt.host/](https://html-app-development-dugv.bolt.host/)

A modern, high-converting React application for **Docsynecx**, built for businesses running operations on Tally, ERPs, or CargoWise.

---

## 🚀 Features

- **Interactive ROI Calculator**: Real-time computation of manual effort and business cost savings based on document volume, handling minutes, and team compensation (formatted in INR `₹`).
- **Live Finance Desk Preview**: Simulated real-time syncing dashboard with bill verification statuses, duplicate holds, and Tally connectivity indicators.
- **Shipment & Logistics Desk Showcase**: Step-by-step workflow mapping customer emails and shipping documents into CargoWise jobs with cross-checks.
- **Lead Generation & Contact Forms**: Built-in integration with Supabase for demo requests and newsletter subscriptions.
- **Design System**: Tailored Plus Jakarta Sans typography, custom button styles, badges, and responsive navigation with mobile drawer support.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / DB**: [Supabase](https://supabase.com/)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

The production output will be generated in `dist/`, ready to deploy directly to Netlify, Vercel, Cloudflare Pages, or any static hosting platform.


---

## 🎬 Video System & Production Guidelines

Docsynecx features a high-performance, accessible, static-export safe video architecture supporting:
- **`LoopVideo`**: Muted ambient looping previews, triggered only when $\ge 50\%$ visible in viewport (IntersectionObserver), automatically paused when tab is hidden or user requests reduced motion / data saving.
- **`VideoPlayer`**: Accessible custom video player with chapter markers on scrub bar, keyboard controls (`Space`/`K` play/pause, `J`/`L` $\pm 10$s, arrows, `M` mute, `C` captions, `F` fullscreen), WebVTT subtitle support, speed adjustment, and Schema.org `VideoObject` metadata.
- **`VideoModal`**: Accessible modal lightbox with focus trap, Escape/backdrop close, and scroll lock.
- **`VideoFacade`**: Privacy-enhanced facade for external streaming embeds (YouTube / Vimeo).
- **`VideoSlot`**: Zero-layout-shift (`CLS = 0`) placeholder for pending customer recordings.
- **`VideoTranscript`**: Collapsible `<details>` SEO transcript container rendered directly into the HTML DOM.

### 🎥 Production Recording Brief

| Asset | Target Resolution | Max Duration | Target Size | Audio | Usage Spot |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `walkthrough.mp4/.webm` | 1920x1080 (16:9) | 120s (2:00) | $\le 14$ MB | Voiceover + Subtitles | Homepage Hero Tab 3 & VideoModal |
| `finance-loop.mp4/.webm` | 1280x800 (~1.3:1) | 10–15s | $\le 2.5$ MB | Muted permanently | `/finance` Tier 1 Product Visual |
| `logistics-loop.mp4/.webm` | 1280x800 (~1.3:1) | 10–15s | $\le 2.5$ MB | Muted permanently | `/logistics` Tier 1 Product Visual |
| `rajadurai.mp4/.webm` | 1920x1080 (16:9) | 60–90s | $\le 8$ MB | Interview / Subtitles | Rajadurai Case Study Card |
| `ft-logistics.mp4/.webm`| 1920x1080 (16:9) | 60–90s | $\le 8$ MB | Interview / Subtitles | FT Logistics Case Study Card |

### ⚡ Recommended FFmpeg Encoding Commands

#### 1. Muted Loops (`finance-loop`, `logistics-loop`)
To encode silent, seamless looping videos at minimal file size:

```bash
# MP4 (H.264 / AAC-free for muted loop)
ffmpeg -i input.mov -an -c:v libx264 -crf 24 -preset slow \
  -movflags +faststart -pix_fmt yuv420p -r 30 -vf "scale=1280:-2" \
  public/videos/finance-loop.mp4

# WebM (VP9 - higher compression)
ffmpeg -i input.mov -an -c:v libvpx-vp9 -b:v 0 -crf 32 \
  -r 30 -vf "scale=1280:-2" \
  public/videos/finance-loop.webm
```

#### 2. Full Walkthrough (`walkthrough`)
To encode high-clarity 1080p demo walkthrough with voiceover:

```bash
# MP4 (H.264 + AAC audio, faststart header for instant streaming)
ffmpeg -i walkthrough_master.mov -c:v libx264 -crf 22 -preset medium \
  -c:a aac -b:a 128k -ar 48000 \
  -movflags +faststart -pix_fmt yuv420p -r 30 -vf "scale=1920:-2" \
  public/videos/walkthrough.mp4

# WebM (VP9 + Opus audio)
ffmpeg -i walkthrough_master.mov -c:v libvpx-vp9 -b:v 0 -crf 28 \
  -c:a libopus -b:a 96k -r 30 -vf "scale=1920:-2" \
  public/videos/walkthrough.webm
```

#### 3. Poster Image Extraction
Extract high-resolution WebP posters from the first frame or keyframe:

```bash
ffmpeg -ss 00:00:02 -i input.mov -vframes 1 -q:v 85 \
  public/videos/posters/walkthrough-poster.webp
```

#### 4. WebVTT Captions Standard
Captions must follow WebVTT syntax and be saved in `/public/videos/captions/*.vtt` with UTF-8 encoding.

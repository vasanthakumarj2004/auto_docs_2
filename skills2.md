---
name: landing-hero-rebuild
description: Rebuild ONLY the landing viewport (navbar + hero) of the user's existing website inside the "Funnelra Conference" style template, replacing the template's YouTube video slot with a business-workflow-automation dashboard/banner. Use when the user asks to port their site into this template, upgrade the hero, or redesign the first viewport.
---

# Skill: Landing Viewport Rebuild (Template → User's Business)

## 1. Scope (strict)
- IN SCOPE: navbar, hero section, the hero's "media slot" (the YouTube-player area in the template), landing viewport only.
- OUT OF SCOPE: every section below the fold (sponsors, mentors, stats, testimonials, FAQ, footer). Do not build or restyle them.
- Content source: the user's EXISTING website (copy, brand name, logo, services, CTA, colors where useful). 
- Do NOT use any text, names, logos, faces or numbers from the reference video (Funnelra, Outosia, Webflow Conf, Stefan, $18M+, etc.). The video is a design reference only.
- The video is later placed into `landing_page2`. Use the template first; do not embed it in this pass.

## 2. What the reference video shows (design analysis)
Video: 38 s screen recording of a vertically scrolling template, 1918x916, dark/purple event-style theme.

### 2.1 Hero (first viewport)
- Full-bleed background: soft purple-to-lavender gradient with a blurred horizontal "water / horizon" texture. Low contrast, atmospheric.
- Centered large serif headline, 2 lines, white, tight leading (e.g. "AI + Digital traffic into / your consistent leads.").
- Small muted sub-copy below the headline, centered, 2 lines max.
- A compact white booking card (rounded ~8-12px, soft shadow) centered under the copy:
  - tiny "Streamed On: [logo]" label row
  - event title + date/time on the left
  - bright green pill button ("Book a slot") on the right
- Under the card: small caps line (speaker/credibility strip) and a one-line reassurance with a small info icon ("No experience needed...").
- Mobile/second state: headline left-aligned, card pinned top-right, social icon circles (LinkedIn, X, Instagram, YouTube) bottom-left, small text links bottom-right, lime-yellow accent block at the bottom edge.

### 2.2 The video slot (the part to replace)
- Directly after the hero, scrolling reveals a large 16:9 media frame in 3D perspective, tilted, with a dark frame, corner markers (lime-yellow squares), a monospace tag "[ON DEMAND SESSION]", and a red YouTube play button centered.
- Behind it: neon purple/magenta rectangular accents peeking out at the edges.
- As the user scrolls, the frame flattens/straightens and slides up, then the page turns black.
- This is the "YouTube slot in the landing slide" the user wants upgraded.

### 2.3 Navbar
- No full navbar is clearly visible in the recording (the capture is cropped; only a logo wordmark appears at the top-left of the footer/hero state and small utility links appear bottom-right: 404, Style Guide, Changelog, Licenses).
- Assumption to apply: minimal transparent navbar over the gradient; wordmark/logo left, 3-5 text links centre or right, one pill CTA (lime/green) on the right; becomes a blurred glass bar on scroll.
- Confirm with the user if they want a different navbar pattern.

### 2.4 Design tokens to reuse
| Token | Value (approx.) |
|---|---|
| Hero background | gradient #8E7CC3 → #B9A6D8 → #6D5FA8, blurred horizontal streaks |
| Page dark | #0A0A0C |
| Text | #FFFFFF headline, rgba(255,255,255,.7) body |
| Primary CTA | green #2EE66B pill, dark text |
| Accent | lime #D9F03D (corner blocks), neon violet #7B2FFF, magenta #FF4BD8 |
| Card | #FFFFFF, radius 10px, shadow 0 10px 40px rgba(0,0,0,.25) |
| Headline font | elegant serif (e.g. "Instrument Serif", "Newsreader", "Playfair Display"), 64-88px desktop, line-height 1.02 |
| Body font | clean sans (Inter / DM Sans), 14-18px |
| Mono tag | JetBrains Mono / IBM Plex Mono, 12px, uppercase |

## 3. The upgrade: replace the YouTube slot with a Workflow Automation Dashboard
Goal: the media slot should communicate "this business automates its workflow", not "watch a video".

### 3.1 Concept
A tilted 3D-perspective dashboard/banner using the SAME frame (dark border, lime corner squares, mono tag) but with live-looking UI instead of a player:
- Mono tag: `[WORKFLOW LIVE]` (replace `[ON DEMAND SESSION]`).
- Left panel: workflow canvas, 4-5 nodes connected by animated lines, e.g. Lead In → Qualify (AI) → CRM Update → Follow-up → Invoice. Node labels MUST come from the user's real services/process on the existing site.
- Right panel: stacked mini cards: tasks automated today, hours saved, response time, success rate (use plausible placeholders clearly marked `TODO: real number from client`).
- Bottom strip: activity ticker ("Invoice sent", "Lead assigned", "Report generated") scrolling slowly.
- Center overlay: a play-style button is OPTIONAL; keep one circular button labeled "Watch demo" only if the user later wants the video here.

### 3.2 Video integration plan (later, landing_page2)
- Build the slot as a component with a `mode` prop: `dashboard` (default) | `video`.
- In `landing_page2`, set `mode="video"` and load the user's shared video (file path or hosted URL) inside the same tilted frame, with poster = dashboard screenshot.
- Keep the play button, corner markers and perspective identical so switching is a one-line change.

### 3.3 Motion
- On load: headline fade-up (staggered lines), card slides in.
- On scroll: frame rotateX(18deg) → 0, scale .92 → 1, translateY, over the first ~600px of scroll.
- Workflow lines: dashed stroke animation, 6-8 s loop. Respect `prefers-reduced-motion`.

## 4. Content mapping from the user's existing site
Fill this table by reading the existing website BEFORE writing any markup.

| Template element | Source from existing site |
|---|---|
| Logo / wordmark | site logo or brand name |
| Navbar links | existing top-nav items (max 5) |
| Navbar CTA | existing primary CTA (Contact / Get Quote / Book a call) |
| Headline | main H1 of homepage, tightened to ≤ 10 words, workflow-automation angle |
| Sub-copy | 1-2 sentence value proposition from existing about/services text |
| Booking card title | primary offer (e.g. "Free workflow audit") |
| Card date/time row | replace with a benefit line (e.g. "30-min call · No commitment") |
| Card button | existing CTA label |
| Credibility strip | real client names / certifications from the site, else omit |
| Reassurance line | real promise from the site (e.g. "No setup fees") |
| Dashboard nodes | the user's real service steps |

If a field has no source on the existing site, leave a visible `TODO:` instead of inventing facts.

## 4b. Existing-content-first rule (added)
The navbar and hero MUST use the real content already on the user's website. Template text and my own placeholder copy are only a fallback.

### Extraction (do this before any design decision)
1. If the user gives a URL, `web_fetch` it. If they paste text or upload files, read those. If neither exists, ask for it; do not invent a brand.
2. Capture verbatim, without rewriting facts:
   - Navbar: logo (or brand name), every top-level link in its original order and wording, the CTA label and its destination.
   - Hero: the H1, sub-headline, primary and secondary CTA labels, any trust line (client logos, ratings, years, certifications), and the hero image or video if one exists.
   - Brand: colors, fonts, tone of voice, contact details.
3. Allowed edits: shorten the H1 only if it exceeds about 10 words; fix obvious typos; keep the user's meaning and keywords. Anything the user did not write stays a visible `TODO:`.
4. Do not carry over sections below the hero (scope stays landing viewport only).

### Purpose detection
Decide the site's purpose from the extracted content, then pick the matching hero pattern. State the detected purpose in one line before building.

| Site purpose | Hero pattern | Media slot content | Primary CTA |
|---|---|---|---|
| Automation / SaaS / IT services | Centered serif headline + offer card | Workflow dashboard (current build) | Book a demo / Free audit |
| Agency / consulting | Headline + proof strip | Case-study banner or results board | Book a call |
| E-commerce / products | Headline + product visual | Product or collection banner | Shop now |
| Event / webinar / course | Headline + date card | Video or schedule banner | Register / Book a slot |
| Local business / clinic / restaurant | Headline + contact card | Photo banner, hours, map pin | Call / Book a visit |
| Portfolio / personal brand | Name + one-line role | Featured work reel | View work / Hire me |

If the purpose does not fit a row, choose the closest and explain why in one sentence.

### Fit rules
- The navbar links come from the site, so the count and labels may differ from the template; collapse to a menu button on mobile if more than five.
- The hero card (formerly the booking card) shows the site's real primary offer, not an event.
- Dashboard or banner content in the media slot must be built from the site's real services, products, or results.
- Keep the template's look (gradient, serif headline, tilted frame, lime accents) but let the user's brand colors replace the purple if the site has a clear palette.

## 5. Build rules
1. Inspect the template's existing structure and reuse its classes/components; do not reinvent the layout.
2. Edit only the navbar, hero, and media slot. Leave other sections untouched or hidden.
3. Responsive: desktop 1440, tablet 768, mobile 390. On mobile the 3D tilt is reduced to ~6deg and the dashboard simplifies to 3 nodes + 2 stat cards.
4. Accessibility: one H1, contrast ≥ 4.5:1 on gradient (add subtle dark overlay if needed), keyboard-focusable CTAs, alt text/aria-labels on the dashboard graphic, reduced-motion support.
5. Performance: no external video in this pass; dashboard is HTML/CSS/SVG; fonts via a single request with fallbacks.
6. Never copy copyrighted logos/photos from the reference video.

## 6. Workflow for Claude (steps)
1. Read the existing website content (URL/files supplied by the user). If none is available, ask for it once.
2. Read the template files; locate navbar, hero, media-slot components.
3. Fill the content mapping table (section 4).
4. Replace the YouTube slot with the workflow dashboard component (section 3).
5. Apply tokens and motion (sections 2.4, 3.3).
6. Check desktop/tablet/mobile viewports of the landing viewport only.
7. Report what was changed, which TODO placeholders remain, and confirm the `landing_page2` video hook is ready.

## 7. Open questions for the user
- Share the existing website URL or files (not received yet).
- Preferred navbar style (transparent glass vs solid)?
- Keep the purple gradient, or use the brand colors from the current site?
- Confirm which stats are real for the dashboard cards.

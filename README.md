# Cubbie

**Your schoolwork, connected.**

[Visit the Cubbie website](https://xianlinlu.github.io/cubbie-website-3/)

Cubbie 原创品牌内容与角色视觉的桌面端网站。页面围绕学生计划、Canvas、课程理解、Google 集成与每周安排展开，品牌 Logo 和人物展示采用项目方提供的原始素材。

## Development

Requires Node.js 24 or later.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. The main visual acceptance viewport is **1440 × 900**. This project intentionally targets desktop browsers.

```bash
npm run typecheck
npm run build
```

## Structure

- `src/app`: entry page, shared typography and styling, metadata.
- `src/components`: independently editable navigation, hero, feature cards, content sections, weekly planner, FAQ, footer, and dialogs.
- `src/lib/content.ts`: Cubbie marketing copy and section data.
- `public/images`: original supplied Cubbie Logo and character PNGs, preserved without image regeneration.
- `public/fonts`: locally hosted brand typography.
- `.github/workflows/pages.yml`: static build and GitHub Pages deployment on every push to `main`.

## Interaction

Desktop navigation folds shortly after scrolling, expands on hover, and opens again near the footer. Menu groups support click and keyboard focus. The media preview follows a viewport-based contraction into a 170px floating walkthrough control. Titles translate and tilt with scroll direction. Feature cards activate across the viewport midpoint, using a 1.5-second transition between full size and 56% scale. Wheel motion uses frame-rate independent damping and respects reduced-motion preferences. The page includes five weekday tabs, coursework and FAQ accordions, section anchors, and keyboard-accessible dialogs.

The setup form and animated process walkthrough are frontend previews. They do not connect accounts, send messages, store form data, or operate a backend. The final Get started action opens the existing Cubbie sign-in page. Other product and policy links retain their Cubbie destinations.

## Deployment

GitHub Actions exports the application to `out/` with the base path `/cubbie-website-3`. Deployment URL:

**https://xianlinlu.github.io/cubbie-website-3/**

To build the same artifact locally:

```bash
NEXT_PUBLIC_BASE_PATH=/cubbie-website-3 npm run build
```

## Brand and media

This repository presents Cubbie brand content and original character assets supplied by the project owner. The original PNG files remain intact; layout, placement, and motion are implemented in maintainable React components. Brand, image, and font rights remain with their respective rights holders. The project owner is responsible for the supplied usage permissions.

## Artwork placement

The opening composition and feature cards use eight distinct character/scene PNGs. The weekly planner uses five additional supplied images, one for each weekday, and switches the artwork together with the active tab. Each character/scene image is used in one page location; the original image files remain unchanged. Dialogs and the Canvas panel use editable interface graphics. The supplied square crown icon is the favicon; the full wordmark remains the brand logo.

The opening scene has no introductory caption or Get started button. The header action appears after scrolling. The All features link below the opening summary has a 24px top gap.

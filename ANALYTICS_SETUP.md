# Visitor analytics — Veydran.space

The website is static (GitHub Pages/custom domain), so GitHub repository traffic is **not** website visitor traffic. We cannot measure real site visitors just by counting visits in the browser. Never display fabricated public visitor counts.

## Recommended: Cloudflare Web Analytics (free)

Cloudflare Web Analytics reports page views, approximate visits, top pages, and referrers in a private dashboard. It is privacy-first and does not use visitor-tracking cookies. Its **visits** are *not* a guaranteed one-human-one-count unique visitor measure (different devices, blocked scripts, browsers and repeat visits affect figures). Treat them as estimates.

1. Create/sign into a Cloudflare account, open **Web Analytics**, select **Add a site**, and enter `veydran.space`.
2. If you are proxying the domain through Cloudflare, you may enable automatic tracking without adding code. Do not enable both automatic and manual tracking.
3. Otherwise, in **Manage site**, copy the public **site token** from the JS snippet.
4. Put that token in `assets/web-analytics.js` as the `siteToken` value and commit to the main branch.
5. The loader is referenced from the portal home, all current public-record pages, the Transmission Archive, and the Food Intelligence Database.
6. View the private counts under Cloudflare > Web Analytics; filter by page path to compare which dossiers get traffic.

**Status:** integration prepared, **not collecting analytics until Cloudflare automatic tracking is enabled or a real site token is provided**. No token has been invented. No fake public counter has been created.

Analytics reference: https://developers.cloudflare.com/web-analytics/get-started/

## Adding new content
- Latest transmission: copy an `<article class="archive-entry">...</article>` in `transmissions/index.html`, increment the unique TX number, newest first. Update the register total automatically via existing JS.
- New restaurant dossier: copy a `<details class="archive-entry">...</details>` in `intelligence/index.html`, set the unique ID and `data-type` / `data-search`, and add grounded metadata and links only when available.
- Existing Veydran/English toggle automatically picks up static text on both pages. `data-search` stays English for search even while the glyphs are displayed.
- Keep embargoed unreleased reviews sealed until explicitly approved for public release. Do not fabricate review ratings or point to guessed YouTube videos.

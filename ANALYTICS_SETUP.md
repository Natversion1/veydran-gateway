# Visitor analytics — Veydran.space

The website is static (GitHub Pages/custom domain), so GitHub repository traffic is NOT real website visitor traffic. A browser-only counter cannot reliably count unique visitors across devices or browsers, and it must not display fabricated visitor totals.

## Enabled: Umami Cloud (free Hobby tier)

Umami reports estimated **Visitors** (unique visitors over a chosen date range), **Visits**, **Pageviews**, top pages and referrers. Its Hobby plan has a free tier. It is privacy-oriented and cookie-free. Visitors are estimates rather than individually identified people: shared IP/browser combinations, tracking blockers and multiple devices can under/overcount.

The public tracking Website ID `313b5001-bd2d-4431-99fe-bbd3e084ca55` was supplied by the site owner and configured on 26 October 2026 in `assets/web-analytics.js`.

The loader is referenced on the portal homepage, all currently known public-record pages, Incoming Transmissions and the Food Intelligence Database. It loads Umami Cloud's official script once per page, uses `data-domains="veydran.space,www.veydran.space"` and honours Do Not Track.

**Current status:** tracking code enabled in GitHub's main branch. Live delivery and data ingestion still need confirmation in the Umami dashboard after GitHub Pages deploys. No historical statistics are retroactively counted; do not assert traffic totals before inspecting Umami.

To verify:
1. Visit https://veydran.space/ after deployment (without an ad blocker and in a browser that permits analytics).
2. Open https://cloud.umami.is/ and select the `veydran.space` website.
3. Check Realtime, then review **Visitors** for estimated uniques, **Visits**, **Pageviews**, paths and referrers.
4. If nothing appears, confirm deployment and browser tracking protections before altering the code.

Never commit Umami account passwords or API keys; the website ID is a public tracker identifier.

Official sources: https://docs.umami.is/docs/collect-data ; https://docs.umami.is/docs/cloud/faq ; https://docs.umami.is/docs

## Content updates
- Transmission Archive: add another `<details class="archive-entry">` in `transmissions/index.html`, newest first. Give it a unique TX code, `id`, `data-type` and English `data-search` terms. Count/filter UI updates automatically.
- Food Intelligence: add another `<details class="archive-entry">` in `intelligence/index.html`, using the next numbered file ID. Keep unreleased reviews sealed until a public launch, and link only verified videos/artwork.
- Existing shared language cookie is read by `records/language.js`; `ENGLISH/VEYDRAN` toggle persists across pages and does not break English keyword search.
- No made-up food scores, publication dates or video URLs.

## Site principle
Public Registry cases remain distinct from Food Intelligence entries; T-00-447 is CLOSED regardless of whether new food surveys are filed.

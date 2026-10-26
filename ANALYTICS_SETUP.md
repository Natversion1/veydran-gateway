# Visitor analytics — Veydran.space

The website is static (GitHub Pages/custom domain), so GitHub repository traffic is NOT real website visitor traffic. A browser-only counter cannot reliably count unique visitors across devices or browsers, and it must not display fabricated visitor totals.

## Recommended: Umami Cloud (free Hobby tier)

Umami reports estimated **Visitors** (unique visitors over a chosen date range), **Visits**, **Pageviews**, top pages and referrers. Its Hobby plan has a free tier. It is privacy-oriented and cookie-free. Visitors are estimates rather than individually identified people: shared IP/browser combinations, tracking blockers and multiple devices can under/overcount.

1. Register or sign in at https://cloud.umami.is/ (Umami).
2. Add website `veydran.space` in your Umami dashboard.
3. Open that website's settings, choose **Edit**, and copy the public `data-website-id` GUID from its tracking snippet. **Never paste an account password or an API key into the repository.**
4. In `assets/web-analytics.js`, set `const websiteId = 'YOUR-UMAMI-WEBSITE-ID';` using the actual UUID. Publish that one-file change.
5. Analytics is already wired to the portal homepage, all currently known public-record pages, Incoming Transmissions and the Food Intelligence Database.
6. Visit the site and inspect **Visitors** in Umami to measure approximate uniques. Compare per-path results to see which features people use.

**Current status:** the code hook is installed, but the `websiteId` is intentionally blank, so **no statistics are collected until an Umami website is connected**. Do not assert traffic totals before this step.

Official sources: https://docs.umami.is/docs/collect-data ; https://docs.umami.is/docs/cloud/faq ; https://docs.umami.is/docs

## Content updates
- Transmission Archive: add another `<details class="archive-entry">` in `transmissions/index.html`, newest first. Give it a unique TX code, `id`, `data-type` and English `data-search` terms. Count/filter UI updates automatically.
- Food Intelligence: add another `<details class="archive-entry">` in `intelligence/index.html`, using the next numbered file ID. Keep unreleased reviews sealed until a public launch, and link only verified videos/artwork.
- Existing shared language cookie is read by `records/language.js`; `ENGLISH/VEYDRAN` toggle persists across pages and does not break English keyword search.
- No made-up food scores, publication dates or video URLs.

## Site principle
Public Registry cases remain distinct from Food Intelligence entries; T-00-447 is CLOSED regardless of whether new food surveys are filed.

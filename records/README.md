# Veydran Public Document Registry

Public URL after deployment: **https://veydran.space/records/**

The registry is separate from the inaccessible "Imperial Records" service. The homepage links to this public release portal without changing the existing archive-access joke, and the 34-V hidden controls remain untouched.

## Included records

- \`/records/pr-000/\` — inaugural public release notice (full fictional circular).
- \`/records/a57/\` — T-00-447 public case summary for *The Battle of the A57*.
- \`/records/\` — searchable/filterable index of published summaries and notices.

## Publishing additional official documents

1. Confirm the document is **approved for public release**. Check real-world addresses, emails, signatures, third-party data, names and PDF metadata before uploading. Preserve the private original off-site.
2. Put the approved, sanitized PDF under \`/records/files/\` with a stable lowercase, hyphenated filename such as \`a57-ceasefire-public.pdf\`. Keep the original design and render resolution as needed.
3. Add an entry to \`/records/index.html\`: a new \`<article class="record">...</article>\` with unique reference, type and search terms, title, status and a **working** public link. Update the index count in the status rail. Add a filter only when records of that type exist.
4. For a document attached to case T-00-447, update \`/records/a57/index.html\` to reflect the true approval state and provide the exact PDF link. Do not turn a "PENDING" row into a link until a verified asset is uploaded.
5. Test internal navigation, file downloads, search, phone layout and direct URLs after publication.

## Publishing policy

This is a public GitHub Pages website. There is **no actual access control** on any file added here. The restricted Imperial Records and private correspondence must never be placed in the repository.

Only fictional/satirical records for Alien Eats Earth belong here. Named businesses are not represented as endorsing this fictional archive.

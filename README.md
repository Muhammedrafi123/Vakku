# UDF Promise Tracker
![Banner](https://i.postimg.cc/GpvCfyyX/header-darkg)
A public civic-tech website for tracking every UDF manifesto promise extracted from the local manifesto PDF. The first version is static, SEO-friendly, and built with Next.js App Router, TypeScript, Tailwind CSS, and JSON data.

## File Structure

- `app/` - App Router pages for home, promises, promise detail, categories, departments, timeline, and about.
- `components/` - Shared UI components such as cards, badges, progress bars, filters, share controls, and reveal wrappers.
- `data/promises.json` - Extracted promise records from the manifesto.
- `data/meta.json` - Counts and overall progress generated from `promises.json`.
- `lib/` - Shared types, data access, status mapping, search, sorting, date, and aggregation helpers.
- `public/assets/` - Public image assets, including the V.D. Satheesan caricature.
- `public/fonts/` and `fonts/` - FSL Malabar font files.
- `weekly-update.md` - Human-review workflow for future promise updates.
- `scripts/regenerate-meta.mjs` - Recalculates metadata after data edits.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

For deployment, push the repository to a platform that supports Next.js static generation, such as Vercel. Set `NEXT_PUBLIC_SITE_URL` to the public URL so canonical and Open Graph metadata resolve correctly.

## Updating Manifesto Data

The current dataset was created from OCR of `1775224187946-MANIFESTO_BOOKLET_FINAL_latest.pdf`. Because the PDF is scanned, Malayalam text and English translations should be reviewed against the source page before publication-sensitive use.

To edit a promise:

1. Open `data/promises.json`.
2. Update only fields supported by source evidence.
3. Keep `promise_ml` faithful to the manifesto text.
4. Leave `minister` blank unless verified.
5. Use `needs_review: true` when OCR, translation, or source meaning is unclear.
6. Run `npm run meta`.

## Adding Timeline Entries

Add a timeline item to the relevant promise:

```json
{
  "date": "2026-06-01",
  "title": "Short verified update",
  "summary": "Plain-language explanation of what changed.",
  "status_from": "not_started",
  "status_to": "announced",
  "source_title": "Source name",
  "source_url": "https://example.com/source"
}
```

Then update `status`, `progress`, and `last_updated` only when the evidence supports it. Run `npm run meta` after edits.

## Trust Rules

- Do not invent promises, dates, departments, ministers, or evidence.
- Use reliable sources and keep source links in timeline entries.
- Keep ambiguous items marked for review.
- Preserve Malayalam source text as the controlling record.
- Keep all status changes human-editor approved before publishing.

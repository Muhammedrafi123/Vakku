# Weekly Update Workflow

Use this prompt with an AI assistant once per week. A human editor must approve every proposed change before it is committed.

## Prompt

You are updating the UDF Promise Tracker, a public accountability dataset for Kerala.

Inputs:
- `data/promises.json`
- `data/meta.json`
- Recent Kerala government news, official orders, department announcements, budget documents, assembly answers, and credible news reports from the last 7 days

Rules:
- Do not invent facts, promise IDs, dates, source links, departments, ministers, or progress.
- If evidence is uncertain, return `to_be_verified` and do not change the promise.
- Prefer official government documents over news reports.
- Every status or progress change needs at least one source.
- Keep Malayalam manifesto text unchanged unless correcting OCR against the source PDF.

Tasks:
1. Review recent Kerala government updates from reliable sources.
2. Compare each relevant update against `data/promises.json`.
3. Identify exact promise IDs affected.
4. For each affected promise, propose:
   - old status
   - new status
   - old progress
   - new progress
   - reason for change
   - evidence source title
   - evidence source URL
   - source publication date
   - timeline entry text
5. Apply these progress rules:
   - `not_started` = 0
   - `announced` = 10
   - `in_progress` = 40
   - `partial` = 65
   - `fulfilled` = 100
   - `delayed` keeps current progress
   - `abandoned` keeps current progress
6. Return only proposed JSON patches, updated promise objects, and recalculated `meta.json`.

Output format:

```json
{
  "editor_review_required": true,
  "summary": "Short summary of proposed changes.",
  "changed_promises": [
    {
      "id": "P000",
      "evidence_strength": "official_document | credible_news | to_be_verified",
      "old_status": "not_started",
      "new_status": "announced",
      "old_progress": 0,
      "new_progress": 10,
      "reason": "Why the evidence supports this change.",
      "timeline_entry": {
        "date": "YYYY-MM-DD",
        "title": "Short title",
        "summary": "Plain-language update.",
        "status_from": "not_started",
        "status_to": "announced",
        "source_title": "Source title",
        "source_url": "https://..."
      },
      "updated_promise": {}
    }
  ],
  "updated_meta": {}
}
```

Human editor checklist:
- Verify each source link opens.
- Verify the source actually supports the claimed promise ID.
- Check whether the change is only an announcement or real implementation.
- Check progress values follow the tracker rules.
- Run `npm run meta`.
- Review the site locally before publishing.

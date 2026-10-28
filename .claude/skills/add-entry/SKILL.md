---
name: add-entry
description: Add a new post, talk, video or paper to the site (Medium article, YouTube video, conference talk, paper, or a post hosted here).
---

1. Collect title, date and URL. For YouTube, read the title from
   `https://www.youtube.com/oembed?url=<video-url>&format=json` and the date from `"uploadDate"` on the watch page.
   Medium blocks fetches, so ask Hasitha for the title and date if they were not given.
2. Hosted elsewhere: add an item at the top of `content/links.yaml` with `title`, `date`, `kind`, `venue`, `url`, `summary`.
   Hosted here: create `content/posts/<year>/<slug>.md` with the same front matter (no `url`) and the body; embed
   videos as `<div class="video"><iframe src="https://www.youtube.com/embed/<id>" ...></iframe></div>`.
3. If it belongs to a project, add the link to that project's link line in `content/pages/projects.md`.
4. Run `python3 build.py` and check the new item appears on `/` (Latest) and `/blog/`.
5. Commit with a verb-first message, for example `Add <title> to writing`.

# hasithaa.github.io

Personal site of Hasitha Aravinda. Plain static site: Markdown + YAML in, HTML out, no framework.

## Layout

- `content/site.yaml`: name, nav, social links, analytics id, how many items "Latest" on Home shows.
- `content/pages/*.md`: Home (`index.md`), Writing & Talks (`blog.md`), Portfolio (`projects.md`). Front matter `url` sets the path.
  `<!-- latest -->` and `<!-- entries -->` are replaced by the generated lists.
- `content/posts/<year>/<slug>.md`: posts hosted here, served at `/blog/<year>/<slug>/`. Front matter: `title`, `date`, `kind`, `venue`, `summary`; optional `when` (display text when the exact date is unknown) and `list: false` (hide from lists).
- `content/demos.yaml`: workflow demos. Each becomes a card on `/workflows/` (`content/pages/workflows.md`) and a page at `/workflows/<slug>/`. Images go in `static/img/demos/` as JPEG, at most 1280 px wide. Keep `versions` in step with the demo repo's README.
- `content/links.yaml`: writing, videos and papers hosted elsewhere (Medium, YouTube, DEV, publishers). Same fields plus `url`.
- `templates/base.html`, `static/style.css`, `static/site.js`: the one template, stylesheet and script.
- `icons/*.svg`: inline icons ([Lucide](https://lucide.dev), ISC; X and Medium from [Simple Icons](https://simpleicons.org), CC0). Use `{{icon:<name>}}` in pages or the template; add new icons as files here.
- `build.py`: renders everything into `site/` (git-ignored), plus `feed.xml` and `sitemap.xml`.

`kind` is one of `post`, `talk`, `video`, `paper`.

## Build and preview

```sh
pip install -r requirements.txt
python3 build.py && python3 -m http.server 8000 -d site
```

Pushing to `v2` deploys to the `gh-pages` branch through `.github/workflows/deploy.yml`.

## Rules

- Theme: colors are tokens in `static/style.css`; light, dark and a header switch (system, light, dark). Keep new colors as tokens defined for both themes.

- Keep existing URLs working; other sites link to `/blog/<year>/<slug>/` and the `/projects/#<id>` anchors.
- External content goes in `links.yaml`; do not copy Medium or YouTube text into the site.
- Do not invent facts: titles, dates, venues and co-authors come from the source or from Hasitha. Summaries are one plain sentence.
- Plain, human voice. No marketing words.
- Do not list the `fun-with-math` channel.
- Workflows: point learners to the WSO2 Integrator docs; the demo pages show and run, they do not teach the API.
- Guides are hidden for now; the Ballerina reference guide lives at https://hasithaa.github.io/ballerina-reference-guide/ and is not linked from the site.
- Run `python3 build.py` before committing; it must finish without errors.

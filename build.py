"""Builds the site from content/ into site/. Usage: python3 build.py"""

import hashlib
import html
import re
import shutil
from datetime import date
from email.utils import format_datetime
from datetime import datetime, timezone
from pathlib import Path

import markdown
import yaml

ROOT = Path(__file__).parent
CONTENT = ROOT / "content"
OUT = ROOT / "site"

SITE = yaml.safe_load((CONTENT / "site.yaml").read_text())
TEMPLATE = (ROOT / "templates" / "base.html").read_text()
KIND_LABELS = {"post": "Post", "talk": "Talk", "video": "Video", "paper": "Paper"}
KIND_ICONS = {"post": "file-text", "talk": "mic", "video": "play", "paper": "book-open"}
YOUTUBE_ID = re.compile(r"(?:youtu\.be/|youtube\.com/(?:watch\?v=|embed/))([\w-]{11})")


def icon(name):
    """Inline SVG from icons/, sized by CSS and coloured by currentColor."""
    svg = (ROOT / "icons" / f"{name}.svg").read_text()
    svg = re.sub(r"<!--.*?-->|<title>.*?</title>", "", svg, flags=re.S)
    svg = re.sub(r"\s+", " ", svg).strip()
    svg = re.sub(r"<svg[^>]*>", lambda m: re.sub(r'\s(?:width|height|class|role)="[^"]*"', "", m.group(0)), svg, count=1)
    if 'fill="none"' not in svg:
        svg = svg.replace("<svg", '<svg fill="currentColor"', 1)
    return svg.replace("<svg", '<svg class="icon" aria-hidden="true"', 1)


def expand_icons(text):
    return re.sub(r"\{\{icon:([\w-]+)\}\}", lambda m: icon(m.group(1)), text)


def split_front_matter(text):
    if text.startswith("---"):
        _, meta, body = text.split("---", 2)
        return yaml.safe_load(meta) or {}, body
    return {}, text


def render_markdown(text):
    return markdown.markdown(text, extensions=["extra", "toc", "sane_lists"])


def nav_html(active):
    items = []
    for item in SITE["nav"]:
        current = ' aria-current="page"' if item["url"] == active else ""
        items.append(f'<a href="{item["url"]}"{current}>{item["title"]}</a>')
    return "\n".join(items)


def social_html():
    links = [
        f'<a href="{s["url"]}" rel="me" title="{s["name"]}">{icon(s["icon"])}<span>{s["name"]}</span></a>'
        for s in SITE["social"]
    ]
    return '<div class="social">' + "".join(links) + "</div>"


def asset_url(path):
    """Versioned URL so browsers never pair new HTML with a cached old stylesheet or script."""
    digest = hashlib.sha256((ROOT / "static" / path).read_bytes()).hexdigest()[:10]
    return f"/{path}?v={digest}"


def write_page(url, title, body, active="", description=None):
    page_title = SITE["name"] if url == "/" else f'{title} · {SITE["name"]}'
    page = (
        TEMPLATE.replace("{{title}}", html.escape(page_title))
        .replace("{{description}}", html.escape(description or SITE["description"]))
        .replace("{{url}}", SITE["url"].rstrip("/") + url)
        .replace("{{analytics}}", SITE["analytics"])
        .replace("{{name}}", SITE["name"])
        .replace("{{nav}}", nav_html(active))
        .replace("{{social}}", social_html())
        .replace("{{year}}", str(date.today().year))
        .replace("{{content}}", body)
        .replace("{{css}}", asset_url("style.css"))
        .replace("{{js}}", asset_url("site.js"))
    )
    page = expand_icons(page)
    target = OUT / url.strip("/") / "index.html" if url.endswith("/") else OUT / url
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(page)


def load_entries():
    """Hosted posts plus external links, newest first."""
    entries = []
    for path in sorted((CONTENT / "posts").rglob("*.md")):
        meta, body = split_front_matter(path.read_text())
        slug = path.relative_to(CONTENT / "posts").with_suffix("").as_posix()
        meta.update(url=f"/blog/{slug}/", body=body, external=False)
        entries.append(meta)
    for meta in yaml.safe_load((CONTENT / "links.yaml").read_text()):
        meta["external"] = True
        entries.append(meta)
    listed = [e for e in entries if e.get("list", True)]
    listed.sort(key=lambda e: e["date"], reverse=True)
    return entries, listed


def entry_html(e):
    kind = KIND_LABELS.get(e.get("kind", "post"), "Post")
    target = ' target="_blank" rel="noopener"' if e["external"] else ""
    arrow = " ↗" if e["external"] else ""
    meta = [str(e.get("when") or e["date"].strftime("%b %Y")), kind]
    if e.get("venue"):
        meta.append(html.escape(e["venue"]))
    summary = f'<p>{html.escape(e["summary"])}</p>' if e.get("summary") else ""
    video = YOUTUBE_ID.search(e["url"] if e["external"] else e["body"])
    thumb = (
        f'<img class="thumb" src="https://i.ytimg.com/vi/{video.group(1)}/mqdefault.jpg" alt="" loading="lazy">'
        if video else ""
    )
    return (
        f'<li class="entry" data-kind="{e.get("kind", "post")}"><a class="entry-link" href="{e["url"]}"{target}>'
        f'<span class="entry-icon">{icon(KIND_ICONS[e.get("kind", "post")])}</span>'
        f'<span class="entry-text"><span class="entry-title">{html.escape(e["title"])}{arrow}</span>'
        f'<span class="entry-meta">{" · ".join(meta)}</span>{summary}</span>{thumb}</a></li>'
    )


def entry_list(entries):
    return '<ul class="entries">' + "".join(entry_html(e) for e in entries) + "</ul>"


def blog_index(listed):
    kinds = sorted({e.get("kind", "post") for e in listed}, key=list(KIND_LABELS).index)
    filters = ['<button type="button" data-filter="all" aria-pressed="true">All</button>']
    filters += [f'<button type="button" data-filter="{k}" aria-pressed="false">{KIND_LABELS[k]}s</button>' for k in kinds]
    parts = [f'<div class="filters" role="group" aria-label="Filter by kind">{"".join(filters)}</div>']
    for year in sorted({e["date"].year for e in listed}, reverse=True):
        parts.append(f'<h2 class="year">{year}</h2>')
        parts.append(entry_list([e for e in listed if e["date"].year == year]))
    return "\n".join(parts)


def feed_xml(listed):
    items = []
    for e in listed:
        link = e["url"] if e["external"] else SITE["url"].rstrip("/") + e["url"]
        stamp = format_datetime(datetime.combine(e["date"], datetime.min.time(), timezone.utc))
        items.append(
            f"<item><title>{html.escape(e['title'])}</title><link>{html.escape(link)}</link>"
            f"<guid>{html.escape(link)}</guid><pubDate>{stamp}</pubDate>"
            f"<description>{html.escape(e.get('summary', ''))}</description></item>"
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>'
        f"<title>{html.escape(SITE['name'])}</title><link>{SITE['url']}</link>"
        f"<description>{html.escape(SITE['description'])}</description>{''.join(items)}</channel></rss>"
    )


def build():
    shutil.rmtree(OUT, ignore_errors=True)
    shutil.copytree(ROOT / "static", OUT)
    entries, listed = load_entries()
    urls = []

    for path in sorted((CONTENT / "pages").glob("*.md")):
        meta, body = split_front_matter(path.read_text())
        body = (
            body.replace("<!-- latest -->", entry_list(listed[: SITE["latest_count"]]))
            .replace("<!-- entries -->", blog_index(listed))
            .replace("<!-- social -->", social_html())
        )
        write_page(meta["url"], meta["title"], render_markdown(body), meta["url"], meta.get("description"))
        urls.append(meta["url"])

    for e in entries:
        if e["external"]:
            continue
        header = f'<p class="entry-meta">{e.get("when") or e["date"].strftime("%B %-d, %Y")}'
        header += f' · {html.escape(e["venue"])}</p>' if e.get("venue") else "</p>"
        body = f'<article><h1>{html.escape(e["title"])}</h1>{header}{render_markdown(e["body"])}</article>'
        write_page(e["url"], e["title"], body, "/blog/", e.get("summary"))
        urls.append(e["url"])

    write_page("404.html", "Not found", '<h1>Not found</h1><p><a href="/">Back home</a></p>')
    (OUT / "feed.xml").write_text(feed_xml(listed))
    base = SITE["url"].rstrip("/")
    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + "".join(f"<url><loc>{base}{u}</loc></url>" for u in urls)
        + "</urlset>"
    )
    (OUT / ".nojekyll").touch()
    print(f"Built {len(urls)} pages into {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    build()

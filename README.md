# Israel Owolabi — personal website

A static academic and engineering portfolio for **https://toba-io.github.io/**.

## Edit the site

No build tool or package installation is needed. Edit the HTML files directly:

- `index.html`: introduction, selected work, and short biography.
- `research.html`: thesis, research status, and writing.
- `projects.html`: PV/storage course project and practical work.
- `software.html`: selected public GitHub repositories.
- `building.html`: Reclaimer Labs and MarginPilot.
- `gallery.html`: photographs and captions.
- `assets/style.css`: colours, typography, and responsive layouts.
- `assets/site.js`: mobile navigation, battery illustration, and photograph viewer.

Keep the navigation/footer consistent across pages. Update the footer date, research dates, and `sitemap.xml` when adding substantial work. Published work should be identified separately from internal reports, course drafts, and work in progress.

The photographs are optimised WebP copies without camera metadata. The originals are untouched. Report images are excerpts from the supplied research report and course draft; the full reports are not distributed here. Figures retain their source context and the co-authored project credits Mariya Sokolovskaya.

## Preview and check

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. If `py` is unavailable, use your Python executable.

```powershell
py scripts/check_site.py
```

## Publish

This repository uses GitHub Pages: deploy from the `main` branch, repository root. `.nojekyll` bypasses Jekyll processing. Commit and push edits to update the public site.

```powershell
git add .
git commit -m "Update portfolio"
git push origin main
```

There are no server dependencies, analytics, contact-form services, or API credentials in this repository. Google Fonts supplies the web fonts; system fonts are the fallback. Contact links go to the public GitHub profile.

## Source basis for the first version

- September 2026 digital-twin report and thesis progress as of 21 October 2026.
- Supplied PV/storage course-report draft (Figures 6 and associated tables).
- Public repositories under `toba-io` and the Reclaimer Labs product site.
- Selected personal photographs supplied for this portfolio.

The reference for the academic structure was [Akinrinsola J. Agbelusi’s website](https://berry-szn.github.io/). This site uses original markup, styling, and copy.

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
- `renewable-project.html`: the complete renewable-project media album (9 photographs and one full video).
- `assets/style.css`: colours, typography, and responsive layouts.
- `assets/site.js`: mobile navigation, battery illustration, and photograph viewer.
- `assets/battery.mjs` and `assets/battery.css`: interactive homepage flow-battery schematic, charge trace, and playback controls.
- `assets/videos/`: complete silent H.264 MP4 videos encoded at 2× speed, looped when played.

Keep the navigation/footer consistent across pages. Update the footer date, research dates, and `sitemap.xml` when adding substantial work. Published work should be identified separately from internal reports, course drafts, and work in progress.

The photographs are optimised WebP copies without camera metadata. The originals are untouched. Report images are excerpts from the supplied research report and course draft; the full reports are not distributed here. Figures retain their source context and the co-authored project credits Mariya Sokolovskaya.

## Preview and check

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. If `py` is unavailable, use your Python executable.

```powershell
py scripts/check_site.py
node scripts/check_battery.mjs
node scripts/check_autoplay.mjs
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

## Animation and media notes

The homepage animation is an accelerated explanatory schematic, separate from the calibrated thesis model. Electrolyte volume remains constant; tint represents changing vanadium oxidation state. Charging and discharging reverse electron flow and the direction of the charge trace. The circulation slider changes visual particle speed. Rest holds charge constant in this simplified illustration. Playback pauses offscreen and when the tab is hidden; reduced-motion users start paused.

The gallery reflects the supplied project context: plant monitoring/control, renewable-energy work with friends, Topaz industrial immersion, storage-model coursework, lithium-lab visits, Nigerian National Youth Service, church, and everyday life. Lithium-lab visits are distinguished from original flow-battery research. HEIC photographs are converted to WebP; the industrial-poster contact line is obscured in its public copy. Complete videos are encoded at 2× speed, have no audio or location metadata, and automatically play silently on a loop when at least 25% visible. They pause offscreen or in a background tab; reduced-motion visitors retain manual playback. All three lithium-lab videos are included. Original media is unchanged.

The NYSC image uses an SVG viewport to crop the right-hand side of the original photograph without regenerating faces or changing the source pixels. The renewable album keeps nine photographs and the full video. Of the three similar photos with the same friend, only IMG_0516.JPG is used across the site. StressBoard is described as a team prototype and links to the shared presentation; private repository and workspace links are omitted from the public pages.

Additional project context: [Israel’s LinkedIn profile](https://www.linkedin.com/in/israel-owolabi-031867381/).

The research page and gallery include the laboratory's VRFB cell assembly in Autodesk Fusion, highlighting 3D CAD and assembly-modelling skills. The selected Fusion render screenshot is preserved at full resolution in a lossless WebP copy and paired with the corresponding physical cell (IMG_0577.JPG).

## 27 October 2026 update

The ongoing renewable-energy collaboration is featured before the completed Sharjah course project, with a high-level description and private technical details omitted. The final Sharjah report confirms the existing numerical results; its comparison chart is Figure 7. Research context reflects the thesis log through 26 October, and the supplied 21 October manuscript abstract is featured with an explicit draft label. Internal progress records and full manuscript PDFs are not included in the public assets.

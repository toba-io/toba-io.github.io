# Israel Owolabi — personal website

A static academic and engineering portfolio for **https://toba-io.github.io/**.

## Edit the site

No build tool or package installation is needed. Edit the HTML files directly:

- `index.html`: introduction, selected work, and short biography.
- `research.html`: thesis, research status, and writing.
- `projects.html`: PV/storage course project and practical work.
- `software.html`: Reclaimer Labs / MarginPilot and selected public GitHub repositories.
- `building.html`: compatibility redirect to `software.html#building`.
- `gallery.html`: photographs and captions.
- `renewable-project.html`: the VetroSol media album (6 photographs and one full video).
- `*-media.html`: separate media albums for Topaz, Sharjah, tensor-train hoDMD, Flora Wand, battery siting, storage models, and StressBoard.
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

The NYSC image uses an SVG viewport to crop the right-hand side of the original photograph without regenerating faces or changing the source pixels. The VetroSol album keeps six photographs and the full video. Of the three similar photos with the same friend, only IMG_0516.JPG is used across the site. StressBoard is described as a team prototype and links to the shared presentation; private repository and workspace links are omitted from the public pages.

Additional project context: [Israel’s LinkedIn profile](https://www.linkedin.com/in/israel-owolabi-031867381/).

The research page and gallery include the laboratory's VRFB cell assembly in Autodesk Fusion, highlighting 3D CAD and assembly-modelling skills. The selected Fusion render screenshot is preserved at full resolution in a lossless WebP copy and paired with the corresponding physical cell (IMG_0577.JPG).

## 27 October 2026 update

The ongoing renewable-energy collaboration is featured before the completed Sharjah course project, with a high-level description and private technical details omitted. The final Sharjah report confirms the existing numerical results; its comparison chart is Figure 7. Research context reflects the thesis log through 26 October, and the supplied 21 October manuscript abstract is featured with an explicit draft label. Internal progress records and full manuscript PDFs are not included in the public assets.

## 29 October 2026 update

The research page records the experimental phase begun on 28 October: an ESP32/ADS1115 reader with two colour sensors, a Fusion-designed and 3D-printed stand for the IKA PETTE vario 100–1000 µL micropipette, and a ten-cycle oxidation-state experiment with camera and colour monitoring. Four complete source clips (IMG_1635, IMG_1636, IMG_1640, IMG_1642) are silent H.264 MP4 copies encoded at 2× speed, using the existing in-view playback logic. The originals are unchanged. Reader calibration and experimental analysis remain pending. The reader and analyzer are presented as complementary tools, with purpose and stage described; cost estimates and budget references are omitted. Home and Gallery link to the experimental update.

## 31 October 2026 organisation update

Software and Building share one page and navigation item. Project-page links lead only to that project's media; the full Gallery combines those albums and the existing research and personal collection, with Life & Community first, Projects & Industry next, and the lab collection last. Albums reuse the existing photo viewer and silent in-view video playback. The newer local Flora Wand description is preserved.

## 9 November 2026 media and process update

Research and Gallery include five new laboratory assets: the IKA micropipette in its printed stand (IMG_1782), reagents (IMG_1792), the reference electrode (IMG_1789), a Rigol bench comparison of the reader (IMG_1803), and potential-monitored titration (IMG_1795). Photos are optimised WebP copies; both full silent videos run at 2× speed with metadata removed and the existing in-view playback controls. Originals are untouched.

Process descriptions use the supplied Titration_SoC_procedure_EN document and VRFB_AOS_variation_plan_v3 workbook. Titration provides independent validation of colour-based SoC, rather than calibration of the colour model. The six-condition AOS series is a plan; the workbook contains placeholders and an example log, not completed results. No titration results or internal source documents are published. The voltage comparison is an initial check, not a validated full-range accuracy claim.

Projects and the renewable album explain the VetroSol hybrid concept and link to its public project site. Israel’s field installation role remains separate from the team’s published CFD and wind-tunnel work. No prototype performance figures are presented as measured field performance.

### Media ordering preference

Keep related experiments grouped and show progress from earlier work to later work within each group. New media goes at the bottom of its own segment, introduced by the reason for the next step. Research now shows the original pipette/CAD and printing before the finished stand, initial voltage checks before the Rigol comparison, and titrant preparation/visual endpoints before potential-monitored titration. Gallery follows the same chronological subject groups. Preserve all earlier media.

## 10 November 2026 project attribution correction

IMG_0495, IMG_0496 and IMG_0497 belong to a different project, not VetroSol (confirmed by Israel). Their WebP copies are omitted from the VetroSol album and the corresponding Gallery grouping. Do not reintroduce them as VetroSol media. Source files are retained.

### IKA stand completion and presentation correction

The stand was finished on the same day it was printed, not on 9 November; that is the date of the later photograph (Israel, 10 November). The micropipette media forms one two-column group: packaging and CAD on top, followed by the combined printing video and then the finished-stand photo. The combined clip preserves both full 2x clips, first layers (IMG_1636) then the later printing stage (IMG_1640), without another speed change.

### Public copy preference

Keep website text concise and useful to visitors. Do not publish explanations of factual corrections, upload dates or when a photograph was taken unless the timing is relevant to understanding the work. Keep such context in these internal notes; use simple subject captions on the website.

### Research date display

On Research, show calendar dates only in the “Where things stand” timeline. Omit dates elsewhere on that page. This preference does not apply to other pages.

### Describe the work directly

Public descriptions should explain the activity and its purpose, rather than announcing media updates. Avoid “new video”, “new photographs”, “latest update” and similar wording that becomes stale. Keep update chronology in the Research progress timeline and internal records.

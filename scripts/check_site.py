"""Run with Python 3. Checks local page links, image alt text, and metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.links, self.errors = path, set(), [], []
        self.title = self.h1 = self.description = self.viewport = False
        self.in_navigation, self.navigation, self.project_count = False, [], 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'nav' and a.get('id') == 'navigation': self.in_navigation = True
        if tag == 'a' and self.in_navigation: self.navigation.append(a.get('href'))
        if tag == 'article' and 'context-project' in a.get('class', '').split(): self.project_count += 1
        if 'id' in a:
            if a['id'] in self.ids:
                self.errors.append('duplicate id: '+a['id'])
            self.ids.add(a['id'])
        if tag == 'title': self.title = True
        if tag == 'h1': self.h1 = True
        if tag == 'meta' and a.get('name') == 'description': self.description = True
        if tag == 'meta' and a.get('name') == 'viewport': self.viewport = True
        if tag == 'img' and 'alt' not in a: self.errors.append('image without alt')
        for attr in ('href','src','poster'):
            if a.get(attr): self.links.append(a[attr])

    def handle_endtag(self, tag):
        if tag == 'nav': self.in_navigation = False

pages = {}
for path in ROOT.glob('*.html'):
    parsed = Page(path)
    parsed.feed(path.read_text(encoding='utf-8'))
    pages[path.resolve()] = parsed

errors = []
for path, page in pages.items():
    errors.extend(f'{path.name}: {e}' for e in page.errors)
    if page.navigation != ['index.html', 'research.html', 'projects.html']:
        errors.append(f'{path.name}: navigation must contain only Home, Research and Projects')
    if path.name == 'research.html' and page.project_count != 2:
        errors.append('research.html: expected exactly two study entries')
    for name in ('title','h1','description','viewport'):
        if not getattr(page,name): errors.append(f'{path.name}: missing {name}')
    for link in page.links:
        url = urlsplit(link)
        if url.path in ('gallery.html', 'software.html', 'building.html') or url.netloc == 'github.com':
            errors.append(f'{path.name}: retired gallery or public-code link: {link}')
        if url.scheme or url.netloc: continue
        target = (path.parent/unquote(url.path)).resolve() if url.path else path
        if not target.is_relative_to(ROOT):
            errors.append(f'{path.name}: link outside site: {link}')
        elif not target.is_file():
            errors.append(f'{path.name}: missing target: {link}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path.name}: missing anchor: {link}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages; local links, fragments, image alt text, and page metadata.')

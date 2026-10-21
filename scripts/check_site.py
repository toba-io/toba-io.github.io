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

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:
                self.errors.append('duplicate id: '+a['id'])
            self.ids.add(a['id'])
        if tag == 'title': self.title = True
        if tag == 'h1': self.h1 = True
        if tag == 'meta' and a.get('name') == 'description': self.description = True
        if tag == 'meta' and a.get('name') == 'viewport': self.viewport = True
        if tag == 'img' and 'alt' not in a: self.errors.append('image without alt')
        for attr in ('href','src'):
            if a.get(attr): self.links.append(a[attr])

pages = {}
for path in ROOT.glob('*.html'):
    parsed = Page(path)
    parsed.feed(path.read_text(encoding='utf-8'))
    pages[path.resolve()] = parsed

errors = []
for path, page in pages.items():
    errors.extend(f'{path.name}: {e}' for e in page.errors)
    for name in ('title','h1','description','viewport'):
        if not getattr(page,name): errors.append(f'{path.name}: missing {name}')
    for link in page.links:
        url = urlsplit(link)
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

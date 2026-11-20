"""Check that every internal link and anchor on the site resolves.

Scans the HTML pages, the shared components and the navigation in
js/config.js. External links, mailto: and tel: are skipped. Exits 1 and
lists each broken link when anything is missing.
"""

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[2]
SKIP_DIRS = {'.git', '.github', 'node_modules', '_favicon-preview'}
SKIP_SCHEMES = ('http:', 'https:', 'mailto:', 'tel:', 'javascript:', 'data:', '#!')


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        for key in ('href', 'src'):
            if attrs.get(key) and not (tag == 'link' and attrs.get('rel') == 'preconnect'):
                self.links.append(attrs[key])


def parse(path, cache={}):
    if path not in cache:
        c = Collector()
        c.feed(path.read_text(encoding='utf-8', errors='replace'))
        cache[path] = c
    return cache[path]


def check(link, base_dir, source, problems):
    if not link or link.startswith(SKIP_SCHEMES) or '${' in link:
        return
    if link.startswith('#'):
        target, frag = source, link[1:]
    else:
        url = urlparse(link)
        path = unquote(url.path)
        target = (ROOT / path.lstrip('/')) if path.startswith('/') else (base_dir / path)
        target = target.resolve()
        if target.is_dir():
            target = target / 'index.html'
        frag = url.fragment
        if not target.exists():
            problems.append(f'{source.relative_to(ROOT)}: missing file {link}')
            return
    if frag and target.suffix == '.html' and frag not in parse(target).ids:
        problems.append(f'{source.relative_to(ROOT)}: missing anchor {link}')


def main():
    problems = []
    pages = [p for p in ROOT.rglob('*.html') if not SKIP_DIRS & set(p.relative_to(ROOT).parts)]
    for page in pages:
        is_component = page.parent.name == 'components'
        for link in parse(page).links:
            if is_component:
                # {{root}} is replaced with the path to the site root at load time.
                check(link.replace('{{root}}', ''), ROOT, page, problems)
            else:
                check(link, page.parent, page, problems)

    config = ROOT / 'js' / 'config.js'
    for href in re.findall(r'href:\s*"([^"]+)"', config.read_text(encoding='utf-8')):
        check(href, ROOT, config, problems)

    if problems:
        print('Broken internal links:')
        print('\n'.join(sorted(set(problems))))
        sys.exit(1)
    print(f'All internal links and anchors resolve across {len(pages)} pages and the navigation.')


if __name__ == '__main__':
    main()

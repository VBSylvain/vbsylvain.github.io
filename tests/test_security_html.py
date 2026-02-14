import sys
from html.parser import HTMLParser

class SecurityHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.vulnerabilities = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            if 'target' in attrs_dict and attrs_dict['target'] == '_blank':
                rel = attrs_dict.get('rel', '')
                # Check for both noopener and noreferrer
                if 'noopener' not in rel or 'noreferrer' not in rel:
                    self.vulnerabilities.append(attrs_dict.get('href', 'unknown'))

parser = SecurityHTMLParser()
try:
    with open('index.html', 'r', encoding='utf-8') as f:
        parser.feed(f.read())
except FileNotFoundError:
    print("Error: index.html not found.")
    sys.exit(1)

if parser.vulnerabilities:
    print(f"FAIL: Found {len(parser.vulnerabilities)} vulnerable links (target='_blank' missing rel='noopener noreferrer'):")
    for url in parser.vulnerabilities:
        print(f" - {url}")
    sys.exit(1)
else:
    print("PASS: No vulnerable links found.")
    sys.exit(0)

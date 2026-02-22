import sys
from html.parser import HTMLParser

class SecurityParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.vulnerabilities = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attr_dict = dict(attrs)
            if attr_dict.get('target') == '_blank':
                rel = attr_dict.get('rel', '')
                if 'noopener' not in rel or 'noreferrer' not in rel:
                    self.vulnerabilities.append(f"Line {self.getpos()[0]}: <a href='{attr_dict.get('href')}'> missing rel='noopener noreferrer'")

if __name__ == "__main__":
    parser = SecurityParser()
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            parser.feed(f.read())
    except FileNotFoundError:
        print("Error: index.html not found.")
        sys.exit(1)

    if parser.vulnerabilities:
        print("Found vulnerabilities:")
        for v in parser.vulnerabilities:
            print(v)
        sys.exit(1)
    else:
        print("No vulnerabilities found!")
        sys.exit(0)

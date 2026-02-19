import html.parser
import sys

class TargetBlankVerifier(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.vulnerable_links = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            if attrs_dict.get('target') == '_blank':
                rel = attrs_dict.get('rel', '')
                if 'noopener' not in rel or 'noreferrer' not in rel:
                    self.vulnerable_links.append(attrs_dict.get('href', 'unknown'))

def verify_target_blank(filepath):
    parser = TargetBlankVerifier()
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            parser.feed(content)
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found.")
        sys.exit(1)

    if parser.vulnerable_links:
        print(f"Found {len(parser.vulnerable_links)} vulnerable links (target='_blank' without rel='noopener noreferrer'):")
        for link in parser.vulnerable_links:
            print(f" - {link}")
        sys.exit(1)
    else:
        print("All target='_blank' links have rel='noopener noreferrer'.")
        sys.exit(0)

if __name__ == "__main__":
    verify_target_blank('index.html')

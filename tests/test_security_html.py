
import sys
import os
from html.parser import HTMLParser

class VulnerabilityParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.vulnerabilities = []
        self.line_offset = 0

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            if 'target' in attrs_dict and attrs_dict['target'] == '_blank':
                rel = attrs_dict.get('rel', '').split()
                if 'noopener' not in rel or 'noreferrer' not in rel:
                    line, offset = self.getpos()
                    self.vulnerabilities.append((line, attrs_dict.get('href', 'unknown')))

def check_file(filepath):
    parser = VulnerabilityParser()
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            parser.feed(content)
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found.")
        sys.exit(1)

    if parser.vulnerabilities:
        print(f"FAIL: Found {len(parser.vulnerabilities)} insecure links in '{filepath}':")
        for line, href in parser.vulnerabilities:
            print(f"  Line {line}: <a target='_blank' href='{href}'> missing rel='noopener noreferrer'")
        sys.exit(1)
    else:
        print(f"PASS: No insecure links found in '{filepath}'.")
        sys.exit(0)

if __name__ == "__main__":
    # Determine the path to index.html relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.join(script_dir, "..")
    index_path = os.path.join(project_root, "index.html")

    check_file(index_path)

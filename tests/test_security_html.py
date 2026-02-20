import sys
from html.parser import HTMLParser

class TargetBlankVerifier(HTMLParser):
    def __init__(self):
        super().__init__()
        self.vulnerable_links = []
        self.line_offset = 0

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            target = attrs_dict.get('target')
            rel = attrs_dict.get('rel', '')

            if target == '_blank':
                if 'noopener' not in rel or 'noreferrer' not in rel:
                    # Found a vulnerable link
                    # Note: getpos() returns (line, col) but line is 1-based relative to the start of parsing
                    # Since we parse the whole file, it should match file line numbers
                    line, col = self.getpos()
                    self.vulnerable_links.append((line, attrs_dict.get('href', 'unknown')))

def verify_file(filepath):
    verifier = TargetBlankVerifier()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            verifier.feed(content)
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found.")
        return False

    if verifier.vulnerable_links:
        print(f"FAIL: Found {len(verifier.vulnerable_links)} vulnerable links in '{filepath}':")
        for line, href in verifier.vulnerable_links:
            print(f"  Line {line}: {href} (Missing rel='noopener noreferrer')")
        return False
    else:
        print(f"PASS: No vulnerable target='_blank' links found in '{filepath}'.")
        return True

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 test_security_html.py <filepath>")
        sys.exit(1)

    filepath = sys.argv[1]
    success = verify_file(filepath)
    sys.exit(0 if success else 1)

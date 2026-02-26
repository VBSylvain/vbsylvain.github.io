import hashlib
import urllib.request
from html.parser import HTMLParser
import sys
import base64

def base64_encode(data):
    return base64.b64encode(data).decode('utf-8')

class SRIParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.issues = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        url = None
        integrity = attr_dict.get('integrity')
        crossorigin = attr_dict.get('crossorigin')

        if tag == 'link' and 'stylesheet' in attr_dict.get('rel', ''):
            url = attr_dict.get('href')
        elif tag == 'script':
            url = attr_dict.get('src')

        if url and ('stackpath.bootstrapcdn.com' in url or 'ajax.googleapis.com' in url):
            print(f"Checking {url}...")

            # Fetch content
            try:
                with urllib.request.urlopen(url) as response:
                    content = response.read()
                    sha384_hash = hashlib.sha384(content).digest()
                    expected_hash = "sha384-" + base64_encode(sha384_hash)

                    if not integrity:
                        self.issues.append(f"Missing integrity attribute for {url}. Expected: {expected_hash}")
                    elif integrity != expected_hash:
                        self.issues.append(f"Incorrect integrity hash for {url}. Found: {integrity}, Expected: {expected_hash}")

                    if not crossorigin:
                         self.issues.append(f"Missing crossorigin attribute for {url}. Expected: anonymous")
                    elif crossorigin != "anonymous":
                         self.issues.append(f"Incorrect crossorigin attribute for {url}. Found: {crossorigin}, Expected: anonymous")

            except Exception as e:
                self.issues.append(f"Error fetching {url}: {e}")

if __name__ == "__main__":
    parser = SRIParser()
    try:
        with open('index.html', 'r') as f:
            content = f.read()
            parser.feed(content)
    except FileNotFoundError:
        print("Error: index.html not found.")
        sys.exit(1)

    if parser.issues:
        print("\nSRI Verification Failed:")
        for issue in parser.issues:
            print(f"- {issue}")
        sys.exit(1)
    else:
        print("\nSRI Verification Passed!")
        sys.exit(0)

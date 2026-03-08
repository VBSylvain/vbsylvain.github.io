from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.errors = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)

        # Check target="_blank" links
        if tag == 'a' and attr_dict.get('target') == '_blank':
            rel = attr_dict.get('rel', '')
            if 'noopener' not in rel or 'noreferrer' not in rel:
                self.errors.append(f"Missing rel='noopener noreferrer' on link: {attr_dict.get('href')}")

        # Check CDN resources
        if tag in ['link', 'script']:
            src = attr_dict.get('href') or attr_dict.get('src')
            if src and ('bootstrapcdn.com' in src or 'googleapis.com' in src):
                if 'fonts.googleapis.com' in src:
                    return # skip fonts for sri
                integrity = attr_dict.get('integrity')
                crossorigin = attr_dict.get('crossorigin')
                if not integrity or not crossorigin:
                    self.errors.append(f"Missing SRI/crossorigin on CDN resource: {src}")

parser = MyHTMLParser()
with open('index.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

if parser.errors:
    print("Security checks failed:")
    for err in parser.errors:
        print(f" - {err}")
else:
    print("Security checks passed!")

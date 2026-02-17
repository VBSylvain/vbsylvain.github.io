from bs4 import BeautifulSoup
import sys

with open('index.html', 'r') as f:
    soup = BeautifulSoup(f, 'html.parser')

links = soup.find_all('a', target='_blank')
vulnerable_count = 0

print(f"Found {len(links)} links with target='_blank'.")

for link in links:
    rel = link.get('rel', [])
    if 'noopener' not in rel or 'noreferrer' not in rel:
        print(f"VULNERABLE LINK: {link}")
        vulnerable_count += 1
    else:
        print(f"SECURE LINK: {link}")

if vulnerable_count > 0:
    print(f"FAILED: Found {vulnerable_count} vulnerable links.")
    sys.exit(1)
else:
    print("SUCCESS: All target='_blank' links are secured.")
    sys.exit(0)

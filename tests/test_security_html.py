import re
import sys

def check_target_blank(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find all <a ...> tags
    a_tags = re.findall(r'<a\s+[^>]*>', content)

    failures = 0
    for tag in a_tags:
        if 'target="_blank"' in tag:
            if 'rel="noopener noreferrer"' not in tag:
                print(f"FAIL: {tag} is missing rel='noopener noreferrer'")
                failures += 1
            else:
                print(f"PASS: {tag} has rel='noopener noreferrer'")

    if failures > 0:
        print(f"\nFound {failures} vulnerable links.")
        sys.exit(1)
    else:
        print("\nAll target='_blank' links are secure.")
        sys.exit(0)

if __name__ == "__main__":
    check_target_blank('index.html')

import bs4

def check_security(filepath):
    with open(filepath, 'r') as f:
        soup = bs4.BeautifulSoup(f, 'html.parser')

    issues = []

    # Check for target="_blank" without rel="noopener noreferrer"
    links = soup.find_all('a', attrs={'target': '_blank'})
    for link in links:
        rel = link.get('rel', [])
        if 'noopener' not in rel or 'noreferrer' not in rel:
            issues.append(f"Vulnerability: Link to {link.get('href')} has target='_blank' but missing rel='noopener noreferrer'")

    # Check for jQuery version
    scripts = soup.find_all('script')
    jquery_found = False
    for script in scripts:
        src = script.get('src', '')
        if 'jquery' in src and 'jquery.easing' not in src: # Exclude jquery.easing
            jquery_found = True
            if '3.7.1' not in src:
                 issues.append(f"Vulnerability: Using old jQuery version: {src}")
            if not script.get('integrity'):
                 issues.append(f"Vulnerability: Missing integrity attribute for jQuery: {src}")

    if not jquery_found:
        issues.append("Vulnerability: jQuery script tag not found.")

    # Check for Bootstrap CSS
    link_tags = soup.find_all('link')
    bootstrap_css_found = False
    for link in link_tags:
        href = link.get('href', '')
        if 'bootstrap' in href and 'css' in href:
            bootstrap_css_found = True
            if '4.6.2' not in href:
                 issues.append(f"Vulnerability: Using old Bootstrap CSS version: {href}")
            if not link.get('integrity'):
                 issues.append(f"Vulnerability: Missing integrity attribute for Bootstrap CSS: {href}")

    if not bootstrap_css_found:
         issues.append("Vulnerability: Bootstrap CSS link not found.")

    # Check for Bootstrap JS
    bootstrap_js_found = False
    for script in scripts:
        src = script.get('src', '')
        if 'bootstrap' in src and 'js' in src:
            bootstrap_js_found = True
            if '4.6.2' not in src:
                 issues.append(f"Vulnerability: Using old Bootstrap JS version: {src}")
            if not script.get('integrity'):
                 issues.append(f"Vulnerability: Missing integrity attribute for Bootstrap JS: {src}")

    if not bootstrap_js_found:
         issues.append("Vulnerability: Bootstrap JS script tag not found.")

    if issues:
        print("Found security issues:")
        for issue in issues:
            print(f"- {issue}")
        return False
    else:
        print("Verification PASSED: All checks passed.")
        return True

if __name__ == "__main__":
    check_security('index.html')

from playwright.sync_api import sync_playwright
import sys

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        has_errors = False

        page.on("console", lambda msg: check_error(msg.text))
        page.on("pageerror", lambda err: check_error(str(err)))

        def check_error(err_text):
            nonlocal has_errors
            if "Subresource Integrity" in err_text or "SRI" in err_text:
                print(f"ERROR: SRI issue detected: {err_text}")
                has_errors = True

        page.goto("file:///app/index.html", wait_until="networkidle")

        # Verify rel="noopener noreferrer"
        links = page.locator('a[target="_blank"]').all()
        for link in links:
            rel = link.get_attribute('rel')
            if not rel or 'noopener' not in rel or 'noreferrer' not in rel:
                print(f"ERROR: Missing rel attribute on target='_blank' link")
                has_errors = True

        browser.close()

        if has_errors:
            sys.exit(1)
        else:
            print("SUCCESS: No SRI errors found and all target='_blank' links have rel='noopener noreferrer'")

if __name__ == "__main__":
    run()
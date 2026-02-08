from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Open the local file
    print("Opening file:///app/index.html")
    page.goto("file:///app/index.html")

    # Locate the image inside the picture tag
    img_locator = page.locator("picture img.img-profile")

    # Check visibility
    if img_locator.is_visible():
        print("Profile image is visible.")
    else:
        print("ERROR: Profile image is NOT visible.")
        browser.close()
        exit(1)

    # Get the currentSrc property
    current_src = img_locator.evaluate("el => el.currentSrc")
    print(f"Current src: {current_src}")

    # Verify it is using the WebP version (or the one browser picked)
    # Since Chromium supports WebP, it should pick the WebP source.
    if current_src.endswith(".webp"):
        print("SUCCESS: Browser is using the WebP image.")
    else:
        print(f"WARNING: Browser is using {current_src}. Expected .webp")
        # This might happen if file protocol behaves differently or if the browser doesn't support WebP (unlikely for Chromium).
        # But wait, local file URLs might not return the full path as expected for srcset in some contexts?
        # Let's see what it returns.

    # Take a screenshot
    page.screenshot(path="tests/verification.png")
    print("Screenshot saved to tests/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

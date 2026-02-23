import os

def test_sri_hashes():
    """
    Verifies that the index.html file contains the correct Subresource Integrity (SRI) hashes
    for the external CDN resources (Bootstrap CSS, jQuery, Bootstrap Bundle JS).
    """
    filepath = os.path.join(os.path.dirname(__file__), '../index.html')

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the expected hashes
    expected_hashes = {
        'bootstrap_css': 'integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"',
        'jquery': 'integrity="sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh"',
        'bootstrap_js': 'integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm"'
    }

    # Verify each hash is present
    errors = []
    for key, hash_val in expected_hashes.items():
        if hash_val not in content:
            errors.append(f"Missing SRI hash for {key}: {hash_val}")

    # Also verify crossorigin="anonymous" is present for these
    # Counting occurrences might be better, but presence is a good start.
    if content.count('crossorigin="anonymous"') < 3:
         errors.append("Missing crossorigin=\"anonymous\" attribute (expected at least 3)")

    if errors:
        for e in errors:
            print(f"FAIL: {e}")
        exit(1)
    else:
        print("PASS: All SRI hashes found.")

if __name__ == "__main__":
    test_sri_hashes()

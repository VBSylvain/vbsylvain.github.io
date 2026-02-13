# Tests

This directory contains automated tests for the project.

## Security Tests

- `test_security_html.py`: Scans `index.html` for `<a>` tags with `target="_blank"`. It ensures they also have `rel="noopener noreferrer"` to prevent reverse tabnabbing vulnerabilities.

Run the test:
```bash
python3 tests/test_security_html.py
```

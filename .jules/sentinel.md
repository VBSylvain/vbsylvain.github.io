## 2026-02-03 - Reverse Tabnabbing Vulnerability
**Vulnerability:** 10 external links in `index.html` used `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** The codebase lacked automated security linting for HTML files, allowing unsafe external linking patterns to persist.
**Prevention:** Implemented a targeted `sed` fix. Future prevention requires adding HTML linting rules (e.g., HTMLHint or ESLint plugins) to the CI/CD pipeline to flag missing `rel` attributes on external links.

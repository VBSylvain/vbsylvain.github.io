## 2025-02-14 - Fix Reverse Tabnabbing Vulnerability
**Vulnerability:** External links using `target="_blank"` lacked the `rel="noopener noreferrer"` attribute in HTML template literals and JSX components.
**Learning:** React JSX component security linters are not present locally and components are transpiled via Babel directly in the browser (CDN loaded), so reverse tabnabbing issues are not flagged in development.
**Prevention:** Always add `rel="noopener noreferrer"` manually to any `target="_blank"` links within raw HTML template strings (`app.js`) or standalone JSX components.

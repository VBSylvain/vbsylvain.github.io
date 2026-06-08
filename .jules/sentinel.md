## 2026-06-08 - Prevent Reverse Tabnabbing
**Vulnerability:** External links with `target="_blank"` missing the `rel="noopener noreferrer"` attributes, specifically in dynamically generated JS and React JSX files.
**Learning:** Found multiple instances where external links were missing these critical security attributes. When an external page is opened via `target="_blank"` without `noopener noreferrer`, the newly opened tab gains access to the original window's `window.opener` object. This can lead to a reverse tabnabbing attack where the external page redirects the original page to a malicious phishing site.
**Prevention:** Ensure all external links utilizing `target="_blank"` explicitly include `rel="noopener noreferrer"`.

## 2024-09-04 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links with `target="_blank"` missing `rel="noopener noreferrer"`.
**Learning:** This exposes the application to reverse tabnabbing attacks, where the newly opened tab can manipulate the original window's `window.opener` object to potentially redirect the user to a malicious site.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on external links.

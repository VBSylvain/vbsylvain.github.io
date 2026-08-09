## 2026-08-09 - [Missing Reverse Tabnabbing Protection]
**Vulnerability:** External links utilizing `target="_blank"` in `js/app.js` do not include `rel="noopener noreferrer"`.
**Learning:** This exposes the application to reverse tabnabbing, allowing the new tab to manipulate the window.opener object and potentially redirect the original tab to a malicious site.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` for external links.

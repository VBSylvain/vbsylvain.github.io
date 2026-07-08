## 2026-05-20 - [Reverse Tabnabbing Vulnerability in Target Blank Links]
**Vulnerability:** External links generated dynamically using `target="_blank"` without proper `rel` attributes can expose the application to reverse tabnabbing via `window.opener`.
**Learning:** Found dynamically rendered anchor elements in `js/app.js` using `target="_blank"` where `rel="noopener noreferrer"` was omitted, likely because they were dynamically generated template literals.
**Prevention:** Always verify that dynamically injected external links explicitly enforce `rel="noopener noreferrer"`.

## 2024-05-24 - Missing rel="noopener noreferrer" on target="_blank" links
**Vulnerability:** External links (`<a target="_blank">`) were missing `rel="noopener noreferrer"`.
**Learning:** This repo has dynamic UI templates (`js/app.js` and `scouter/*.jsx`) that inject links. Missing these attributes exposes users to reverse tabnabbing via `window.opener`.
**Prevention:** Always ensure `rel="noopener noreferrer"` is included in HTML templates and JSX when adding external links with `target="_blank"`.

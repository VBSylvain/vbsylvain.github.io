## 2026-05-25 - Prevent Reverse Tabnabbing
**Vulnerability:** External links with target="_blank" without rel="noopener noreferrer".
**Learning:** Found in dynamically generated HTML via JS strings (js/app.js).
**Prevention:** Always add rel="noopener noreferrer" to external links utilizing target="_blank" to prevent reverse tabnabbing via window.opener.

## 2024-05-18 - Missing rel="noopener noreferrer" on target="_blank" links
**Vulnerability:** External links in `js/app.js` use `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** When links open in a new tab without these attributes, the newly opened page can gain partial access to the original window object via `window.opener`, creating a reverse tabnabbing vulnerability where the new page could redirect the original page to a malicious site.
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"` in anchor tags.

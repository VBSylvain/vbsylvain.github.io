## 2024-11-20 - Target Blank Reverse Tabnabbing
**Vulnerability:** External links with `target="_blank"` missing `rel="noopener noreferrer"` allow reverse tabnabbing (High severity). The opened window can access the originating window via `window.opener` and redirect it to a malicious site.
**Learning:** This is present in dynamically generated HTML within `js/app.js` and JSX files in `scouter/`.
**Prevention:** Always add `rel="noopener noreferrer"` to external links opening in a new tab.

## 2024-10-27 - Reverse Tabnabbing in External Links
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"` were found in `index.html`.
**Learning:** This allows the target page to access the `window.opener` object of the source page, potentially redirecting the user to a malicious site (Reverse Tabnabbing).
**Prevention:** Always add `rel="noopener noreferrer"` (or at least `noopener`) to any `<a>` tag with `target="_blank"`. Modern browsers imply `noopener` for `target="_blank"`, but `noreferrer` adds privacy and older browser support.

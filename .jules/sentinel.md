## 2024-05-24 - [Reverse Tabnabbing Vulnerability]
**Vulnerability:** External links with `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** This exposes the application to reverse tabnabbing attacks, where the opened tab can gain a reference to the original window (via `window.opener`) and potentially redirect it to a malicious site.
**Prevention:** Always add `rel="noopener noreferrer"` to external links using `target="_blank"`.

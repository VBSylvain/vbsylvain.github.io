## 2024-05-30 - Fix Reverse Tabnabbing
**Vulnerability:** Missing `rel="noopener noreferrer"` in `target="_blank"` anchor links.
**Learning:** External links missing `noopener` expose `window.opener` object, leading to potential phishing redirects by maliciously modifying the original opener window.
**Prevention:** Ensure that all dynamically generated anchors using `target="_blank"` explicitly include `rel="noopener noreferrer"`.

## 2024-08-20 - Prevent Reverse Tabnabbing
**Vulnerability:** External links with `target="_blank"` lack `rel="noopener noreferrer"`.
**Learning:** React JSX templates (`scouter/*.jsx`) and raw template strings (`js/app.js`) missed the `noreferrer` attribute, or entirely lacked both `noopener` and `noreferrer`, which could allow the opened page to hijack the opener window.
**Prevention:** Always add `rel="noopener noreferrer"` to any `target="_blank"` link to prevent reverse tabnabbing and limit cross-origin data exposure.

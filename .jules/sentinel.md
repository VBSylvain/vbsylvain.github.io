## 2025-02-24 - [Reverse Tabnabbing]
**Vulnerability:** External links (`target="_blank"`) missing `rel="noopener noreferrer"` across multiple theme files (`js/app.js`, `scouter/RankInsignia.jsx`, `scouter/HeroLockOn.jsx`).
**Learning:** Even static portfolios with minimal backends are vulnerable to client-side reverse tabnabbing where malicious sites could redirect the `window.opener`.
**Prevention:** Always include `rel="noopener noreferrer"` on anchor tags using `target="_blank"`.

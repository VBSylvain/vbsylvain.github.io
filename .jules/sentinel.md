## 2025-05-18 - Fix Reverse Tabnabbing Vulnerability
**Vulnerability:** External links with `target="_blank"` missing `rel="noopener noreferrer"`.
**Learning:** React JSX `rel="noopener"` is insufficient for complete protection; vanilla JS template literals were entirely missing the attribute, creating a reverse tabnabbing vector via `window.opener`.
**Prevention:** Always pair `target="_blank"` with `rel="noopener noreferrer"` across all view layer implementations (JSX and template literals) in the portfolio.

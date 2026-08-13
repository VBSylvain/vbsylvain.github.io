## 2024-08-13 - [Reverse Tabnabbing]
**Vulnerability:** Reverse tabnabbing vulnerability via `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** External links utilizing `target="_blank"` without explicit `rel="noopener noreferrer"` can allow malicious sites to hijack the `window.opener` reference, leading to potential reverse tabnabbing and phishing.
**Prevention:** All external links utilizing `target="_blank"` must explicitly include `rel="noopener noreferrer"`.

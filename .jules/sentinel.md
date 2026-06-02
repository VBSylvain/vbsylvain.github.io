## 2026-06-02 - Target Blank Vulnerability
**Vulnerability:** External links with `target="_blank"` missing `rel="noopener noreferrer"` attributes.
**Learning:** React JSX attributes like `rel="noopener"` may need explicit `noreferrer` added for comprehensive protection against reverse tabnabbing across older browser versions, and similarly with plain HTML template literals.
**Prevention:** Always verify external links globally and append `rel="noopener noreferrer"` when using `target="_blank"`.

## 2025-02-12 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links (`<a target="_blank">`) were missing `rel="noopener noreferrer"`.
**Learning:** This is a common issue when dynamically creating DOM elements with template literals. Without these attributes, the new tab has a reference to `window.opener` and can navigate the original tab to a malicious site. Even when `rel="noopener"` is partially applied (as in some components), the best practice includes `noreferrer` for wider protection.
**Prevention:** Use an AST or automated linter for React (eslint-plugin-react) and review DOM templates explicitly for the `target="_blank"` pattern, ensuring it is always paired with `rel="noopener noreferrer"`.

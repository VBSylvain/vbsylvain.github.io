## 2025-02-23 - Reverse Tabnabbing in Static Sites
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"` were pervasive in the static HTML.
**Learning:** Even in static sites without backend logic, client-side vulnerabilities like Reverse Tabnabbing can expose users to phishing risks via `window.opener` manipulation.
**Prevention:** Enforce `rel="noopener noreferrer"` on all external links opening in new tabs. Use linters like `eslint-plugin-react` (for React) or generic HTML linters to catch this pattern automatically.

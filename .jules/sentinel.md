## 2026-05-26 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links opening in new tabs (`target="_blank"`) lacked the `rel="noopener noreferrer"` attribute in both Vanilla JS template literals and React JSX components.
**Learning:** This vulnerability pattern existed because external links were dynamically generated or hardcoded without explicit security attributes, potentially allowing the newly opened tab to manipulate the original tab's  object.
**Prevention:** Always include `rel="noopener noreferrer"` on any `<a>` tag that uses `target="_blank"`.
## 2026-05-26 - Reverse Tabnabbing Vulnerability
**Vulnerability:** External links opening in new tabs (`target="_blank"`) lacked the `rel="noopener noreferrer"` attribute in both Vanilla JS template literals and React JSX components.
**Learning:** This vulnerability pattern existed because external links were dynamically generated or hardcoded without explicit security attributes, potentially allowing the newly opened tab to manipulate the original tab's `window.opener` object.
**Prevention:** Always include `rel="noopener noreferrer"` on any `<a>` tag that uses `target="_blank"`.

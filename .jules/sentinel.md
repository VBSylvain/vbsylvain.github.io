
## 2024-05-30 - [Reverse Tabnabbing Risk in External Links]
**Vulnerability:** External links (`<a target="_blank">`) do not include `rel="noopener noreferrer"`. This exposes the site to reverse tabnabbing, allowing the newly opened tab to manipulate the `window.opener` object and potentially redirect the original page to a malicious site.
**Learning:** This is a common oversight in static websites or vanilla JavaScript apps rendering HTML dynamically (e.g., via template literals). It needs to be consistently applied to all external links.
**Prevention:** Ensure that all anchor tags with `target="_blank"` include `rel="noopener noreferrer"`. Incorporate this check into a linting process or manually verify during code reviews.

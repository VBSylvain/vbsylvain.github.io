## 2026-05-30 - Prevent reverse tabnabbing via target="_blank"
**Vulnerability:** External links (`<a target="_blank">`) lacked `rel="noopener noreferrer"`, enabling the opened page to access the original `window.opener` object.
**Learning:** Found in both vanilla JS templates (`js/app.js`) and React components (`scouter/`), indicating a cross-architecture pattern of missing link security. The `rel="noopener noreferrer"` attribute is critical to protect users from phishing or malicious scripts executed in the newly opened tab.
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"` for external links, regardless of the rendering framework.

## 2024-05-18 - Prevent Reverse Tabnabbing Vulnerability
**Vulnerability:** External links (`target="_blank"`) did not include `rel="noopener noreferrer"`, exposing the site to reverse tabnabbing attacks where the newly opened window could manipulate `window.opener`.
**Learning:** This is an important security feature to implement consistently across both standard and themed components (like the React components in `scouter/`).
**Prevention:** Always verify that `target="_blank"` includes `rel="noopener noreferrer"`.

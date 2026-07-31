## 2026-07-31 - Prevent Reverse Tabnabbing
**Vulnerability:** Missing rel="noopener noreferrer" on target="_blank" links.
**Learning:** External links opening in a new tab without noopener/noreferrer can allow the newly opened tab to access the window.opener object of the original tab, enabling phishing or other malicious activities.
**Prevention:** Always add rel="noopener noreferrer" when using target="_blank" on anchor tags.

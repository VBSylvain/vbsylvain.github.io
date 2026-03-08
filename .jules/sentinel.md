## 2024-05-24 - [Missing SRI on CDNs]
**Vulnerability:** External CDN resources (`bootstrap.min.css`, `jquery.min.js`, `bootstrap.bundle.min.js`) in `index.html` lacked subresource integrity (SRI) checks and `crossorigin="anonymous"` attributes.
**Learning:** Without SRI, a compromised CDN could inject malicious scripts into the application.
**Prevention:** Always include valid `integrity` (SHA-384) and `crossorigin="anonymous"` attributes for external resources.

## 2024-05-15 - [Missing Subresource Integrity (SRI) on External Resources]
**Vulnerability:** External CDN scripts and stylesheets (Bootstrap, jQuery) in `index.html` lacked `integrity` and `crossorigin="anonymous"` attributes.
**Learning:** This is a common pattern in older template-based sites where CDNs are used for convenience but pose a supply chain risk if the CDN is compromised. We must enforce SRI on all static external dependencies to prevent execution of tampered code.
**Prevention:** Always generate and include SHA-384 hashes for third-party resources. Do not apply SRI to dynamic scripts like Google Analytics or dynamic fonts.

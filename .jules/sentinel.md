## 2024-05-24 - Added Subresource Integrity (SRI) checks
**Vulnerability:** External CDN dependencies in `index.html` were loaded without `integrity` and `crossorigin` attributes, making the application vulnerable to malicious code injection if the CDNs were compromised.
**Learning:** Found that static, external assets should always be loaded with SRI attributes to ensure their contents have not been tampered with.
**Prevention:** Implement SRI hashing for external, third-party libraries (excluding dynamic resources like fonts).

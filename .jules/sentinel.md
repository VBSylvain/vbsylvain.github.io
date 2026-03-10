## 2024-05-24 - Missing Subresource Integrity (SRI) on CDN Resources
**Vulnerability:** The application was loading external CSS and JS resources (Bootstrap and jQuery) from CDNs without `integrity` and `crossorigin` attributes.
**Learning:** This is a common pattern in older static HTML files where resources are linked via CDN without SRI. The risk is that if the CDN is compromised, malicious code could be injected into the application.
**Prevention:** Always include `integrity` and `crossorigin="anonymous"` attributes when loading resources from external CDNs to ensure the integrity of the downloaded files and prevent the execution of compromised scripts.

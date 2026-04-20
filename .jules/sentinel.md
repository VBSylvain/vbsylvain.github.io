## 2025-02-27 - Security Hardening (SRI and Reverse Tabnabbing)
**Vulnerability:** External CDN links lacked Subresource Integrity (SRI) hashes, leaving the site vulnerable to supply-chain attacks if the CDN was compromised. Additionally, external links opened with `target="_blank"` lacked `rel="noopener noreferrer"`, exposing the site to reverse tabnabbing attacks where the destination page could manipulate the source page's `window.opener`.
**Learning:** Legacy static sites often miss modern security attributes on external resources.
**Prevention:** Ensure all external scripts and stylesheets use SRI (`integrity` and `crossorigin` attributes) and all `target="_blank"` links include `rel="noopener noreferrer"`.

## 2026-08-18 - [Fix Reverse Tabnabbing]
**Vulnerability:** Missing `rel="noopener noreferrer"` attribute on `target="_blank"` links.
**Learning:** This exposes the application to reverse tabnabbing attacks, where the newly opened tab can malicious access the originating tab's `window.opener` object to redirect it.
**Prevention:** Always include `rel="noopener noreferrer"` on external links using `target="_blank"`.

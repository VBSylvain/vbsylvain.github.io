## 2024-07-09 - Missing rel="noopener noreferrer" in External Links
**Vulnerability:** External links using target="_blank" do not have rel="noopener noreferrer", which exposes the site to reverse tabnabbing vulnerabilities.
**Learning:** This is a common issue with statically written HTML and dynamically injected HTML. It's a high severity issue since it allows window.opener manipulation.
**Prevention:** Always add rel="noopener noreferrer" to all target="_blank" links.

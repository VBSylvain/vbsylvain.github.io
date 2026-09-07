## 2025-05-18 - Missing noreferrer in target="_blank" links
**Vulnerability:** External links using target="_blank" without the rel="noopener noreferrer" attributes, leading to reverse tabnabbing vulnerabilities.
**Learning:** In dynamically created anchor tags (like in template literals or JSX), the rel attribute must be explicitly provided to prevent security risks associated with window.opener.
**Prevention:** Always add rel="noopener noreferrer" to target="_blank" links, whether they are in static HTML, JS template literals, or React JSX.

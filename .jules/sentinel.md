## 2026-05-07 - [Reverse Tabnabbing Fix]
**Vulnerability:** External links using target="_blank" without rel="noopener noreferrer" expose the site to reverse tabnabbing (window.opener hijacking).
**Learning:** This specific vulnerability exists in dynamically generated HTML strings within js/app.js where external links to LinkedIn and Malt are rendered.
**Prevention:** Always include rel="noopener noreferrer" when adding target="_blank" to external links, especially in dynamic template strings.

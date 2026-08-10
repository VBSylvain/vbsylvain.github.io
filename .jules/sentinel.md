## 2025-02-12 - Missing noreferrer on external links
**Vulnerability:** External links with target="_blank" are missing the "noreferrer" attribute, potentially exposing the referrer header (which could contain sensitive data in the URL) and allowing reverse tabnabbing attacks on legacy browsers (though noopener provides the main protection).
**Learning:** Found several anchor tags in dynamically generated HTML (js/app.js) and React components (scouter/RankInsignia.jsx, scouter/HeroLockOn.jsx) with target="_blank" that either have no "rel" attribute or only have "rel=\"noopener\"".
**Prevention:** Always add both `noopener` and `noreferrer` when using `target="_blank"` on external links to maximize security coverage.

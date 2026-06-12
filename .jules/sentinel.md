## 2026-06-12 - [Reverse Tabnabbing Vulnerability in Dynamically Injected Links]
**Vulnerability:** External links generated dynamically using template literals in `js/app.js` (and also in `scouter/RankInsignia.jsx` and `scouter/HeroLockOn.jsx`) use `target="_blank"` but do not include `rel="noopener noreferrer"`. Some have only `rel="noopener"`.
**Learning:** This exposes the application to reverse tabnabbing, where the newly opened tab can gain access to the `window.opener` object of the original page and potentially redirect it to a malicious site. Even when dynamically rendered via JS, this attribute is critical for security.
**Prevention:** Always add `rel="noopener noreferrer"` to any anchor tag that uses `target="_blank"`, especially those injected directly into the DOM.

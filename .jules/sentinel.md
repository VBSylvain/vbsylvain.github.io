
## 2025-05-13 - Fixed Reverse Tabnabbing in External Links
**Vulnerability:** External links generated dynamically in `js/app.js` using `target="_blank"` lacked the `rel="noopener noreferrer"` attribute. This allows the opened page to access the `window.opener` object, potentially leading to phishing attacks (reverse tabnabbing).
**Learning:** Even dynamically generated links injecting `innerHTML` from trusted sources like `career.json` need standard HTML security attributes explicitly added to their template literals.
**Prevention:** Always pair `target="_blank"` with `rel="noopener noreferrer"` when dynamically constructing anchor tags.

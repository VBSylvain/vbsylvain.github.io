## 2024-05-31 - [Reverse Tabnabbing]
**Vulnerability:** External links opening in a new tab (`target="_blank"`) without `rel="noopener noreferrer"`.
**Learning:** Found multiple instances of this common vulnerability where new tabs could theoretically access the `window.opener` object to tamper with the originating page.
**Prevention:** Always append `rel="noopener noreferrer"` when setting `target="_blank"` on an external link.

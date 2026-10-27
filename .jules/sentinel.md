## 2024-05-24 - Missing React Security Linters for In-Browser Transpilation
**Vulnerability:** Reverse tabnabbing via `window.opener` (`target="_blank"` missing `rel="noopener noreferrer"`).
**Learning:** Because the "scouter" theme uses standalone React and Babel loaded via CDN (transpiled in-browser), local React security linters are bypassed. This allowed `rel="noopener"` without `noreferrer` to slip through in JSX components.
**Prevention:** When using in-browser Babel transpilation without local build steps, JSX security attributes must be verified manually or through custom CI scripts since standard ESLint/React plugins are not running on these files.

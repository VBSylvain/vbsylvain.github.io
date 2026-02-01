# Performance Optimization Baseline

## Issue
The `index.html` file loads Google Fonts using `fonts.googleapis.com`. This involves:
1. Fetching the CSS from `fonts.googleapis.com`.
2. Parsing the CSS, which contains `@font-face` rules pointing to `fonts.gstatic.com`.
3. Fetching the font files from `fonts.gstatic.com`.

The browser discovers the need to connect to `fonts.gstatic.com` only after it has downloaded and parsed the CSS from `fonts.googleapis.com`. This delays the font download.

## Optimization
Adding `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` instructs the browser to initiate a connection (DNS lookup, TCP handshake, TLS negotiation) to `fonts.gstatic.com` immediately, in parallel with fetching the CSS from `fonts.googleapis.com`.

## Expected Improvement
*   **Metric:** Time to First Byte (TTFB) for the font files (WOFF2).
*   **Impact:** By preconnecting, we eliminate the connection latency from the critical path of the font download. This can save 50ms to 300ms depending on network latency (RTT) and TLS handshake overhead.
*   **Visual Result:** Faster text rendering (reduced FOIT/FOUT).

## Measurement Constraints
In this environment, we cannot run a browser-based benchmark (like Lighthouse or WebPageTest) to measure the exact millisecond gain. However, this is a best-practice optimization recommended by Google Fonts and web performance standards.

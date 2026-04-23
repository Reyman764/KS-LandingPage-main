# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 🔒 Security

This project ships with hardened defaults. See `src/lib/security.js` for client helpers.

### Content Security Policy (CSP)

CSP is enforced in **three layers** so it works across any host:

1. **HTTP header** (preferred) — set by your CDN/host:
   - **Netlify / Cloudflare Pages** → `public/_headers`
   - **Vercel** → `vercel.json`
   - **Vite preview / custom Node server** → `vite.config.js` → `preview.headers`
2. **`<meta http-equiv="Content-Security-Policy">`** in `index.html` — fallback for static hosts that strip headers.
3. **Subresource limits** — analytics scripts (GA4, Hotjar) are explicitly allow-listed; remove their domains from the policy if you disable them in `src/lib/analytics.js`.

> ⚠️ When deploying to a new host, copy the policy from `public/_headers` into that host's header config.

### Other security headers (set automatically)

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS |
| `X-Content-Type-Options` | `nosniff` | Block MIME sniffing |
| `X-Frame-Options` | `DENY` | Block clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=(), usb=()` | Disable unused browser APIs |
| `Cross-Origin-Opener-Policy` | `same-origin` | Process isolation |
| `Cross-Origin-Resource-Policy` | `same-origin` | Cross-origin read protection |

### `localStorage` policy

Only **non-sensitive UI state** is stored client-side. The current allowlist (see `LOCAL_STORAGE_ALLOWLIST` in `src/lib/security.js`):

- ✅ `ks-analytics-consent` — `'granted' | 'denied'`
- ✅ `ks-theme` — reserved for future theme toggle

**Never store** auth tokens, JWTs, session IDs, API keys, or PII in `localStorage` — it's readable by any XSS payload. Use `HttpOnly` `Secure` cookies for auth.

### Cookies

When auth is added, set cookies **server-side** with:

```
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Strict; Path=/
```

For non-sensitive client cookies (locale, CSRF mirror), use the `setCookie()` helper in `src/lib/security.js` — it defaults to `SameSite=Strict` and adds `Secure` on HTTPS.

### Form input validation

Any future form must be validated on **both** client and server.

- Client (UX): use `validators` and `validateForm()` from `src/lib/security.js`, or install [`zod`](https://zod.dev) for schema-based validation.
- Server (authoritative): re-run the same schema on every request. Reject on any failure — never trust client validation alone. Apply length limits, type checks, and `encodeURIComponent()` before forwarding to any third-party URL.

## ✨ UX Enhancements

| Feature | File(s) | Notes |
|---|---|---|
| Scroll Progress Indicator | `src/components/ScrollProgress.{jsx,css}` | Thin gradient bar fixed at `top: 0`, width = scroll %, rAF-throttled. |
| Sticky Section Highlight | `src/hooks/useActiveSection.js`, `Navbar.{jsx,css}` | `IntersectionObserver` picks the most-visible `<section>` and highlights its nav link with `aria-current="true"` + animated gradient underline. |
| Smooth Scroll | `Navbar.jsx → handleNavClick` | JS upgrade over native anchor; respects `prefers-reduced-motion` and offsets for the sticky navbar height. |
| Back-to-Top Button | `src/components/BackToTop.{jsx,css}` | Appears after `window.scrollY > 300`, smooth-scrolls to top, fires `back_to_top_click` analytics event. |
| Skeleton Loaders | `src/components/Skeleton.{jsx,css}` | Used as `Suspense` fallback for lazy-loaded sections — reserves space → no CLS. Variants: `section`, `card`, `text`. |
| Print Stylesheet | `src/styles/print.css` | Imported in `main.jsx`. Hides chrome (navbar, banners, FAB), forces white bg + black text, expands link URLs after `<a>` for PDF readers, A4 margins. Test via browser → Print → Save as PDF. |

All new UI respects `prefers-reduced-motion` and is hidden when printing.

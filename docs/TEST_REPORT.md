# Quality Assurance / Test Report

**Prepared:** 13 October 2026  
**Status:** Source-level checks complete. Full dependency-backed browser and production checks **pending**.

## Checks executed in project workspace

| Check | Observed result |
|---|---|
| Node built-in source/data unit suite (`npm test`) | **PASS — 10/10** |
| Parse TypeScript + TSX files with TypeScript compiler parser | **PASS — 53 files, 0 parse errors** |
| Parse CSS with `tinycss2` | **PASS — 0 parse errors** |
| Parse 11 SVGs with XML parser | **PASS — 11 valid SVGs** |
| Check local `@/` and relative imports exist | **PASS — 0 unresolved local paths** |
| Hero/route/landmark image links refer to bundled assets | **PASS** |
| Confirm seed contains two routes and six unique landmark URLs | **PASS** |
| Confirm UNESCO source URL format and bilingual timeline narratives | **PASS** |
| Check seeded GPS distance function and slug normalizer | **PASS** |
| Check migration tables / needed application routes exist | **PASS** |
| Install NPM dependencies | **BLOCKED — npm registry DNS access unavailable** |
| Execute full `next build` | **BLOCKED — `next: not found` because dependencies unavailable** |
| Execute TypeScript typecheck `npm run lint` | **NOT RUN — dependency type declarations not installed** |
| Playwright / real device / live deploy browser E2E | **NOT RUN — no deploy and no dependencies** |
| Neon database migration, signup/login, admin CRUD, analytics | **NOT RUN — no user-provided Neon database configured** |
| Web camera / QR / GPS / WebGL device tests | **NOT RUN — requires compatible browser with permissions** |

**Do not report production or end-to-end testing as passed until the remaining checks have actually been carried out.**

## Exact follow-up commands on a normal online developer PC

```powershell
cd heritage-route-digital-guide
npm install
npm run lint
npm test
npm run build
Copy-Item .env.example .env.local  # skip if file already exists
# Configure Neon connection and JWT_SECRET in .env.local
npm run db:migrate
npm run db:seed
npm run db:admin
npm run dev
```

Open `http://localhost:3000/api/health`. If `status: ok`, visit `/routes`, a landmark, `/scan`, `/ar/taj-mahal`, `/register`, `/saved`, `/admin` with the admin account. If the above passes, deploy with `vercel --prod` and **repeat on the actual deployed URL**.

## Manual browser / device test matrix

| Test case | Expected result | Status |
|---|---|---|
| Desktop landing, 1440px | Hero art, route cards, CTA and animations | Pending |
| Android 360/390px | Responsive mobile nav, no horizontal clipping | Pending |
| iPhone Safari | Buttons, map, speech fallback and native camera | Pending |
| City map | Map pins, sequence line, attribution, story navigation | Pending |
| Story page | Source link, audio, translation, timeline, 3D rotate | Pending |
| AR camera allowed | Live video under overlay, stop releases stream | Pending |
| AR camera denied | Clear explanation and navigable story fallback | Pending |
| GPS near/far | Distance computed; visit marker only shown near with adequate accuracy | Pending |
| QR browser scanner | Generated QR opens corresponding landmark | Pending |
| QR manual entry | `taj-mahal` opens same story | Pending |
| Register / login / logout | Session persists and clears appropriately | Pending |
| Unauthorized `/admin` | Redirect to login / home, API returns 403 | Pending |
| Admin create/update/delete | Changes persist in PostgreSQL and reflect publicly | Pending |
| Audio + image + 3D upload | Vercel Blob token works and public URL loads | Pending |
| Analytics | Events recorded; aggregates change as expected | Pending |
| Offline revisit | Previously visited public pages work if cached | Pending |
| Low-bandwidth / offline tiles | Map gracefully degrades | Pending |
| Accessibility keyboard / screen reader | All critical interactions usable | Pending |
| CI audit / npm dependencies security | No unacceptable runtime vulnerabilities | Pending |

## Known limitations / acceptance boundary

- No production URL can be produced inside this workspace without a Vercel account, networked deploy and user-managed environment/database.
- No measured Lighthouse/Core Web Vitals, browser compatibility matrix, stress test or penetration test is available yet.
- Phase-1 AR overlays are explicitly conceptual, not world-anchored real AR. Animated character reenactments and full VR are not implemented.
- Service-worker caching is partial. OpenStreetMap tiles, remote fonts, hosted media and browser speech services can need a network.
- GPS is approximate and visit marking is not a trustworthy location attestation.
- Public analytics can be imprecise. Event recording is best effort and may be blocked.
- The sample site contains only two routes and six sourced landmarks. Additional routes require curator review.

## Release decision

**Not release-certified pending dependency installation, full production build, real Neon/Vercel integration and device/browser tests.** The project is delivered as deploy-ready *source* with an explicit verification plan, not as a falsely claimed live deployment.

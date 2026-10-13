# Product Requirements Document (PRD)

**Product:** Heritage Route Digital Guide Platform  
**Public brand:** Heritage Atlas  
**Version:** Phase 1 — October 2026  
**Audience:** Tourists, cultural visitors, educators, content curators and platform administrators  
**Deployment target:** Vercel / Next.js / Neon PostgreSQL

## 1. Problem Statement

Traditional heritage interpretation relies on brochures, guidebooks and fixed signboards, limiting rich storytelling, language choice, personalization and digital access. Visitors need an intuitive, mobile-first route discovery experience that blends reliable historical context, navigable maps, accessible audio and light-weight immersive visual storytelling.

## 2. Primary Objectives

1. Surface curated heritage routes and connected landmark maps.
2. Provide per-landmark stories, historical timelines, original architectural artwork and procedural 3D previews.
3. Provide a real device-camera view with clearly labelled Phase-1 conceptual overlay, QR access and user-triggered GPS proximity feedback.
4. Preserve reliable attribution by linking each landmark to a cited heritage reference.
5. Support visitor registration, login, favorites and ratings; deliver a working admin/content workflow when PostgreSQL is configured.

## 3. Secondary Objectives

Provide English and Hindi stories and speech narration, cache selected public pages for basic offline revisit, permit an extendable digital content archive, support responsible multimedia upload, measure engagement using stored anonymous session events, and make it feasible to link culturally relevant local organizations in a future phase.

## 4. Scope of the Product

### Implemented Phase 1

- Responsive, animated marketing and discovery website.
- Two curated routes (Delhi / Agra), six UNESCO-referenced landmarks and original illustration assets.
- On-map stop markers and visiting sequence; routes are not turn-by-turn driving/walking directions.
- Landmark stories with bilingual text, timeline, browser speech synthesis, uploaded audio and optional video.
- Browser camera with a conceptual 3D overlay; WebGL procedural model; optional hosted GLB model renderer.
- QR code generation, live QR scan, manually entered landmark slug/link; proximity check.
- Authentication, favorites, stored visits, route ratings.
- Admin-only CMS: route/landmark CRUD, translated narratives, timeline JSON, visual/audio/video/3D media URLs and upload.
- Analytics showing registered users, sessions, page views, AR activations, content popularity and ratings.
- Limited public page/image caching in service worker.

### Excluded from Phase 1

- Scientifically surveyed AR placement, SLAM, plane detection or photogrammetric monument scans.
- Full VR environment, wearables, ticket booking and public government-database synchronization.
- Guaranteed fully offline AR/maps/route tiles, automated AI recommendations, commercial local business listings.
- High-availability/regulated-data certification and traffic-scale anti-fraud analytics.

## 5. User Personas and User Stories

**Tourist:** As a visitor, I can select a city trail, explore its pins, learn its history, hear English/Hindi narration, rotate a 3D illustration, scan a story QR code, and save favorites after signing in.

**Visitor at a site:** As a visitor, I can grant camera/geolocation access and view contextual artwork while seeing an estimated distance to the site's coordinates, then mark a visit when GPS reports nearby with adequate precision. This is a convenience feature, not anti-spoofing proof.

**Content editor (admin):** As an admin, I can create/edit/delete routes and landmarks, maintain bilingual material, upload media and view visitor engagement metrics.

## 6. Functional Requirements

| ID | Requirement | Acceptance criteria | Status |
|---|---|---|---|
| FR-01 | User registration, login, logout | Bcrypt password; signed HttpOnly cookie; users can see their collection | Implemented with DB |
| FR-02 | Heritage route selection | Both curated cities listed and linked | Implemented |
| FR-03 | Interactive map | OpenStreetMap tiles, order line, markers/popup/story link, geolocate option | Implemented |
| FR-04 | Landmark detail | Source link, hero, summary, historical story, timeline | Implemented |
| FR-05 | Bilingual narration | English/Hindi text; Web Speech API voice or uploaded MP3 | Implemented, device-dependent |
| FR-06 | AR camera mode | Prompt for camera, live local video, conceptual 3D overlay, stop camera | Implemented, conceptual overlay only |
| FR-07 | 3D visual | Three.js rotatable procedural monument; optional administrator GLB URL | Implemented; not an accurate reconstruction |
| FR-08 | GPS trigger | Check current coordinates and return distance; proximity threshold 250m | Implemented, user-triggered |
| FR-09 | QR support | Display sharable landmark QR; scan local video frames; manual code | Implemented |
| FR-10 | Saved collection | Toggle favorite; persistence per authenticated user | Implemented with DB |
| FR-11 | Visit tracking | Save visit after close-range GPS match; count in user collection | Implemented with DB |
| FR-12 | Content management | Admin can CRUD city routes and landmark stories, images, videos and translations | Implemented with DB |
| FR-13 | Media upload | 4MB public Vercel Blob upload for approved file types | Implemented, optional token |
| FR-14 | Analytics | Record visitor events, show overview and popularity | Implemented with DB |
| FR-15 | Route reviews | Signed-in users submit one 1–5 rating, updated on repeat | Implemented with DB |
| FR-16 | Offline access | Previously cached public pages/assets accessible where cached | Partial; no full offline guarantee |

## 7. Non-Functional Requirements

- **Responsive:** functional at 360–1440px; mobile navigation, touch-friendly cards, adaptive maps, buttons and content.
- **Performance:** server-first rendering, local SVG illustrations, dynamic-load Three.js and Leaflet in browser; avoid high-poly assets.
- **Accessibility:** semantic page structure, labels, keyboard interaction, alt text, skip link, reduced-motion CSS preference; require external audit for WCAG conformity claim.
- **Security:** bcrypt password hashes, HTTPS production transport, same-site HttpOnly session cookie, HMAC-signed JWT, route admin authorization, schema validation and origin checks. Full commercial security hardening remains future work.
- **Reliability:** graceful UI fallback when camera permission, location, synthesized speech, WebGL or remote OSM tiles are unavailable. DB errors should not silently masquerade as successful auth.
- **Storage:** serverless PostgreSQL schema with constrained relations and indexed event tables; optional Vercel Blob.
- **Historical responsibility:** original summaries; explicit UNESCO links; conceptual media clearly identified.
- **Localization:** two narrative languages. UI controls are primarily English in Phase 1.

## 8. Technology Stack

**Frontend:** Next.js 15 App Router, React 19, TypeScript, CSS, Framer Motion, Lucide.  
**3D + Camera:** Three.js with OrbitControls and GLTFLoader, `MediaDevices.getUserMedia`.  
**QR:** `jsqr` (browser frame decoding), `qrcode.react` (generation).  
**Maps:** Leaflet + OpenStreetMap public tile layer.  
**Backend:** Next.js route handlers (Node.js serverless runtime); PostgreSQL client `postgres`.  
**Auth:** bcryptjs, `jose` signed session JWT in secure HttpOnly cookie.  
**Storage:** Neon PostgreSQL (required for writable features), Vercel Blob optional.  
**Hosting:** Vercel.

This differs from suggested Express/MongoDB only where Next.js route handlers + PostgreSQL simplify Vercel serverless deployment without losing equivalent features.

## 9. User Flow (High-Level)

**Tourist:** Landing → Routes → City route map → Landmark detail → Bilingual audio/timeline → AR camera or QR → Save favorite (sign-in if required) → Collection → Rate route.

**Administrator:** Create admin using protected CLI → Login → Studio → Content manager or analytics → Edit route/landmark → Save changes → Public pages render updated database content.

## 10. Data Requirements

- **User:** UUID, name, email, password hash, role, preferred language, creation time.
- **Route:** UUID, slug, city, description, visual, coordinates, featured flag.
- **Landmark:** UUID, route ID, slug, historical summary and bilingual narrative, years/events, GPS, image/GLB/audio/video URLs, source, sort order.
- **Favorites & visits:** per-user/per-landmark pairs and timestamps.
- **Engagement:** session UUID, optional user/route/landmark identifiers, event type, time, tracked duration.
- **Reviews:** per-user route rating.

See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for schema and endpoint details.

## 11. KPIs

| KPI | Definition | Source / caveat |
|---|---|---|
| Registered users | Count of rows in users | PostgreSQL |
| Unique visitor sessions | Distinct client-generated session IDs | Can reset/duplicate |
| Story views | Count of landmark-associated `page_view` events | Not a verified person count |
| AR interaction rate | AR opens / page views × 100% | UI engagement proxy |
| Most popular routes | Page views per route ID | Not a booking metric |
| Average session duration | Mean stored page-exit seconds | Under-counted if tab exits unexpectedly |
| Satisfaction rating | Average visitor route rating, 1–5 | Voluntary and small-sample biased |

**Targets** are to be set after a real-world pilot (e.g., speed/engagement baselines); do not fabricate visitor counts or performance results before deployment.

## 12. Assumptions and Constraints

- User has a modern browser; camera and geolocation are supported in HTTPS/localhost with permission.
- OSM tiles and optional voice data are reachable; mobile data connectivity varies at heritage sites.
- Site coordinates are approximations and GPS readings may be inaccurate or spoofed.
- Device WebGL capability varies; browser audio voices and Hindi pronunciation vary.
- Historical interpretation and rights for any new uploads must be curator-reviewed.
- Vercel environment variables and Neon data migration need setup by project owner; the repository cannot provision a database automatically.

## 13. Deliverables

- Complete Next.js TypeScript codebase and original decorative SVG illustrations.
- Responsive pages, maps, stories, camera/QR/3D experiences, CMS and analytics source.
- Seed heritage data, SQL migration and admin provisioning script.
- PRD, technical docs, test report and Vercel deploy guide.
- **Live production URL to be generated by project owner when deployed.** A live URL is not included in the source package.

## 14. Expected Impact

More discoverable heritage knowledge, less dependence on static plaques, accessible narrative reading/listening, increased interest among mobile-native visitors, reusable digital routes and a foundation for responsible cultural storytelling. Actual impact needs post-deployment measurement.

## 15. Future Enhancements

True marker/geospatial WebXR anchoring with device capability detection, verified archival 3D scans and curator workflows, downloadable map/audio packs, full UI internationalization, AI tour recommendation with transparency, narrated characters with accurate attribution, opt-in GPS/geofencing, route scheduling/tickets, gamification, local cultural business discovery, data privacy consent management, moderation, audit logs, Redis rate-limiting and automated browser/device test suites.

## 16. Project Guidelines / Implementation Notes

- Preserve truthful labelling: illustrations are *conceptual* and sourced text must not be presented as a verified expert reconstruction.
- Never include credentials in frontend output or Git history. Public upload URLs are accessible to anyone with a link.
- Verify city routes, dates, period terminology, GPS and multimedia licenses before adding new material.
- Confirm the same Neon DATABASE_URL is used in `.env.local` and Vercel production.
- Test sign-up/role authorization/QR/camera on **the actual live domain** prior to final submission.
- Maintain source modularity: App Router routes and API handlers under `app/`, client interactions in `components/`, shared helpers in `lib/`.

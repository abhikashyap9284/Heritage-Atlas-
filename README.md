# Heritage Atlas — Heritage Route Digital Guide Platform

**A Vercel-ready, responsive heritage storytelling platform (Phase 1).** Built with Next.js 15 App Router, React 19, TypeScript, Three.js, Leaflet/OpenStreetMap, HTML camera/QR decoding, signed session cookies and Neon PostgreSQL.

The web application has a polished editorial interface, animated pages, two curated routes (Agra and Delhi), six source-referenced heritage landmarks, bilingual narration, clickable maps, QR scanning, camera-based conceptual AR overlays, procedural 3D illustrations, accounts, favorites, location-assisted visit marking, reviews, admin CMS, Blob asset uploads and visitor analytics.

> **Important:** Camera overlay + independently rotatable 3D objects are an honest Phase-1 WebAR concept. They are *not* spatially tracked real-world AR, device-plane detection or archaeological reconstructions. The included editorial architectural illustrations are original artwork, not site photography or 3D scans.

## Quick start on Windows PowerShell

Install **Node.js 22 LTS or later** and have an internet connection for dependency install.

```powershell
cd heritage-route-digital-guide
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open **http://localhost:3000**. Without a database, all **public browsing, routes, maps, 3D artistic previews, speech narration and QR screens** use bundled sample content. Accounts, favorites, reviews, stored visits, admin CMS and analytics need PostgreSQL.

### Enable real accounts + admin + analytics with Neon

1. Create a free/paid Neon PostgreSQL project at https://console.neon.tech/ .
2. Copy its **pooled** PostgreSQL connection string. In `.env.local`, paste `DATABASE_URL="postgresql://.../...?..."` with SSL enabled as provided by Neon.
3. Set a random secret of at least 32 characters for `JWT_SECRET`. From Node on Windows generate a safe value:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
   ```

4. In `.env.local`, also set `ADMIN_EMAIL` to an email not used by a normal registered account and `ADMIN_PASSWORD` to a unique strong password (12+ characters).
5. Run these commands **once** against your database:

   ```powershell
   npm run db:migrate
   npm run db:seed
   npm run db:admin
   npm run dev
   ```

6. Open `/login` using `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Only this account can access `/admin`, `/admin/content`, `/admin/analytics`.

**If you see `Database not connected` or `Registration unavailable`:** check the `.env.local` spelling, Neon connection, SSL parameters and network access; rerun `npm run db:migrate` and `npm run db:seed`. Restart `npm run dev` after editing environment variables. An admin user cannot be created by public sign-up.

**If `db:admin` says email already exists:** select a different `ADMIN_EMAIL` and rerun. It intentionally will not promote an existing regular account.

### Optional multimedia uploads

Admin media uploads require Vercel Blob: connect a Blob store in your Vercel project, set `BLOB_READ_WRITE_TOKEN` locally and for Production on Vercel, then upload `.jpg`, `.png`, `.webp`, `.mp3`, `.ogg`, `.wav`, `.mp4` or `.glb` under 4 MB in the Admin Studio. Or paste an already hosted **HTTPS** asset URL into the CMS fields. External GLB files must permit CORS access in the visitor's browser.

## Local verification

```powershell
npm run lint
npm test
npm run build
npm run start
```

- Use `http://localhost:3000/api/health` to verify DB state: `preview` (no DB), `ok` (connected), or `degraded` (error).
- Test AR camera and QR scan on `localhost` or **HTTPS** (secure context), using a real camera-equipped device.
- To test a QR: visit a landmark story, scan the QR displayed in its sidebar with `/scan` on another device or camera, or paste `taj-mahal` in the manual field.
- Some Hindi browser/device voices do not have text-to-speech voices installed; text content remains accessible.

## Pages

| Page | Path | Features |
|---|---|---|
| Landing | `/` | Animated responsive introduction, destinations |
| Routes | `/routes` | Curated city discovery |
| Route detail | `/routes/agra-imperial-trail`, `/routes/delhi-dynasties-walk` | Interactive OpenStreetMap, connected landmark cards, ratings |
| Landmark stories | `/landmarks/taj-mahal` (and five other slugs) | Histories, Hindi/English narration, timeline, 3D, QR, save |
| AR experience | `/ar/taj-mahal` | Live camera, conceptual 3D overlay, GPS distance, visit saving |
| QR reader | `/scan` | Browser-side QR decoding, manual link input |
| Authentication | `/login`, `/register` | User sessions |
| Collection | `/saved` | Saved landmarks & visit counts |
| About | `/about` | Mission, source transparency |
| Admin dashboard | `/admin` | Admin-only overview |
| Content CMS | `/admin/content` | Add, edit, delete routes/landmarks, languages, timeline and media |
| Analytics | `/admin/analytics` | Unique sessions, viewed places, AR opens, ratings, duration |

## Deploy to Vercel

Detailed guide: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**. For a real grading submission, deploy and test the live URL yourself; this repository alone is not a hosted website.

**From a local terminal:**

```powershell
npm i -g vercel
vercel login
vercel
```

Select **Next.js**, project root `heritage-route-digital-guide`. Add `DATABASE_URL` and `JWT_SECRET` under Vercel Project → Settings → Environment Variables for **Production** (plus `BLOB_READ_WRITE_TOKEN` if needed). Seed/migrate your *same* Neon database using local commands above; then deploy production:

```powershell
vercel --prod
```

Open the printed `https://...vercel.app` link, check `/api/health`, test sign-in and AR/QR on a mobile device, and submit **your actual working URL**. Environment variable changes need a fresh deployment. You can also import from GitHub: https://vercel.com/new .

## Project structure

```text
app/                 Next.js pages, metadata, REST API handlers
components/          UI, maps, audio, camera, 3D, CMS and analytics
lib/                 Heritage seed content, database, authentication, validation
scripts/             SQL schema migration, seed, admin creation, original SVG art generator
public/images/       Original vector artwork
public/sw.js          Limited cached public pages/assets for offline revisits
examples/            Optional screenshots can be added after local verification
docs/                PRD, technical specification, content sources and deployment
```

## Testing and limits

- Unit/source-integrity checks are under `tests/`. Run them after `npm install`.
- **Do not treat the existence of this source as proof of deployed or tested production behavior.** The generated package's `docs/TEST_REPORT.md` lists performed checks and unverified browser/live checks.
- Camera needs permission + HTTPS. GPS is approximate; access may be denied indoors.
- OSM map tiles and remote fonts need internet. Limited service worker caching is *not* guaranteed full offline AR.
- Analytic event counts can be blocked or artificially triggered; **not verified tourist footfall**.
- For high-traffic public production, add durable rate-limiting, bot defenses, image optimization, localized QA, accessibility audit, content editorial approval, privacy consent and real automated E2E browser tests.
- HTTPS links and original vector illustrations are safe to publish, but any new third-party media should have an appropriate license. Project is **independent**; no partnership with CyArk, izi.TRAVEL, ASI or UNESCO is claimed.

## Primary references

Historical overviews have contextual links on each landmark story and in [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md). All creative copy is original, and no third-party monument photography or archival videos are redistributed.

Read the [PRD](docs/PRD.md) and [Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md) before extending the app.

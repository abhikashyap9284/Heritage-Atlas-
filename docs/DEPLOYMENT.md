# Vercel deployment — Step by step (Windows / PowerShell)

**Outcome:** obtain your own live `https://<project>.vercel.app` URL. This file does not claim that deployment has already happened.

## 1. Prerequisites

- Install Node.js 22+ and Git, make a Vercel account.
- Run `npm install`, `npm run lint`, `npm test`, `npm run build` locally when online.
- Set up a Neon PostgreSQL database, or use public preview without login/analytics. **Final grading requires the real database setup** if the evaluator checks login, admin and analytics.

## 2. Configure database (locally)

Create `.env.local` by copying `.env.example`. Populate:

```env
DATABASE_URL="postgresql://<user>:<password>@<your-neon-host>/<db>?sslmode=require"
JWT_SECRET="<random-64-to-96-character-secret>"
ADMIN_EMAIL="<your-private-admin-email>"
ADMIN_PASSWORD="<unique-strong-password>"
BLOB_READ_WRITE_TOKEN=""
```

**Never** commit `.env.local`, `ADMIN_PASSWORD`, or your DB password. The Neon connection string shown here is a placeholder; use the actual string copied from your Neon dashboard.

PowerShell:

```powershell
Copy-Item .env.example .env.local
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
# Fill the file, then:
npm run db:migrate
npm run db:seed
npm run db:admin
npm run dev
```

- If successful, `/api/health` returns `{"status":"ok","database":"connected"}`.
- Sign in with the private admin credentials. The default sample routes are inserted without clobbering existing edited records.
- `db:migrate`/`db:seed` run from **your computer**, not automatically at Vercel build time. This avoids schema-mutating builds.

## 3A. Recommended: GitHub → Vercel

1. Create a GitHub repo and push this folder without `.env.local`.
2. Open https://vercel.com/new and **Import Git Repository**.
3. Select the repository; Framework Preset: **Next.js**; Root Directory: repository folder containing `package.json`.
4. Settings → Environment Variables → Production, add `DATABASE_URL` and `JWT_SECRET`. Optionally add `BLOB_READ_WRITE_TOKEN` (set automatically if linking a Blob store).
5. Deploy; if variables were added later, choose **Redeploy**.
6. Check `https://your-project.vercel.app/api/health`, `/login`, `/routes`, `/landmarks/taj-mahal` and `/admin`.

## 3B. Direct terminal deployment (no GitHub required)

```powershell
npm install -g vercel
vercel login
cd path\to\heritage-route-digital-guide
vercel
```

Answer prompts: link to existing Vercel project? **No** if first time; select team/account; give project name; directory **./**; accept detected **Next.js**. Deploying this way often produces a **Preview** deployment first.

Add environment variables in your Vercel project Settings (recommended, avoids values in terminal history), or use `vercel env add DATABASE_URL production` and `vercel env add JWT_SECRET production`. Then:

```powershell
vercel --prod
```

Vercel prints the real live URL. Do not type a guessed `.vercel.app` domain; copy the URL output by Vercel.

## 4. Optional Vercel Blob

Project → Storage → Create Blob, follow provisioning instructions, ensure `BLOB_READ_WRITE_TOKEN` exists for Production; redeploy. Admin Content Studio accepts small image/audio/video/GLB files. Public Blob URLs must be accessible to visitors; note that uploaded blobs are publicly readable if their URL is known.

## 5. Evaluation checklist

- [ ] `/api/health` shows `ok`, not `preview` or `degraded`.
- [ ] Home & `/routes` show 2 city routes, 6 landmarks; images load.
- [ ] Map tiles load; attribution shows OpenStreetMap; pins open stories.
- [ ] English & Hindi stories display; audio plays on supported devices.
- [ ] 3D view rotates; device lacks WebGL => meaningful fallback message.
- [ ] QR manual input and camera scan work in HTTPS context with permissions.
- [ ] Camera overlay is visibly labelled **conceptual**, not surface-tracked AR.
- [ ] Tourist signs up, logs in, saves a landmark, rates a route.
- [ ] Admin signs in, updates content, new content appears on public pages.
- [ ] Admin analytics change after visits to stories / AR opens.
- [ ] Mobile screen at 375px has usable navigation, map, stories and controls.
- [ ] Only the admin account can open content and analytics pages.
- [ ] Actual Production `https://...` URL opens in an incognito tab.

## Common errors

| Problem | Fix |
|---|---|
| `DATABASE_URL missing` / auth 503 | Correct Production environment variable and run migrations |
| `JWT_SECRET must be 32+ characters` | Generate strong secret and redeploy |
| `relation users does not exist` | Run `npm run db:migrate` on the same Neon database used by Vercel |
| Admin account can't log in | Run `npm run db:admin` and use matching `ADMIN_EMAIL` |
| Public map empty | Check network and OSM tiles; script/map may be blocked |
| Camera fails | Allow permissions; test `localhost` or HTTPS on compatible device |
| Media upload 503 | Create/link Vercel Blob and set correct Blob token |
| External 3D GLB fails | Confirm public URL, cross-origin policy and valid binary glTF content |
| New admin edit not visible | Refresh; public pages are marked dynamic |
| Build fails in Vercel | Check Node 22 runtime, dependency install, TS errors, Environment settings; read Build Logs |

## Useful links

- Vercel new project: https://vercel.com/new
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Neon console: https://console.neon.tech/
- Next.js documentation: https://nextjs.org/docs
- Vercel Blob documentation: https://vercel.com/docs/vercel-blob

# Heritage Atlas — Start yahan se karo (Windows PowerShell)

## 1. Website apne laptop par run karo

1. Is ZIP ko extract karo.
2. **VS Code → File → Open Folder** se `heritage-route-digital-guide` folder kholo.
3. **Terminal → New Terminal** mein commands chalao:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Browser mein `http://localhost:3000` kholo. Abhi bina database ke public website, route map, stories, illustration-based 3D, QR aur conceptual camera AR preview use kar sakte ho. Login/Signup ke liye Neon PostgreSQL connect karna hai.

## 2. Login, signup, admin aur analytics chalu karo

1. https://console.neon.tech/ par PostgreSQL database create karo.
2. Connection string `.env.local` ki `DATABASE_URL` value mein paste karo.
3. Terminal par random secret banao:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

4. Is result ko `.env.local` mein `JWT_SECRET` banao.
5. `ADMIN_EMAIL` aur strong `ADMIN_PASSWORD` bhi `.env.local` mein set karo.
6. Database table, 2 routes, 6 landmarks aur admin account create karo:

```powershell
npm run db:migrate
npm run db:seed
npm run db:admin
npm run dev
```

7. `http://localhost:3000/api/health` ka status **ok** hona chahiye.

## 3. Vercel par live deploy karo (terminal se)

```powershell
npm install -g vercel
vercel login
vercel
```

- Pehli baar ho to **Set up and deploy** choose karo.
- Project name rakh sakte ho `heritage-atlas-guide`.
- Root folder `./` (jahan `package.json` hai).
- Framework **Next.js**.
- Vercel Dashboard → Project → **Settings → Environment Variables** mein **Production** ke liye `DATABASE_URL` aur `JWT_SECRET` add karo.
- Blob upload ke liye optional Vercel Blob storage configure karo.
- Phir:

```powershell
vercel --prod
```

Terminal jo `https://...vercel.app` link deta hai, **wahi tumhara real live website link hai**. `/api/health`, `/login`, `/admin`, `/routes` test karna. Yehi live link evaluator ko submit karna; sample ya guessed URL mat bhejna.

## 4. Agar Vercel me New Project par ho

1. Open: https://vercel.com/new
2. **Import Git Repository** → apna GitHub repo choose karo.
3. **Framework Preset: Next.js** check karo.
4. **Root Directory:** wahi select karo jisme `package.json` hai.
5. `DATABASE_URL` aur `JWT_SECRET` Production ke liye add karo.
6. **Deploy** click karo aur URL kholo.

**Important:** Ye source code package hai, automatic live website nahi. `npm install` aur `npm run build` online system par successful hona chahiye, phir live device tests karo. Phase-1 AR conceptual camera overlay hai, real-world object tracking/SLAM nahi.

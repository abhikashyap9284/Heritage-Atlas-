import postgres from "postgres";
const url=process.env.DATABASE_URL || (()=>{throw Error('Set DATABASE_URL before migrating')})();
const sql=postgres(url,{max:1,prepare:false});
try {
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
 role TEXT NOT NULL DEFAULT 'USER' CHECK(role IN ('USER','ADMIN')),
 preferred_language TEXT NOT NULL DEFAULT 'en', created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS routes (
 id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, city TEXT NOT NULL,
 tagline TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', image TEXT NOT NULL DEFAULT '/images/agra.svg',
 theme TEXT NOT NULL DEFAULT 'sand', distance_label TEXT NOT NULL DEFAULT '', latitude DOUBLE PRECISION NOT NULL,
 longitude DOUBLE PRECISION NOT NULL, featured BOOLEAN NOT NULL DEFAULT false, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS landmarks (
 id TEXT PRIMARY KEY, route_id TEXT NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
 slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, subtitle TEXT NOT NULL DEFAULT '',
 latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL,
 era TEXT NOT NULL DEFAULT '', duration TEXT NOT NULL DEFAULT '3 min story',
 summary_en TEXT NOT NULL DEFAULT '', summary_hi TEXT NOT NULL DEFAULT '',
 story_en TEXT NOT NULL DEFAULT '', story_hi TEXT NOT NULL DEFAULT '',
 timeline JSONB NOT NULL DEFAULT '[]'::jsonb, image TEXT NOT NULL DEFAULT '/images/fort.svg',
 model_url TEXT, audio_url TEXT, video_url TEXT, source_url TEXT NOT NULL DEFAULT '',
 featured BOOLEAN NOT NULL DEFAULT false, sort_order INTEGER NOT NULL DEFAULT 0,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
 await sql.unsafe(`ALTER TABLE landmarks ADD COLUMN IF NOT EXISTS video_url TEXT`);
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS favorites (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 landmark_id TEXT NOT NULL REFERENCES landmarks(id) ON DELETE CASCADE,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(), PRIMARY KEY(user_id,landmark_id))`);
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS visits (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 landmark_id TEXT NOT NULL REFERENCES landmarks(id) ON DELETE CASCADE,
 visited_at TIMESTAMPTZ NOT NULL DEFAULT now(),PRIMARY KEY(user_id,landmark_id))`);
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS interactions (
 id TEXT PRIMARY KEY, session_id TEXT NOT NULL, user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
 route_id TEXT REFERENCES routes(id) ON DELETE SET NULL,landmark_id TEXT REFERENCES landmarks(id) ON DELETE SET NULL,
 event_type TEXT NOT NULL CHECK (event_type IN ('page_view','ar_open','qr_scan','audio_play','session_end')),
 duration_seconds INTEGER NOT NULL DEFAULT 0 CHECK(duration_seconds BETWEEN 0 AND 86400),
 created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
 await sql.unsafe(`CREATE TABLE IF NOT EXISTS reviews (
 id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 route_id TEXT NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
 rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id,route_id))`);
 await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_interactions_time ON interactions(created_at DESC)`);
 await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_interactions_landmark ON interactions(landmark_id,event_type)`);
 await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_landmarks_route ON landmarks(route_id)`);
 console.log('✓ Database tables and indexes ready');
} finally {await sql.end()}

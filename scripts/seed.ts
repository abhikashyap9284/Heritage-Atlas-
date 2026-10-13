import postgres from "postgres";
import { demoRoutes } from "../lib/seed";
if (!process.env.DATABASE_URL) throw Error("Set DATABASE_URL first");
const sql=postgres(process.env.DATABASE_URL,{max:1,prepare:false});
try {
 for(const r of demoRoutes){
  await sql`INSERT INTO routes (id,slug,name,city,tagline,description,image,theme,distance_label,latitude,longitude,featured)
  VALUES (${r.id},${r.slug},${r.name},${r.city},${r.tagline},${r.description},${r.image},${r.theme},${r.distanceLabel},${r.latitude},${r.longitude},${r.featured})
  ON CONFLICT (id) DO NOTHING`;
  for(const l of r.landmarks){
   await sql`INSERT INTO landmarks (id,route_id,slug,name,subtitle,latitude,longitude,era,duration,summary_en,summary_hi,story_en,story_hi,timeline,image,model_url,audio_url,video_url,source_url,featured,sort_order)
   VALUES (${l.id},${l.routeId},${l.slug},${l.name},${l.subtitle},${l.latitude},${l.longitude},${l.era},${l.duration},${l.summaryEn},${l.summaryHi},${l.storyEn},${l.storyHi},${sql.json(l.timeline)},${l.image},${l.modelUrl||null},${l.audioUrl||null},${l.videoUrl||null},${l.sourceUrl},${l.featured},${l.sortOrder})
   ON CONFLICT (id) DO NOTHING`;
  }
 }
 console.log('✓ Seeded',demoRoutes.length,'routes and',demoRoutes.flatMap(r=>r.landmarks).length,'landmarks (existing edits preserved)');
} finally {await sql.end()}

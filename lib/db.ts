import postgres from "postgres";
import type { HeritageRoute,Landmark,TimelineEvent } from "./types";
import { demoRoutes } from "./seed";

const globalDb = globalThis as typeof globalThis & { __heritageSql?: ReturnType<typeof postgres> };
export function hasDatabase() { return Boolean(process.env.DATABASE_URL); }
export function db() {
 if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing. Configure Neon PostgreSQL and run npm run db:migrate.");
 if (!globalDb.__heritageSql) globalDb.__heritageSql=postgres(process.env.DATABASE_URL,{max:1,prepare:false,connect_timeout:10,idle_timeout:15});
 return globalDb.__heritageSql;
}
const mapLandmark=(v:any):Landmark=>({id:v.id,routeId:v.route_id,slug:v.slug,name:v.name,subtitle:v.subtitle,latitude:Number(v.latitude),longitude:Number(v.longitude),era:v.era,duration:v.duration,summaryEn:v.summary_en,summaryHi:v.summary_hi,storyEn:v.story_en,storyHi:v.story_hi,timeline:typeof v.timeline==='string'?JSON.parse(v.timeline):v.timeline as TimelineEvent[],image:v.image,modelUrl:v.model_url||undefined,audioUrl:v.audio_url||undefined,videoUrl:v.video_url||undefined,sourceUrl:v.source_url,featured:v.featured,sortOrder:v.sort_order});
const mapRoute=(r:any):HeritageRoute=>({id:r.id,slug:r.slug,name:r.name,city:r.city,tagline:r.tagline,description:r.description,image:r.image,theme:r.theme,distanceLabel:r.distance_label,latitude:Number(r.latitude),longitude:Number(r.longitude),featured:r.featured,landmarks:[]});
export async function getRoutes():Promise<HeritageRoute[]> {
 if(!hasDatabase()) return demoRoutes;
 const sql=db();const [routes,landmarks]=await Promise.all([sql`SELECT * FROM routes ORDER BY featured DESC,name`,sql`SELECT * FROM landmarks ORDER BY sort_order, name`]);
 const mapped=routes.map(mapRoute);for(const r of mapped)r.landmarks=landmarks.filter(l=>l.route_id===r.id).map(mapLandmark);
 return mapped;
}
export async function getRoute(slug:string){return (await getRoutes()).find(r=>r.slug===slug)||null}
export async function getLandmark(slug:string){const routes=await getRoutes();for(const route of routes){const landmark=route.landmarks.find(l=>l.slug===slug);if(landmark)return {landmark,route}}return null}

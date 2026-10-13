import {NextResponse} from "next/server";
import {randomUUID} from "node:crypto";
import {db,hasDatabase} from "@/lib/db";
import {currentUser,error} from "@/lib/auth";
import {trackSchema,isSameOrigin} from "@/lib/validation";
export async function POST(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);if(!hasDatabase())return NextResponse.json({ok:true,stored:false});
 try{const parsed=trackSchema.safeParse(await req.json());if(!parsed.success)return error('Invalid event');const e=parsed.data;const user=await currentUser();const sql=db();await sql`INSERT INTO interactions(id,session_id,user_id,route_id,landmark_id,event_type,duration_seconds) VALUES(${randomUUID()},${e.sessionId},${user?.id||null},${e.routeId||null},${e.landmarkId||null},${e.eventType},${e.durationSeconds})`;return NextResponse.json({ok:true,stored:true});}catch{return error('Tracking temporarily unavailable',503)}}

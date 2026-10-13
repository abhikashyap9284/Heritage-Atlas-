import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {requireUser,error} from "@/lib/auth";
import {isSameOrigin} from "@/lib/validation";
export async function GET(){const user=await requireUser();if(!user)return error('Sign in required',401);const sql=db();const rows=await sql`SELECT landmark_id FROM visits WHERE user_id=${user.id}`;return NextResponse.json({ids:rows.map(r=>r.landmark_id)})}
export async function POST(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);const user=await requireUser();if(!user)return error('Sign in required',401);const {landmarkId}=await req.json();if(typeof landmarkId!=='string'||landmarkId.length>100)return error('Invalid landmark');try{const sql=db();await sql`INSERT INTO visits(user_id,landmark_id) VALUES(${user.id},${landmarkId}) ON CONFLICT DO NOTHING`;return NextResponse.json({ok:true})}catch{return error('Could not save visit',400)}}

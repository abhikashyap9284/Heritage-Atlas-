import {NextResponse} from "next/server";
import {randomUUID} from "node:crypto";
import {requireUser,error} from "@/lib/auth";
import {db} from "@/lib/db";
import {isSameOrigin} from "@/lib/validation";
export async function POST(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);const user=await requireUser();if(!user)return error('Sign in required',401);const {routeId,rating}=await req.json();if(typeof routeId!=='string'||!Number.isInteger(rating)||rating<1||rating>5)return error('Invalid review');const sql=db();try{await sql`INSERT INTO reviews (id,user_id,route_id,rating) VALUES(${randomUUID()},${user.id},${routeId},${rating}) ON CONFLICT(user_id,route_id) DO UPDATE SET rating=EXCLUDED.rating`;return NextResponse.json({ok:true})}catch{return error('Review failed',400)}}

import {NextResponse} from "next/server";
import {db,hasDatabase} from "@/lib/db";
export async function GET(){if(!hasDatabase())return NextResponse.json({status:'preview',database:'not configured'});try{await db()`SELECT 1`;return NextResponse.json({status:'ok',database:'connected'})}catch{return NextResponse.json({status:'degraded',database:'connection error'},{status:503})}}

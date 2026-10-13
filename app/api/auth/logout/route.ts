import {NextResponse} from "next/server";
import {clearSession,error} from "@/lib/auth";
import {isSameOrigin} from "@/lib/validation";
export async function POST(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);const res=NextResponse.json({ok:true});clearSession(res);return res}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db,hasDatabase } from "@/lib/db";
import {createSession,sessionCookie,error} from "@/lib/auth";
import {loginSchema,validate,isSameOrigin} from "@/lib/validation";
export async function POST(req:Request){
 if(!isSameOrigin(req))return error('Forbidden origin',403);if(!hasDatabase())return error('Database not connected. Configure DATABASE_URL and run migrations.',503);
 try{const parsed=loginSchema.parse(await req.json());const sql=db();const rows=await sql`SELECT id,name,email,password_hash,role FROM users WHERE email=${parsed.email} LIMIT 1`;
 if(!rows.length || !(await bcrypt.compare(parsed.password,rows[0].password_hash)))return error('Invalid email or password',401);
 const user={id:rows[0].id,name:rows[0].name,email:rows[0].email,role:rows[0].role};const token=await createSession(user);const res=NextResponse.json({user});sessionCookie(res,token);return res;
 }catch(e:any){if(e?.name==='ZodError')return error(validate(e));console.error('login failed',e);return error('Sign in unavailable; check database setup.',500)}
}

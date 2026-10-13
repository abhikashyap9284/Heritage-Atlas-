import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { db,hasDatabase } from "@/lib/db";
import { createSession,sessionCookie,error } from "@/lib/auth";
import { signupSchema,validate,isSameOrigin } from "@/lib/validation";
export async function POST(req:Request){
 if(!isSameOrigin(req))return error("Forbidden origin",403);
 if(!hasDatabase())return error('Database not connected. Configure DATABASE_URL and run migrations.',503);
 try{const parsed=signupSchema.parse(await req.json());const sql=db();const exists=await sql`SELECT 1 FROM users WHERE email=${parsed.email}`;if(exists.length)return error('Email already registered',409);
 const id=randomUUID();const hash=await bcrypt.hash(parsed.password,12);await sql`INSERT INTO users(id,name,email,password_hash,role) VALUES (${id},${parsed.name},${parsed.email},${hash},'USER')`;
 const user={id,name:parsed.name,email:parsed.email,role:'USER' as const};const token=await createSession(user);const response=NextResponse.json({user},{status:201});sessionCookie(response,token);return response;
 }catch(e:any){if(e?.code==='23505')return error('Email already registered',409);if(e?.name==='ZodError')return error(validate(e));console.error('signup failed',e);return error('Registration unavailable; check database setup.',500)}
}

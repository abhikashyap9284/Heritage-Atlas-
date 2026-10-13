import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { SessionUser } from "./types";
import { NextResponse } from "next/server";
const COOKIE_NAME = "heritage_session";
function secret(){const value=process.env.JWT_SECRET;if(!value||value.length<32)throw new Error("JWT_SECRET must be 32+ characters");return new TextEncoder().encode(value)}
export async function createSession(user:SessionUser){return new SignJWT({...user}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("7d").sign(secret())}
export async function currentUser():Promise<SessionUser|null>{const token=(await cookies()).get(COOKIE_NAME)?.value;if(!token)return null;try{const {payload}=await jwtVerify(token,secret());if(typeof payload.id!=="string"||typeof payload.email!=="string"||typeof payload.name!=="string"||(payload.role!=="ADMIN"&&payload.role!=="USER"))return null;return {id:payload.id,email:payload.email,name:payload.name,role:payload.role}}catch{return null}}
export function sessionCookie(response:NextResponse,token:string){response.cookies.set(COOKIE_NAME,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*7})}
export function clearSession(response:NextResponse){response.cookies.set(COOKIE_NAME,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:0})}
export async function requireAdmin(){const user=await currentUser();return user?.role==="ADMIN"?user:null}
export async function requireUser(){return await currentUser()}
export const error=(message:string,status=400)=>NextResponse.json({error:message},{status});

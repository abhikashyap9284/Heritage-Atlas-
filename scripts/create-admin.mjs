import postgres from "postgres";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
const {DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD}=process.env;
if(!DATABASE_URL||!ADMIN_EMAIL||!ADMIN_PASSWORD||ADMIN_PASSWORD.length<12)throw Error('Set DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD (12+ chars) in environment');
const email=ADMIN_EMAIL.trim().toLowerCase();
const sql=postgres(DATABASE_URL,{max:1,prepare:false});
try {
 const existing=await sql`SELECT id FROM users WHERE email=${email}`;
 if(existing.length){ console.error('This email already exists; admin promotion is intentionally disabled. Choose an unused ADMIN_EMAIL.');process.exitCode=1 }
 else {const hash=await bcrypt.hash(ADMIN_PASSWORD,12);await sql`INSERT INTO users(id,name,email,password_hash,role) VALUES (${randomUUID()},${'Heritage Admin'},${email},${hash},'ADMIN')`;console.log('✓ Admin created:',email)}
} finally {await sql.end()}

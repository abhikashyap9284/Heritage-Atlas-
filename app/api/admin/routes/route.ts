import {NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {requireAdmin,error} from '@/lib/auth';
import {db,getRoutes} from '@/lib/db';
import {isSameOrigin,routeSchema,validate} from '@/lib/validation';
export async function GET(){if(!await requireAdmin())return error('Admin access only',403);return NextResponse.json({routes:await getRoutes()})}
export async function POST(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);if(!await requireAdmin())return error('Admin access only',403);
 try{const d=routeSchema.parse(await req.json());const sql=db();const id=randomUUID();await sql`INSERT INTO routes(id,slug,name,city,tagline,description,image,theme,distance_label,latitude,longitude,featured) VALUES (${id},${d.slug},${d.name},${d.city},${d.tagline},${d.description},${d.image},${d.theme},${d.distanceLabel},${d.latitude},${d.longitude},${d.featured})`;return NextResponse.json({id},{status:201})}catch(e:any){return error(e?.code==='23505'?'Slug already exists':validate(e))}}
export async function PATCH(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);if(!await requireAdmin())return error('Admin access only',403);
 try{const body=await req.json();const {id}=body;if(typeof id!=='string')return error('Missing ID');const d=routeSchema.parse(body);const sql=db();await sql`UPDATE routes SET slug=${d.slug},name=${d.name},city=${d.city},tagline=${d.tagline},description=${d.description},image=${d.image},theme=${d.theme},distance_label=${d.distanceLabel},latitude=${d.latitude},longitude=${d.longitude},featured=${d.featured} WHERE id=${id}`;return NextResponse.json({ok:true})}catch(e:any){return error(e?.code==='23505'?'Slug already exists':validate(e))}}
export async function DELETE(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);if(!await requireAdmin())return error('Admin access only',403);const {id}=await req.json();if(typeof id!=='string')return error('Missing ID');const sql=db();await sql`DELETE FROM routes WHERE id=${id}`;return NextResponse.json({ok:true})}

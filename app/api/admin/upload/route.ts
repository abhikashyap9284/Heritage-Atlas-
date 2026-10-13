import {NextResponse} from 'next/server';
import {put} from '@vercel/blob';
import {requireAdmin,error} from '@/lib/auth';
import {isSameOrigin} from '@/lib/validation';
export async function POST(req:Request){if(!isSameOrigin(req))return error('Forbidden origin',403);if(!await requireAdmin())return error('Admin access only',403);
 if(!process.env.BLOB_READ_WRITE_TOKEN)return error('BLOB_READ_WRITE_TOKEN not configured. Add a Vercel Blob store.',503);
 try{const form=await req.formData();const file=form.get('file');if(!(file instanceof File))return error('Choose a file');if(file.size>4_000_000||file.size===0)return error('File must be less than 4 MB');
 const allowed=['image/jpeg','image/png','image/webp','audio/mpeg','audio/ogg','audio/wav','video/mp4','model/gltf-binary','application/octet-stream'];if(!allowed.includes(file.type))return error('Unsupported file type');
 const filename=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');if(!/\.(jpg|jpeg|png|webp|mp3|ogg|wav|mp4|glb)$/i.test(filename))return error('Allowed: JPG, PNG, WEBP, MP3, OGG, WAV, MP4, GLB');
 const blob=await put(`heritage/${crypto.randomUUID()}-${filename}`,file,{access:'public',addRandomSuffix:false,contentType:file.type==='application/octet-stream'?'model/gltf-binary':file.type});return NextResponse.json({url:blob.url});
 }catch(e){console.error(e);return error('Upload failed. Check Blob token and storage settings.',503)}
}

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ScanLine} from 'lucide-react';
import {getLandmark} from '@/lib/db';
import ARExperience from '@/components/ARExperience';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const found=await getLandmark(slug);return {title:found?`${found.landmark.name} · AR Experience`:'AR Experience'}}
export default async function ARPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const found=await getLandmark(slug);if(!found)notFound();return <section className="ar-page shell"><Link href={`/landmarks/${slug}`} className="back-link dark"><ArrowLeft size={17}/> Back to landmark story</Link><div className="page-topline ar-title"><span className="eyebrow"><ScanLine size={16}/> AR STORY MODE / PHASE 1</span><h1>History, <em>through your lens.</em></h1><p>{found.landmark.name} · A new perspective on the past.</p></div><ARExperience landmark={found.landmark}/></section>}

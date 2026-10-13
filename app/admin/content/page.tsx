import Link from 'next/link';
import {redirect} from 'next/navigation';
import {ArrowLeft,ShieldCheck} from 'lucide-react';
import {currentUser} from '@/lib/auth';
import {getRoutes} from '@/lib/db';
import AdminStudio from '@/components/AdminStudio';
export const dynamic='force-dynamic';export const metadata={title:'Content Management',robots:{index:false,follow:false}};
export default async function Content(){const user=await currentUser();if(!user)redirect('/login?next=/admin/content');if(user.role!=='ADMIN')redirect('/');return <section className="shell admin-shell"><Link className="back-link dark" href="/admin"><ArrowLeft size={16}/> Admin dashboard</Link><div className="page-topline"><span className="eyebrow"><ShieldCheck size={16}/> ADMIN / CONTENT</span><h1>Curate the <em>experience.</em></h1><p>Build and manage stories, routes and multimedia content.</p></div><AdminStudio initial={await getRoutes()}/></section>}

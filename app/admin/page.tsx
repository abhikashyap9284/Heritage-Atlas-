import Link from 'next/link';
import {redirect} from 'next/navigation';
import {LayoutDashboard,Map,FilePenLine,ChartNoAxesCombined,ArrowUpRight,ShieldCheck} from 'lucide-react';
import {currentUser} from '@/lib/auth';
import {getRoutes} from '@/lib/db';
export const dynamic='force-dynamic';
export const metadata={title:'Admin Studio',robots:{index:false,follow:false}};
export default async function Admin(){const user=await currentUser();if(!user)redirect('/login?next=/admin');if(user.role!=='ADMIN')redirect('/');const routes=await getRoutes();const count=routes.flatMap(r=>r.landmarks).length;return <section className="shell admin-shell"><span className="eyebrow"><ShieldCheck size={16}/> HERITAGE CONTENT STUDIO</span><h1>Welcome to the <em>studio.</em></h1><p>Manage the cultural journeys behind every great adventure.</p><div className="admin-welcome-stats"><div><Map/><strong>{routes.length}</strong><span>Live routes</span></div><div><FilePenLine/><strong>{count}</strong><span>Published landmarks</span></div><div><ShieldCheck/><strong>ADMIN</strong><span>Access granted</span></div></div><div className="admin-quick-links"><Link href="/admin/content"><FilePenLine size={26}/><div><h3>Content management</h3><p>Add routes, publish multimedia stories and update translated narratives.</p></div><ArrowUpRight size={22}/></Link><Link href="/admin/analytics"><ChartNoAxesCombined size={27}/><div><h3>Visitor analytics</h3><p>Track route popularity, camera activations, story views and engagement.</p></div><ArrowUpRight size={22}/></Link></div></section>}

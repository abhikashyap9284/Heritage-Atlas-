import Link from 'next/link';
import {redirect} from 'next/navigation';
import {ArrowLeft,ChartNoAxesCombined} from 'lucide-react';
import {currentUser} from '@/lib/auth';
import AnalyticsPanel from '@/components/AnalyticsPanel';
export const dynamic='force-dynamic';export const metadata={title:'Engagement Analytics',robots:{index:false,follow:false}};
export default async function AnalyticsPage(){const user=await currentUser();if(!user)redirect('/login?next=/admin/analytics');if(user.role!=='ADMIN')redirect('/');return <section className="shell admin-shell"><Link href="/admin" className="back-link dark"><ArrowLeft size={16}/> Admin dashboard</Link><div className="page-topline"><span className="eyebrow"><ChartNoAxesCombined size={17}/> ADMIN / ANALYTICS</span><h1>Understand the <em>journey.</em></h1><p>Discover which stories resonate and how visitors engage.</p></div><AnalyticsPanel/></section>}

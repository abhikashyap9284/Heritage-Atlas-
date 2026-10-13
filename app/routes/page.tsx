export const dynamic = 'force-dynamic';
import {MapPin,ArrowUpRight,Compass} from 'lucide-react';
import {getRoutes} from '@/lib/db';
import RouteCard from '@/components/RouteCard';
import {Reveal} from '@/components/Reveal';
export const metadata={title:'Heritage Routes'};
export default async function RoutesPage(){const routes=await getRoutes();return <><div className="page-hero page-hero-light"><div className="shell"><span className="eyebrow"><Compass size={15}/> EXPLORE WITH CURIOSITY</span><h1>Find your <em>next story.</em></h1><p>From quiet courtyards to monumental gateways, choose a thoughtfully curated journey through living history.</p><div className="page-hero-pills"><span><MapPin size={15}/> {new Set(routes.map(r=>r.city)).size} destinations</span><span>✧ {routes.flatMap(r=>r.landmarks).length} landmarks</span><span>↗ Source-led discovery</span></div></div></div><section className="section-padding"><div className="shell"><div className="section-mini-title"><span className="eyebrow">CURATED DESTINATIONS</span><span>{String(routes.length).padStart(2,'0')} TRAILS</span></div><div className="route-grid">{routes.map((r,i)=><Reveal key={r.id} delay={i*.08}><RouteCard route={r} index={i}/></Reveal>)}</div>{routes.length===0&&<p>No routes published yet. An administrator can add them from the studio.</p>}</div></section></>}

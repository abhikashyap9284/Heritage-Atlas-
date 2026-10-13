import Link from 'next/link';
import {Compass,ArrowRight} from 'lucide-react';
export default function NotFound(){return <div className="notfound shell"><Compass size={54}/><span className="eyebrow">LOST IN HISTORY / 404</span><h1>This story hasn't<br/><em>been discovered.</em></h1><p>We couldn't find this page. Your next adventure is just around the corner.</p><Link href="/routes" className="button button-dark">Explore routes <ArrowRight size={17}/></Link></div>}

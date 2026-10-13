import Scanner from '@/components/Scanner';
import {ScanLine} from 'lucide-react';
export const metadata={title:'Scan a Landmark'};
export default function ScanPage(){return <section className="scan-page shell"><div className="page-topline"><span className="eyebrow"><ScanLine size={15}/> YOUR GATEWAY TO DISCOVERY</span><h1>Scan. Discover. <em>Wonder.</em></h1><p>Point your camera at a Heritage Atlas QR code to unlock a landmark story.</p></div><Scanner/></section>}

import type {Metadata} from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceWorker from "@/components/ServiceWorker";
import 'leaflet/dist/leaflet.css';
import './globals.css';
export const metadata:Metadata={title:{default:'Heritage Atlas — Stories Beyond the Stone',template:'%s | Heritage Atlas'},description:'Discover UNESCO heritage routes through interactive maps, immersive stories, audio guides and camera-based AR concepts.',keywords:['heritage guide','Agra','Delhi','UNESCO','interactive map','digital tourism'],robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader/><main id="main-content">{children}</main><SiteFooter/><ServiceWorker/></body></html>}

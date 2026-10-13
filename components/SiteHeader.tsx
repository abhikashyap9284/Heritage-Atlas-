"use client";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useEffect,useState} from "react";
import {ArrowUpRight,Compass,Menu,X,UserRound,LogOut,Shield} from "lucide-react";
import type {SessionUser} from "@/lib/types";
export default function SiteHeader(){
 const [open,setOpen]=useState(false);const [user,setUser]=useState<SessionUser|null>(null);const path=usePathname();const router=useRouter();
 useEffect(()=>{setOpen(false);fetch('/api/auth/me').then(r=>r.json()).then(d=>setUser(d.user)).catch(()=>{})},[path]);
 const logout=async()=>{await fetch('/api/auth/logout',{method:'POST'});setUser(null);router.push('/');router.refresh()};
 return <header className="site-header"><div className="shell header-inner"><Link className="brand" href="/" aria-label="Heritage Atlas home"><span className="brand-icon"><Compass size={21} strokeWidth={1.75}/></span><span>HERITAGE<span className="brand-accent">.</span><small>ATLAS</small></span></Link>
 <nav className={open?'main-nav open':'main-nav'} aria-label="Main navigation"><Link href="/routes" className={path.startsWith('/routes')?'active':''}>Explore routes</Link><Link href="/scan" className={path==='/scan'?'active':''}>Scan & discover</Link><Link href="/about" className={path==='/about'?'active':''}>Our story</Link>{user&&<Link href="/saved">My collection</Link>}{user?.role==='ADMIN'&&<Link href="/admin"><Shield size={15}/> Studio</Link>}</nav>
 <div className="header-actions">{user?<div className="user-group"><Link href="/saved" className="user-pill"><UserRound size={16}/> <span>{user.name.split(' ')[0]}</span></Link><button onClick={logout} aria-label="Sign out" className="icon-button"><LogOut size={17}/></button></div>:<Link href="/login" className="header-login">Sign in <ArrowUpRight size={16}/></Link>}<button className="menu-trigger" aria-expanded={open} aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
 </div></header>
}

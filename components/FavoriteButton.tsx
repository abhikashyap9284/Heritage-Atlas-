"use client";
import {useEffect,useState} from 'react';
import {Bookmark,Check} from 'lucide-react';
import {useRouter} from 'next/navigation';
export default function FavoriteButton({id}:{id:string}){const [saved,setSaved]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const router=useRouter();
 useEffect(()=>{fetch('/api/favorites').then(r=>r.ok?r.json():null).then(d=>setSaved(d?.ids?.includes(id)||false)).catch(()=>{})},[id]);
 const toggle=async()=>{setBusy(true);setError('');try{const r=await fetch('/api/favorites',{method:saved?'DELETE':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({landmarkId:id})});if(r.status===401){router.push('/login?next='+encodeURIComponent(window.location.pathname));return}if(!r.ok){const d=await r.json();throw Error(d.error||'Save failed')}setSaved(!saved)}catch(e:any){setError(e.message)}finally{setBusy(false)}};
 return <div><button onClick={toggle} disabled={busy} className={saved?'button button-outline saved':'button button-outline'}>{saved?<Check size={17}/>:<Bookmark size={17}/>} {saved?'Saved to collection':'Save to collection'}</button>{error&&<p className="form-error">{error}</p>}</div>}

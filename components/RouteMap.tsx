"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {ExternalLink,LocateFixed,MapPin} from "lucide-react";
import type {Landmark} from "@/lib/types";
import {distanceMeters,humanDistance} from "@/lib/utils";
export default function RouteMap({landmarks}:{landmarks:Landmark[]}){
 const mapEl=useRef<HTMLDivElement>(null);const mapInstance=useRef<any>(null);const [location,setLocation]=useState<{lat:number;lon:number}|null>(null);const [locError,setLocError]=useState('');
 useEffect(()=>{if(!mapEl.current||mapInstance.current||!landmarks.length)return;let cancelled=false;let localMap:any=null;
 (async()=>{const L=(await import('leaflet')).default;if(cancelled||!mapEl.current)return;const bounds=L.latLngBounds(landmarks.map(l=>[l.latitude,l.longitude] as [number,number]));localMap=L.map(mapEl.current,{scrollWheelZoom:false,zoomControl:false});mapInstance.current=localMap;
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:19}).addTo(localMap);L.control.zoom({position:'bottomright'}).addTo(localMap);
 const latlngs=landmarks.map(l=>[l.latitude,l.longitude] as [number,number]);L.polyline(latlngs,{color:'#be8b56',weight:3,dashArray:'8,10',opacity:.9}).addTo(localMap);
 landmarks.forEach((l,i)=>{const icon=L.divIcon({className:'heritage-map-pin',html:`<span>${String(i+1).padStart(2,'0')}</span>`,iconSize:[38,38],iconAnchor:[19,19]});L.marker([l.latitude,l.longitude],{icon}).addTo(localMap).bindPopup(`<strong>${l.name.replaceAll('<','&lt;')}</strong><br/>${l.subtitle.replaceAll('<','&lt;')}<br/><a href="/landmarks/${encodeURIComponent(l.slug)}">Explore story →</a>`)});
 localMap.fitBounds(bounds.pad(.3),{maxZoom:13});setTimeout(()=>{if(!cancelled)localMap.invalidateSize()},250);
 })();return()=>{cancelled=true;if(localMap){localMap.remove();mapInstance.current=null}}},[landmarks]);
 function locate(){if(!navigator.geolocation){setLocError('Geolocation is not available in your browser.');return}navigator.geolocation.getCurrentPosition(pos=>{setLocation({lat:pos.coords.latitude,lon:pos.coords.longitude});setLocError('')},()=>setLocError('Location permission was denied or unavailable.'),{enableHighAccuracy:true,timeout:12000})}
 return <div className="map-layout"><div className="map-canvas-wrap"><div className="map-canvas" ref={mapEl} aria-label="Interactive OpenStreetMap showing heritage landmarks"/><button className="map-locate" onClick={locate}><LocateFixed size={17}/> My location</button></div><div className="map-list"><div className="map-list-top"><span className="eyebrow">YOUR ROUTE AT A GLANCE</span><strong>{landmarks.length} stops</strong></div>{landmarks.map((l,i)=><Link key={l.id} href={`/landmarks/${l.slug}`} className="map-stop"><span className="map-stop-number">{String(i+1).padStart(2,'0')}</span><span><b>{l.name}</b><small>{location?`${humanDistance(distanceMeters(location.lat,location.lon,l.latitude,l.longitude))} from your location`:`${l.era} · ${l.duration}`}</small></span><ExternalLink size={15}/></Link>)}<div className="map-note"><MapPin size={16}/><p>Map lines show the suggested visiting sequence, <strong>not</strong> turn-by-turn road directions. Select a stop for details.</p></div>{locError&&<p className="form-error">{locError}</p>}</div></div>
}

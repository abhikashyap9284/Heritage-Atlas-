"use client";
import {QRCodeSVG} from "qrcode.react";
import {useEffect,useState} from "react";
import {QrCode} from "lucide-react";
export default function QRBadge({slug}:{slug:string}){const [url,setUrl]=useState('');useEffect(()=>setUrl(`${window.location.origin}/landmarks/${slug}?unlock=qr`),[slug]);return <div className="qr-badge"><span className="eyebrow"><QrCode size={16}/> SCAN ON-SITE</span><div className="qr-image">{url&&<QRCodeSVG value={url} size={112} bgColor="#fff" fgColor="#18302c"/>}</div><p>Print or display this QR code at a landmark to open its story directly.</p></div>}

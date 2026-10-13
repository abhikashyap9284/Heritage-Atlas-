"use client";
import {useEffect,useRef,useState} from "react";
import {Pause,Play,Volume2,Languages,Check} from "lucide-react";
import {track} from "./TrackView";
import type {Landmark} from "@/lib/types";
export default function StoryPlayer({landmark}: {landmark:Landmark}){
 const [lang,setLang]=useState<'en'|'hi'>('en');const [playing,setPlaying]=useState(false);const [audioError,setAudioError]=useState('');const audio=useRef<HTMLAudioElement>(null);
 const story=lang==='en'?landmark.storyEn:landmark.storyHi;
 useEffect(()=>{return()=>{if(typeof window!=='undefined')window.speechSynthesis?.cancel()}},[]);
 const changeLang=(v:'en'|'hi')=>{window.speechSynthesis?.cancel();audio.current?.pause();setPlaying(false);setLang(v)};
 const toggle=()=>{if(playing){window.speechSynthesis?.cancel();audio.current?.pause();setPlaying(false);return}setAudioError('');track('audio_play',landmark.routeId,landmark.id);
 if(lang==='en'&&landmark.audioUrl&&audio.current){audio.current.play().then(()=>setPlaying(true)).catch(()=>setAudioError('Audio playback is unavailable.'));return}
 if(!('speechSynthesis' in window)){setAudioError('Speech narration is not available on this device.');return}
 const u=new SpeechSynthesisUtterance(story);u.lang=lang==='hi'?'hi-IN':'en-IN';u.rate=.87;u.onend=()=>setPlaying(false);u.onerror=()=>{setPlaying(false);setAudioError('Try another browser or device voice.')};window.speechSynthesis.cancel();window.speechSynthesis.speak(u);setPlaying(true)};
 return <div className="story-player"><div className="story-player-bar"><div><span className="eyebrow"><Volume2 size={15}/> IMMERSIVE AUDIO STORY</span><h3>Listen to the past.</h3></div><div className="story-controls"><button className="lang-select" onClick={()=>changeLang(lang==='en'?'hi':'en')}><Languages size={17}/>{lang==='en'?'English':'हिन्दी'}</button><button className="play-button" onClick={toggle} aria-label={playing?'Pause narration':'Play narration'}>{playing?<Pause fill="currentColor" size={19}/>:<Play fill="currentColor" size={19}/>}</button></div></div><div className="story-transcript"><div className="eyebrow">THE STORY <span className="tiny-dot"/> {landmark.duration}</div><p>{story}</p></div><div className="narration-note"><Check size={15}/>{landmark.audioUrl&&lang==='en'?'Administrator-provided audio track':'Narration uses your device’s text-to-speech voice; Hindi voice availability varies.'}</div>{landmark.audioUrl&&<audio ref={audio} src={landmark.audioUrl} onEnded={()=>setPlaying(false)}/ >}{audioError&&<p className="form-error">{audioError}</p>}</div>
}

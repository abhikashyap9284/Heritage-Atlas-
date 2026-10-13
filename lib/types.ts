export type Language = "en" | "hi";
export type TimelineEvent = { year: string; en: string; hi: string };
export type Landmark = {
 id: string; routeId: string; slug: string; name: string; subtitle: string;
 latitude: number; longitude: number; era: string; duration: string;
 summaryEn: string; summaryHi: string; storyEn: string; storyHi: string;
 timeline: TimelineEvent[]; image: string; modelUrl?: string; audioUrl?: string; videoUrl?: string;
 sourceUrl: string; featured: boolean; sortOrder: number;
};
export type HeritageRoute = { id: string; slug: string; name: string; city: string;
 tagline: string; description: string; image: string; theme: string; distanceLabel: string;
 latitude: number; longitude: number; featured: boolean; landmarks: Landmark[] };
export type SessionUser = { id:string; name:string; email:string; role: "USER"|"ADMIN" };

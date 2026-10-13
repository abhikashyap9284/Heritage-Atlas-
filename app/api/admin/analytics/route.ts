import {NextResponse} from 'next/server';
import {requireAdmin,error} from '@/lib/auth';
import {db} from '@/lib/db';
export async function GET(){if(!await requireAdmin())return error('Admin access only',403);const sql=db();
 try{const [overview,types,landmarks,routes,ratings]=await Promise.all([
  sql`SELECT (SELECT COUNT(*)::int FROM users) users,(SELECT COUNT(*)::int FROM routes) routes,(SELECT COUNT(*)::int FROM landmarks) landmarks,(SELECT COUNT(DISTINCT session_id)::int FROM interactions) visitors,(SELECT COUNT(*)::int FROM interactions WHERE event_type='ar_open') ar_opens,(SELECT COUNT(*)::int FROM interactions WHERE event_type='page_view') page_views,(SELECT COALESCE(AVG(duration_seconds),0)::int FROM interactions WHERE event_type='session_end') avg_seconds`,
  sql`SELECT event_type,COUNT(*)::int count FROM interactions GROUP BY event_type ORDER BY count DESC`,
  sql`SELECT l.name,COUNT(i.id)::int views FROM landmarks l LEFT JOIN interactions i ON l.id=i.landmark_id AND i.event_type='page_view' GROUP BY l.id,l.name ORDER BY views DESC LIMIT 8`,
  sql`SELECT r.name,COUNT(i.id)::int views FROM routes r LEFT JOIN interactions i ON r.id=i.route_id AND i.event_type='page_view' GROUP BY r.id,r.name ORDER BY views DESC LIMIT 8`,
  sql`SELECT ROUND(AVG(rating)::numeric,2) avg_rating,COUNT(*)::int count FROM reviews`
 ]);return NextResponse.json({overview:overview[0],types,landmarks,routes,ratings:ratings[0]})}catch(e){console.error('analytics failed',e);return error('Analytics unavailable; check migrations',503)}
}

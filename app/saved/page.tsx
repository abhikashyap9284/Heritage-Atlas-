export const dynamic = 'force-dynamic';
import {getRoutes} from '@/lib/db';
import ProfileDashboard from '@/components/ProfileDashboard';
export const metadata={title:'My Collection',robots:{index:false,follow:false}};
export default async function SavedPage(){return <ProfileDashboard routes={await getRoutes()}/>}

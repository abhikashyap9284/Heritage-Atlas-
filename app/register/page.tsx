import {Suspense} from 'react';
import AuthForm from '@/components/AuthForm';
export const metadata={title:'Create Account'};
export default function Register(){return <Suspense fallback={<p>Preparing registration…</p>}><AuthForm mode="signup"/></Suspense>}

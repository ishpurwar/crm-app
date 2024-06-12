import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className='flex flex-row items-center justify-evenly p-4 mb-5'>
      
      {user ? (<>
        <Link href="/">Home</Link>
        <Link href="/create-campaign">Create Campaign</Link>
        <Link href="/audience">Add Customer</Link>
        <Link href="/api/auth/logout">Logout</Link>
        <Link href="/vendor">Vendor</Link>
      </>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </div>
  );
}

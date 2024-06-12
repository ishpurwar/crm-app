import Link from 'next/link';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const user = await isAuthenticated();

  return (
    <div className='flex flex-row items-center justify-evenly p-4 mb-5'>
      
      {user ? (<>
        <Link href="/">Home</Link>
        <Link href="/create-campaign">Create Campaign</Link>
        <Link href="/audience">Add Customer</Link>
        <LogoutLink>Log out</LogoutLink>
        <Link href="/vendor">Vendor</Link>
      </>
      ) : (
        <LoginLink postLoginRedirectURL="/">Login</LoginLink>
      )}
    </div>
  );
}

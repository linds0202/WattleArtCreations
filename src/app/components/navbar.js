'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Button, Dialog, CircularProgress, Container, Box, Toolbar, AppBar, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider } from 'firebase/auth';
import { useAuth } from '../firebase/auth'
import { auth } from '../firebase/firebase';

const REDIRECT_PAGE = '/dashboard';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export default function NavBar() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);  

  return ((isLoading) ? 
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%', height: '100vh' }}/>
    :
    <div className='w-full flex justify-between items-center bg-[#282828] px-8 text-white sticky top-0 z-10'>
      <div >
        <Link href='/' className='flex justify-between items-center no-underline'>
          <Image src={'/Logo_Circle.png'} alt="small Wattle Art Creations logo" width={64} height={64}/>
          <p className='text-white text-2xl m-0'>Wattle Art Creations</p>
        </Link>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-white text-base pr-4 m-0'>{authUser?.email}</p>
        {!authUser && <button
              onClick={() => setLogin(true)}>
                Login / Register
        </button>}
        {authUser?.email && 
          <div className='flex justify-between items-center'>
            <div className='pr-4'>
              <Link href={'/admin'} className='text-white no-underline'>Admin</Link>
            </div>
            <div className='pr-4'>
              <Link href={`/dashboard/${authUser.uid}`} className='text-white no-underline'>Customer</Link>
            </div>
            <div className='pr-4'>
              <Link href={`/artistDashboard/${authUser.uid}`} className='text-white no-underline'>Artist</Link>
            </div>
            <button onClick={signOut}>
              Logout
            </button>  
          </div>            
        }
      </div>
      <Dialog onClose={() => setLogin(false)} open={login}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </Dialog>
    </div>
  );
}
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Dialog, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider } from 'firebase/auth';
import { useAuth } from '../firebase/auth'
import { auth } from '../firebase/firebase';

// const REDIRECT_PAGE = '/dashboard';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  // signInSuccessUrl: '/',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => {
      return false
    }
  },
};

export default function NavBar() {
  const { authUser, isLoading, signOut } = useAuth();
  const currentUrl = usePathname()
  const router = useRouter();
  // const REDIRECT_PAGE = usePathname()
  const [login, setLogin] = useState(false);  
  
  const handleClose = () => {
    setLogin(false)
  }

  console.log('path is: ', currentUrl)


  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (authUser) {
      setLogin(false)
    }
  }, [authUser])

  return ((isLoading ) ? 
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%', height: '100vh' }}/>
    :
    <div className='w-full flex justify-between items-center bg-[#282828] px-8 text-white sticky top-0 z-50'>
      <div className='w-4/12 flex justify-start'>
        <Link href='/' className='flex justify-between items-center no-underline'>
          <Image src={'/Logo_Circle.png'} alt="small Wattle Art Creations logo" width={64} height={64}/>
          <p className='text-white text-2xl m-0'>Wattle Art Creations</p>
        </Link>
      </div>

      {/* Links for Personal Route */}
      {currentUrl === '/personal' && 
      <div className='w-4/12 flex justify-around items-center'>
        <Link href={{
                pathname: '/portraits',
                query: {selection: 'Photorealistic'},
                }} 
            className="text-xl no-underline text-center"
        >
            Photorealistic
        </Link>
        <Link href={{
                pathname: '/portraits',
                query: {selection: 'Anime'},
                }} 
            className="text-xl no-underline text-center"
        >
            Anime
        </Link>
        <Link href={{
                pathname: '/portraits',
                query: {selection: 'NSFW'},
                }} 
            className="text-xl no-underline text-center"
        >
            NSFW
        </Link> 
      </div> }


      {/* Links for Corporate Route */}
      {currentUrl === '/corporate' && 
      <div className='w-4/12 flex justify-around items-center'>
        <Link href={{
                pathname: '/portraits',
                query: {selection: 'Photorealistic'},
                }} 
            className="text-xl no-underline text-center"
        >
            Photorealistic
        </Link>
        <Link href={{
                pathname: '/portraits',
                query: {selection: 'Anime'},
                }} 
            className="text-xl no-underline text-center"
        >
            Anime
        </Link>
        <Link href={{
                pathname: '/portraits',
                query: {selection: 'NSFW'},
                }} 
            className="text-xl no-underline text-center"
        >
            NSFW
        </Link> 
      </div> }
      <div className='w-4/12 flex justify-end items-center '>
        <p className='text-white text-base pr-4 m-0'>{authUser?.displayName}</p>
        {!authUser && <button
              onClick={() => setLogin(true)}>
                Login / Register
        </button>}


        {authUser && 
        <>
          {authUser.roles === 'Admin' && <div className='pr-4'>
            <Link href={'/admin'} className='text-white no-underline'>Admin Dashboards</Link>
          </div>}
          {(authUser.roles === 'Customer' || authUser.roles === 'admin') && <div className='pr-4'>
            <Link href={`/dashboard/${authUser.uid}`} className='text-white no-underline'>Customer Dashboard</Link>
          </div>}
          {(authUser.roles === 'Artist' || authUser.roles === 'admin') && <div className='pr-4'>
            <Link href={`/artistDashboard/${authUser.uid}`} className='text-white no-underline'>Artist Dashboard</Link>
          </div>}
          <button onClick={signOut}>Logout</button>
        </>  
        }
      
      </div>
      <Dialog onClose={handleClose} open={login}>
        {!authUser && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
      </Dialog>
    </div>
  );
}


'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Dialog, CircularProgress, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../firebase/auth'
import { auth } from '../firebase/firebase';
import { updateUserById } from '../firebase/firestore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => {
      return false
    }
  },
};

export default function NavBar() {
  
  const { authUser, setAuthUser, isLoading, signOut } = useAuth()
  const currentUrl = usePathname()
  const baseUrl = currentUrl.split('/')[1]
  const router = useRouter()
  
  const [login, setLogin] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [clickedNSFW, setClickedNSFW] = useState(false)
  

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") 
        return;
    setLogin(false)
  }

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (authUser) {
      setLogin(false)
      
      if (!authUser?.oldEnough && clickedNSFW) {
        setOpenConfirm(true)
      } else if(clickedNSFW) {
        router.push('/?selection=NSFW') 
      }
    }
  }, [authUser, login])

  const handleOldEnough = (e) => {
    e.preventDefault()
    
    setClickedNSFW(true)
    
    if (!authUser) {
      setLogin(true)
    } else if (!authUser.oldEnough) {
      setOpenConfirm(true)
    } else {
      router.push('/?selection=NSFW')
    }
  }

  const handleConfirm = () => {
    updateUserById(authUser?.uid)
    setAuthUser({...authUser, oldEnough: true})
    setClickedNSFW(false)
    setOpenConfirm(false)
    router.push('/?selection=NSFW')
  }

  const handleCancel = () => {
      setOpenConfirm(false)
      router.push('/')
  }

  const handleRedirect = () => {
    setLogin(false)
    router.push('/')
  }

  return ((isLoading ) ? 
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%', height: '100vh' }}/>
    :
    <div className='w-full flex justify-between items-center bg-[#282828] px-8 text-white sticky top-0 z-50'>
      <div className='w-4/12 flex justify-start'>
        <Link 
          href={{
            pathname: '/',
            query: {selection: 'Home'},
            }} 
          className='flex justify-between items-center no-underline'
        >
          <Image src={'/Logo_Circle.png'} alt="small Wattle Art Creations logo" width={64} height={64}/>
          <p className='text-white text-2xl m-0'>Wattle Art Creations</p>
        </Link>
      </div>

      {/* Links for Personal Route if not artist*/}
      {((currentUrl === '/' || currentUrl === '/portraits') && authUser?.roles !== 'Artist') && 
      <div className='w-4/12 flex justify-around items-center'>
        <Link href={{
                pathname: '/',
                query: {selection: 'Photorealistic'},
                }} 
            className="text-xl no-underline text-center hover:text-cyan-600"
        >
            Photorealistic
        </Link>
        <Link href={{
                pathname: '/',
                query: {selection: 'Anime'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Anime
        </Link>
        <button 
          onClick={handleOldEnough}
          className="text-xl no-underline text-center hover:text-violet-600"
        >
          NSFW
        </button>
      </div> }

     
      {(authUser?.roles === 'Artist' || (authUser?.roles === 'admin' && (baseUrl === 'artistDashboard' || baseUrl === 'portraitQueue'))) && 
        <div className='flex justify-between items-center'>
          <div className='pr-4'>
            <Link href='/portraitQueue' className='text-white no-underline'>Portrait Queue</Link>
          </div>
          <div className='pr-4'>
            <Link href={`/artistDashboard/${authUser?.uid}`} className='text-white no-underline'>Dashboard</Link>
          </div>
          <div className='pr-4'>
            <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-white no-underline'>Portfolio</Link>
          </div>
        </div>
      }


      {/* Links for Corporate Route */}
      {currentUrl === '/corporate' && 
      <div className='w-4/12 flex justify-around items-center'>
        <Link href={{
                pathname: '/corporate',
                query: {selection: 'Digital'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Digital
        </Link>
        <Link href={{
                pathname: '/corporate',
                query: {selection: 'Identity'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Identity
        </Link>
        <Link href={{
                pathname: '/corporate',
                query: {selection: 'Marketing'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Marketing
        </Link> 
        <Link href={{
                pathname: '/corporate',
                query: {selection: 'Print'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Print
        </Link>
        <Link href={{
                pathname: '/corporate',
                query: {selection: 'VideoGame'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Video Games
        </Link>
      </div> }

      <div className='w-4/12 flex justify-end items-center '>
        {authUser?.roles === 'Customer' && 
        <p className='text-white pr-4'>{authUser?.displayName}</p>}
        
        {authUser?.roles === 'Artist' && 
        <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-white no-underline pr-4'>{authUser?.displayName}</Link>}
        
        <Link href={`/artistDashboard/`} className='text-white no-underline pr-4'>Artists</Link>
        
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
            <Link href={`/dashboard/${authUser.uid}`} className='text-white no-underline'>Dashboard</Link>
          </div>}
    
          <button onClick={signOut}>Logout</button>
          <div className='pl-4'>
            <Link href={'/'} className='text-white no-underline'><img className='w-[32px] h-[32px] text-white' src='./bag.png' alt='Personal Art Orders' title='Personal Art Orders' /></Link>
          </div>
        </>  
        }
      
      </div>
      
      {openConfirm && authUser && !authUser.oldEnough &&
        <div className="fixed w-[40%] h-[40vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl p-8 bg-white text-black border-2 border-[#282828] z-[100]">
            <h2 className="text-3xl font-bold">You must be over <span className="text-[#0075FF] text-4xl">18</span> to create a NSFW Portrait</h2>
            <p className="text-center mt-12 text-2xl">Are you over 18?</p>
            <div className="w-8/12 mx-auto mt-8 flex justify-around items-center">
                
                <button className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#282828] py-2" onClick={handleCancel}>No</button>

                <button className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF] py-2" onClick={handleConfirm}>Yes</button>
            </div>
        </div>
      }

      <Dialog onClose={handleClose} open={login}>
        
        <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[300px]  rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4 py-4'>
          <IconButton onClick={() => setLogin(false)} className='absolute top-2 right-2 text-white'>
              <CloseIcon className='text-white hover:text-red-600'/>
          </IconButton>
          <img src='Logo_Full_ups.png' className='w-[128px] h-[128px] my-4' />
          <h3 className='text-2xl font-bold pb-0'>Please Login to Continue</h3>
          <p className='pb-4'>In order to customize a NSFW portrait, you must Login or Create an Account</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          
          <Button 
              onClick={handleRedirect}
              className='pt-4'
          >
              <div className='text-white border-2 border-white px-4 py-2 rounded-lg flex flex-col'>
                  <p className='text-md' >Return to Homepage</p>
              </div>
                  
          </Button>  
        </div>
        
      </Dialog>
    </div>
  );
}


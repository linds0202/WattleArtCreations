'use client'


import '../globals.css'
import Link from 'next/link';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../firebase/auth'
import { auth } from '../firebase/firebase';
import { updateUserById } from '../firebase/firestore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../../public/images/Logo_Circle.png'
import LogoColor from '../../../public/images/Logo_Full_ups.png'
import Bag from '../../../public/images/bag.png'
import LoginDialog from './LoginDialog';
import { Timestamp } from 'firebase/firestore';


// Configure FirebaseUI.
/* const uiConfig = {
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
}; */

export default function NavBar() {
  
  const { authUser, setAuthUser, isLoading, signOut } = useAuth()


  const currentUrl = usePathname()
  const baseUrl = currentUrl.split('/')[1]
  const router = useRouter()
  
  const [login, setLogin] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [clickedNSFW, setClickedNSFW] = useState(false)
  const [cartLength, setCartLength] = useState<Number | null>(null)

  useEffect(() => {
    function printCart() {
      const cartData = sessionStorage.getItem('Cart')
      if (cartData !== null && JSON.parse(cartData).length !== 0) {
        // console.log('session storage from inside navbar: ' + JSON.parse(cartData))
        setCartLength(JSON.parse(cartData).length)
      }
      else {
        // console.log('cart is empty')
        setCartLength(null)
      }
    }
  
    window.addEventListener('storage', printCart)
  
    return () => {
      window.removeEventListener('storage', printCart)
    }
  }, [])
  

  const handleClose = ({event, reason}: {event: any, reason: any}) => {
  
    if (reason && reason == "backdropClick") {
      return;
    }
    setClickedNSFW(false)
    setLogin(false) 
  }

  const handleXClose = () => {
    setClickedNSFW(false)
    setLogin(false)
  }

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (authUser) {
      setLogin(false)
      if (clickedNSFW) {
        if (authUser?.oldEnough){
          setClickedNSFW(false)
          router.push('/?selection=NSFW') 
        } else {
          setOpenConfirm(true)
        }
      }
    }
  }, [authUser, login])

  const handleOldEnough = (e: React.MouseEvent<HTMLElement> ) => {
    e.preventDefault()
    
    setClickedNSFW(true)
    
    if (!authUser) {
      setLogin(true)
    } else if (!authUser.oldEnough) {
      setOpenConfirm(true)
    } else {
      setClickedNSFW(false)
      router.push('/?selection=NSFW')
    }
    // setClickedNSFW(false)
  }

  const handleConfirm = async () => {
    await updateUserById(authUser?.uid)
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
    <div className='w-full flex justify-between items-center bg-[#282828] px-8 text-white sticky top-0 z-[100]'>
      <div className='w-4/12 flex justify-start'>
        <Link 
          href={{
            pathname: '/',
            query: {selection: 'Home'},
            }} 
          className='flex justify-between items-center no-underline'
        >
          <div className='relative w-[64px] h-[64px] object-cover'>
            <Image 
              src={Logo} 
              alt="small Wattle Art Creations logo" 
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority={true}  
            />
          </div>
          <p className='text-white text-2xl m-0'>Wattle Art Creations</p>
        </Link>
      </div>


      {/* (currentUrl === '/' || currentUrl === '/portraits' || currentUrl === '/dashboard') && */}
      {/* Links for Personal Route if not artist*/}
      {( authUser?.roles !== 'Artist' || authUser?.roles !== 'Admin') && 
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
            <Link href='/portraitQueue' className='text-white text-xl no-underline'>Portrait Queue</Link>
          </div>
          <div className='pr-4'>
            <Link href={`/artistDashboard/${authUser?.uid}`} className='text-white text-xl no-underline'>Dashboard</Link>
          </div>
          <div className='pr-4'>
            <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-white text-xl no-underline'>My Portfolio</Link>
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


         
        <>
          {authUser?.roles === 'Admin' && <div className='pr-4'>
            <Link href={'/admin'} className='text-white no-underline'>Admin Dashboards</Link>
          </div>}
          {(authUser?.roles === 'Customer' || authUser?.roles === 'admin') && <div className='pr-4'>
            <Link href={`/dashboard/${authUser.uid}`} className='text-white no-underline'>Dashboard</Link>
          </div>}
    
          {authUser && <button onClick={signOut}>Logout</button>}
          
          <div className='pl-4'>
            <Link 
              // href={'/portraits'} 
              href={{
                  pathname: '/portraits',
                  query: {direct: 'false'},
              }} 
              className='text-white no-underline'
              title='Select cancel portrait to return to cart. Progress will be lost'
            >
              <div className='relative w-[32px] h-[32px] object-cover'>  
                <Image 
                  className=''
                  src={Bag} 
                  alt="shopping cart icon" 
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority={true}  
                />
                {cartLength && 
                  <div className='rounded-full w-5 -right-2 -top-2 bg-red-600 z-10 absolute flex justify-center items-center'>
                    <p>{`${cartLength}`}</p>
                  </div>
                }
              </div>
            </Link>
          </div>
        </> 
      
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


      <LoginDialog
        selection={clickedNSFW ? 'NSFW' : 'Photorealistic'}
        customizer={false}
        login={login}
        setLogin={setLogin}
      />
      {/* <Dialog 
        onClose={handleClose} 
        open={login} 
        fullWidth={true}
        maxWidth='xs'
        PaperProps={{ sx: { p: 6, backgroundColor: "#282828", color: "white", display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", border: "4px solid white", borderRadius: "10px"} }}
      >
        <div className='relative'>
          <IconButton onClick={handleXClose} className='absolute top-2 right-2 text-white'>
              <CloseIcon className='text-white hover:text-red-600'/>
          </IconButton>

          <div className='relative w-[128px] h-[128px] object-cover my-4'>
            <Image 
              className=''
              src={LogoColor} 
              alt="Wattle Art Creations color logo" 
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority={true}  
            />
          </div>
          <img src='Logo_Full_ups.png' className='w-[128px] h-[128px] my-4' alt='Wattle Art Creations logo'/>
          <h3 className='text-2xl font-bold pb-0 mt-4'>Please Login to Continue</h3>
          <h4>Nav Bar</h4>
          {clickedNSFW && <p className='pb-4 text-center mt-4'>In order to customize a NSFW portrait, you must Login or Create an Account</p>}
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
        
      </Dialog>  */}
    </div>
  );
}


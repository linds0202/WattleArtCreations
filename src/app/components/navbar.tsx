'use client'

import '../globals.css'
import Link from 'next/link';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../firebase/auth'
import { auth } from '../firebase/firebase';
import { updateUserById } from '../firebase/firestore';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../../public/images/Logo_Circle.png'
// import LogoColor from '../../../public/images/Logo_Full_ups.png'
import Bag from '../../../public/images/bag.png'
import LoginDialog from './LoginDialog';
// import { Timestamp } from 'firebase/firestore';
import { useCategoriesContext } from '../context/CategoriesContext';

// Configure FirebaseUI.
// const uiConfig = {
//   signInFlow: 'popup',
//   signInOptions: [
//     {
//       provider: EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false
//     },
//     GoogleAuthProvider.PROVIDER_ID,
//   ],
//   signInSuccessUrl: '/',
// };


export default function NavBar() {
  const { categories, changeCategories } = useCategoriesContext()
  const { authUser, setAuthUser, isLoading, signOut } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  // const [currentRoute, setCurrentRoute] = useState<string>('/')

  
  const currentUrl = usePathname()
  // const baseUrl = currentUrl.split('/')[1]
  const router = useRouter()
  
  const [login, setLogin] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [clickedNSFW, setClickedNSFW] = useState(false)
  const [cartLength, setCartLength] = useState<Number | null>(null)

  useEffect(() => {
    const cartData = sessionStorage.getItem('Cart')
    if (cartData !== null && JSON.parse(cartData).length !== 0) {
      setCartLength(JSON.parse(cartData).length)
    }
    else {
      setCartLength(null)
    }

    
    function printCart() {
      const cartData = sessionStorage.getItem('Cart')
      
      if (cartData !== null && JSON.parse(cartData).length !== 0) {
        setCartLength(JSON.parse(cartData).length)
      }
      else {
        setCartLength(null)
      }
    }
  
    window.addEventListener('storage', printCart)
  
    return () => {
      window.removeEventListener('storage', printCart)
    }
  }, [])

  // const handleClose = ({event, reason}: {event: any, reason: any}) => {
  
  //   if (reason && reason == "backdropClick") {
  //     return;
  //   }
  //   setClickedNSFW(false)
  //   setLogin(false) 
  // }

  // const handleXClose = () => {
  //   setClickedNSFW(false)
  //   setLogin(false)
  // }

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (authUser) {
      setLogin(false)
      if (clickedNSFW) {
        if (authUser?.oldEnough){
          setClickedNSFW(false)
          router.push('/?selection=cat3') 
        } else {
          setOpenConfirm(true)
        }
      }
    }
  }, [authUser, login])

  //Handles the opening and closing of our nav
  const handleOpenNav = () => {
    setIsOpen(!isOpen);
  };

  const handleOldEnough = (e: React.MouseEvent<HTMLElement> ) => {
    e.preventDefault()
    
    setClickedNSFW(true)
    
    if (!authUser) {
      setLogin(true)
    } else if (!authUser.oldEnough) {
      setOpenConfirm(true)
    } else {
      setClickedNSFW(false)
      router.push('/?selection=cat3')
    }
    // setClickedNSFW(false)
  }

  const handleConfirm = async () => {
    await updateUserById(authUser?.uid)
    setAuthUser({...authUser, oldEnough: true})
    
    setClickedNSFW(false)
    setOpenConfirm(false)
    
    router.push('/?selection=cat3')
  }

  const handleCancel = () => {
      setOpenConfirm(false)
      router.push('/')
  }

  // const handleRedirect = () => {
  //   setLogin(false)
  //   router.push('/')
  // }

  const handleHome = () => {
    router.push('/')
  }


  return ((isLoading ) ? 
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%', height: '100vh' }}/>
    :
    <div className='w-full flex justify-between items-center bg-[#282828] px-4 md:px-8 text-white sticky top-0 z-[100]'>
      <div onClick={handleHome} className='w-1/2 md:w-1/4 cursor-pointer flex justify-start items-center'>
        {/* <Link 
          href={{
            pathname: '/',
            query: {selection: 'Home'},
            }} 
          className='flex justify-between items-center no-underline'
        > */}
        {/* <div onClick={handleHome} className='cursor-pointer flex justify-between items-center'> */}
          <div className='relative w-[24px] h-[24px] md:w-[48px] md:h-[48px] lg:w-[64px] lg:h-[64px] object-cover'>
              <Image 
                src={Logo} 
                alt="small Wattle Art Creations logo" 
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority={true}  
              />
            </div>
            <p className='text-white text-base md:text-lg xl:text-2xl m-0'>Wattle Art Creations</p>
          {/* </div> */}
        {/* </Link> */}
      </div>

      <div className='hidden md:w-1/2 mx-auto md:flex md:justify-between'>
        {/* Links for Personal Route if not artist*/}
        {( authUser?.roles !== 'Artist') && 
        <div className={`${!authUser || authUser?.roles === 'Customer' ? 'w-10/12 mx-auto' : 'w-1/2'} flex justify-around items-center`}>
          <Link href={{
                  pathname: '/',
                  query: {selection: 'cat1'},
                  }} 
              className="text-lg lg:text-xl no-underline text-center hover:text-cyan-600"
          >
              {categories.cat1.type}
          </Link>
          <Link href={{
                  pathname: '/',
                  query: {selection: 'cat2'},
                  }} 
              className="text-lg lg:text-xl no-underline text-center hover:text-orange-600"
          >
              {categories.cat2.type}
          </Link>
          <button 
            onClick={handleOldEnough}
            className="text-lg lg:text-xl no-underline text-center hover:text-violet-600"
          >
            {categories.cat3.type}
          </button>
        </div> }

        {(authUser && authUser?.roles !== 'Customer') && 
          <div className={`${authUser?.roles === 'Artist' ? 'w-10/12 mx-auto' : 'w-1/2'} flex justify-between items-center`}>
            <div className='pr-4'>
              <Link href='/portraitQueue' className='text-white text-lg lg:text-xl no-underline hover:text-cyan-600'>Portrait Queue</Link>
            </div>
            <div className='pr-4'>
              <Link href={`/artistDashboard/${authUser?.uid}`} className='text-white text-lg lg:text-xl no-underline hover:text-orange-600'>Dashboard</Link>
            </div>
            <div className=''>
              <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-white text-lg lg:text-xl no-underline hover:text-violet-600'>My Portfolio</Link>
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
      </div>
      

      <div className='hidden md:w-4/12 md:flex md:justify-end md:items-center '>
        {authUser?.roles === 'Customer' && 
        <p className='text-xs lg:text-base text-white pr-4'>{authUser?.displayName}</p>}
        
        {authUser?.roles === 'Artist' && 
        <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-sm lg:text-base text-white no-underline pr-4'>{authUser?.displayName}</Link>}
        
        <Link href={`/artistDashboard/`} className='text-xs lg:text-base text-white no-underline pr-4'>Artists</Link>
        
        {!authUser && 
        <button
          onClick={() => setLogin(true)}
          className='text-xs lg:text-base'
        >
            Login / Register
        </button>}


         
        <>
          {authUser?.roles === 'Admin' && <div className='pr-4'>
            <Link href={'/admin'} className='text-xs lg:text-base selection:text-white no-underline'>Admin Dashboards</Link>
          </div>}
          {(authUser?.roles === 'Customer' || authUser?.roles === 'admin') && <div className='pr-4'>
            <Link href={`/dashboard/${authUser.uid}`} className='text-xs lg:text-base text-white no-underline'>Dashboard</Link>
          </div>}
    
          {authUser && 
          <button 
            onClick={signOut}
            className='text-xs lg:text-base'
          >
            Logout
          </button>}
          
          <div className='pl-2 lg:pl-4'>
            <Link 
              // href={'/portraits'} 
              href={{
                  pathname: '/portraits',
                  query: {direct: 'false'},
              }} 
              className='text-white no-underline'
              title='Select cancel portrait to return to cart. Progress will be lost'
            >
              <div className='relative w-[16px] h-[16px] lg:w-[32px] lg:h-[32px] object-cover'>  
                <Image 
                  className=''
                  src={Bag} 
                  alt="shopping cart icon" 
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority={true}  
                />
                {cartLength && 
                  <div className='rounded-full w-5 lg:w-6 -right-2 -top-2 bg-red-600 z-10 absolute flex justify-center items-center'>
                    <p className='text-sm text-white'>{`${cartLength}`}</p>
                  </div>
                }
              </div>
            </Link>
          </div>
        </> 
      </div>
      
      {/* Mobile Nav */}
      <div className='flex justify-between items-center md:hidden'>          
        {authUser?.roles === 'Customer' && 
        <p className='text-sm text-white pr-4'>{authUser?.displayName}</p>}
        
        {authUser?.roles === 'Artist' && 
        <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-sm text-white no-underline pr-4'>{authUser?.displayName}</Link>}

        {isOpen &&
        <button onClick={handleOpenNav} 
          className="absolute top-2 right-2 flex justify-center items-center z-50"
        >
            <CloseIcon className='text-black hover:text-red-600'/>
        </button>
        } 
        
        {isOpen && 
        <div className='absolute top-0 right-0 w-[100vw] h-auto bg-white py-8 z-40'>
          {/* Links for Personal Route if not artist*/}
          {( authUser?.roles !== 'Artist') && 
          <div className={`${!authUser || authUser?.roles === 'Customer' ? 'w-full' : ''} text-[#282828]  flex flex-col justify-around items-center gap-y-2`}>
            <Link href={{
                    pathname: '/',
                    query: {selection: 'cat1'},
                    }} 
                className="text-xl no-underline text-center hover:text-cyan-600"
            >
                {categories.cat1.type}
            </Link>
            <Link href={{
                    pathname: '/',
                    query: {selection: 'cat2'},
                    }} 
                className="text-xl no-underline text-center hover:text-orange-600"
            >
                {categories.cat2.type}
            </Link>
            <button 
              onClick={handleOldEnough}
              className="text-xl no-underline text-center hover:text-violet-600"
            >
              {categories.cat3.type}
            </button>
          </div> }

          {/* Links for artists */}
          {(authUser && authUser?.roles !== 'Customer') && 
            <div className={`${authUser?.roles === 'Artist' ? 'w-full' : ''} text-[#282828] flex justify-between items-center gap-y-2`}>
              <div className=''>
                <Link href='/portraitQueue' className='text-xl no-underline hover:text-cyan-600'>Portrait Queue</Link>
              </div>
              <div className=''>
                <Link href={`/artistDashboard/${authUser?.uid}`} className='text-xl no-underline hover:text-orange-600'>Dashboard</Link>
              </div>
              <div className=''>
                <Link href={`/artistDashboard/${authUser?.uid}/portfolio`} className='text-xl no-underline hover:text-violet-600'>My Portfolio</Link>
              </div>
            </div>
          }
          <div className='w-full text-center mt-2'>
            <Link href={`/artistDashboard/`} className='w-full text-center text-xl text-[#282828] no-underline'>Artists</Link>
          </div>

          {authUser?.roles === 'Admin' && 
          <div className='w-full text-center  mt-2'>
            <Link href={'/admin'} className='text-[#282828] text-xl no-underline hover:text-yellow-600'>Admin Dashboards</Link>
          </div>}
          {(authUser?.roles === 'Customer' || authUser?.roles === 'admin') && 
          <div className='w-full text-center mt-2'>
            <Link href={`/dashboard/${authUser.uid}`} className='text-[#282828] text-xl no-underline hover:text-green-600'>Dashboard</Link>
          </div>}

          {!authUser && 
          <button
            onClick={() => setLogin(true)}
            className='w-full mt-2 text-center text-[#282828] text-xl hover:text-teal-600'
          >
              Login / Register
          </button>}
    
          {authUser && 
          <button 
            onClick={signOut}
            className='w-full mt-2 text-center text-[#282828] text-xl hover:text-red-600'
          >
            Logout
          </button>}
        </div>} 
        
        
   

        {!isOpen && <button onClick={handleOpenNav} 
          className="flex flex-col justify-center items-center gap-y-1"
        >
          <span 
          className={`bg-white block h-0.5 w-6 rounded-sm`} 
          ></span>
          <span 
          className={`bg-white block h-0.5 w-6 rounded-sm my-0.5`}
          ></span>
          <span 
          className={`bg-white block h-0.5 w-6 rounded-sm`}
          ></span>
        </button>}

        {/* {isOpen &&
        <button onClick={handleOpenNav} 
          className="absolute top-2 right-2 flex justify-center items-center"
        >
            <CloseIcon className='text-black hover:text-red-600'/>
        </button>
        }  */}
            


        <div className='pl-4'>
          <Link 
            href={{
                pathname: '/portraits',
                query: {direct: 'false'},
            }} 
            className={`${isOpen ? 'text-white' : 'text-[#282828]'} no-underline`}
            title='Select cancel portrait to return to cart. Progress will be lost'
          >
            <div className='relative w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] object-cover'>  
              <Image 
                className=''
                src={Bag} 
                alt="shopping cart icon" 
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority={true}  
              />
              {cartLength && 
                <div className='rounded-full w-4 absolute -right-1 top-0 bg-red-600 z-10 flex justify-center items-center'>
                  <p className='text-xs text-white'>{`${cartLength}`}</p>
                </div>
              }
            </div>
          </Link>
        </div>
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


      {/* {currentUrl === '/' ?
        <Dialog onClose={() => setLogin(false)} open={login}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Dialog>
      : */}
        <LoginDialog
          selection={clickedNSFW ? 'cat3' : 'Photorealistic'}
          customizer={false}
          login={login}
          setLogin={setLogin}
        />
      {/* } */}
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


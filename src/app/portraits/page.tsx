'use client'

import '../globals.css'
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth, app } from '@/app/firebase/firebase';
import PortraitCustomizer from './components/PortraitCustomizer';
import { PortraitData } from './components/PortraitCustomizer';
import { getPortrait } from '../firebase/firestore';
import Footer from '../components/Footer';
import { getCheckoutUrl } from '../firebase/firestore';

// Configure FirebaseUI., 
const uiConfig = {
  signInFlow: 'popup', 
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
  },
};

export default function Portraits() {

  const searchParams = useSearchParams()
  const selection: string | null = searchParams.get('selection')
  const direct: string | null = searchParams.get('direct')
  const portraitId = searchParams.get('portrait_id')
  const continueEdit = searchParams.get('edit')
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [login, setLogin] = useState(false);

  const [portraits, setPortraits] = useState<Array<PortraitData>>(sessionStorage?.getItem("Cart") && sessionStorage?.getItem("Cart")?.length ? JSON.parse((sessionStorage.getItem("Cart")!)) : [])
  const [openWizard, setOpenWizard] = useState(false)
  const [editIndex, setEditIndex] = useState<number>(0)
  const [editPortrait, setEditPortrait] = useState<PortraitData | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)

  const defaultImgs : any = {
    Photorealistic: '/images/defaultImgs/photo.png',
    Anime: '/images/defaultImgs/anime.png',
    NSFW: '/images/defaultImgs/nsfw.png',
  }

  useEffect(() => {
    if (!isLoading && !authUser && portraits.length !== 0) {
        setLogin(true)
    } else if (authUser) {
      setLogin(false)
    }
  }, [authUser, isLoading]);

  //update cart context on portrait addition
  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem('Cart')!))
    console.log('portraits: ', portraits)
    // if (sessionStorage.getItem('Cart') !== null) {
    //   const removePurchasedPortraits = JSON.parse(sessionStorage.getItem('Cart')!).filter((p: PortraitData) => !p.paymentComplete)
    //   console.log('removedPurchsed Portrrait: ', removePurchasedPortraits)
    // }
    
    
    sessionStorage.setItem('Cart', JSON.stringify(portraits))
    window.dispatchEvent(new Event("storage"))
  }, [portraits])

  useEffect(() => {
    if (portraitId && continueEdit) {
      const handleGetPortrait = async () => {
        const addedPortrait: PortraitData | null = await getPortrait(portraitId)
        
        
        if (addedPortrait) {
          setEditIndex(portraits.length)
          setPortraits(prev => [...prev, addedPortrait])
          setEditPortrait(addedPortrait)
        } 
        
        setOpenWizard(true)
      }
      
      handleGetPortrait()
      
    } else if (portraitId && !continueEdit) {
      const handleGetPortrait = async () => {
        const addedPortrait: PortraitData | null = await getPortrait(portraitId)

        if (addedPortrait) setPortraits(prev => [...prev, addedPortrait])
      }
      
      handleGetPortrait()
    } 
    else {
      if ((portraits.length === 0 && direct === 'true')) {
        setOpenWizard(true)
      } else {
        setOpenWizard(false)
      }
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [portraits])

  const portraitList = portraits?.map((portrait, i) => (
    <div className='w-11/12 bg-white rounded-lg mb-4 p-4 flex justify-between items-center relative' key={i}>
      <button 
        type="button" 
        onClick={() => handleDelete(i)} 
        className='absolute top-2 right-2 ml-4 hover:text-red-600 '
        title='Remove from order? Unordered portraits can be found on your dashboard'
      >
          <DeleteForeverIcon />
      </button>

      <div className='w-[150px] h-[150px] object-cover object-top rounded-xl overflow-hidden'>
        <img 
          src={portrait?.images.length > 0 ? portrait?.images[0].imageUrls[0] : defaultImgs[portrait?.mode]} 
          alt={`default image for ${portrait?.mode} portrait`} 
          className='w-[100%] h-[100%] rounded-xl'
        />
      </div>

      <div className='w-1/2 flex flex-wrap'>
        <div className='w-full flex justify-center'>
          <p className='text-2xl font-semibold text-black text-center mb-2'>{portrait?.portraitTitle} <span className='text-lg text-[#43b4e4] font-semibold'>({portrait?.mode})</span></p>
          <button type="button" onClick={() => handleEdit(i)} className='hover:text-[#43b4e4] ml-4'>
            <EditIcon />
          </button>
        </div>

        <div className=''>
          <p className='text-black text-lg'>Characters:</p>
          <div className='mt-[6px] flex justify-start'>  
            {portrait?.characters.map((char, i) => <img key={i} className='w-[32px] h-[32px] mr-2' src='/images/customizer/character.png' alt='small human icon'/>)}
          </div>
        </div>


        <div className='w-6/12 ml-16'>
          <p className='text-black text-lg'>Uploaded Images:</p>
          <div className='flex mt-2'>
            {portrait?.images.length
              ? portrait.images.map((imgSet, i) => 
                <div key={i} className='flex justify-around items-center border-2 border-[#282828] rounded-lg p-2 mr-2'>
                  {imgSet.imageUrls.map((url, i) => <img className="w-[32px] h-[32px] mx-2" key={i} src={url} alt='thumbnail of customer uploaded image'/>)}
                </div>)
              : <p className='text-sm text-red-600'>(No images uploaded)</p>}
          </div>
        </div>

      </div>
      
      
      <div className=''>
        <p className='text-black mt-2 text-xl font-semibold'>Price:  ${portrait?.price}</p>
      </div>
    </div>
  ))


  const checkoutList = portraits?.map((portrait, i) => (
    <div className='w-full flex justify-between items-center mt-4' key={i}>
      <p className='text-lg font-semibold'>{portrait?.portraitTitle} <span className='text-sm'>({portrait.mode})</span></p>
      <p>${portrait.price.toFixed(2)}</p>
    </div>
  ))

  const checkout = async () => {
    const checkoutUrl = await getCheckoutUrl(portraits, authUser.uid)
    router.push(checkoutUrl)
  }

  const checkoutButton = (
    <button
      onClick={checkout}
      className="z-50 text-3xl font-semibold mt-8 py-2 px-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Checkout
      </div>
    </button>
  );
  

  const handleEdit = (i: number) => {
    setEditPortrait(portraits[i])
    setEditIndex(i)
    setOpenWizard(true)
  }

  const handleDelete = (i: number) => {
    // alert('Portraits removed from your cart are not deleted. They can be found on your dashboard to be ordered at a later time')
    let deletePortraitArr = portraits.filter((portrait, index) => index !== i)
    setTotalPrice(deletePortraitArr.reduce((sum, portrait) => sum += portrait.price, 0))
    setPortraits(deletePortraitArr)
  }
  // bg-gradient-to-b from-black from-50% to-[#282828] to-80%

  return (isLoading ?
    <></>
    : <div className='relative min-h-[100vh] bg-gradient-to-b from-black from-0% via-[#282828] via-40% to-black to-60%'>
  
      <div className='flex flex-col space-y-4 items-center min-h-screen text-black pb-8'>
        {!openWizard && <h1 className='font-serif text-white text-6xl mt-16 mb-4 font-bold'>My Cart</h1>}

        {/* Display the cart */}
        <div className='w-full flex justify-between items-stretch px-8'> 
          {!openWizard && 
          <>
            <div className='w-8/12 flex flex-col justify-start items-center'>
              {portraits.length === 0 
                ? <div className='flex flex-col justify-start items-center border border-white/25 rounded-xl p-8 text-white shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] hover:border-[#ffffff]/50'>
                    <h2 className='text-5xl'>Your Cart is Empty!</h2>
                    <div className='flex flex-col justify-between items-center mt-8'>
                      <button onClick={() => setOpenWizard(true)} className='text-xl font-bold p-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center cursor-pointer hover:scale-105 transition duration-200 ease-in-out'>
                        Create a Portrait
                      </button>
                      <p className='text-xl mt-4'>or</p>
                      <div className='flex flex-col justify-center items-center mt-2'>
                        <p className='text-2xl text-center font-semibold'>Visit your dashboard and add a portrait to your cart</p>
                        <div className='mt-8 rounded-xl w-1/4 h-auto mx-auto bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] hover:text-white  hover:bg-[#43b4e4] hover:scale-105 z-20'>
                        <div className="flex flex-col justify-between h-full bg-black rounded-lg p-4">
                          <Link 
                            href={`/dashboard/${authUser?.uid}`} 
                            className='text-xl font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] text-transparent bg-clip-text'
                          >
                            Dashboard
                          </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                : <>
                    {portraitList}
                    <button onClick={() => setOpenWizard(true)} className='rounded-xl w-1/4 h-auto mx-auto mt-10 bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] hover:text-white  hover:bg-[#43b4e4] hover:scale-105 z-20'>
                      <div className="flex flex-col justify-between h-full bg-black rounded-lg p-4">
                        <p className='text-xl font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] text-transparent bg-clip-text'>Create Another Portrait</p>
                      </div>
                      
                    </button>
                  </>}
              
            </div>

            <div className='w-4/12 flex flex-col justify-start items-center z-30'>
              <div className='w-11/12 p-4 bg-[#E5E5E5] rounded-lg flex flex-col justify-between items-center'>
                <h2 className='text-2xl font-bold'>Payment</h2>
                <div className='w-full'>
                  {checkoutList}
                </div>
                <div className="w-full border-b-2 border-[#282828] my-4"></div>
                <div className='self-end flex justify-end items-center'>
                  <p className='text-xl font-semibold'>Total</p>
                  <p className='ml-4 border-2 border-[#282828] bg-white py-2 px-4 rounded-md text-xl'>$<span>{totalPrice.toFixed(2)}</span></p>
                </div>
              </div>
              {/* Wizard closed show calculate price button */}
              { (portraits.length !== 0 && authUser) && 
                  <div>{checkoutButton}</div>
              }
            </div>
          </>
          }
        </div>
        
        
        {/* Display the portrait wizard */}
        { openWizard && 
          <PortraitCustomizer 
            selection={selection} 
            setOpenWizard={setOpenWizard} 
            setPortraits={setPortraits}
            editPortrait={editPortrait}
            setEditPortrait={setEditPortrait}
            editIndex={editIndex}
            portraits={portraits}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          /> 
        }
        
        
        { (!openWizard && portraits.length !== 0 && !authUser) && 
          <div>
            <p>Please login to continue</p>
            <Button variant="contained" color="secondary"
              onClick={() => setLogin(true)}>
              Login / Register
            </Button>
          </div>
        }
        

        {/* Prompt for login */}
        <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Dialog>

        
      </div>
      <object type="image/svg+xml" data="/images/customizer/customizer.svg" className="absolute -top-1 left-0 w-full"/>
      <Footer />
    </div>
  )
}


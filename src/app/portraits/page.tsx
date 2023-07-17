'use client'

import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import PortraitCustomizer from './components/PortraitCustomizer';

// Configure FirebaseUI., 
const uiConfig = {
  signInFlow: 'popup', 
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
  },
};

export default function Portraits() {

  const searchParams = useSearchParams()
  const selection = searchParams.get('selection')

  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [login, setLogin] = useState(false);

  const [portraits, setPortraits] = useState([])
  const [openWizard, setOpenWizard] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [editPortrait, setEditPortrait] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (portraits.length === 0 && !openWizard) setOpenWizard(true)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [portraits])

  const portraitList = portraits?.map((portrait, i) => (
    <div className='w-11/12 border-2 border-black rounded-lg mb-4 py-4 px-10 flex flex-wrap justify-between items-start relative' key={i}>
      <button 
        type="button" 
        onClick={() => handleDelete(i)} 
        className='absolute top-2 right-2 ml-4 hover:text-red-600 '
        title='Remove from order? Unordered portraits can be found on your dashboard'
      >
          <DeleteForeverIcon />
      </button>
      <div className='w-full flex justify-center'>
        <p className='text-2xl font-semibold text-[#0075FF] text-center mb-2'>{portrait?.portraitTitle} <span className='text-lg text-black font-semibold'>({portrait?.mode})</span></p>
        <button type="button" onClick={() => handleEdit(i)} className='hover:text-[#0075FF] ml-4'>
          <EditIcon />
        </button>
      </div>
      
      
      <div>
        <p className='text-black text-lg'># of characters:<span className='font-semibold ml-2'>{portrait?.characters.length}</span></p>
        <div className='flex justify-start'>  
          {portrait?.characters.map((char, i) => <img key={i} className='w-[32px] h-[32px] mr-2' src='./customizer/character.png'/>)}
        </div>
      </div>
      <div className='w-6/12'>
        <p className='text-black text-lg'>Uploaded Images:</p>
        <div className='flex mt-2'>
          {portrait.uploadedImageUrls.length === 0
            ? <p className='text-sm text-red-600'>(No images uploaded)</p>
            : portrait.uploadedImageUrls.map((img, i) => <img className="w-[32px] h-[32px] mr-4" key={i} src={img}/>)}
        </div>
      </div>
      
      <div>
        <p className='text-black mt-2 text-lg'>Price:  ${portrait?.price}</p>
      </div>
    </div>
  ))


  const checkoutList = portraits?.map((portrait, i) => (
    <div className='w-full flex justify-between items-center mt-4' key={i}>
      <p className='text-lg font-semibold'>{portrait?.portraitTitle} <span className='text-sm'>({portrait.mode})</span></p>
      <p>${portrait.price.toFixed(2)}</p>
    </div>
  ))
  

  const handleEdit = (i) => {
    setEditPortrait(portraits[i])
    setEditIndex(i)
    setOpenWizard(true)
  }

  const handleDelete = (i) => {
    alert('Portraits removed from your cart are not deleted. They can be found on your dashboard to be ordered at a later time')
    let deletePortraitArr = portraits.filter((portrait, index) => index !== i)
    setTotalPrice(deletePortraitArr.reduce((sum, portrait) => sum += portrait.price, 0))
    setPortraits(deletePortraitArr)
  }



  return (
    <div className='flex flex-col space-y-4 items-center min-h-screen bg-white text-black'>
      {!openWizard && <h1 className='text-3xl my-8 font-bold'>My Cart</h1>}

      {/* Display the cart */}
      <div className='w-full flex justify-between items-stretch px-8'> 
        {!openWizard && 
        <>
          <div className='w-8/12 flex flex-col justify-start items-center'>
            {portraits.length === 0 
              ? <div className='flex flex-col justify-start items-center border-2 border-[#282828] rounded-xl p-8'>
                  <h2 className='text-5xl'>Your Cart is Empty!</h2>
                  <div className='flex flex-col justify-between items-center mt-8'>
                    <button onClick={() => setOpenWizard(true)} className='text-xl text-black hover:text-white bg-white hover:bg-[#282828] border-2 border-[#282828] rounded-lg p-2'>
                      Create a Portrait
                    </button>
                    <p className='text-xl mt-4'>or</p>
                    <div className='flex flex-col justify-center items-center mt-2'>
                      <p className='text-2xl text-center font-semibold'>Visit your dashboard and add a portrait to your cart</p>
                      <div className='mt-8'>
                        <Link 
                          href={`/dashboard/${authUser?.uid}`} 
                          className='text-xl text-[#0075FF] hover:text-white bg-white hover:bg-[#0075FF] border-2 border-[#0075FF] py-2 px-4 rounded-xl no-underline'
                        >
                          Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                </div> 
              : <>
                  {portraitList}
                  <button onClick={() => setOpenWizard(true)} className='text-black hover:text-white bg-white hover:bg-[#282828] border-2 border-[#282828] rounded-lg p-2 mt-10'>
                    Add Another Portrait
                  </button>
                </>}
            
          </div>
          <div className='w-4/12 flex flex-col justify-start items-center'>
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
              <a 
                onClick={async () => {
                  try {
                    await fetch('http://localhost:3000/api/payment', {
                      method: 'POST',
                      body: JSON.stringify({
                        items: portraits,
                      }),
                    })
                    .then(response => response.json())
                    .then(response => {
                      console.log('response.session on front end: ', response.session);
                      router.push(response.session.url)
                      // window.location.href = response.session.url;
                    })
                  } catch (err) {
                    console.log('fetch error: ', err)
                  }
                  
                }}
                className="flex items-center justify-center rounded-md border-2 border-[#0075FF] bg-[#0075FF] px-6 py-3 text-base font-medium cursor-pointer text-white mt-4 hover:scale-105"
              >
                Checkout
              </a>
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
        /> }
      
      
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
  )
}


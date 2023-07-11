'use client'

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

  const portraitList = portraits?.map((portrait, i) => (
    <div className='w-11/12 border-2 border-black rounded-lg mb-4 p-4 flex justify-between items-center' key={i}>
      <div>
        <p className='text-black'>{portrait?.mode}</p>
        <p className='text-black'>Portrait Name: {portrait?.portraitTitle}</p>
        <p className='text-black'>Uploaded Images:</p>
        <div className='flex'>
          {portrait.uploadedImageUrls.map((img, i) => <img key={i} src={img} className='ml-4'/>)}
        </div>
      </div>
      <div>
        <p className='text-black'># of characters: {portrait?.characters.length}</p>
        <p className='text-black'>Price:  ${portrait?.price}</p>
      </div>
      <div>
        <button type="button" onClick={() => handleEdit(i)} className=' border-2 border-black rounded-md p-2 '>
            <EditIcon />
        </button>
        <button type="button" onClick={() => handleDelete(i)} className='ml-4 border-2 border-black rounded-md p-2 '>
            <DeleteForeverIcon />
        </button>
      </div>
    </div>
  ))


  const checkoutList = portraits?.map((portrait, i) => (
    <div className='w-full flex justify-between items-center mt-4' key={i}>
      <p>{portrait?.portraitTitle} (Style: {portrait.mode})</p>
      <p>${portrait.price}</p>
    </div>
  ))
  

  const handleEdit = (i) => {
    console.log('portraits[i] is: ', portraits[i])
    setEditPortrait(portraits[i])
    setEditIndex(i)
    setOpenWizard(true)
  }

  const handleDelete = (i) => {
    let deletePortraitArr = portraits.filter((portrait, index) => index !== i)
    setPortraits(deletePortraitArr)
  }



  return (
    <div className='flex flex-col space-y-4 items-center min-h-screen bg-white text-black'>
      {!openWizard && portraits.length !== 0 && <h1 className='text-3xl my-8 font-bold'>My Cart</h1>}

      {/* Display the cart */}
      <div className='w-full flex justify-between items-stretch px-8'> 
        {!openWizard && 
        <>
          <div className='w-8/12 flex flex-col justify-start items-center'>
            {portraits.length === 0 
              ? <p>No Portraits Yet!</p> 
              : <>{portraitList}</>}
            <button onClick={() => setOpenWizard(true)} className='text-black border-2 border-black rounded-lg p-2 mt-10'>
              {portraits.length === 0 ? 'Create a Portrait' : 'Add Another Portrait'}
            </button>
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
                <p className='ml-4'>$<span>{totalPrice}</span></p>
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
                      console.log('response on front end: ', response);
                      router.push(response.session.url)
                      // window.location.href = response.session.url;
                    })
                  } catch (err) {
                    console.log('fetch error: ', err)
                  }
                  
                }}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium cursor-pointer text-white"
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


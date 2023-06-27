'use client'

import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { addPortrait } from '../firebase/firestore';
import PortraitCustomizer from './components/PortraitCustomizer';

// Configure FirebaseUI., 
const uiConfig = {
  signInFlow: 'popup', 
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
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

  // useEffect(() => {
  //   setTotalPrice(portraits?.reduce((sum, p) => sum += p.price, 0))
  // }, portraits)

  const portraitList = portraits?.map((portrait, i) => (
    <div className='w-11/12 border-2 border-black rounded-lg mb-4 p-4 flex justify-between items-center' key={i}>
      <div>
        <p className='text-black'>{portrait?.mode}</p>
        <p className='text-black'>Portrait Name: {portrait?.portraitTitle}</p>
        <p className='text-black'>Customer Name: {portrait?.customer}</p>
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
    <div className='w-full flex justify-between items-center mt-4'>
      <p>{portrait?.portraitTitle} (Style: {portrait.mode})</p>
      <p>${portrait.price}</p>
    </div>
  ))

  const handleEdit = (i) => {
    setEditPortrait(portraits[i])
    setEditIndex(i)
    setOpenWizard(true)
  }

  const handleDelete = (i) => {
    let deletePortraitArr = portraits.filter((portrait, index) => index !== i)
    setPortraits(deletePortraitArr)
  }

  async function handlePay () {
    // for (const portrait of portraits) {
    //   await addPortrait({...portrait, customerId: authUser.uid, customer: authUser.displayName });
    // }
    console.log('calling Stripe');
    // router.push(`/dashboard/${authUser.uid}`)
  }

  console.log('portraits is : ', portraits)

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
            { (portraits.length !== 0 && authUser) && 
              <button onClick={handlePay} className='w-1/2 text-black border-2 border-black rounded-lg p-2 mt-10 mx-auto'>
                Place Order
              </button>
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
          setTotalPrice={setTotalPrice}
        /> }
      
      {/* Wizard closed show calculate price button */}
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
      
      {/* <div className='flex justify-around items-center mt-10 w-10/12'>
        <Link href='/personal' className='block'>Return to Personal Landing Page</Link>
        {authUser && <Link href={`/dashboard/${authUser.uid}`} className='block'>My Dashboard</Link>}
      </div> */}
    </div>
  )
}


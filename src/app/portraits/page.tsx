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

  useEffect(() => {
    if (portraits.length === 0 && !openWizard) setOpenWizard(true)
  }, [])

  const portraitList = portraits?.map((portrait, i) => (
    <div className='w-10/12 border-2 border-black rounded-lg mt-4 p-4 flex justify-between items-center' key={i}>
      <div>
        <p className='text-black'>{portrait?.mode}</p>
        <p className='text-black'>Customer ID: {authUser?.uid}</p>
      </div>
      <div>
        <button onClick={() => handleEdit(i)} className=' border-2 border-black rounded-md p-2 '>
            <EditIcon />
        </button>
        <button onClick={() => handleDelete(i)} className='ml-4 border-2 border-black rounded-md p-2 '>
            <DeleteForeverIcon />
        </button>
      </div>
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
    <div className='flex flex-col justify-around items-center min-h-screen bg-white text-black'>
      {!openWizard && portraits.length !== 0 && <h1 className='text-2xl'>My Pending Portraits</h1>}

      {/* Display the cart */}
      <div className='w-full flex flex-col items-center'> 
        {!openWizard && 
        <>
          {portraits.length === 0 ? <p>No Portraits Yet!</p> : <>{portraitList}</>}
          <button onClick={() => setOpenWizard(true)} className='text-black border-2 border-black rounded-lg p-2 mt-4'>
            {portraits.length === 0 ? 'Create a Portrait' : 'Add Another Portrait'}
          </button>
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
      { (!openWizard && portraits.length !== 0 && authUser) && 
        <button onClick={handlePay} className='text-black border-2 border-black rounded-lg p-2 mt-10'>
          Pay Now
        </button>
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


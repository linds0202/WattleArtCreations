'use client'

import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { addPortrait } from '../firebase/firestore';
import * as React from 'react';
import PortraitWizard from './components/portraitWizard';

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
  const styleOne = searchParams.get('styleOne')

  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [login, setLogin] = useState(false);


  const [portraits, setPortraits] = useState([])
  const [openWizard, setOpenWizard] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [editPortrait, setEditPortrait] = useState(null)

  const portraitList = portraits?.map((portrait, i) => (
    <div key={i}>
      <div>
        <p className='text-white'>{portrait?.styleOne} &gt; {portrait?.styleTwo} &gt; {portrait?.styleThree}</p>
        <p className='text-white'>Customer ID: {authUser.uid}</p>
      </div>
      <button onClick={() => handleEdit(i)} className=' border-2 border-white rounded-md p-2 '>
          <EditIcon />
      </button>
      <button onClick={() => handleDelete(i)} className=' border-2 border-white rounded-md p-2 '>
          <DeleteForeverIcon />
      </button>
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

  async function handleCalculate () {
    for (const portrait of portraits) {
      await addPortrait({...portrait, customer: authUser.uid });
    }
    console.log('added them to database');
    console.log('calculating your custom quote')
    router.push(`/dashboard/${authUser.uid}`)
  }

  return (
    <div className='flex flex-col justify-around items-center min-h-screen bg-black text-white'>
      {!openWizard && <h1 className='text-2xl'>My Pending Portraits</h1>}

      {/* Show portraits */}
      { portraits.length === 0 && !openWizard
        ? (
          <>
            
            <p>No Portraits Yet!</p>
            <button onClick={() => setOpenWizard(true)} className='text-white border-2 border-white rounded-lg p-2' >Start New Portrait</button>
          </>
          )
        : <div>
            {portraitList}
            {!openWizard && <button onClick={() => setOpenWizard(true)} className='text-white border-2 border-white rounded-lg p-2' >Add Another Portrait</button>}
          </div>
      }
      
      {/* Display the portrait wizard */}
      { openWizard && <PortraitWizard editPortrait={editPortrait} setEditPortrait={setEditPortrait} editIndex={editIndex} portraits={portraits} setPortraits={setPortraits} setOpenWizard={setOpenWizard} styleOne={styleOne}/> }
      
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
        <button onClick={handleCalculate} className='text-white border-2 border-white rounded-lg p-2 mt-10' >Calculate Quote</button>
      }

      {/* Prompt for login */}
      <Dialog onClose={() => setLogin(false)} open={login}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </Dialog>
      
      <div className='flex justify-around items-center mt-10 w-10/12'>
        <Link href='/personal' className='block'>Return to Personal</Link>
        {authUser && <Link href={`/dashboard/${authUser.uid}`} className='block'>My Dashboard</Link>}
      </div>
    </div>
  )
}


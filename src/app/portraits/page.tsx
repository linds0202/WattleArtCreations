'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { Button, Dialog } from '@mui/material';
import { Formik, Form} from 'formik';

import { addPortrait } from '../firebase/firestore';
import StepOne from './components/questionaire/StepOne';
import StepTwo from './components/questionaire/StepTwo';

interface PortraitData  {
  mode: String, 
  characters: [],
  questions: [{}, {}, {}, {}, {}], 
  price: Number,
  customer: String,
  customerId: '',
  artist: String,
  date: Date,
  status: String,
  lastUpdatedStatus: Date,
  paymentComplete: Boolean,
}

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

  const [portraitData, setPortraitData] = useState<PortraitData>({
    mode: `${selection}`, 
    characters: [],
    questions: [{}, {}, {}, {}, {}],
    price: 0,
    customer: '',
    customerId: '',
    artist: '',
    date: new Date(),
    status: '',
    lastUpdatedStatus: new Date(),
    paymentComplete: false,
  })

  const [chars, setChars] = useState(portraitData.characters)
  const [pet, setPet] = useState(false)
  const [charSheet, setCharSheet] = useState(false)
  const [weaponSheet, setWeaponSheet] = useState(false)

  const submitPortrait = async (portraitFormData: PortraitData) => {
  
    const newPortrait = {...portraitFormData, characters: chars, customerId: authUser?.uid}
    addPortrait(newPortrait)
    router.push(`/dashboard/${authUser?.uid}`)
  }    

  return (
    <div className='flex flex-col justify-around items-center min-h-screen bg-white text-black'>
      {/* Wizard open but not logged in */}
      { (!authUser) && 
        <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[300px] h-[400px] rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4'>
          <h3 className='text-2xl font-bold'>Please login to continue</h3>
          <p>In order to fully customize your portrait, please login or create an account</p>
            <Button variant="contained" color="secondary"
              onClick={() => setLogin(true)}>
              Login / Register
          </Button>
        </div>
      }

      {/* Display the portrait wizard */}
      { authUser && 
         <div className="w-11/12 mx-auto">
              <Formik
                  initialValues={portraitData}
                  onSubmit={submitPortrait}
              >
              {({ values }) => (
                  <Form className='w-full '>
                      <StepOne 
                          portraitData={portraitData} 
                          setPortraitData={setPortraitData}
                          chars={chars}
                          setChars={setChars} 
                          setPet={setPet}
                          setCharSheet={setCharSheet}
                          setWeaponSheet={setWeaponSheet} 
                      />
                      {chars.length !== 0 && <div>
                          <h3>Let us know more. . .</h3>
                          <StepTwo 
                              pet={pet}
                              charSheet={charSheet}
                              weaponSheet={weaponSheet} 
                          />
                      </div>}
                      <div className='mt-8 w-full flex justify-around items-center'>
                          <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                              Finish Portrait
                          </button>
                      </div>
                  </Form>
              )}
          </Formik>
      </div>
      }

      {/* Prompt for login */}
      <Dialog onClose={() => setLogin(false)} open={login}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </Dialog>
      
      <div className='flex justify-around items-center mt-10 w-10/12'>
        <Link href='/personal' className='block'>Return to Personal Landing Page</Link>
        {authUser && <Link href={`/dashboard/${authUser.uid}`} className='block'>My Dashboard</Link>}
      </div>
    </div>
  )
}


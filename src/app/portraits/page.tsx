'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
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

//Configure FirebaseUI
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

const prices = {
  Photorealistic: {
      Headshot: 100,
      Half: 130,
      Full: 150,
      model: 150,
      character: 120,
      weapons: 125
  },
  Anime: {
      Headshot: 120,
      Half: 140,
      Full: 200
  },
  NSFW: {
      Headshot: 150,
      Half: 200,
      Full: 225
  }
}

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

  const handleLogin = () => {
    setLogin(true)
  }

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (authUser) {
      setLogin(false)
    }
  }, [authUser])

  const submitPortrait = async (portraitFormData: PortraitData) => {
  
    const newPortrait = {...portraitFormData, characters: chars, customerId: authUser?.uid}
    addPortrait(newPortrait)
    router.push(`/dashboard/${authUser?.uid}`)
  }  
  

  return (
    <div className='flex flex-col justify-around items-center min-h-screen bg-white text-black pb-10'>
      <div className="h-[150px] w-full flex flex-col justify-center items-center">
        <h2 className="w-full text-4xl text-center">Welcome to the {selection} Portrait Customizer</h2>
        <p className="w-full text-center pt-4">Make your selections to customize your portrait</p>
      </div>
      {/* Display the portrait wizard */}
         <div className="w-full px-4">
              <Formik
                  initialValues={portraitData}
                  onSubmit={submitPortrait}
              >
              {({ values }) => (
                  <Form className='w-full '>
                      <div className='flex flex-between'>
                        <StepOne 
                          prices={prices}
                          portraitData={portraitData} 
                          chars={chars}
                          setChars={setChars} 
                          setPet={setPet}
                          setCharSheet={setCharSheet}
                          setWeaponSheet={setWeaponSheet} 
                        />
                        {chars.length !== 0 && 
                          <div className='w-6/12 px-8'>
                            <h3 className='text-xl font-bold'>Let us know more. . .</h3>
                            <StepTwo 
                                pet={pet}
                                charSheet={charSheet}
                                weaponSheet={weaponSheet} 
                            />
                          </div>
                        }
                      </div>
                      
                      <div className='mt-8 w-full flex justify-around items-center'>
                        {authUser && <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                            Calculate Price
                        </button>}
                        {!authUser && chars.length !== 0 && <Button onClick={handleLogin} className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                            Login/Create Account to Continue
                        </Button>}
                        {/* Prompt for login */}
                        <Dialog onClose={() => setLogin(false)} open={login}>
                          {!authUser && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
                        </Dialog>
                      </div>
                  </Form>
              )}
          </Formik>
      </div>
      
      {/* <div className='flex justify-around items-center mt-10 w-10/12'>
        <Link href='/personal' className='block'>Return to Personal Landing Page</Link>
        {authUser && <Link href={`/dashboard/${authUser.uid}`} className='block'>My Dashboard</Link>}
      </div> */}
    </div>
  )
}


'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getPortrait } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';

type Params = {
  params: {
    portraitId: string
  }
}

interface PortraitData {
  uid: String,
  styleOne: String, 
  styleTwo: String, 
  styleThree: String, 
  characters: [],
  questions: [], 
  price: Number,
  customer: String,
  artist: String,
  date: Timestamp,
  status: String,
  lastUpdatedStatus: Timestamp,
  paymentComplete: Boolean,
}

export default function PortraitDetails({ params: { portraitId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [portrait, setPortait] = useState<PortraitData>()

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    const handleGetPortrait = async () => {
      const portrait = await getPortrait(portraitId);
      setPortait(portrait)
    }

    handleGetPortrait()
  }, [])

  const charList = portrait?.characters.map((char, i) => (
    <div className='border-2 border-black mt-4 pl-4'>
        <p>Char {i} : </p>
        <p>Body Style: {char.bodyStyle}</p>
        <p># Character Variations: {char.numCharVariations}</p>
        <p># Pets: {char.numPets}</p>
        <p>Extras: {char.extras.length === 0 ? 'None' : char.extras.join(', ')}</p>
    </div>
    
  ))

  console.log(charList)

  return ((!authUser) ? 
    <p className='min-h-screen'>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3 '>
    <h1 className='text-2xl text-center'>Portrait Details</h1>
    <div className='mx-10 flex justify-between'>
        <div className='w-3/12'>
            <div className='w-full h-[300px] border-2 border-black'>
                <p>Image goes here</p>
            </div>
            <div>
                <button className='border-2 border-black rounded-lg p-2 mt-4 mx-auto'>Complete Commission</button>
            </div>
        </div>
        
        <div className='w-3/12'>
            <p>Portrait Id: {portrait?.uid}</p>
            <p>{portrait?.styleOne} &gt; {portrait?.styleTwo} &gt; { portrait?.styleThree }</p>
            <p>Portrait Customer Id: {portrait?.customer}</p>
            {charList}
            <button className='border-2 border-black rounded-lg p-2 mt-4 mx-auto'>Upload Photo</button>
        </div>  
        <div className='w-4/12 '>
            <p>Artist Id: {portrait?.artist}</p>
            <div className='w-full h-[300px] border-2 border-black flex flex-col justify-between'>
                <p className='text-center'>Chat box is here</p>
                <button className='border-2 border-black rounded-lg p-2 my-4 mx-auto'>Send</button>
            </div>
            
        </div> 
    </div>
    <div className='w-6/12 mx-auto mb-6 text-center'>
        <Link href='/personal' className='block'>Return to Homepage</Link> 
    </div>
  </div>
  )
}

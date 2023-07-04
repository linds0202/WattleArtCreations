'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getPortrait } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import ChatBox from './components/ChatBox';
import UploadImg from './components/UploadImageDialogueBox';

type Params = {
  params: {
    portraitId: string
  }
}

interface PortraitData {
  uid: String,
  mode: String, 
  portraitTitle: String,
  characters: [],
  questions: [], 
  price: Number,
  customer: String,
  customerId: String,
  artist: String,
  date: Timestamp,
  status: String,
  lastUpdatedStatus: Timestamp,
  paymentComplete: Boolean,
  images: []
}

export default function PortraitDetails({ params: { portraitId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [action, setAction] = useState(false)

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

  const handleUpload = () => {
    setAction(true)
  }


  const charList = portrait?.characters.map((char, i) => (
    <div className='border-2 border-black mt-4 pl-4'>
        <p>Char {i + 1} : </p>
        <p>Body Style: {char.bodyStyle}</p>
        <p># Character Variations: {char.numCharVariations}</p>
        <p># Pets: {char.numPets}</p>
        <p>Extras: {char.extras.length === 0 ? 'None' : char.extras.join(', ')}</p>
    </div>
    
  ))



  return ((!authUser) ? 
    <p className='min-h-screen'>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3 '>
    <h1 className='text-2xl text-center'>{portrait?.portraitTitle}</h1>
    <div className='mx-10 flex justify-between'>
      <div className='w-3/12'>
          <div className='w-full h-[300px] border-2 border-black flex flex-col justify-around items-center '>
            <div className='w-full flex justify-around'>
              {portrait?.images?.map((img, i) => <img key={i} className="h-[50px] w-[50px]" src={img.imageUrl} />)}
            </div>
            <div>
              <button className='border-2 border-black rounded-lg p-2'  onClick={handleUpload}>Upload Image</button>
              <UploadImg 
                showDialog={action} 
                onCloseDialog={() => setAction(false)} 
                portraitId={portraitId}
                userId={authUser.uid}
              >
              </UploadImg>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <button className='w-8/12 border-2 border-black rounded-lg p-2 mt-4 mx-auto'>See Questions</button>
            <button className='w-8/12 border-2 border-black rounded-lg p-2 mt-4 mx-auto'>Complete Commission</button>
          </div>
      </div>
      
      <div className='w-3/12'>
          <p>Style: {portrait?.mode}</p>
          <p>Customer: {portrait?.customer}</p>
          {charList}
      </div>  
      <div className='w-4/12'>
          <p>Artist Id: {portrait?.artist}</p>
          <ChatBox portraitId={portraitId}/>
      </div>
    </div>
  </div>
  )
}

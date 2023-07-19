'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getPortrait } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import ChatBox from './components/ChatBox';
import UploadImg from './components/UploadImageDialogueBox';
import Button from '@mui/material/Button';
import SelectArtist from '@/app/components/SelectArtist';
import { PortraitData } from '../components/PortraitCustomizer';
import Link from 'next/link';

type Params = {
  params: {
    portraitId: string
  }
}

export default function PortraitDetails({ params: { portraitId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false)
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
      const currentPortrait = await getPortrait(portraitId);
      setPortait(currentPortrait)
    }

    handleGetPortrait()
  }, [])

  const handleUpload = () => {
    setAction(true)
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const charList = portrait?.characters.map((char, i) => (
    <div key={i} className='border-2 border-black mt-4 pl-4'>
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
          
          {/* select artist */}
          <div>
            {!portrait?.artistAssigned ? 
            <div>
              <p>Below are artists that would like to complete your portrait. Click on a name to see their portfolios & read reviews.</p>
              <p className='mb-2'>Artist: 
                {portrait?.artist.length ? portrait.artist.map((artist, i) => 
                  <Link key={i} href={`/artistDashboard/${portrait.artist[i].id}/portfolio`} className="text-xl group-hover:underline ml-4">
                    <span>{artist.artistName}</span>
                  </Link>
                )
                : <span className='ml-4'>No artist availble yet, check back soon</span>}
              </p>
              <p>To choose the artist to work with, click below.</p>
              <Button onClick={handleClickOpen} disabled={portrait?.artistAssigned}>Select Your Artist</Button>
              <SelectArtist open={open} setOpen={setOpen} portrait={portrait} />
            </div>
            : <p>Your artist is: <span>{portrait?.artist[0].artistName}</span></p>
            }
            
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
          <ChatBox portraitId={portraitId}/>
      </div>
    </div>
  </div>
  )
}

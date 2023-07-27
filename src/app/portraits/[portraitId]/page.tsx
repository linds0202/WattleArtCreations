'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getPortrait, updatePortrait, updateArtistOnCompletion } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Questions from './components/Questions';
import ChatBox from './components/ChatBox';
import UploadImg from './components/UploadImageDialogueBox';
import Button from '@mui/material/Button';
import SelectArtist from '@/app/components/SelectArtist';
import CompleteCommission from './components/CompleteCommission';
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
  const [openQuestions, setOpenQuestions] = useState(false)
  const [action, setAction] = useState(false)
  const [openComplete, setOpenComplete] = useState(false)
  const [completed, setCompleted] = useState(false)

  const [canEditQs, setCanEditQs] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loadingTime, setLoadingTime] = useState(false)
  const [portrait, setPortrait] = useState<PortraitData>()

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    const handleGetPortrait = async () => {
      const currentPortrait = await getPortrait(portraitId);
      setPortrait(currentPortrait)
    }

    handleGetPortrait()
  }, [])

  useEffect(() => {

    const interval = setInterval(() => {
      setLoadingTime(true)

      const now = Timestamp.fromDate(new Date())      

      const difference = 86400 - (now.seconds - portrait?.lastUpdatedStatus.seconds)

      const h = Math.floor(
        (difference / 3600)
      )
      setHours(h)

      const m = Math.floor((difference  - (h * 3600)) / 60)
      setMinutes(m)

      const s = Math.floor(difference - (h * 3600) - (m * 60))
      setSeconds(s)

      //console.log(`h: ${h} m: ${m} s: ${s}`)

      if ( h <= 0 && m <= 0 && s <= 0) {
        setCanEditQs(false)
      }
    }, 10000);

    return () => clearInterval(interval)
  }, [portrait])

  useEffect(() => {
    if (completed) {
      let newPortrait
      if (authUser?.roles === 'Customer') {
        newPortrait = {...portrait, status: 'Completed'}
      } else {
        newPortrait = {...portrait, artistComplete: true}
      }
      console.log('artist is: ', portrait?.artist[0].id)
      console.log('price over here is: ', portrait?.price)
      updateArtistOnCompletion(portrait?.artist[0].id, portrait?.price)

      updatePortrait(newPortrait?.uid, newPortrait)
      
      setPortrait(newPortrait)

    }
  }, [completed])


  const handleUpload = () => {
    setAction(true)
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleCompleteCommission = () => {
    setOpenComplete(true)
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

  const handleOpenQuestions = () => {
    setOpenQuestions(true)
  }

  return ((!authUser) ? 
    <p className='min-h-screen'>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3 '>
    <h1 className='text-2xl text-center'>{portrait?.portraitTitle}</h1>
    <div className='mx-10 flex justify-between'>
      <div className='w-3/12'>
          <div className='w-full h-[300px] border-2 border-pink-600 flex flex-col justify-around items-center '>
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
          <div className='border-2 border-green-600'>
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
          
          {canEditQs ?
            <div className='border-2 border-blue-600'>
              <p>You have 24 hours after purchase to answer/change your responses to the questions. Answering these questions helps your artist bring your vision to life</p>
              <p>Purchase date: {new Date(portrait?.lastUpdatedStatus.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.lastUpdatedStatus.seconds * 1000).toLocaleTimeString()}</p>
              <p>Time remaining to revise answers:</p>

              {loadingTime ? 
                <div className='w-8/12 mx-auto mt-4 px-4 py-2 flex justify-around border-2 border-[#282828] rounded-lg'>
                  <div >
                    <span className="text-xl font-semibold">{hours}</span>
                    <span className="font-light">Hrs</span>
                  </div>
                  <span className="mx-2">:</span>
                  <div >
                    <span className="text-xl font-semibold">{minutes}</span>
                    <span className="font-light">Mins</span>
                  </div>
                  <span className="mx-2">:</span>
                  <div >
                    <span className="text-xl font-semibold">{seconds}</span>
                    <span className="font-light">Secs</span>
                  </div>
                </div>
                : <p>Calculating . . . </p>
              }
            </div>
            :
            <div>
              <p>You time to edit your responses has ended. You can still see your answers but will no longer be able to edit them.</p>
            </div>
          }
          <div className='flex flex-col items-center'>
            <button className='w-8/12 border-2 border-black rounded-lg p-2 mt-4 mx-auto' onClick={handleOpenQuestions}>See Questions</button>
      
            {portrait?.status !== 'Completed' && portrait?.artistComplete && authUser?.roles === 'Customer' && 
              <button onClick={handleCompleteCommission} className='w-8/12 border-2 border-black rounded-lg p-2 mt-4 mx-auto'>Complete Commission</button>
            }

            {portrait?.status !== 'Completed' && !portrait?.artistComplete && authUser?.roles === 'Artist' && 
              <button onClick={handleCompleteCommission} className='w-8/12 border-2 border-black rounded-lg p-2 mt-4 mx-auto'>Mark Complete</button>
            }

            {portrait?.status === 'Completed' && <p>This commission is complete!</p>}

            {openComplete && 
              <CompleteCommission 
                role={authUser?.roles} 
                openComplete={openComplete} 
                setOpenComplete={setOpenComplete} 
                setCompleted={setCompleted} 
                portraitId={portrait?.uid}  
                artistId={portrait?.artist[0].id}
              />}
          </div>
      </div>

      {openQuestions && 
        <Questions 
          portrait={portrait} 
          setPortrait={setPortrait} 
          openQuestions={openQuestions} 
          setOpenQuestions={setOpenQuestions} 
          canEditQs={canEditQs}
          role={authUser?.roles}
        />
      }
      
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

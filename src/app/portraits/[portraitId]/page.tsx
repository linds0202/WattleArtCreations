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
import ArtistList from './components/ArtistList';
import Link from 'next/link';
import EnlargedImage from '@/app/components/EnlargedImage';
import RequestRevision from './components/RequestRevision';
import { downloadImage } from '@/app/firebase/storage';


type Params = {
  params: {
    portraitId: string
  }
}

export default function PortraitDetails({ params: { portraitId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [portrait, setPortrait] = useState<PortraitData>()
  const [open, setOpen] = useState(false)
  const [openQuestions, setOpenQuestions] = useState(false)
  const [openArtistList, setOpenArtistList] = useState(false)
  const [artistIndex, setArtistIndex] = useState(0)
  const [action, setAction] = useState(false)

  const [canEditQs, setCanEditQs] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loadingTime, setLoadingTime] = useState(false)
  
  const [openImage, setOpenImage] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const [openComplete, setOpenComplete] = useState(false)
  const [openRevison, setOpenRevision] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [requestRevision, setRequestRevision] = useState(false)
  

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


      if (difference <= 0 ) { 
        setCanEditQs(false)
      }
    }, 10000);

    return () => clearInterval(interval)
  }, [portrait])

  useEffect(() => {
    
    if (completed) {
      const  newPortrait = {...portrait, status: 'Completed'}
      
      updateArtistOnCompletion(portrait?.artist[0].id, portrait?.price)

      updatePortrait(newPortrait?.uid, newPortrait)
      
      setPortrait(newPortrait)

    }
  }, [completed])

  useEffect(() => {
    if (requestRevision) {
      const revisions = portrait?.revisions - 1
      const  newPortrait = {...portrait, revisions: revisions, revised: false}
      
      updatePortrait(portrait?.uid, {...portrait, revisions: revisions, revised: false})

      setPortrait(newPortrait)
      setRequestRevision(false)
    }
  }, [requestRevision])
  
  const handleUpload = () => {
    setAction(true)
  }
  
  // Displays Questions
  const handleOpenQuestions = () => {
    setOpenQuestions(true)
  }

  //Displays artist selection list for customer
  const handleOpenArtistList = (i:number) => {
    setArtistIndex(i)
    setOpenArtistList(true)
  }

  const handleAccept = () => {
    setOpenComplete(true)
  }

  const handleReject = () => {
    setOpenRevision(true)
  }

  const handleDownloadFinal = () => {
    console.log('calling downloadImage')
    downloadImage(portrait?.images[portrait?.images.length - 1].imageUrl)
  }

  const handleEnlarge = (src: string) => {
    setImgSrc(src)
    setOpenImage(true)
  }

  return ((!authUser || isLoading) ? 
    <p className='min-h-screen text-center text-4xl'>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3 '>
    <h1 className='text-3xl text-center mb-4'>{portrait?.portraitTitle} <span className='text-xl text-[#bababa]'>({portrait?.mode})</span></h1>
    <div className='mx-10 flex justify-between'>
      <div className='w-8/12'>

        {/* Choose Artist & edit question countdown */}
        <div className='w-full flex'>

          {/* select artist */}
          {!portrait?.artistAssigned &&
          <div className='w-[50%] border-2 border-green-600 p-4'>
            <h3 className='text-xl font-bold text-center'>Choose Your Artist</h3>
            <p>Below are artists that would like to complete your portrait. Click on a name learn more and select your artist.</p>
            {portrait?.artist.length  
              ? 
              <div className='flex justify-around'>
                {portrait.artist.map((artist, i) =>  
                  <button 
                    key={i} 
                    type='button' 
                    onClick={() => handleOpenArtistList(i)}
                    className='text-xl hover:text-[#0075FF]'
                  >
                    {artist.artistName}
                  </button>
                )}
            
                <ArtistList 
                  openArtistList={openArtistList} 
                  setOpenArtistList={setOpenArtistList} 
                  artists={portrait.artist} 
                  artistIndex={artistIndex}
                  setArtistIndex={setArtistIndex}
                  portrait={portrait}
                  setPortrait={setPortrait}
                />
              </div> 
              : <p className='text-center text-lg text-red-600 mt-4'>No artist availble yet, check back soon</p>
            }
          </div>}
            

          {/* Edit or See Questions */}
          <div className='w-[50%] border-2 border-blue-600 p-2'>
            {canEditQs ?
              <div>
                <p>You have 24 hours after purchase to answer/change your responses to the questions. Answering these questions helps your artist bring your vision to life</p>
                <p className='mt-4 font-semibold'>Purchase date: <span className='font-light text-md'>{new Date(portrait?.lastUpdatedStatus.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.lastUpdatedStatus.seconds * 1000).toLocaleTimeString()}</span></p>
                
                <p className='mt-4 font-semibold'>Time remaining to revise answers:</p>

                {loadingTime ? 
                  <div className='w-6/12 mx-auto mt-2 px-4 py-2 flex justify-around border-2 border-[#282828] rounded-lg'>
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
                <p className='text-sm'>You time to edit your responses has ended. You can still see your answers but will no longer be able to edit them.</p>
              </div>
            }
            <button className='w-1/2 mx-auto border-2 border-black rounded-lg p-2 mt-4 mb-4' onClick={handleOpenQuestions}>
              See Questions
            </button>
          </div>

        </div>


        {/* Image Upload Section */}
        <div className='flex mb-8'>
          
          {/* Final images */}
          <div className='w-full h-[300px] border-2 border-pink-600 flex flex-col justify-around items-center '>
            <p>Final Images</p>
            <div className='w-full flex justify-around'>
              {portrait?.images?.map((img, i) => 
                <img 
                  key={i}        
                  className='w-[128px] h-[128px] object-contain cursor-pointer' 
                  src={img.imageUrl} 
                  onClick={() => handleEnlarge(img.imageUrl)}
                /> 
              )} 
            </div>
            {openImage &&
              <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={imgSrc}/>
            }
            <div>
              {authUser?.roles === 'Artist' && !portrait?.revised && <button className='border-2 border-black rounded-lg p-2'  onClick={handleUpload}>Upload Image</button>}

              {authUser?.roles === 'Customer' && portrait?.revised && portrait?.status !== 'Completed' &&
              <div>
                <button className='border-2 border-black rounded-lg p-2'  onClick={handleAccept}>Accept as Final Image</button>
                <button className='border-2 border-black rounded-lg p-2'  onClick={handleReject}>{portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}</button>
              </div>}
              {portrait?.status === 'Completed' && 
                // <a href={`${portrait?.images[portrait?.images.length - 1].imageUrl}`} download>
                //     <img src={`${portrait?.images[portrait?.images.length - 1].imageUrl}`} className='w-[128px] h-[128px] object-contain cursor-pointer'  />
                // </a>
                <button className='border-2 border-black rounded-lg p-2'  onClick={handleDownloadFinal}>Download Final Image</button>
              
              }

              <UploadImg 
                showDialog={action} 
                onCloseDialog={() => setAction(false)} 
                portraitId={portraitId}
                userId={authUser.uid}
              >
              </UploadImg>
            </div>
            <p className='w-full text-right'>
              <span className='text-[#0075FF] font-semibold'>{portrait?.revisions}</span> {portrait?.revisions === 1 ? 'revision request' : 'revision requests'} remaining</p>
          </div>

        </div>


        <div className='flex flex-col items-center'>

          {portrait?.status === 'Completed' && <p>This commission is complete!</p>}

          {openComplete && 
            <CompleteCommission 
              role={authUser?.roles} 
              openComplete={openComplete} 
              setOpenComplete={setOpenComplete} 
              setCompleted={setCompleted} 
              portraitId={portrait?.uid}  
              artistId={portrait?.artist[0].id}
            />
          }

          {openRevison && 
            <RequestRevision
              role={authUser?.roles} 
              openRevision={openRevison} 
              setOpenRevision={setOpenRevision} 
              setRequestRevision={setRequestRevision} 
              remainingRevisions={portrait?.revisions}
            />
          }
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
      
      <div className='w-4/12'>
        <div className='w-full flex justify-between mb-2'>
          <p className='text-xl'>Customer: <span className='text-[#2DD42B] ml-2' >{portrait?.customer}</span></p>


          {!portrait?.artistAssigned && <p className='text-xl'>Artist: 
            <span className='text-red-600 ml-2'>No artist assigned yet</span>
          </p>}

          {portrait?.artistAssigned && <p className='text-xl'>Artist: 
            <Link 
              href={`/artistDashboard/${portrait?.artist[0].id}/portfolio`} 
              rel="noopener noreferrer" 
              target="_blank"
              className="text-[#2DD42B] hover:text-[#165f15] hover:underline ml-2"
            >
              <span>{portrait?.artist[0].artistName}</span>
            </Link>
          </p>}
        
        </div> 
        
        <ChatBox portraitId={portraitId}/>
      
      </div>
    </div>
  </div>
  )
}

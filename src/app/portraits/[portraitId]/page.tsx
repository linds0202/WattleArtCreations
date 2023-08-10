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
    }, 2000);

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
      
      {/* Lefthand section */}
      <div className='w-8/12 flex flex-col justify-start'>
        
        <div className='w-[100%] pb-4 border-b-2 border-[#bababa]'>
          {portrait?.status === 'Completed' && <p>This commission is complete!</p>}
          <p className='text-xl'>To Do: <span className='text-[#0075FF] text-sm'>(Below are tasks that need your attention)</span></p>
        </div>
        
        <div className='w-[100%] flex'>
          {/* Choose Artist & edit question countdown */}
          <div className='w-5/12 flex flex-col'>
            
            {/* select artist */}
            {!portrait?.artistAssigned &&
            <div className='w-full border-2 border-green-600 p-4'>
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
            <div className='w-full border-2 border-blue-600 p-4'>
              <h3 className='text-xl font-bold text-center'>Questions</h3>
              {canEditQs ?
                <div>
                  <p className='mt-4 font-semibold'>Time remaining to revise answers:</p>

                  {loadingTime ? 
                    <div className='w-8/12 mt-2 px-4 py-2 flex justify-around border-2 border-[#282828] rounded-lg'>
                      <div >
                        <span className="text-xl font-semibold">{hours}</span>
                        <span className="font-light ml-2">Hrs</span>
                      </div>
                      <span className="mx-2">:</span>
                      <div >
                        <span className="text-xl font-semibold">{minutes}</span>
                        <span className="font-light ml-2">Mins</span>
                      </div>
                      <span className="mx-2">:</span>
                      <div >
                        <span className="text-xl font-semibold">{seconds}</span>
                        <span className="font-light ml-2">Secs</span>
                      </div>
                    </div>
                    : <p>Calculating . . . </p>
                  }

                  <p className='mt-4'>You have 24 hours after purchase to answer/change your responses to the questions. Answering these questions helps your artist bring your vision to life</p>
                  <p className='mt-4 font-semibold'>Purchase date: <span className='font-semibold text-md text-[#2DD42B] ml-2'>{new Date(portrait?.lastUpdatedStatus.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.lastUpdatedStatus.seconds * 1000).toLocaleTimeString()}</span></p>
                  
                  
                </div>
                :
                <div>
                  <p className='text-sm'>You time to edit your responses has ended. You can still see your answers but will no longer be able to edit them.</p>
                </div>
              }
              
              {loadingTime && <div className='w-1/2 mx-auto'>
                <button className='w-full text-xl border-2 border-black hover:text-white hover:bg-[#0075FF] rounded-lg p-2 mt-4 mb-4' onClick={handleOpenQuestions}>
                  See Questions
                </button>
              </div>}
              
            </div>

          </div>

          {/* Image Upload Section */}
          <div className='w-7/12 h-[80vh] p-4 border-2 border-pink-600 flex flex-col justify-between items-center'>
            
            {/* Final images */}
            <div>
              <h3 className='text-xl font-bold text-center m-0'>Final Images</h3>
              <p className='text-center'>
                <span className='text-[#0075FF] font-semibold'>{portrait?.revisions}</span> {portrait?.revisions === 1 ? 'revision request' : 'revision requests'} remaining
              </p>
            </div>

            <div className='w-full h-[260px] flex justify-around mb-4'>
              {portrait?.images?.length > 0 
                ? <img 
                className='w-[256px] h-[256px] object-contain cursor-pointer'
                src={portrait?.images[portrait?.images.length - 1].imageUrl} 
                onClick={() => handleEnlarge(portrait?.images[portrait?.images.length - 1].imageUrl)}
              />
              : <p className='text-xl font-semibold text-[#0075FF] text-center'>No images uploaded yet</p>
              }
            </div>

            
            <div className='w-full'>
              <div className='w-full h-[100px] flex justify-around border-2 border-black mb-4'>
                {portrait?.images?.map((img, i) => 
                  <img 
                    key={i}        
                    className='w-[96px] h-[96px] object-contain cursor-pointer' 
                    src={img.imageUrl} 
                    onClick={() => handleEnlarge(img.imageUrl)}
                  /> 
                )} 
              </div>

              {openImage &&
                <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={imgSrc}/>
              }

              <div className='w-full flex justify-center items-center'>
                {authUser?.roles === 'Artist' && !portrait?.revised && <button className='border-2 border-black rounded-lg p-2'  onClick={handleUpload}>Upload Image</button>}

                {authUser?.roles === 'Customer' && portrait?.revised && portrait?.status !== 'Completed' &&
                <div className='w-full flex justify-around'>
                  
                  <button 
                    className='w-5/12 border-2 border-black hover:text-white hover:bg-[#0075FF] rounded-lg p-2'  
                    onClick={handleReject}
                  >
                      {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                  </button>
                  
                  <button 
                    className='w-5/12 border-2 border-black hover:text-white hover:bg-[#2DD42B] rounded-lg p-2'  
                    onClick={handleAccept}
                  >
                    Accept as Final Image
                  </button>

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

            </div>

          </div>

        </div>

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
      </div>

      
      {/* Righthand section */}
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

'use client'

import '../../globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getPortrait, updatePortrait, getTestimonial } from '../../firebase/firestore';
import ChatBox from './components/ChatBox';
import UploadImg from './components/UploadImageDialogueBox';
import CompleteCommission from './components/CompleteCommission';
import { PortraitData } from '../components/PortraitCustomizer';
import Link from 'next/link';
import EnlargedImage from '@/app/components/EnlargedImage';
import RequestRevision from './components/RequestRevision';
import { downloadImage } from '@/app/firebase/storage';
import CustomerActionCenter from './components/CustomerActionCenter';
import ArtistActionCenter from './components/ArtistActionCenter';
import { Rating } from '@mui/material';
import Questions from './components/Questions';
import Footer from '@/app/components/Footer';
import { Timestamp } from 'firebase/firestore';


interface EnlargeProps {
  src: string,
  date: Timestamp,
  final: boolean 
}

interface RevisionNote {
  text: string,
  date: Timestamp
}

interface Testimonial {
  artistId: string,
  customerDisplayName: string,
  customerId: string,
  imgUrl: string,
  includeImg: boolean,
  portraitId: string,
  stars: number,
  text: string
}

type Params = {
  params: {
    portraitId: string
  }
}

export default function PortraitDetails({ params: { portraitId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [portrait, setPortrait] = useState<PortraitData>()
  const [action, setAction] = useState(false)
  
  const [openImage, setOpenImage] = useState(false)
  const [imgEnlarge, setImgEnlarge] = useState<EnlargeProps>({
    src: '',
    date: Timestamp.now(),
    final: false 
  })
  const [openComplete, setOpenComplete] = useState(false)
  const [openRevison, setOpenRevision] = useState(false)
  const [requestRevision, setRequestRevision] = useState(false)

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [revisionNote, setRevisionNote] = useState<RevisionNote>({text:'', date: Timestamp.now()})

  const [openQuestions, setOpenQuestions] = useState(false)
  

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    const handleGetPortrait = async () => {
      const currentPortrait: PortraitData | null = await getPortrait(portraitId);
      if (currentPortrait) {
        if (currentPortrait.status === "Completed") {
          const customerTestimonial = await getTestimonial(currentPortrait.id)
          setTestimonial(customerTestimonial)
        }
  
        setPortrait(currentPortrait)
      }
    }

    handleGetPortrait()
  }, [])


  useEffect(() => {
    if (requestRevision) {

      const revisions = portrait?.revisions! - 1
      let newPortrait 
      
      if (revisions < 0) {
        if (portrait) {
        
          newPortrait = {...portrait, revised: false, additionalRevisionRequest: true, revisionNotes: [...portrait?.revisionNotes, revisionNote]} 
        
          updatePortrait(portrait?.id, {...portrait, additionalRevisionRequest: true, revised: false, revisionNotes: [...portrait?.revisionNotes, revisionNote]})
        }

        if (newPortrait) setPortrait(newPortrait)

      } else {
        if (portrait) {
          newPortrait = {...portrait, revisions: revisions, revised: false, revisionNotes: [...portrait?.revisionNotes, revisionNote] }
        
          updatePortrait(portrait?.id, {...portrait, revisions: revisions, revised: false, revisionNotes: [...portrait?.revisionNotes, revisionNote]})
        } 
      }

      setPortrait(newPortrait)
      setRequestRevision(false)
    }
  }, [requestRevision])
  
  const handleUpload = async () => {    
    setAction(true)
  }
  
  const handleAccept = () => {
    setOpenComplete(true)
  }

  const handleReject = () => {
    setOpenRevision(true)
  }

  const handleDownloadFinal = () => {
    downloadImage(portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl)
  }

  const handleEnlarge = ({src, date, final}: EnlargeProps) => {
    setImgEnlarge({src: src, date: date, final: final})
    setOpenImage(true)
  }

  const handleOpenQuestions = () => {
    setOpenQuestions(true)
  }

  return ((!authUser || isLoading) ? 
    <p className='min-h-screen text-center text-4xl'>Loading ...</p>
  :
  <div className='relative min-h-[100vh]'>
    <img className="w-full absolute -top-[16px] left-0" src="../../drips/wizard3.png" alt='background black paint drip'/>
    <div className='bg-white text-black min-h-screen pt-3 pb-36'>
      <div className='relative'>
        <h1 className='text-4xl text-center font-bold pt-4 mb-2'>{portrait?.portraitTitle} <span className='text-2xl text-[#bababa]'>({portrait?.mode})</span></h1>
        
        <button 
            className='absolute top-2 right-7 w-1/7 text-xl border-2 border-black bg-white hover:text-white hover:bg-[#0075FF] rounded-lg p-2' onClick={handleOpenQuestions}
        >
            View Portrait Details
        </button>

        {openQuestions && portrait &&
            <Questions 
                portrait={portrait} 
                setPortrait={setPortrait} 
                openQuestions={openQuestions} 
                setOpenQuestions={setOpenQuestions} 
                canEditQs={false}
                role={authUser?.roles}
            />
        }
      </div>
      

      
      <div className='mx-4 flex justify-between'>
        
        {/* Lefthand section */}
        <div className='w-8/12 flex flex-col justify-start'>
          
          <div className='w-[100%] flex justify-between items-center'>
            <p className='w-6/12 text-left text-2xl font-semibold pb-2'>Action Center <span className='text-[#0075FF] text-sm'>(Below are tasks that need your attention)</span></p>
            
          </div>
          
          <div className='w-[100%] flex'>
      
            {/* Action Center */}
            <div className='w-6/12 border-t-2 border-r-2 border-[#bababa] rounded-xl flex flex-col'>
              <div>
                {authUser?.roles === 'Customer' 
                  ? <>{portrait && <CustomerActionCenter portrait={portrait} setPortrait={setPortrait} setOpenRevision={setOpenRevision}  />}</>
                  : <>{portrait && <ArtistActionCenter portrait={portrait} setPortrait={setPortrait} setOpenRevision={setOpenRevision}/>
                }</>
              }
              </div>

            </div>

            {/* Image Upload Section */}
            <div  className='w-6/12 h-[80vh] px-4 flex flex-col justify-between items-center'>
              <div className='w-full px-4'>
              
                {portrait?.status === 'Completed' && 
                  <div className='flex flex-col items-center'>
                    <p className='text-2xl font-bold text-center text-[#0075FF] mb-2'>This commission is complete!</p>
                    <button 
                      className='w-1/2 mx-auto border-2 border-black rounded-lg p-2 hover:text-white hover:bg-[#0075FF]'  
                      onClick={handleDownloadFinal}
                    >
                      Download Final Image
                    </button>


                    {portrait?.status === "Completed" &&
                    <div className='my-8 flex flex-wrap justify-between items-center'>
                      <p className='text-xl font-semibold w-[100%]'>Customer&apos;s Testimonial:</p>
                      <div className='mt-4 border-2 border-[#282828] rounded-xl p-4 flex items-center'>
                        <div className='w-[40%]'>
                          {testimonial?.includeImg && <img src={testimonial.imgUrl} className='w-[128px] h-[128px] object-contain mx-auto ' alt='customer finished image in testimonial'/>}
                        </div>
                        <div className='w-[55%]'>
                          <div className='flex items-center'>
                              <Rating name="read-only" value={testimonial?.stars} readOnly precision={0.5} size="small" />
                              <span className='ml-2'>({testimonial?.stars})</span>
                          </div>
                          <p>&quot;{testimonial?.text}&quot;</p>
                          <p className='text-right'>- {testimonial?.customerDisplayName}</p>
                        </div>
                      </div>
                    </div>
                    }
                  </div>
                }
              
                <div className='w-full'>
                  <div className='flex justify-center items-center mb-4'>
                    <h3 className='text-2xl font-bold m-0'>Final Images</h3>
                  </div>

                  <div className='w-full h-[260px] flex justify-around mb-4'>
                    {portrait && portrait?.finalImages?.length > 0 
                      && <img 
                        alt='thumbnail for final images'
                        onContextMenu={(e)=> e.preventDefault()}
                        className='w-[256px] h-[256px] object-contain cursor-pointer'
                        src={portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl} 
                        onClick={() => handleEnlarge({
                          src: portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl, 
                          date: Timestamp.now(), 
                          final: true
                        })}
                      />
                      }
                  </div>


                  <div className='w-full'>
                    <div className='w-full h-[88px] flex justify-around items-center border-2 border-[#bababa] rounded-xl mb-4'>
                      {portrait && portrait?.finalImages?.length > 0 
                      ? portrait?.finalImages?.map((img, i) => 
                        <img 
                          alt='final image thumbnail'
                          onContextMenu={(e)=> e.preventDefault()}
                          key={i}        
                          className='w-[64px] h-[64px] object-contain cursor-pointer' 
                          src={img.imageUrl} 
                          onClick={() => handleEnlarge({
                            src: img.imageUrl, 
                            date: img.date, 
                            final: true
                          })}
                        /> 
                      )
                    : <p className='text-xl font-semibold text-[#0075FF] text-center'>No images to display</p>} 
                    </div>

                    {openImage &&
                      <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={imgEnlarge.src} date={imgEnlarge.date} final={imgEnlarge.final}/>
                    }

                    <div className='w-full flex justify-center items-center'>
                      {authUser?.roles === 'Artist' && portrait && !portrait?.revised && portrait?.revisions >= 0 && 
                        <button 
                          className={`border-2 border-[#282828] rounded-lg p-2`}   //${!portrait?.additionalRevision ? 'border-[#e8e8e8] text-[#e8e8e8]' : 'border-black'}
                          onClick={handleUpload}
                          // disabled={!portrait?.additionalRevision}
                        >
                          Upload Image
                        </button>
                      }

                      {authUser?.roles === 'Customer' && portrait?.revised && portrait?.status !== 'Completed' &&
                      <div className='w-full flex justify-around'>
                        
                        <button 
                          className='w-5/12 border-2 border-[#282828] hover:text-white hover:bg-[#282828] rounded-lg p-2'  
                          onClick={handleReject}
                        >
                            {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                        </button>
                        
                        <button 
                          className='w-5/12 border-2 border-[#282828] hover:text-white hover:bg-[#0075FF] rounded-lg p-2'  
                          onClick={handleAccept}
                        >
                          Accept as Final Image
                        </button>

                      </div>}
                      

                      <UploadImg 
                        showDialog={action} 
                        onCloseDialog={() => setAction(false)} 
                        userId={authUser.uid}
                        portrait={portrait}
                        setPortrait={setPortrait}
                      >
                      </UploadImg>
                    </div>
                    <p className='text-xl text-center mt-4'>
                      <span className='text-[#0075FF] font-semibold'>{portrait?.revisions}</span> {portrait?.revisions === 1 ? 'revision request' : 'revision requests'} remaining
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {openComplete && portrait &&
            <CompleteCommission 
              role={authUser?.roles} 
              openComplete={openComplete} 
              setOpenComplete={setOpenComplete} 
              portrait={portrait}
              setPortrait={setPortrait}
            />
          }

          {openRevison && portrait &&
            <RequestRevision
              openRevision={openRevison} 
              setOpenRevision={setOpenRevision} 
              setRequestRevision={setRequestRevision} 
              remainingRevisions={portrait.revisions}
              revisionNote={revisionNote}
              setRevisionNote={setRevisionNote}
            />
          }
        </div>
        
        {/* Righthand section */}
        <div className='w-4/12'>
          <div className='w-full px-4 flex justify-between'>
            <p className='text-xl pb-2'>Customer: <span className='text-[#2DD42B] ml-2' >{portrait?.customer}</span></p>


            {!portrait?.artistAssigned && <p className='text-xl pb-2'>Artist: 
              <span className='text-red-600 ml-2'>No artist assigned yet</span>
            </p>}

            {portrait?.artistAssigned && <p className='text-xl pb-2'>Artist: 
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
    <Footer />
  </div>
  )
}
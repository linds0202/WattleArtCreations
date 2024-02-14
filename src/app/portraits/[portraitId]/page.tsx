'use client'

import '../../globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { updatePortrait, getTestimonial } from '../../firebase/firestore';
import ChatBox from './components/ChatBox';
import UploadImg from './components/UploadImageDialogueBox';
import UploadSheet from './components/UploadSheet';
import CompleteCommission from './components/CompleteCommission';
import { PortraitData } from '../components/PortraitCustomizer';
import Link from 'next/link';
import EnlargedImage from '@/app/components/EnlargedImage';
import RequestRevision from './components/RequestRevision';
import { downloadImage } from '@/app/firebase/storage';
import CustomerActionCenter from './components/CustomerActionCenter';
import ArtistActionCenter from './components/ArtistActionCenter';
import Rating from '@mui/material/Rating';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Questions from './components/Questions';
import Footer from '@/app/components/Footer';
import { Timestamp } from 'firebase/firestore';
import { getMyPortrait, getPortrait, updatePortraitWithSheet, getExtrasCheckoutUrl } from '../../firebase/firestore';
import { useCategoriesContext } from '@/app/context/CategoriesContext';

interface ExtrasData {
  type: string,
  price: number
}

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
  const { categories } = useCategoriesContext()
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
  const [openSheet, setOpenSheet] = useState(false)
  const [index, setIndex] = useState(0)

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [revisionNote, setRevisionNote] = useState<RevisionNote>({text:'', date: Timestamp.now()})

  const [openQuestions, setOpenQuestions] = useState(false)  

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [extras, setExtras] = useState<Array<ExtrasData>>([])

  const handleOptionChange = (event: any) => {
    const value = event.target.value;
    localStorage.setItem('bgOption', JSON.stringify(value))
    setSelectedOption(value);
  }

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    const getPortrait = async () => {
        const unsubscribe = await getMyPortrait(setPortrait, portraitId);
        
        return () => unsubscribe()
    }

    const bgItem = localStorage.getItem('bgOption')
    if (bgItem !== null && JSON.parse(bgItem).length) {
      setSelectedOption(JSON.parse(bgItem))
    } else {
      localStorage.setItem('bgOption', JSON.stringify('bg-gradient-to-b from-[#ffffff] to-black'))
      setSelectedOption('bg-gradient-to-b from-[#ffffff] to-black')
    }

    getPortrait()
  }, [])

  useEffect(() => {
    const getFinalTestimonial = async () => {
      if (portrait?.status === "Completed") {
        const customerTestimonial = await getTestimonial(portrait?.id)
        if (customerTestimonial) setTestimonial(customerTestimonial)
      }
    }

    getFinalTestimonial()

  }, [portrait?.status])


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


  const extrasList = portrait?.sheetUploads.map((extra, i) => 
    <div key={i} className='w-full flex flex-col border border-blue-600'>
      {extra.src === "" 
      ? <p
        key={extra.index}
        onClick={() => handleClickExtra(extra.index)}
      >
        Char {extra.charNum} - {extra.type === 'character' ? 'Character' : 'Weapons'} Sheet
      </p>
      :<div key={extra.index} className='cursor-pointer flex items-center'>
        {authUser?.roles === 'Customer' &&
        <img 
          src={extra.src} 
          onContextMenu={(e)=> e.preventDefault()}
          alt="sheet upload thumbnail" 
          className='w-[64px] h-[64px] object-top object-contain mr-4'
          onClick={() => {
            if (portrait.status !== 'Completed') {
              handleEnlarge({
                src: extra.src, 
                date: Timestamp.now(), 
                final: true
              })
            } else {
              handleDownloadSheet(extra.index)
            }
          }}
        />}
        {authUser?.roles === 'Artist' &&
        <img 
          src={extra.src} 
          onContextMenu={(e)=> e.preventDefault()}
          alt="sheet upload thumbnail" 
          className='w-[64px] h-[64px] object-top object-contain mr-4'
        />}
        <p>Char {extra.charNum} - {extra.type === 'character' ? 'Character' : 'Weapons'} Sheet</p>
        {authUser?.roles !== 'Customer' && <button 
          type="button" 
          onClick={() => handleDeleteSheet(extra.index)} 
          className='ml-4 hover:text-red-600 '
          title='Remove upload?'
        >
          <DeleteForeverIcon />
        </button>}
      </div>
      }
    </div>
    )
  
  
  const handleClickExtra = (clickedIndex: number) => {
    if (authUser.roles !== 'Customer') {
      setIndex(clickedIndex)
      setOpenSheet(true)
    }
  }

  const handleDeleteSheet = async (clickedIndex:number) => {
    const portraitWithSheets = await updatePortraitWithSheet(portrait?.id, {index: clickedIndex, portrait: portrait, imageBucket: ""})
                    
    const updatedPortrait = await getPortrait(portrait?.id)
    if (updatedPortrait) setPortrait(updatedPortrait)
  }

  const handleDownloadSheet = (clickedIndex:number) => {
    if (authUser?.roles === 'Customer') {
      downloadImage(portrait?.sheetUploads[clickedIndex].src)
    }
  }
  
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

  const handleDownloadImage = (i: number) => {
    if (authUser?.roles === 'Customer') {
      downloadImage(portrait?.finalImages[i].imageUrl)
    }
  }

  const handleEnlarge = ({src, date=Timestamp.now(), final}: EnlargeProps) => {
    setImgEnlarge({src: src, date: date, final: final})
    setOpenImage(true)
  }

  const handleOpenQuestions = () => {
    setOpenQuestions(true)
  }

  const checkout = async () => {
    const checkoutUrl = await getExtrasCheckoutUrl(extras, portrait?.id, authUser.uid)
    router.push(checkoutUrl)
  }

  const checkoutButton = (
    <button
      onClick={checkout}
      className="z-50 w-full text-3xl font-semibold mt-8 py-2 md:px-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Checkout
      </div>
    </button>
  );

  return (isLoading ?
  <></>
  :<div className='relative min-h-[100vh]'>
    <img className="w-full absolute -top-[16px] left-0" src="../../images/drips/wizard3.png" alt='background black paint drip'/>

    <div 
      className='text-black min-h-screen pt-3 pb-36'
      style={{ backgroundImage: selectedOption !== null ? selectedOption : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(8,8,8,1) 100%)' }}  
    >
      <div className='relative'>
        
        <div className='absolute top-2 left-2 md:top-4 md:left-4 flex justify-around items-center'>
          <p className='text-sm lg:text-xl '>Select Background:</p>
          <div className='w-[70px] lg:w-[80px] flex justify-around'>
            {categories.customizer.bgOptions.map((option: string, i: number) => (
              <div key={i} className='flex justify-center items-center'>
                <input
                  type="radio"
                  id={option}
                  name="backgroundSelection"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
              </div>
            ))}
          </div>
        </div>

        <h1 className='w-full md:w-auto text-lg lg:text-xl xl:text-4xl text-center font-bold pt-12 md:pt-4 mb-2'>{portrait?.portraitTitle} <span className='text-sm md:text-base lg:text-2xl text-[#bababa]'>({portrait?.mode})</span></h1>
        
        <button 
            className='absolute top-0 right-2 md:top-2 md:right-7 md:w-1/7 text-sm md:text-base lg:text-xl border-2 border-black bg-white hover:text-white hover:bg-[#43b4e4] rounded-lg p-2' onClick={handleOpenQuestions}
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
      

      
      <div className='mx-4 flex flex-col lg:flex-row lg:flex-wrap justify-between'>
        {/* Header */}
        <div className='w-[100%] flex flex-col md:flex-row justify-between items-center'>
          <p className='text-center md:text-left text-xl lg:text-2xl font-semibold pb-2'>Action Center <span className='text-[#43b4e4] text-sm block md:inline-block'>(Below are tasks that need your attention)</span></p> 
        
          {!portrait?.artistAssigned 
            ? <p className='font-semibold lg:text-xl pb-2'>Artist: 
              <span className='font-normal text-red-600 ml-2'>No artist assigned yet</span>
            </p>
            :
            <p className='text-xl pb-2'>Artist: 
              <Link 
                href={`/artistDashboard/${portrait?.artist[0].id}/portfolio`} 
                rel="noopener noreferrer" 
                target="_blank"
                className="text-[#2DD42B] hover:text-[#165f15] hover:underline ml-2"
              >
                <span>{portrait?.artist[0].artistName}</span>
              </Link>
            </p>
            }
        </div>

        {/* Lefthand section */}
        <div className='w-full lg:w-8/12 flex flex-col justify-start'>
          
          <div className='w-[100%] flex flex-col md:flex-row'>
      
            {/* Action Center */}
            <div className='w-full md:w-6/12 bg-white border-t-2 border-r-2 border-[#bababa] rounded-xl flex flex-col'>
              <div>
                {authUser?.roles === 'Customer' 
                  ? <>{portrait && <CustomerActionCenter portrait={portrait} setPortrait={setPortrait} setOpenRevision={setOpenRevision}  />}</>
                  : <>{portrait && <ArtistActionCenter portrait={portrait} setPortrait={setPortrait} setOpenRevision={setOpenRevision}/>
                }</>
              }
              </div>

            </div>

            {/* Ceneter Section */}
            <div  className='w-full md:w-6/12 min-h-[80vh] md:px-4 mt-8 md:mt-0 flex flex-col justify-between items-center'>
              {/* Image Upload Section */}
              <div className='w-full md:px-4 border border-red-600'>
              
                {portrait?.status === 'Completed' && 
                <div className='bg-white rounded-xl p-2 flex flex-col items-center'>
                  {authUser?.roles === 'Customer' ?
                  <div className='w-full flex flex-col items-center'>
                    <p className='text-2xl font-bold text-center text-[#43b4e4] '>This commission is complete!</p>
                     <button 
                      className='xl:w-1/2 mx-auto my-4 text-lg xl:text-xl font-bold border-2 border-black rounded-lg p-2 hover:text-white hover:bg-[#43b4e4]'  
                      onClick={handleDownloadFinal}
                    >
                      Download Final Image
                    </button>
                    <p className='text-md text-center mb-4'>You can also download each version from this commission by clicking the thumbnails below</p>
                  </div>
                  :<div className='w-full my-8 flex flex-col items-center'>
                    <p className='text-2xl font-bold text-center text-[#43b4e4] '>This commission is complete!</p>
                  </div>
                  }

                  
                  <div className='w-full xl:h-[88px] bg-white border-2 border-[#bababa] rounded-xl mb-4 py-2 flex flex-wrap xl:flex-nowrap justify-around items-center gap-y-2 xl:gap-y-0'>
                    {portrait && portrait?.finalImages?.length > 0
                    ? portrait?.finalImages?.map((img, i) => 
                      <img 
                        alt='final image thumbnail'
                        onContextMenu={(e)=> e.preventDefault()}
                        key={i}        
                        className={`w-[40%] xl:w-[64px] xl:h-[64px] object-contain ${authUser?.roles === 'Customer' ? 'cursor-pointer' : ''}`} 
                        src={img.imageUrl} 
                        onClick={() => handleDownloadImage(i)}
                      /> 
                    )
                  : <p className='text-xl font-semibold text-[#43b4e4] text-center'>No images to display</p>} 
                  </div>



                  <div className='w-full my-8 flex flex-col justify-between items-center'>
                    <p className='text-xl font-semibold w-[100%]'>Customer&apos;s Testimonial:</p>
                    <div className='w-full mt-4 border-2 border-[#282828] rounded-xl p-4 flex flex-col xl:flex-row justify-between items-center'>
                      <div className='w-full xl:w-[40%]'>
                        {testimonial?.includeImg && <img src={testimonial.imgUrl} className='w-[128px] h-[128px] object-contain mx-auto ' alt='customer finished image in testimonial'/>}
                      </div>
                      <div className='xl:w-[55%] mt-4 xl:mt-0'>
                        <div className='flex items-center'>
                            <Rating name="read-only" value={testimonial?.stars ? testimonial?.stars : 0} readOnly precision={0.5} size="small" />
                            <span className='ml-2'>({testimonial?.stars})</span>
                        </div>
                        <p>&quot;{testimonial?.text}&quot;</p>
                        <p className='text-right'>- {testimonial?.customerDisplayName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                }
              
             
                <div className='w-full'>
                  
                  {portrait?.status !== 'Completed' &&
                    <div>
                      <div className='flex justify-center items-center mb-4'>
                        <h3 className='text-2xl text-[#43b4e4] font-bold m-0'>Final Images</h3>
                      </div>

                      <div className='relative w-full h-[260px] flex justify-around mb-4'>
                        {portrait && portrait?.finalImages?.length > 0 
                          ? <img 
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
                          : <div className='w-11/12 mx-auto flex flex-col justify-end items-center'>
                              <object type="image/svg+xml" data="../../images/newClock.svg" className="absolute -top-[3%] left-[20%] xl:left-[13%] w-[60%] h-[60%] xl:w-[75%] xl:h-[75%] "/>
                              <p className='text-2xl text-[#43b4e4] font-semibold'>Check Back Soon</p>
                              <p className='text-md text-center text-[#282828] font-semibold'>Your artist is hard at work. You will find finished images for review in this space.</p>
                            </div>
                        }
                      </div>
                    </div>
                  }

                  {portrait?.status !== 'Completed' &&
                  <div className='w-full'>

                    <div className='w-full h-[88px] bg-white flex justify-around items-center border-2 border-[#bababa] rounded-xl mb-4'>
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
                    : <p className='text-xl font-semibold text-[#43b4e4] text-center'>No images to display</p>} 
                    </div>



                    <div className='w-full flex justify-center items-center'>
                      {authUser?.roles === 'Artist' && portrait && !portrait?.revised && portrait?.revisions >= 0 && 
                        <button  
                          className='text-xl border-2 border-[#282828] rounded-xl mx-auto mt-10 bg-gradient-to-r px-4 py-2 from-[#338cb2] to-[#43b4e4] hover:text-white  hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'
                          onClick={handleUpload}
                        >
                          Upload Image
                        </button>
                      }

                      {authUser?.roles === 'Customer' && portrait?.revised && portrait?.status !== 'Completed' &&
                      <div className='w-full flex justify-around'>
                        
                        <button 
                          className='w-5/12 border-2 border-[#282828] bg-[#282828]/50 hover:text-white hover:bg-[#282828] rounded-lg p-2'  
                          onClick={handleReject}
                        >
                            {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                        </button>
                        
                        <button 
                          className={`w-5/12 border-2 border-[#282828] ${!portrait.sheetUploads.every(extra => extra.src !== '') ? 'bg-white/25' : 'bg-[#43b4e4]/75 hover:text-white hover:bg-[#43b4e4]'} rounded-lg p-2`}  
                          onClick={handleAccept}
                          disabled={!portrait.sheetUploads.every(extra => extra.src !== '')}
                          title={`${!portrait.sheetUploads.every(extra => extra.src !== '') ? 'Your artist has not completed all the sheets associated with this portrait' : ''}`}
                        >
                          Accept as Final Image
                        </button>

                      </div>}
                      

                      <UploadImg 
                        showDialog={action} 
                        onCloseDialog={() => setAction(false)} 
                        userId={authUser?.uid}
                        portrait={portrait}
                        setPortrait={setPortrait}
                      />
                    </div>

                    <p className='text-xl text-center mt-4'>
                      <span className='text-[#43b4e4] font-semibold'>{portrait?.revisions}</span> {portrait?.revisions === 1 ? 'revision request' : 'revision requests'} remaining
                    </p> 
                  </div>
                  }

                  {openImage &&
                    <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={imgEnlarge.src} date={imgEnlarge.date} final={imgEnlarge.final}/>
                  }
                </div>
              </div>

              {/* Extras Upload Section */}
              <div className='w-full h-full mt-8 flex flex-col gap-2 border border-green-600'>
                <p className='text-[#43b4e4] text-center text-2xl font-semibold'>Character and Weapons Sheets</p>
                <p>Enhance your portrait with exciting extras. Copy needs to go here about chatting your artist to add something to your portrait. Then payment button with display here</p>
                
                {authUser?.roles === 'Customer'
                ? <div className='flex flex-col justify-between'>
                    <p className='w-1/3 mx-auto text-lg text-black text-center rounded-lg py-2 px-4 my-4 border-2 border-black bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out '>
                      Add an Extra
                    </p>
                    {portrait?.sheetUploads.length === 0 
                    ?<div>
                      <p>No extras have been added to this portrait. Click to add a character sheet, weapons sheet , or 3D model.</p>
                    </div>
                    :<div>
                      <p>Already added to your portrait: <span>({portrait?.status !== 'Completed' ? 'Click an image to enlarge' : 'Click an image to download your finished sheedt'})</span></p>
                      {extrasList}
                    </div>
                    }
                </div>
                : <p>Click an option to upload your work</p>
                }
                

                <UploadSheet
                  showDialog={openSheet} 
                  onCloseDialog={() => setOpenSheet(false)} 
                  userId={authUser?.uid}
                  portrait={portrait}
                  setPortrait={setPortrait}
                  index={index}
                />
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
        <div className='w-full lg:w-4/12 mt-8 lg:mt-0'>
          <ChatBox portraitId={portraitId}/> 
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}
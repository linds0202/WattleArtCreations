'use client'

import '../../globals.css'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { updatePortrait, getTestimonial } from '../../firebase/firestore';
import ChatBox from './components/ChatBox';
import UploadImg from './components/UploadImageDialogueBox';
import UploadSheet from './components/UploadSheet';
import CompleteCommission from './components/CompleteCommission';
import CreateCheckout from './components/CreateCheckout';
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
import CustomerTestimonial from '@/app/testimonials/components/CustomerTestimonial';

export interface ExtrasData {
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

export interface Testimonial {
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
  const router = useRouter()

  const searchParams = useSearchParams()
  const complete: string | null = searchParams.get('complete')
  const type: string | null = searchParams.get('type')

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
  const [openCreateCheckout, setOpenCreateCheckout] = useState(false)

  const [openTestimonial, setOpenTestimonial] = useState(false)
  const [reviewed, setReviewed] = useState(false)

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

    if (complete === 'false' && type === 'extras') {
      console.log("failed extra")
      alert("Additional purchase of 3D model, character sheet, or weapons sheet was not successful, please try again or speak with your artist")
    } else if (complete === 'false' && type === 'revision'){
      console.log("failed extra")
      alert("Purchase of an additional revision was not successful, please try again or speak with your artist")
    } else if (complete === 'true' && type === 'addOn'){
      alert("Purchase of additional 3D model, character sheet, or weapons sheet was successful!")
    }
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

  const extrasList = (
  <div>
    <div className='mb-4'>
      <p className='font-semibold'>3D Models <span className='text-xs font-normal'>({authUser?.roles !== 'Customer' ? '3D models will be handled by admin after portrait completion.' : 'will be created once portrait is complete'})</span></p>
      {portrait?.sheetUploads.filter(extra => extra.type === 'model').length !== 0
      ? portrait?.sheetUploads.map((extra, i) =>
        <div key={extra.index} className='ml-4'>
          {extra.type === 'model' && <p className='my-2'>3D Model {extra.charNum !== 'AddOn' ? ` for Character ${extra.charNum}` : 'as Add On'}</p>}
        </div>
      )
      : <p className='text-[#43b4e4] ml-4 mt-2'>No 3D models added to this portrait</p>
      }
    </div>

    <div className='mb-4'>
      {authUser?.roles === 'Customer'
      ? <p className='font-semibold'>Character or Weapons Sheets <span className='text-xs font-normal'>(Sheets in <span className='px-2 py-1 bg-[#f4ffa1] rounded-lg'>yellow</span> have not been completed by your artist yet. {portrait?.status !== 'Completed' ? 'Completed sheets will have a thumbnail, click to enlarge' : 'Click an thumbnail to download your finished sheet'}. You cannot release payment to your artist until all sheets have been uploaded.)</span></p>
      : <p className='font-semibold'>Character or Weapons Sheets <span className='text-xs font-normal'>(Your customer cannot release payment to you until all additional sheets are uploaded. Click an <span className='px-2 py-1 bg-[#f4ffa1] rounded-lg'>option</span> to upload your work. Click the trash to remove an image and re-upload.)</span></p>
      }
      {portrait?.sheetUploads.filter(extra => extra.type === 'character' || extra.type === "weapons").length !== 0
      ? portrait?.sheetUploads.map((extra, i) =>
        <>          
        {extra.src === ""
        ? <div 
          key={extra.index} 
          className='ml-4'
          onClick={() => handleClickExtra(extra.index, extra.type)}
        >
          {(extra.type === 'character' || extra.type === 'weapons') && 
          <p className={`my-2 px-4 py-1 ${authUser?.roles === 'Artist' ? 'cursor-pointer bg-[#f4ffa1] rounded-xl  hover:bg-[#43b4e4]/25' : 'bg-[#f4ffa1] rounded-xl'}`}>{extra.type === 'weapons' ? 'Weapons sheet' : 'Character sheet'} <span>{extra.charNum !== 'AddOn' ? ` for Character ${extra.charNum}` : 'as Add On'}</span></p>}

        </div>
        : <div key={extra.index} className='ml-4 flex items-center'>
          {authUser?.roles === 'Customer' &&
          <img 
            src={extra.src} 
            onContextMenu={(e)=> e.preventDefault()}
            alt="sheet upload thumbnail" 
            className='w-[64px] h-[64px] object-center object-contain mr-4 cursor-pointer'
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
  
          <p>{extra.type === 'character' ? 'Character sheet' : 'Weapons sheet '} <span>{extra.charNum !== 'AddOn' ? ` for Character ${extra.charNum}` : 'as Add On'}</span></p>
          
          {authUser?.roles !== 'Customer' && <button 
            type="button" 
            onClick={() => handleDeleteSheet(extra.index)} 
            className='ml-4 hover:text-red-600'
            title='Remove upload?'
          >
            <DeleteForeverIcon />
          </button>}
        </div>}
      </>)
    : <p className='text-[#43b4e4] ml-4 mt-2'>No Character or Weapons sheets added to this portrait</p>
    }
    </div>
    
    <div className='mb-4'>
      <p className='font-semibold'>Complexity <span className='text-xs font-normal'>({authUser?.roles !== 'Customer' ? 'Complexity does not require a separate upload.' : 'Artist will adjust complexity of portrait'})</span></p>
      {portrait?.sheetUploads.filter(extra => extra.type.split('_')[0] === 'complexity').length !== 0
      ? portrait?.sheetUploads.map((extra, i) =>
        <div key={extra.index} className='ml-4'>
          {extra.type.split('_')[0] === 'complexity' && <p className='my-2'>Complexity Level {extra.type.split('_')[2]} {extra.charNum !== 'AddOn' ? ` for Character ${extra.charNum}` : 'as Add On'}</p>}
        </div>
      )
      : <p className='text-[#43b4e4] font-semibold ml-4 mt-2'>No added complexity for this portrait</p>
      }
    </div>
      
  </div>)
    
  
  const handleClickExtra = (clickedIndex: number, type: string) => {
    if (authUser.roles !== 'Customer' && (type === 'character' || type === 'weapons')) {
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
    const checkoutUrl = await getExtrasCheckoutUrl(portrait, authUser.uid)
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
  )

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

            {/* Center Section */}
            <div  className='w-full md:w-6/12 min-h-[80vh] md:px-4 mt-8 md:mt-0 flex flex-col justify-between items-center'>
              {/* Image Upload Section */}
              <div className='w-full md:px-4'>
              
                {(portrait?.status === 'Completed' || (portrait?.status === 'In Progress' && portrait?.portraitCompletionDate !== null)) &&
                <div className='bg-white rounded-xl p-2 flex flex-col items-center'>
                  {authUser?.roles === 'Customer' ?
                  <div className='w-full flex flex-col items-center'>
                    {(portrait?.status === 'In Progress' && portrait?.portraitCompletionDate !== null) 
                    ? <p className='text-2xl font-bold text-center text-[#43b4e4] '>You have accepted a final image</p>
                    : <p className='text-2xl font-bold text-center text-[#43b4e4] '>This commission is complete!</p>
                    }
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
                    {portrait?.reviewed
                    ? <div className='w-full mt-4 border-2 border-[#282828] rounded-xl p-4 flex flex-col xl:flex-row justify-between items-center'>
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
                    : <div className='w-full mt-4 p-4 bg-[#43b4e4]/50 rounded-xl'>
                        <h2 className='text-center font-bold text-2xl mb-2'>Share Your Experience</h2>
                        
                        <p className='text-lg mb-4'>We&apos;d love to hear about your experience with Wattle Art Creations and see how your custom digital artwork looks on display! Please consider sharing a photo or a testimonial on social media and tagging us at [social media handles], or emailing us your feedback at [email/contact information]. Your testimonials help us grow and continue to provide exceptional art commission services.</p>

                        {!openTestimonial && !portrait?.reviewed && portrait &&<div 
                          className='w-1/2 mx-auto text-xl font-semibold px-4 py-2 cursor-pointer bg-white border border-[#282828] rounded-xl hover:text-white hover:bg-[#43b4e4]'
                          onClick={() => setOpenTestimonial(true)}  
                        >
                          <p className='text-center'>Leave a Review</p>
                        </div>}

                        {openTestimonial && !portrait?.reviewed && portrait &&
                            <CustomerTestimonial 
                                setOpenTestimonial={setOpenTestimonial} 
                                displayName={authUser?.displayName}
                                category={portrait.mode}
                                portraitId={portraitId}
                                artistId={portrait?.artist[0].id}
                                customerId={authUser?.uid}
                                completionDate={portrait.lastUpdatedStatus}
                                setReviewed={setReviewed}
                                setTestimonial={setTestimonial}
                                source='portraitPage'
                            />
                        } 
                    </div>}
                  </div>
                </div>
                }
              
             
                <div className='w-full'>
                  
                  {portrait?.status !== 'Completed' && portrait?.portraitCompletionDate === null &&
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
                  <div className='w-full mt-8'>

                    {portrait?.portraitCompletionDate === null &&
                    <div className='w-full h-[88px] bg-white flex justify-around items-center border-2 border-[#bababa] rounded-xl mb-4'>
                      {/* final image has NOT been accepted */}
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

                    </div>}



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
                        
                        {portrait?.portraitCompletionDate === null &&
                        <button 
                          className='w-5/12 border-2 border-[#282828] bg-[#282828]/50 hover:text-white hover:bg-[#282828] rounded-lg p-2'  
                          onClick={handleReject}
                        >
                            {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                        </button>}
                        
                        <button 
                          className={`w-5/12 border-2 border-[#282828] ${!portrait.sheetUploads.filter(extra => extra.type === 'character' || extra.type === 'weapons').every(extra => extra.src !== '') ? 'bg-white/25' : 'bg-[#43b4e4]/75 hover:text-white hover:bg-[#43b4e4]'} rounded-lg p-2`}  
                          onClick={handleAccept}
                          disabled={!portrait.sheetUploads.filter(extra => extra.type === 'character' || extra.type === 'weapons').every(extra => extra.src !== '')}
                          title={`${!portrait.sheetUploads.filter(extra => extra.type === 'character' || extra.type === 'weapons').every(extra => extra.src !== '') ? 'Your artist has not completed all the sheets associated with this portrait' : ''}`}
                        >
                          {`${portrait?.portraitCompletionDate === null ? 'Accept as Final Image' : 'Accept uploaded sheets'}`}
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

                    {portrait?.portraitCompletionDate === null && 
                    <p className='text-xl text-center mt-4'>
                      <span className='text-[#43b4e4] font-semibold'>{portrait?.revisions}</span> {portrait?.revisions === 1 ? 'revision request' : 'revision requests'} remaining
                    </p>} 
                  </div>
                  }

                  {openImage &&
                    <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={imgEnlarge.src} date={imgEnlarge.date} final={imgEnlarge.final}/>
                  }
                </div>
              </div>

              {/* Extras Upload Section */}
              <div className='w-full h-full mt-8 bg-white/75 rounded-xl p-4 flex flex-col gap-2'>
                <p className='text-[#43b4e4] text-center text-2xl font-semibold'>Character and Weapons Sheets</p>
                
                
                {authUser?.roles === 'Customer'
                ? <div className='flex flex-col justify-between'>
                    <p>Enhance your portrait with exciting extras. Copy needs to go here about chatting your artist to add something to your portrait. Then payment button with display here</p>

                    {portrait?.addOns.length !== 0 && 
                    <div className='mb-4'>
                      
                      <div className='w-3/4 mx-auto mt-4 bg-white rounded-xl p-4'>
                        <p>Your artist has created a payment link for the following added options:</p>
                        <div className='mt-4 flex flex-col items-end'>
                          {portrait?.addOns.map((addOn, i) => 
                            <div key={i} className='w-3/4 flex justify-between'>
                              <p>{addOn.type === 'character' ? 'Character sheet' : addOn.type === 'weapons' ? 'Weapons sheet': addOn.type === 'model' ? '3D Model' : addOn.type}</p>
                              <p>{addOn.price.toFixed(2)}</p>
                            </div>  
                          )}
                          <p className='text-right text-lg font-semibold mt-2 pt-2 border-t border-[#282828]'>Total: ${portrait?.addOns.reduce((sum, addOn) => sum += addOn.price, 0)}</p>
                        </div>
                        {checkoutButton}
                      </div>
                    </div>}            
                    
                    {portrait?.sheetUploads.length === 0 
                    ?<div>
                      <p>No extras have been added to this portrait. Talk to your artist to add a character sheet, weapons sheet , or 3D model.</p>
                    </div>
                    :<div className='mt-4 bg-white rounded-xl px-4 py-2 flex flex-col gap-y-2'>
                      <p className='text-xl text-center font-bold'>Already purchased for this portrait: </p>
                      {extrasList}
                    </div>
                    }
                </div>
                :<div className='flex flex-col justify-between'>
                  <p>Character and Weapons sheets that have been purchased with this portrait are listed below. You must upload each before your customer can release payment for this portait. <span className='font-bold'>If your customer would like to add these options, chat with them, then create a payment link.</span></p>
                  
                  {portrait?.addOns.length !== 0 &&
                    <div className='w-1/2 mt-4 bg-white rounded-xl p-4'>
                      <p className='font-semibold'>This link includes payment for:</p>
                      {portrait?.addOns.map((addOn, i) => 
                        <p key={i} className='ml-4'>{addOn.type === 'character' ? 'Character sheet' : addOn.type === 'weapons' ? 'Weapons sheet': addOn.type === 'model' ? '3D Model' : addOn.type} - ${addOn.price}</p>  
                      )}
                      <p className='text-right font-semibold mt-2 pt-2 border-t border-[#282828]'>Total: ${portrait?.addOns.reduce((sum, addOn) => sum += Number(addOn.price), 0).toFixed(2)}</p>
                    </div>
                  }
                  
                  <p 
                    className='w-1/2 mx-auto text-lg text-black text-center rounded-lg py-2 px-4 my-4 border-2 border-black bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                    onClick={() => setOpenCreateCheckout(true)}  
                  >
                    {portrait?.addOns.length === 0 ? 'Create Payment Link' : 'Edit Payment Link'}
                  </p>
                  
                  {portrait?.sheetUploads.length === 0 
                    ? <p>No extras have been added to this portrait</p>
                    :<div className='bg-white rounded-xl p-4 flex flex-col gap-y-2'>
                      <p className='text-xl text-center font-bold'>Already Purchased For This Portrait:</p>
                      {extrasList}
                    </div>
                  }
                </div>
                    
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

          {openCreateCheckout && portrait &&
            <CreateCheckout 
              openCreateCheckout={openCreateCheckout} 
              setOpenCreateCheckout={setOpenCreateCheckout} 
              portrait={portrait}
              setPortrait={setPortrait}
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
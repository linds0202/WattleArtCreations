import { useState, useEffect } from "react"
import { useAuth } from "@/app/firebase/auth"
import { PortraitData } from "../../components/PortraitCustomizer"
import Accordion from "../../components/questionaire/Accordion"
import ArtistList from "./ArtistList"
import { Timestamp } from 'firebase/firestore';
import Questions from "./Questions";
import Submission from "./Submission"
import Link from "next/link"

interface ActionCenterProps {
    portrait: PortraitData,
    setPortrait: Function,
}


const ActionCenter = ({ portrait, setPortrait }: ActionCenterProps) => {
    const { authUser, isLoading } = useAuth();

    const [openArtistList, setOpenArtistList] = useState(false)
    const [artistIndex, setArtistIndex] = useState(0)

    const [openQuestions, setOpenQuestions] = useState(false)
    const [canEditQs, setCanEditQs] = useState(true);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [loadingTime, setLoadingTime] = useState(false)

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

    //Displays artist selection list for customer
    const handleOpenArtistList = (i:number) => {
        setArtistIndex(i)
        setOpenArtistList(true)
    }

      // Displays Questions
    const handleOpenQuestions = () => {
        setOpenQuestions(true)
    }

    return (
        <div className="w-[100%] mb-8">
            <Accordion title={'Step One - Artist Selection'} required={false} active={false} >
                
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
                {portrait?.artistAssigned && <p>Your artist is: 
                    <Link 
                        href={`/artistDashboard/${portrait.artist[0].id}/portfolio`} 
                        rel="noopener noreferrer" 
                        target="_blank"
                        className="text-[#2DD42B] hover:text-[#165f15] ml-2"
                    >
                        {portrait.artist[0].artistName}
                    </Link>
                </p>}
            </Accordion>

            <Accordion title={`Step Two - Customer Questions ${canEditQs ? '(Edit Answers)' : '(View Questions)'}`} required={false} active={false} >
                
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

            </Accordion>
            
            <Accordion title={'Step Three - Review Artist Submission'} required={false} active={false} >
                {!portrait?.revised && 
                    <div>
                        <p>Your artist has not submitted an image yet. No action needed at this time.</p>
                    </div>
                }
                {portrait?.revised && 
                    <div>
                        <p>Your artist has submited an image for your review. You have 7 days* to review the image.</p>
                        <p className="text-sm text-[#bababa]">*Failure to respond within this time will result in the image being approved</p>
                
                        <Submission portrait={portrait} />
                    </div>
                }
            </Accordion>
            
            <Accordion title={'Step Four - Release Payment or Request Additional Revisions'} required={false} active={false} >
                <div className="flex flex-col justify-center items-center">
                    {!portrait.revised 
                    ? <p>Your artist is hard at work creating your master piece. Check back later</p>
                    : <div>
                        {portrait?.revisions > 0 &&  
                            <div>
                                <p>Happy with your artist's latest submission?</p>
                                <p>Select 'Accept as Final Image' in the Final Image section of this page </p>
                            </div>
                        }
                            
                        {portrait?.revisions === 0 && 
                        <div>
                            <p>You have used all of the included revisions</p>
                            <Link 
                                    href='/revisions' 
                                    rel="noopener noreferrer" 
                                    target="_blank"
                                    className="text-[#2DD42B] hover:text-[#165f15] ml-2"
                                >
                                    <span className='font-semibold'>(see complete policy)</span> 
                            </Link>
                            
                            {!portrait?.additionalRevision && 
                                <div>
                                    <p>If you are satified with your portrait, click 'Accept as Final' in the Final images area of this page to release payment to your artist & download your image</p>
    
                                    <p>If you need an additional revision, chat your artist and they can arrange this service</p>
                                </div>
                            }
                            
                            {portrait?.additionalRevision && 
                                <div>
                                    <p className="mb-4">Click the payment link to purchase an additional revision for this portrait</p>
                                    <div className="w-10/12 mx-auto p-2">
                                        <Link 
                                        href='https://buy.stripe.com/test_3cs14g82bbBX3nOcMM' 
                                        className="mb-8 py-2 px-4 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF]"    
                                    >Purchase Additional Revision</Link>
                                    </div> 
                                </div>
                            }
                        </div>}
                    </div>}
                </div>
                
            </Accordion>
        </div>
    )
}

export default ActionCenter
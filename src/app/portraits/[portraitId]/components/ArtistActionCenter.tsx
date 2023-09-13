import { useState, useEffect } from "react"
import { useAuth } from "@/app/firebase/auth"
import { PortraitData } from "../../components/PortraitCustomizer"
import ActionCenterAccordion from "./ActionCenterAccordion"
import AdditionalRevision from "./AdditionalRevision"
import { Timestamp } from 'firebase/firestore';
import Questions from "./Questions";
import CustomerRevision from "./CustomerRevision"
import ArtistCounter from "./ArtistCounter"
import Submission from "./Submission"

export interface ActionCenterProps {
    portrait: PortraitData,
    setPortrait: Function,
    setOpenRevision: Function
}


const ArtistActionCenter = ({ portrait, setPortrait, setOpenRevision }: ActionCenterProps) => {
    const { authUser, isLoading } = useAuth();

    const [openQuestions, setOpenQuestions] = useState(false)
    const [canEditQs, setCanEditQs] = useState(true);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [loadingTime, setLoadingTime] = useState(false)

    const [openAdditionalRevision, setOpenAdditionalRevision] = useState(false)

    useEffect(() => {

        const interval = setInterval(() => {
          setLoadingTime(true)
    
          const now = Timestamp.fromDate(new Date())      
    
          const difference = 86400 - (now.seconds - portrait?.purchaseDate.seconds)
    
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

    const customerRevisions = portrait?.finalImages.map((image, i) =>
        <div key={i}>
            {i < 2 &&
            <div>
                <ActionCenterAccordion title={'Artist Submission'} open={false} attention={false} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex justify-between items-center">
                        <img src={portrait?.finalImages[i].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg' alt='thumbnail associated with this artist submission'/>
                        <div className="w-full bg-white py-2 px-4 rounded-lg ml-4 self-stretch flex flex-col justify-center">
                            <p>You submitted an image on:</p>
                            <p className="font-semibold">{new Date(image.date.seconds * 1000).toLocaleString()}</p>
                        </div>
                        
                    </div>
                </ActionCenterAccordion>
            
                {portrait?.revisionNotes[i] 
                ? <CustomerRevision 
                    key={i} 
                    portrait={portrait} 
                    note={portrait?.revisionNotes[i]} 
                    img={portrait?.finalImages[i].imageUrl}
                    latest={portrait?.revisionNotes.length - 1 === i && portrait?.revisionNotes.length === portrait?.finalImages.length}
                    index={i}
                />
                : <ActionCenterAccordion title={'Awaiting Customer Response'} open={true} attention={true} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <Submission portrait={portrait}/>
                    </div>
                    
                </ActionCenterAccordion>
                }

                {(portrait?.finalImages.length === portrait?.revisionNotes.length && portrait?.revisionNotes.length - 1 === i) && 
                <ActionCenterAccordion title={`${portrait?.finalImages.length === portrait?.revisionNotes.length ? 'Submit Image' : 'Artist Submission'}`} open={portrait?.finalImages.length === portrait?.revisionNotes.length} attention={portrait?.finalImages.length === portrait?.revisionNotes.length} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <p className="font-semibold ">Your customer requested a revision on: </p>
                        <p className='text-md'>{new Date(portrait?.revisionNotes[portrait?.revisionNotes.length - 1]?.date.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.revisionNotes[portrait?.revisionNotes.length - 1]?.date.seconds * 1000).toLocaleTimeString()}</p>
                
                        {(portrait?.finalImages.length === portrait?.revisionNotes.length) && 
                        <div className="flex items-center mt-4">
                            <p className="font-semibold">Next Step: </p>
                            <p className="ml-4">Upload your revised image</p>
                        </div>
                        }

                        <ArtistCounter portrait={portrait} first={false}/>
                    </div>
                </ActionCenterAccordion>}
            </div>}

            {i >= 2 &&
            <>
                <ActionCenterAccordion title={'Artist Submission'} open={false} attention={false} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex justify-between items-center">
                        <img src={portrait?.finalImages[i].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg' alt='final image thumbnail'/>
                        <div className="w-full bg-white py-2 px-4 rounded-lg ml-4 self-stretch flex flex-col justify-center">
                            <p>You submitted an image on:</p>
                            <p className="font-semibold">{new Date(image.date.seconds * 1000).toLocaleString()}</p>
                        </div>
                        
                    </div>
                </ActionCenterAccordion>
                
                {portrait?.revisionNotes[i] 
                ? <CustomerRevision 
                        key={i} 
                        portrait={portrait} 
                        note={portrait?.revisionNotes[i]} 
                        img={portrait?.finalImages[i].imageUrl}
                        latest={portrait?.revisionNotes.length - 1 === i && portrait?.revisionNotes.length === portrait?.finalImages.length}
                        index={i}
                />
                : <ActionCenterAccordion title={'Awaiting Customer Response'} open={true} attention={true} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <Submission portrait={portrait}/>
                    </div>
                    
                </ActionCenterAccordion>
                }
            </>
            }
        </div>
    )

      // Displays Questions
    const handleOpenQuestions = () => {
        setOpenQuestions(true)
    }

    const handleAdditionalRevision = () => {
        setOpenAdditionalRevision(true)
    }


    return (
        <div className="w-[100%] mb-8">
            <ActionCenterAccordion title="Portrait Details" open={canEditQs} attention={canEditQs} >
                
                {/* See Questions */}
                <div className='w-full bg-[#e8e8e8] rounded-lg p-4 mt-2'>
                    <h3 className='text-xl font-bold text-center'>Customer Questions</h3>
      
                    <div>
                        {canEditQs 
                            ? <div className="mt-4">
                                <p >Your customer still has the ability to edit their answers.</p>
                                
                                {loadingTime ? 
                                <div className="mt-4 flex items-center">
                                    <p className="">Time Remaining: </p>
                                    <div className='w-6/12 ml-2 mt-2 px-4 py-2 flex justify-around bg-white border-2 border-[#282828] rounded-lg'>
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
                                </div>
                                : <p>Calculating . . . </p>
                                }

                            </div>
                            : <p className="text-center">Your customer can no longer edit their answers</p>
                        }
                        {loadingTime && 
                        <div className='w-1/2 mx-auto'>
                      
                            <button 
                                className='w-full text-xl border-2 bg-white border-black hover:text-white hover:bg-[#0075FF] rounded-lg p-2 mt-4 mb-2' 
                                onClick={handleOpenQuestions}
                            >
                                View Details
                            </button>
                        </div>}
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
                </div>

            </ActionCenterAccordion>



            {portrait?.finalImages.length === 0 
            ? <ActionCenterAccordion title={'First Upload'} open={true} attention={true} >
                <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                    <h3 className='text-xl font-bold text-center mb-4'>Submit an Image</h3>
                    <p>Upload your first submission by clicking &apos;<span className="text-[#0075FF] font-semibold">Upload Image</span>&apos; in the final image section of this page.</p>
                    <ArtistCounter portrait={portrait} first={true}/>
                </div>
            </ActionCenterAccordion>
            : <div> {customerRevisions} </div>}


            
            {/* Additional Revisions */}
            {portrait?.additionalRevisionRequest && 
            <div>

                {!portrait?.additionalRevision && <ActionCenterAccordion title={'Chat with Your Customer'} open={true} attention={true} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <p className="bg-white py-2 px-4 rounded-lg">Chat with your customer about their revision request. Discuss additional costs and time requirements. When ready, select the level for the revision below to create a payment button for your customer</p>
                    </div>
                </ActionCenterAccordion>}





                {!portrait?.revised && <ActionCenterAccordion title={'Additional Revisions'} open={portrait?.additionalRevisionRequest || portrait?.additionalRevision} attention={portrait?.additionalRevisionRequest || portrait?.additionalRevision} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <div>
                            {portrait?.additionalRevision 
                                ? <div>
                                    
                                    <p className="text-center">Your customer has purchased a{`${portrait?.revisionLevel === 'Intermediate' ? 'n' : ''}`} <span className="text-[#0075FF] font-semibold">{portrait?.revisionLevel} Addtional Revision</span></p>
                                    <div className="flex mt-4">
                                        <p className="font-semibold mr-4">Next Step: </p>
                                        <p>Upload your revised image</p>
                                    </div>
                                    
                                    <ArtistCounter portrait={portrait} first={false}/>
                                </div>
                                : <div className="flex flex-col justify-center items-center">
                                    <p className="text-center text-xl">Your customer has requested an <span className="text-[#0075FF] font-semibold">Addtional Revision</span></p>
                                    <button
                                        type="button"
                                        onClick={handleAdditionalRevision}
                                        className="my-4 border-2 border-[#282828] bg-white rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828] "
                                        >
                                            {portrait?.revisionLevel === "" ? "Select Revision Level" : "Change Revision Level"}
                                    </button>
                                    {portrait?.revisionLevel !== "" && <p className="text-center">Selected Revision Level: <span className="ml-2 font-semibold text-[#0075FF]">{portrait?.revisionLevel}</span></p>}
                                </div>
                                }
                                

                            {openAdditionalRevision &&
                                <AdditionalRevision 
                                    openAdditionalRevision={openAdditionalRevision}
                                    setOpenAdditionalRevision={setOpenAdditionalRevision}
                                    portrait={portrait}
                                    setPortrait={setPortrait}
                                />
                            }
                                
                        </div>
                        
                    </div>
                </ActionCenterAccordion>}
            </div>}


            <ActionCenterAccordion title={'Portrait Complete - Payment Released'} open={portrait?.status === 'Completed'} attention={portrait?.status === 'Completed'} >
                <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                    {portrait?.status === "Complete"  
                        ? <div className="bg-white py-2 px-4 rounded-lg">
                            <p>Your customer has approved your last submission</p>
                            <p>This portrait is now complete. The Wattle Arts Admin team will proces your payment shortly</p>
                        </div>
                        : <p>Portrait not complete yet</p>
                    }
                      
                </div>
            </ActionCenterAccordion>
        </div>
    )
}

export default ArtistActionCenter
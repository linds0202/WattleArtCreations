import { useState, useEffect } from "react"
import { useAuth } from "@/app/firebase/auth"
import ActionCenterAccordion from "./ActionCenterAccordion"
import ArtistList from "./ArtistList"
import { Timestamp } from 'firebase/firestore';
import Questions from "./Questions";
import Submission from "./Submission"
import Link from "next/link"
import { ActionCenterProps } from "./ArtistActionCenter"
import CustomerRevision from "./CustomerRevision"




const CustomerActionCenter = ({ portrait, setPortrait, setOpenRevision }: ActionCenterProps) => {
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


    const customerRevisions = portrait?.finalImages.map((submission, i) =>
        <div key={i}>
            {i < 2 &&
            <div>
                {(portrait.finalImages.length - 1 !== i || !portrait?.revised) && //portrait.revised && 
                <ActionCenterAccordion title={'Artist Submission'} open={false} attention={false} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex justify-between items-center">
                        <img src={portrait?.finalImages[i].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                        <div className="w-full bg-white py-2 px-4 rounded-lg ml-4 self-stretch flex flex-col justify-center">
                            <p>Artist submitted image on:</p>
                            <p className="font-semibold">{new Date(submission.date.seconds * 1000).toLocaleString()}</p>
                        </div>
                    </div>
                </ActionCenterAccordion>}

                {portrait?.revisionNotes[i] && 
                <CustomerRevision 
                    key={i} 
                    portrait={portrait} 
                    note={portrait?.revisionNotes[i]} 
                    img={portrait?.finalImages[i].imageUrl}
                    latest={portrait.revisionNotes.length - 1 === i && portrait?.revisionNotes.length === portrait?.finalImages.length}
                    index={i}
                />}

                
                {portrait.revised && portrait.finalImages.length - 1 === i &&
                // <ActionCenterAccordion title="Review Artist Submission" open={true} attention={true}>
                //     <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                //         <p className="mb-4">Your artist has submited an image for your review. You have <span className="text-[#0075FF] font-semibold text-xl">7</span> days* to review the image. You can <span className="text-[#0075FF] font-semibold text-xl">Accept as Final Image</span> or <span>Request a Revision</span> in the final images section of this page</p>
                        
                
                //         <Submission portrait={portrait} />
                //         <div className="bg-white rounded-xl py-2 px-4">
                //             <p className="text-sm text-center">*Failure to respond within this time will result in the image being approved automatically</p>
                //         </div>
                //     </div>
                // </ActionCenterAccordion>
                <div>
                    <ActionCenterAccordion title={`${portrait?.revised ? 'Review Artist Submission' : 'Awaiting Artist Submission'}`} open={portrait?.revised} attention={portrait?.revised} >
                        <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                            {!portrait?.revised &&
                                <div>
                                    <p>Your artist has not submitted an image for your review yet. No action needed at this time.</p>
                                </div>
                            }
                            {portrait?.revised && 
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <img src={submission.imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                                        <p className="ml-4">Your artist has submited an image for your review. You have <span className="text-[#0075FF] font-semibold text-xl">7</span> days* to <span className="text-[#0075FF] font-semibold text-xl">Accept as Final Image</span> or <span>Request a Revision</span></p>
                                    </div>
                            
                                    <Submission portrait={portrait} />
                                    <div className="bg-white rounded-xl py-2 px-4">
                                        <p className="text-sm text-center">*Failure to respond within this time will result in the image being approved automatically</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </ActionCenterAccordion>
                    <ActionCenterAccordion title='Request Revision' open={portrait?.revised} attention={portrait?.revised}>
                        <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex flex-col justify-around items-center">
                            <p>You have <span className="text-xl font-semibold text-[#0075FF]">{portrait?.revisions}</span> free revisions remaining</p>
                            <button 
                            className='w-5/12 mt-4 border-2 border-[#282828] bg-white hover:text-white hover:bg-[#282828] rounded-lg p-2'  
                            onClick={() => setOpenRevision(true)}
                            >
                                {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                            </button>
                        </div>
                        
                    </ActionCenterAccordion>
                </div>
                
                }
                
                {(portrait?.finalImages.length === portrait?.revisionNotes.length && portrait?.revisionNotes.length - 1 === i) && 
                <ActionCenterAccordion title="Awaiting Artist Submission" open={false} attention={false}>
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <p>Your artist has not submitted an image for your review yet. No action needed at this time.</p>
                    </div>
                </ActionCenterAccordion>           
                }
            </div>}
            
            {/* {i === 2 &&
            <div>
                {portrait?.revisionNotes[i] && 
                <CustomerRevision 
                    key={i} 
                    portrait={portrait} 
                    note={portrait?.revisionNotes[i]} 
                    img={portrait?.finalImages[i].imageUrl}
                    latest={portrait.revisionNotes.length - 1 === i && portrait?.revisionNotes.length === portrait?.finalImages.length}
                    index={i}
                />}
            </div>} */}
        </div>
    )

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
            <ActionCenterAccordion title={'Artist Selection'} open={!portrait?.artistAssigned} attention={!portrait?.artistAssigned} >
                <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2"> 
                    {!portrait?.artistAssigned && 
                    <div className='w-full p-4'>
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
                    {portrait?.artistAssigned && <p className="bg-white py-2 px-4 rounded-lg">Your artist is: 
                        <Link 
                            href={`/artistDashboard/${portrait?.artist[0].id}/portfolio`} 
                            rel="noopener noreferrer" 
                            target="_blank"
                            className="text-xl font-semibold text-[#2DD42B] hover:text-[#165f15] ml-4"
                        >
                            {portrait?.artist[0].artistName}
                        </Link>
                    </p>}
                </div>
            </ActionCenterAccordion>

            <ActionCenterAccordion title={`Customer Questions ${canEditQs ? '(Edit Answers)' : '(View Questions)'}`} open={canEditQs} attention={canEditQs} >
                
                {/* Edit or See Questions */}
                <div className='w-full bg-[#e8e8e8] rounded-lg p-4 mt-2'>
                    <h3 className='text-xl font-bold text-center'>Questions</h3>
                    
                    {canEditQs 
                        ? <div>
                            <p className='mt-4 font-semibold'>Time remaining to revise answers:</p>

                            {loadingTime ? 
                                <div className='w-8/12 mt-2 px-4 py-2 flex justify-around bg-white border-2 border-[#282828] rounded-lg'>
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

                            <p className='mt-4'>You have 24 hours after purchase to answer/change your responses to the questions.</p>
                            
                            <p className='mt-4 font-semibold'>Purchase date: <span className='font-semibold text-md text-[#2DD42B] ml-2'>{new Date(portrait?.purchaseDate.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.purchaseDate.seconds * 1000).toLocaleTimeString()}</span></p>
                        </div>
                        : <div>
                            <p className='text-sm mt-2'>You time to edit your responses has ended. You can still view your answers but will no longer be able to edit them.</p>
                        </div>
                    }


                    {loadingTime && <div className='w-1/2 mx-auto'>
                        <button 
                            className='w-full text-xl border-2 border-black bg-white hover:text-white hover:bg-[#0075FF] rounded-lg p-2 mt-4 mb-2' onClick={handleOpenQuestions}
                        >
                            {canEditQs ? "Edit Answers" : "View Questions"}
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

            </ActionCenterAccordion>


            {/* 1st upload */}
            {portrait?.revisionNotes.length === 0 
            ? <div>
                <ActionCenterAccordion title={`${portrait?.revised ? 'Review Artist Submission' : 'Awaiting Artist Submission'}`} open={portrait?.revised} attention={portrait?.revised} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        {!portrait?.revised &&
                            <div>
                                <p>Your artist has not submitted an image for your review yet. No action needed at this time.</p>
                            </div>
                        }
                        {portrait?.revised && 
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <img src={portrait?.finalImages[0].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                                    <p className="ml-4">Your artist has submited an image for your review. You have <span className="text-[#0075FF] font-semibold text-xl">7</span> days* to <span className="text-[#0075FF] font-semibold text-xl">Accept as Final Image</span> or <span>Request a Revision</span></p>
                                </div>
                        
                                <Submission portrait={portrait} />
                                <div className="bg-white rounded-xl py-2 px-4">
                                    <p className="text-sm text-center">*Failure to respond within this time will result in the image being approved automatically</p>
                                </div>
                            </div>
                        }
                    </div>
                </ActionCenterAccordion>
                <ActionCenterAccordion title='Request Revision' open={portrait?.revised} attention={portrait?.revised}>
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex flex-col justify-around items-center">
                        <p>You have <span className="text-xl font-semibold text-[#0075FF]">{portrait?.revisions}</span> free revisions remaining</p>
                        <button 
                          className='w-5/12 mt-4 border-2 border-[#282828] bg-white hover:text-white hover:bg-[#282828] rounded-lg p-2'  
                          onClick={() => setOpenRevision(true)}
                        >
                            {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                        </button>
                    </div>
                    
                </ActionCenterAccordion>
            </div>
            : <div> {customerRevisions} </div>}
            
        
            {/* Additional Revsions */}
            {portrait?.finalImages.length >= 3 && 
            <div>

                {/* Post artist Final Free submission */}
                <ActionCenterAccordion title={'Artist Submission'} open={false} attention={false} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex justify-between items-center">
                        <img src={portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                        <div className="w-full bg-white py-2 px-4 rounded-lg ml-4 self-stretch flex flex-col justify-center">
                            <p>Artist submitted image on:</p>
                            <p className="font-semibold">{new Date(portrait?.finalImages[portrait?.finalImages.length - 1].date.seconds * 1000).toLocaleString()}</p>
                        </div>
                    </div>
                </ActionCenterAccordion>

                {/* post customer 2nd revision */}
                {portrait?.revisionNotes[2] && <CustomerRevision 
                    // key={i} 
                    portrait={portrait} 
                    note={portrait?.revisionNotes[2]} 
                    img={portrait?.finalImages[2].imageUrl}
                    latest={(portrait.revisionNotes.length - 1 === 2 && portrait?.revisionNotes.length === portrait?.finalImages.length) && !portrait?.additionalRevision}
                    index={2}
                />}


                {portrait?.revised && 
                <ActionCenterAccordion title={`${portrait?.revised ? 'Review Artist Submission' : 'Awaiting Artist Submission'}`} open={portrait?.revised} attention={portrait?.revised} >
                    <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
                        <div className="flex justify-between items-center mb-4">
                            <img src={portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                            <p className="ml-4">Your artist has submited an image for your review. You have <span className="text-[#0075FF] font-semibold text-xl">7</span> days* to <span className="text-[#0075FF] font-semibold text-xl">Accept as Final Image</span> or <span className="font-semibold">Request an Additional Revision</span></p>
                        </div>
                
                        <Submission portrait={portrait} />

                        <div className="bg-white rounded-xl py-2 px-4">
                            <p className="text-sm text-center">*Failure to respond within this time will result in the image being approved automatically</p>
                        </div>
                    </div>
                </ActionCenterAccordion>
                }


                {portrait?.additionalRevisionRequest && !portrait?.additionalRevision &&
                <div>
                    <ActionCenterAccordion title='Chat with Your Artist' open={(portrait?.additionalRevisionRequest || portrait?.additionalRevision || portrait?.revisions === 0) && portrait?.status !== 'Completed'} attention={(portrait?.additionalRevisionRequest || portrait?.revisions === 0) && portrait?.status !== 'Completed'} >
                        <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex items-center">
                            <div className="w-full bg-white py-2 px-4 rounded-lg self-stretch flex flex-col justify-center">
                                <p>Use the chat to discuss your <span className="text-xl font-semibold text-[#0075FF]">Additional Revision Request</span> with your artist. They will create a custom quote for this additional service.</p>
                            </div>
                        </div>
                    </ActionCenterAccordion>
                    
                    <ActionCenterAccordion title={`${portrait?.additionalRevisionRequest ? 'Purchase': 'Request'} Additional Revision`} open={(portrait?.additionalRevisionRequest || portrait?.additionalRevision || portrait?.finalImages.length >= 3) && portrait?.status !== 'Completed'} attention={(portrait?.additionalRevisionRequest || portrait?.revisions === 0) && portrait?.status !== 'Completed'} >
                        <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex items-center">
                            {/* {portrait?.revisions > 0 &&  
                                <div>
                                    <p>You have included revisions remaining</p>
                                </div>
                            } */}


                            {/* {!portrait?.revised && portrait?.revisions === 0 && !portrait?.additionalRevisionRequest &&
                            <div>
                                <p>Your artist is completing the final included revision.</p>
                            </div>
                            } */}

                            {!portrait?.revised
                            ? <div className="w-full">
                                {portrait?.additionalRevisionRequest && !portrait.additionalRevision && portrait?.purchaseRevisionLink !== ''
                                    ? <div className="flex flex-col items-center">
                                        <p className="text-center mb-4">Click the payment link to purchase an additional revision for this portrait</p>
                                        <div className="p-2">
                                            <Link 
                                            href={portrait?.purchaseRevisionLink} 
                                            className="mb-8 py-2 px-4 border-2 border-[#282828] bg-white rounded-xl hover:text-white hover:bg-[#0075FF]"    
                                        >Purchase Additional Revision</Link>
                                        </div> 
                                    </div>
                                    :    //portrait?.additionalRevisionRequest && !portrait.additionalRevision 
                                     <div className="w-full bg-white py-2 px-4 rounded-lg self-stretch flex flex-col justify-center">
                                        <p>Your artist will post a payment link shortly. Check back later.</p>
                                    </div>
                                    // :<div>
                                    //     {portrait?.additionalRevisionRequest && <p>Your artist is hard at work creating your master piece. Check back later</p>}
                                    // </div>
                                }
                            </div>
                            : <div className="w-full">                            
                                {portrait?.revisions === 0 && portrait?.status !== 'Completed' &&
                                <div>
                                    <p className="text-xl font-semibold text-center">You have used all included revisions</p>
                                    <Link 
                                            href='/revisions' 
                                            rel="noopener noreferrer" 
                                            target="_blank"
                                            className="text-[#2DD42B] text-sm text-center hover:text-[#165f15]"
                                        >
                                            <p>(see complete policy)</p> 
                                    </Link>
                                    
                                    
                                    {!portrait?.additionalRevision && 
                                        <div className="mt-4 flex flex-col justify-around items-center">
                                            <p>If you need an additional revision, click below to request this service</p>
                                            <button 
                                                className='w-1/2 mt-4 border-2 border-[#282828] bg-white hover:text-white hover:bg-[#282828] rounded-lg p-2'  
                                                onClick={() => setOpenRevision(true)}
                                            >
                                                {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
                                            </button>
                                        </div>
                                    }
                                    
                                    {portrait?.additionalRevisionRequest && !portrait?.additionalRevision &&
                                        <div>
                                            <p className="mb-4">Click the payment link to purchase an additional revision for this portrait</p>
                                            <div className="w-10/12 mx-auto p-2">
                                                <Link 
                                                href={portrait?.purchaseRevisionLink} 
                                                className="mb-8 py-2 px-4 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF]"    
                                            >Purchase Additional Revision</Link>
                                            </div> 
                                        </div>
                                    }
                                </div>}
                                {portrait?.status === 'Completed' &&
                                    <div className="w-[100%] bg-white rounded-xl py-2 px-4">
                                        <p className="font-semibold">Portrait Complete</p>
                                    </div>
                                }
                            </div>}
                        </div>
                        
                    </ActionCenterAccordion>
                
                </div>}

                {portrait?.additionalRevisionRequest && portrait?.additionalRevision &&
                    
                <ActionCenterAccordion title='Additional Revision' open={portrait?.additionalRevision && portrait?.status !== 'Completed'} attention={portrait?.additionalRevision && portrait?.status !== 'Completed'} >
                    <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex items-center">
                        <p className="w-full bg-white text-center py-2 px-4 rounded-lg">Your artist is hard at work creating your master piece. Check back later</p>
                    </div>
                </ActionCenterAccordion>
                
                }



                
                
                
            </div>
            }
            
            <ActionCenterAccordion title={'Final Step - Release Payment'} open={portrait?.finalImages.length > portrait?.revisionNotes.length} attention={portrait?.finalImages.length > portrait?.revisionNotes.length} >
                <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex">
                    {!portrait?.revised
                    ? <div>
                        <p>Your artist is working hard to bring your vision to life. Check back later.</p>
                    </div>
                    : <div className="w-full">
                        {portrait?.revisions >= 0 && portrait?.status !== 'Completed' && 
                            <div>
                                <p className="text-xl text-center font-semibold">Happy with your artist's latest submission?</p>
                                <p className="mt-4 bg-white py-2 px-4 rounded-lg">Select '<span className="text-[#0075FF] font-semibold text-xl">Accept as Final Image</span>' in the Final Image section of this page to release payment and download your final image.</p>
                            </div>
                        }
                        {portrait?.revisions >= 0 && portrait?.status === 'Completed' && 
                            <div className="w-full">
                                <p className="text-xl text-center font-semibold">Thanks for choosing Wattle Art Creations</p>
                                <p className="mt-4 bg-white py-2 px-4 rounded-lg">Your Portrait is Complete. Click <span className="text-[#0075FF] font-semibold">Download Final Image</span> to receive your portrait</p>
                            </div>
                        }
                    </div>}
                </div>
                
            </ActionCenterAccordion>
        </div>
    )
}

export default CustomerActionCenter
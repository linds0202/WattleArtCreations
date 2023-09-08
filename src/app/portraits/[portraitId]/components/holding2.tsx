// {/* Additional Revsions */}
// {portrait?.finalImages.length >= 3 && 
//     <div>

//         {/* Post artist Final Free submission */}
//         {!portrait?.revised && <ActionCenterAccordion title={'Artist Submission'} open={false} attention={false} >
//             <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex justify-between items-center">
//                 <img src={portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
//                 <div className="w-full bg-white py-2 px-4 rounded-lg ml-4 self-stretch flex flex-col justify-center">
//                     <p>Artist submitted image on:</p>
//                     <p className="font-semibold">{new Date(portrait?.finalImages[portrait?.finalImages.length - 1].date.seconds * 1000).toLocaleString()}</p>
//                 </div>
//             </div>
//         </ActionCenterAccordion>}

//         {/* post customer 2nd revision */}
//         {portrait?.revisionNotes[i] && <CustomerRevision 
//             // key={i} 
//             portrait={portrait} 
//             note={portrait?.revisionNotes[i]} 
//             img={portrait?.finalImages[i].imageUrl}
//             latest={(portrait.revisionNotes.length === 3 && portrait?.revisionNotes.length === portrait?.finalImages.length) && !portrait?.additionalRevision}
//             index={i}
//         />}

//         {/* Artist has uploaded their 3rd + revision & customer has not responded */}
//         {portrait?.revised && 
//         <div>
//             <ActionCenterAccordion title={`${portrait?.revised ? 'Review Artist Submission' : 'Awaiting Artist Submission'}`} open={portrait?.revised} attention={portrait?.revised} >
//                 <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2">
//                     <div className="flex justify-between items-center mb-4">
//                         <img src={portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl} className='w-[96px] h-[96px] object-contain rounded-lg'/>
//                         <p className="ml-4">Your artist has submited an image for your review. You have <span className="text-[#0075FF] font-semibold text-xl">7</span> days* to <span className="text-[#0075FF] font-semibold text-xl">Accept as Final Image</span> or <span className="font-semibold">Request an Additional Revision</span></p>
//                     </div>
            
//                     <Submission portrait={portrait} />

//                     <div className="bg-white rounded-xl py-2 px-4">
//                         <p className="text-sm text-center">*Failure to respond within this time will result in the image being approved automatically</p>
//                     </div>
//                 </div>
//             </ActionCenterAccordion>

//             <ActionCenterAccordion title='Request Additional Revision' open={portrait?.revised} attention={portrait?.revised}>
//                 <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex flex-col justify-around items-center">
//                     <p>You have <span className="text-xl font-semibold text-[#0075FF]">{portrait?.revisions}</span> free revisions remaining</p>
//                     <button 
//                         className='w-5/12 mt-4 border-2 border-[#282828] bg-white hover:text-white hover:bg-[#282828] rounded-lg p-2'  
//                         onClick={() => setOpenRevision(true)}
//                     >
//                         {portrait?.revisions === 0 ? 'Request Additional Revision' : 'Request Revision'}
//                     </button>
//                 </div>
                
//             </ActionCenterAccordion>
//         </div>
//         }

//         {/* Customer has requested additional revision but not paid */}
//         {portrait?.additionalRevisionRequest && !portrait?.additionalRevision &&
//         <div>
//             <ActionCenterAccordion title='Chat with Your Artist' open={portrait?.additionalRevisionRequest && portrait?.status !== 'Completed'} attention={portrait?.additionalRevisionRequest && portrait?.status !== 'Completed'} >
//                 <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex items-center">
//                     <div className="w-full bg-white py-2 px-4 rounded-lg self-stretch flex flex-col justify-center">
//                         <p>Use the chat to discuss your <span className="text-xl font-semibold text-[#0075FF]">Additional Revision Request</span> with your artist. They will create a custom quote for this additional service.</p>
//                     </div>
//                 </div>
//             </ActionCenterAccordion>
            
//             <ActionCenterAccordion title={`${portrait?.additionalRevisionRequest ? 'Purchase': 'Request'} Additional Revision`} open={(portrait?.additionalRevisionRequest || portrait?.finalImages.length >= 3) && portrait?.status !== 'Completed'} attention={portrait?.additionalRevisionRequest && portrait?.status !== 'Completed'} >
//                 <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex items-center">

//                     {!portrait?.revised
//                     && <div className="w-full">
//                         {portrait?.purchaseRevisionLink !== ''
//                             ? <div className="flex flex-col items-center">
//                                 <p className="text-center mb-4">Click the payment link to purchase an additional revision for this portrait</p>
//                                 <div className="p-2">
//                                     <Link 
//                                     href={portrait?.purchaseRevisionLink} 
//                                     className="mb-8 py-2 px-4 border-2 border-[#282828] bg-white rounded-xl hover:text-white hover:bg-[#0075FF]"    
//                                 >Purchase Additional Revision</Link>
//                                 </div> 
//                             </div>
//                             :  
//                              <div className="w-full bg-white py-2 px-4 rounded-lg self-stretch flex flex-col justify-center">
//                                 <p>Your artist will post a payment link shortly. Check back later.</p>
//                             </div>
//                         }
//                     </div>}
//                 </div>
                
//             </ActionCenterAccordion>
        
//         </div>}

//         {portrait?.additionalRevisionRequest && portrait?.additionalRevision &&
            
//             <ActionCenterAccordion title='Additional Revision' open={portrait?.additionalRevision && portrait?.status !== 'Completed'} attention={portrait?.additionalRevision && portrait?.status !== 'Completed'} >
//                 <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex items-center">
//                     <p className="w-full bg-white text-center py-2 px-4 rounded-lg">Your artist is hard at work creating your master piece. Check back later</p>
//                 </div>
//             </ActionCenterAccordion>
        
//         }    
//     </div>}
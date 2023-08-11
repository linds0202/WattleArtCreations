'use client'

import {useState, useEffect} from 'react'
import { useAuth } from '../firebase/auth'
import { useSearchParams } from 'next/navigation'
import CustomerTestimonial from './components/CustomerTestimonial'
import { downloadImage } from '../firebase/storage'
import Link from 'next/link'
import { getPortrait } from '../firebase/firestore'


const page = () => {
    const { authUser } = useAuth()
    const searchParams = useSearchParams()
    const portraitId = searchParams.get('portraitId')
    const artistId = searchParams.get('artistId')
    const [portrait, setPortrait] = useState(null)
    const [openTestimonial, setOpenTestimonial] = useState(true)
    const [reviewed, setReviewed] = useState(false)

    useEffect(() => {
        const handleGetPortrait = async () => {
            const currentPortrait = await getPortrait(portraitId)
            setPortrait(currentPortrait)
        }   

        handleGetPortrait()
    }, [])
    
    const handleDownloadFinal = () => {
        downloadImage(portrait?.images[portrait?.images.length - 1].imageUrl)
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-10/12'>
                <h1>Congratulations on Your Custom Artwork!</h1>
                <p>Thank you for choosing Wattle Art Creations for your custom art commission. We're delighted to know that you're happy with the final artwork, and we can't wait for you to showcase and enjoy your digital masterpiece!</p>
                
                <p>To help you make the most of your experience, we&#39;ve put together some important information, next steps, and additional options to enhance your digital art:</p>
            </div>
            
            <div className='py-8 px-4 flex'>
                <div className='w-6/12'>
                    <p><span className='font-semibold'>Digital File Delivery:</span> Your digital artwork can be downloaded as a high-resolution file. You can always access the download via the individual portrait page on your dashboard. Select 'Completed' and then navigate to the portrait page.</p> 
                    <p>If you encounter any issues with your digital file, please contact our support team at [email/contact information].</p> 
                    {portrait?.status === 'Completed' && 
                        <button 
                            className='w-8/12 mx-auto border-2 border-black rounded-xl px-4 py-2 hover:bg-[#0075FF] hover:text-white'  
                            onClick={handleDownloadFinal}
                        >
                            Download Final Image
                        </button>
                    }
                </div>
                        
                
                <div className='w-6/12'>
                    <h2 className='font-bold text-3xl'>Share Your Experience:</h2>
                    <p>We'd love to hear about your experience with Wattle Art Creations and see how your custom digital artwork looks on display! Please consider sharing a photo or a testimonial on social media and tagging us at [social media handles], or emailing us your feedback at [email/contact information]. Your testimonials help us grow and continue to provide exceptional art commission services.</p>
                    {openTestimonial && 
                        <CustomerTestimonial 
                            setOpenTestimonial={setOpenTestimonial} 
                            displayName={authUser?.displayName}
                            portraitId={portraitId}
                            artistId={artistId}
                            customerId={authUser?.uid}
                            setReviewed={setReviewed}
                        />
                    } 

                    {reviewed && 
                        <div>
                            <p className='text-2xl text-center font-semibold mt-4'>Thanks for the feedback. </p>
                        </div>
                    }

                    <div>
                        <h2 className='font-bold text-3xl'>Feel that your artist went above and beyond bringing your vision to life?</h2>
                        <p>Leave your artist a tip to show your appreciation.</p>
                        <Link 
                            href='https://buy.stripe.com/test_bIYbIU96f7lH9MceUV'
                            className='w-8/12 mx-auto py-2 px-4 border-2 border-[#282828] rounded-xl hover:bg-[#0075FF] hover:text-white'
                        >
                            Tip Your Artist
                        </Link>
                    </div>
                </div>

            </div>
            

            
    
            <div className='w-10/12'>
                <p><span className='font-semibold'>Refer a Friend:</span> Do you know someone who would love a custom digital art piece? Refer them to Wattle Art Creations and share the joy of personalized, unique art. We appreciate your support and are grateful for every referral.</p>
            </div>
            
            <div className='w-10/12'>
                <p>Once again, thank you for choosing Wattle Art Creations for your custom digital art commission. We're honored to have been part of your artistic journey, and we hope to have the opportunity to create more stunning artwork for you in the future.</p>

                <p>If you have any questions or concerns, please don't hesitate to contact our support team. Enjoy your one-of-a-kind digital masterpiece!</p>
            </div>
            
        </div>
    )
}

export default page
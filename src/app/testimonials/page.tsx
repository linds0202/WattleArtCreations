'use client'

import {useState} from 'react'
import { useAuth } from '../firebase/auth'
import { useSearchParams } from 'next/navigation'
import CustomerTestimonial from './components/CustomerTestimonial'


const page = () => {
    const { authUser } = useAuth()
    const searchParams = useSearchParams()
    const portraitId = searchParams.get('portraitId')
    const artistId = searchParams.get('artistId')

    const [openTestimonial, setOpenTestimonial] = useState(true)
    const [reviewed, setReviewed] = useState(false)

    const handleDownloadFinal = () => {
        alert('Downloading Image!')
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
                    <button className='border-2 border-black rounded-lg p-2'  onClick={handleDownloadFinal}>Download Final Image</button>
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
                </div>
            </div>
            

            
    
            <div className='w-10/12'>
                <p><span className='font-semibold'>Refer a Friend:</span> Do you know someone who would love a custom digital art piece? Refer them to Wattle Art Creations and share the joy of personalized, unique art. We appreciate your support and are grateful for every referral.</p>
            </div>
            
            <div className='w-10/12'>
                <p>Once again, thank you for choosing Wattle Art Creations for your custom digital art commission. We're honored to have been part of your artistic journey, and we hope to have the opportunity to create more stunning artwork for you in the future.</p>

                <p>If you have any questions or concerns, please don&#39;t hesitate to contact our support team. Enjoy your one-of-a-kind digital masterpiece!</p>
            </div>
            
        </div>
    )
}

export default page
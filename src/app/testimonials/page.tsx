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

    const [openTestimonial, setOpenTestimonial] = useState(false)
    const [reviewed, setReviewed] = useState(false)
    
    const handleOpen = () => {
        setOpenTestimonial(true)
    }

    return (
        <div>
            <h1>Congratulations on Your Custom Artwork!</h1>
            <p>Thank you for choosing Wattle Art Creations for your custom art commission. We're delighted to know that you're happy with the final artwork, and we can't wait for you to showcase and enjoy your digital masterpiece!</p>
            
            <p>To help you make the most of your experience, we&#39;ve put together some important information, next steps, and additional options to enhance your digital art:</p>

            <p><span className='font-semibold'>Digital File Delivery:</span> Your digital artwork will be sent to you via email as a high-resolution file. You can expect to receive your artwork within [time frame] after confirming your satisfaction with the final piece. If you encounter any issues with your digital file, please contact our support team at [email/contact information].</p>            
            
            {!reviewed && 
                <div>
                    <h2 className='font-bold text-3xl'>Share Your Experience:</h2>
                    <p>We'd love to hear about your experience with Wattle Art Creations and see how your custom digital artwork looks on display! Please consider sharing a photo or a testimonial on social media and tagging us at [social media handles], or emailing us your feedback at [email/contact information]. Your testimonials help us grow and continue to provide exceptional art commission services.</p>
                    <p>Or you can click below to leave a rating & review right here!</p>
                    <button onClick={handleOpen} className='text-xl py-2 px-4 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#282828]'>Leave a review!</button>
                </div>
            }
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

            <p><span className='font-semibold'>Refer a Friend:</span> Do you know someone who would love a custom digital art piece? Refer them to Wattle Art Creations and share the joy of personalized, unique art. We appreciate your support and are grateful for every referral.</p>

            <p>Once again, thank you for choosing Wattle Art Creations for your custom digital art commission. We're honored to have been part of your artistic journey, and we hope to have the opportunity to create more stunning artwork for you in the future.</p>

            <p>If you have any questions or concerns, please don&#39;t hesitate to contact our support team. Enjoy your one-of-a-kind digital masterpiece!</p>
        </div>
    )
}

export default page
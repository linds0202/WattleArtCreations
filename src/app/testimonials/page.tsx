'use client'

import '../globals.css'
import {useState, useEffect} from 'react'
import { useAuth } from '../firebase/auth'
import { useSearchParams } from 'next/navigation'
import CustomerTestimonial from './components/CustomerTestimonial'
import { downloadImage } from '../firebase/storage'
import Link from 'next/link'
import { getPortrait } from '../firebase/firestore'
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import Footer from '../components/Footer'


const Testimonials = () => {
    const { authUser } = useAuth()
    const searchParams = useSearchParams()
    const portraitId = searchParams.get('portraitId')
    const artistId = searchParams.get('artistId')
    
    const [portrait, setPortrait] = useState<PortraitData | null>(null)
    const [openTestimonial, setOpenTestimonial] = useState(true)
    const [reviewed, setReviewed] = useState(false)

    useEffect(() => {
        const handleGetPortrait = async () => {
            const currentPortrait: PortraitData | null = await getPortrait(portraitId)
            if (currentPortrait) setPortrait(currentPortrait)
        }   

        handleGetPortrait()
    }, [portraitId])
    
    const handleDownloadFinal = () => {
        downloadImage(portrait?.finalImages[portrait?.finalImages.length - 1].imageUrl)
    }

    return (
        <div className='relative min-h-[100vh] text-white bg-gradient-to-b from-black from-0% via-[#282828] via-40% to-black to-60%'>
            <object type="image/svg+xml" data="/images/customizer/customizer.svg" className="absolute top-0 left-0 w-[102%] h-auto"/>

            <object type="image/svg+xml" data="images/HIWIcons/b_w_bricks.svg" className="absolute top-[25%] -left-[35%] md:-top-[10%] md:-left-[40%] lg:top-0 xl:top-[10%] lg:left-0 w-[500%] h-[175vh] md:w-[160%] md:h-[125%] lg:w-[100%] lg:h-[60%] object-cover md:object-none"/>
            
            <div className='pb-36 pt-24 flex flex-col justify-center items-center'>
                <div className='w-8/12 mx-auto mt-4 text-center'>
                    <h1 className='text-5xl text-[#43b4e4] font-bold'>Congratulations on Your Custom Artwork!</h1>
                    <p className='text-xl mt-4'>Thank you for choosing Wattle Art Creations for your custom art commission. We&apos;re delighted to know that you&apos;re happy with the final artwork, and we can&apos;t wait for you to showcase and enjoy your digital masterpiece!</p>
                    
                    <p className='text-xl mt-4'>To help you make the most of your experience, we&#39;ve put together some important information, next steps, and additional options to enhance your digital art:</p>
                </div>
                
                <div className='mt-4 py-8 px-12 flex gap-x-8 border border-yellow-600'>

                    <div className='w-6/12 z-20'>
                        <h2 className='font-bold text-3xl text-[#43b4e4] mb-4'>Share Your Experience:</h2>
                        
                        <p className='text-xl mb-4'>We&apos;d love to hear about your experience with Wattle Art Creations and see how your custom digital artwork looks on display! Please consider sharing a photo or a testimonial on social media and tagging us at [social media handles], or emailing us your feedback at [email/contact information]. Your testimonials help us grow and continue to provide exceptional art commission services.</p>

                        {openTestimonial && portrait &&
                            <CustomerTestimonial 
                                setOpenTestimonial={setOpenTestimonial} 
                                displayName={authUser?.displayName}
                                category={portrait.mode}
                                portraitId={portraitId}
                                artistId={artistId}
                                customerId={authUser?.uid}
                                completionDate={portrait.lastUpdatedStatus}
                                setReviewed={setReviewed}
                            />
                        } 

                        {reviewed && 
                            <div>
                                <p className='text-2xl text-center font-semibold mt-4'>Thanks for the feedback. </p>
                            </div>
                        }
                        <div className='w-full mt-12'>
                            <h2 className='font-bold text-3xl text-[#43b4e4]'>Refer a Friend:</h2>
                            <p className='text-xl mb-4'> Do you know someone who would love a custom digital art piece? Refer them to Wattle Art Creations and share the joy of personalized, unique art. We appreciate your support and are grateful for every referral.</p>
                        </div>
                    </div>

                    <div className='w-6/12 flex flex-col items-center'>
                        <div className='z-20'>
                            <h2 className='font-bold text-3xl text-[#43b4e4]'>Digital File Delivery:</h2> 
                            <p className='text-xl mb-4'>Your digital artwork can be downloaded as a high-resolution file. You can always access the download via the individual portrait page on your dashboard. Select &apos;Completed&apos; and then navigate to the portrait page.</p> 
                            <p className='text-xl mb-4'>If you encounter any issues with your digital file, please contact our support team at [email/contact information].</p> 
                            {portrait?.status === 'Completed' && 
                                <button   
                                    className='block w-1/3 mx-auto mt-4 text-xl text-white rounded-lg py-2 px-4 bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                                    onClick={handleDownloadFinal}
                                >
                                    Download Final Image
                                </button>
                            }
                        </div>
                        <div className='w-full mt-8 z-20'>
                            <h2 className='font-bold text-3xl text-[#43b4e4]'>Thank Your Artist:</h2>
                            <p className='text-xl mb-4'>Feel that your artist went above and beyond bringing your vision to life?</p>
                            <p className='text-xl mb-4'>Leave your artist a tip to show your appreciation.</p>
                            <div
                                className='w-1/3 mx-auto mt-4 text-xl text-white text-center rounded-lg py-2 px-4 bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out' 
                            >
                                <Link 
                                    href='https://buy.stripe.com/test_bIYbIU96f7lH9MceUV'
                                >
                                    Tip Your Artist
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div> 
                
                <div className='w-1/2 z-20 border border-green-600'>
                    <h3 className='mt-8 font-bold text-5xl text-[#43b4e4] text-center mb-4'>Thank You!</h3>
                    <p className='text-xl mb-4'>Once again, thank you for choosing Wattle Art Creations for your custom digital art commission. We&apos;re honored to have been part of your artistic journey, and we hope to have the opportunity to create more stunning artwork for you in the future.</p>

                    <p className='text-xl mb-4'>If you have any questions or concerns, please don&apos;t hesitate to contact our support team. Enjoy your one-of-a-kind digital masterpiece!</p>
                </div>
                
            </div>
            <Footer />
        </div>
        
    )
}

export default Testimonials
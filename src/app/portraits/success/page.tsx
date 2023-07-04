'use client'

import Link from "next/link"
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/auth";

const SuccessPage = () => {
  const router = useRouter();
  const { authUser, isLoading } = useAuth();

  const searchParams = useSearchParams()
  const portraitId = searchParams.get('portraitId')
  
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);
  
  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      
      <p>We appreciate your trust in Wattle Art Creations for your custom digital art commission. Your order has been successfully placed and sent to your chosen artist. They will be in touch with you shortly to discuss your vision and begin the creative process.</p>

      <p>While you wait for your artist to get in touch, feel free to explore our site further and discover more about our talented artists and the incredible artwork they&#39;ve created for our satisfied clients.</p>
      
      <p>You can visit your dashboard to see your Portraits</p>
      <Link href={`/dashboard/${authUser?.uid}`} className='text-black no-underline'>Customer Dashboard</Link>

      <p>Or visit your custom portrait page where you can collaborate with your artist</p>
      <Link href={`/portraits/${portraitId}`} className='text-black no-underline'>Portrait Page</Link>

      <p>Should you have any questions or concerns, don&#39;t hesitate to contact us. We&#39;re always here to help and ensure that your custom digital art commission experience is enjoyable and hassle-free.</p>
      
      <p>Thank you once again for choosing Wattle Art Creations. We can&#39;t wait to see your creative vision come to life!</p>
    </div>
  )
}

export default SuccessPage
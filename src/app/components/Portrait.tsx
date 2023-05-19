import React from 'react'
import { addArtist } from '../firebase/firestore'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

export default function Portrait({ portrait, userId}) {
  const router = useRouter()

  // console.log('userId in portrait is: ', userId)

  const handleClaim = async () => {
    const updatedPortrait = await addArtist(portrait.uid, userId)
    router.push(`/portraitQueue`)
  }

  // console.log('portrait.uid is: ', portrait.uid)
  // console.log('portrait artist id is: ', portrait.artist)
  
  return (
    <div className='border-2 rounded-xl border-black w-10/12 p-8 m-4 text-black flex flex-col'>
          <h4 className='font-bold'>{portrait.styleOne} &gt; {portrait.styleTwo} &gt; { portrait.styleThree } </h4>
          <div className='flex justify-between mt-2'>
            <div className='flex'>
              <div>
                <p className='mb-2'>Ordered on: {new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</p>
                <p className='mb-2'>Status: {portrait.status}</p>
              </div>
              <div className='ml-10'>
                <p className='mb-2'>Customer: {portrait.customer}</p>
                <p className='mb-2'>Artist: {portrait.artist}</p>
              </div>        
            </div>
            {(!portrait.artist && userId) && 
              <button onClick={handleClaim} className='border-black border-2 rounded-lg ml-4 px-4'>Claim</button>
            }
            <Link href={`/portraits/${portrait.uid}`} className="text-3xl no-underline"><p>View Details</p></Link>
          </div>  
    </div>
  )
}

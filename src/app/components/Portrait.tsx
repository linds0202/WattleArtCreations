import React from 'react'
import { addArtist } from '../firebase/firestore'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

export default function Portrait({ portrait, userId, role}) {
  const router = useRouter()


  const handleClaim = async () => {
    const updatedPortrait = await addArtist(portrait.uid, userId)
    router.push(`/portraitQueue`)
  }
  
  return (
    <div className='border-2 rounded-xl border-black w-11/12 p-8 m-4 text-black flex flex-col hover:cursor-pointer hover:scale-105 transition duration-500 group'>
          <h4 className='text-xl font-bold text-[#0075FF]'>{portrait.portraitTitle}<span className='text-sm font-light text-black ml-4'>({portrait.mode})</span></h4>
          <div className='flex justify-between mt-2'>
            <div className='w-9/12 flex'>
              <div>
                <p className='mb-2'>Ordered on: {new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</p>
                <p className='mb-2'>Status: {portrait.status}</p>
              </div>
              <div className='ml-10'>
                <p className='mb-2'>Customer:<span className='ml-4'>{portrait.customer}</span></p>
                <p className='mb-2'>Artist: 
                {portrait.artist !== "" 
                  ? <Link href={`/artistDashboard/${portrait.artist}/portfolio`} className="text-xl group-hover:underline ml-4">
                      <span>See Artist's Portfolio</span>
                    </Link>
                  : <span className='ml-4'>No artist assigned yet</span>}
                </p>
              </div>        
            </div>
            {(!portrait.artist && role === 'Artist') && 
              <button onClick={handleClaim} className='border-black border-2 rounded-lg ml-4 px-4'>Claim</button>
            }
            <Link href={`/portraits/${portrait.uid}`} className="text-3xl group-hover:underline"><p>View Details</p></Link>
          </div>  
    </div>
  )
}

import React from 'react'
import { addArtist } from '../firebase/firestore'
import { useRouter } from 'next/navigation'

export default function Portrait({ portrait, userId }) {
  const router = useRouter()
  const handleClaim = async () => {
    const updatedPortrait = await addArtist(portrait.uid, userId)
    router.push(`/portraitQueue`)
  }
  
  return (
    <div className='border-2 rounded-xl border-black w-8/12 p-8 m-8 text-black'>
          <h4>{portrait.styleOne} &gt; {portrait.styleTwo} &gt; { portrait.styleThree } </h4>
          <p>Ordered on: {new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</p>
          <p>Status: {portrait.status}</p>
          {portrait.artist === "" && <button onClick={handleClaim} className='border-black border-2 rounded-lg px-2 py-1'>Claim</button>}
    </div>
  )
}

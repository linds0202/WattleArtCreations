import { addArtist, updateUserData } from '../firebase/firestore'
import { useRouter } from 'next/navigation'
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { UserData } from '../artistDashboard/[userId]/portfolio/page'


import Link from 'next/link'

interface PortraitProps {
  portrait: PortraitData,
  user: UserData,
}

export default function Portrait({ portrait, user}: PortraitProps) {
    const router = useRouter()

    const handleClaim = async () => {
      const updatedArtist = {...user, activeCommissions: user.activeCommissions + 1}
      console.log('updatedArtist is: ', updatedArtist)
      await updateUserData(updatedArtist)
      const updatedPortrait = await addArtist(portrait.uid, user.uid, user.displayName)
      router.push(`/artistDashboard/${user.uid}`)
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
                  {user?.roles === 'Artist' && <p className='mb-2'>Customer:<span className='ml-4'>{portrait.customer}</span></p>}
                  <p className='mb-2'>Artist: 
                  {portrait.artist.length  
                    ? portrait.artist.map((artist, i) => 
                      <Link key={i} href={`/artistDashboard/${portrait.artist[i].id}/portfolio`} className="text-xl group-hover:underline ml-4">
                        <span>{artist.artistName}</span>
                      </Link>
                    )
                    : <span className='ml-4'>No artist assigned yet</span>}
                  </p>
                </div>        
              </div>
              
              {(portrait.artist.filter(artist => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
                <button onClick={handleClaim} className='border-black border-2 rounded-lg ml-4 px-4'>Claim</button>
              }
              <Link href={`/portraits/${portrait.uid}`} className="text-3xl group-hover:underline"><p>View Details</p></Link>
            </div>  
      </div>
    )
}

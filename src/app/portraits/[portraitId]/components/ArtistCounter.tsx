import { useState, useEffect } from 'react'
import { Timestamp } from 'firebase/firestore';
import { PortraitData } from '../../components/PortraitCustomizer';

interface ArtistCounterProps {
    portrait: PortraitData,
    first: boolean
}

const ArtistCounter = ({ portrait, first }: ArtistCounterProps) => {
    
    const [canApprove, setCanApprove] = useState(true);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [loadingTime, setLoadingTime] = useState(false)
    
    useEffect(() => {

        const interval = setInterval(() => {
          setLoadingTime(true)
    
          const now = Timestamp.fromDate(new Date())      
          let difference
          if (first) {
            difference = now.seconds - portrait?.lastUpdatedStatus.seconds
          } else {
            difference = now.seconds - portrait?.revisionNotes[portrait?.revisionNotes.length - 1]?.date.seconds
          }
    
          const d = Math.floor((difference / 86400))
          setDays(d)

          const h = Math.floor((difference - (d * 86400))/ 3600)
          setHours(h)
    
          const m = Math.floor((difference  - (d * 86400) - (h * 3600)) / 60)
          setMinutes(m)
    
          const s = Math.floor(difference - (d * 86400) - (h * 3600) - (m * 60))
    
          if (difference <= 0 ) { 
            setCanApprove(false)
          }
        }, 2000);
    
        return () => clearInterval(interval)
    }, [portrait])
    
    return (
        <div className='mt-4 mb-2'>
            {canApprove ?
                <div className='flex flex-col xl:flex-row items-center'>
                    <p className='font-semibold'>Time since customer request:</p>

                    {loadingTime ? 
                        <div className='mt-4 xl:mt-0 xl:ml-4 px-4 py-2 flex justify-around border-2 border-[#282828] bg-white rounded-lg'>
                            <div >
                                <span className="text-xl font-semibold">{days}</span>
                                <span className="font-light ml-2">Days</span>
                            </div>
                            <span className="mx-2">:</span>
                            <div >
                                <span className="text-xl font-semibold">{hours}</span>
                                <span className="font-light ml-2">Hrs</span>
                            </div>
                            <span className="mx-2">:</span>
                            <div >
                                <span className="text-xl font-semibold">{minutes}</span>
                                <span className="font-light ml-2">Mins</span>
                            </div>
                        </div>
                        : <p>Calculating . . . </p>
                    }
                    
                    {/* {!first && <p className='mt-4 font-semibold'>Request date: <span className='font-semibold text-md text-[#2DD42B] ml-2'>{new Date(portrait?.revisionNotes[portrait?.revisionNotes.length - 1]?.date.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.revisionNotes[portrait?.revisionNotes.length - 1]?.date.seconds * 1000).toLocaleTimeString()}</span></p>} */}
                    
                    
                    </div>
                    :
                    <div>
                    <p className='text-sm'>You time to review this image has ended</p>
                </div>
            }

        </div>
    )
}

export default ArtistCounter
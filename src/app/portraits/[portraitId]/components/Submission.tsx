import { useState, useEffect } from 'react'
import { Timestamp } from 'firebase/firestore';
import { PortraitData } from '../../components/PortraitCustomizer';

interface SubmissionProps {
    portrait: PortraitData
}

const Submission = ({ portrait }: SubmissionProps) => {
    
    const [canApprove, setCanApprove] = useState(true);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [loadingTime, setLoadingTime] = useState(false)
    
    useEffect(() => {

        const interval = setInterval(() => {
          setLoadingTime(true)
    
          const now = Timestamp.fromDate(new Date())      
    
          const difference = 604800 - (now.seconds - portrait?.finalImages[portrait?.finalImages.length - 1]?.date.seconds)
    
          const d = Math.floor((difference / 86400))
          setDays(d)

          const h = Math.floor((difference - (d * 86400))/ 3600)
          setHours(h)
    
          const m = Math.floor((difference  - (d * 86400) - (h * 3600)) / 60)
          setMinutes(m)
    
          const s = Math.floor(difference - (d * 86400) - (h * 3600) - (m * 60))
        //   setSeconds(s)
    
    
          if (difference <= 0 ) { 
            setCanApprove(false)
          }
        }, 2000);
    
        return () => clearInterval(interval)
    }, [portrait])
    
    return (
        <div>
            {canApprove ?
                <div>
                    
                    <div className='mt-2 flex items-center'>
                        <div>
                            <p className='font-semibold mr-4'>Remaining review time: </p>
                            {/* <p className="text-sm pr-8">(Image will be automatically accepted when time is up)</p> */}
                        </div>
                        {loadingTime ? 
                            <div className='w-6/12 px-4 py-2 flex justify-around border-2 border-[#282828] rounded-lg bg-white'>
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
                        
                    </div>
                    
                    <p className='mt-4 mb-4 font-semibold'>Submission date: <span className='font-semibold text-md text-[#2DD42B] ml-2'>{new Date(portrait?.artistSubmitted[portrait?.artistSubmitted.length - 1]?.seconds * 1000).toDateString() + ' at ' + new Date(portrait?.artistSubmitted[portrait?.artistSubmitted.length - 1]?.seconds * 1000).toLocaleTimeString()}</span></p>
                    
                    
                </div>
            :
            <div>
                <p className='text-sm'>The period to review this image has ended</p>
            </div>
            }

        </div>
    )
}

export default Submission
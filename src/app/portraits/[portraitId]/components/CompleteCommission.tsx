import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';
import { PortraitData } from '../../components/PortraitCustomizer';
import { updateArtistOnCompletion, updatePortrait } from '@/app/firebase/firestore';

interface CompleteCommissionProps {
    role: string,
    openComplete: boolean,
    setOpenComplete: Function,
    portrait: PortraitData,
    setPortrait: Function
}

const CompleteCommission = ({ role, openComplete, setOpenComplete, portrait, setPortrait }: CompleteCommissionProps) => {
    const router = useRouter();

    const handleComplete = () => {
        const  newPortrait = {...portrait, status: 'Completed'}
        
        if (portrait.artist.length) updateArtistOnCompletion(portrait?.artist[0]?.id, portrait?.price)

        updatePortrait(newPortrait?.id, newPortrait)

        setPortrait(newPortrait)        
        setOpenComplete(false)
        router.push(`/testimonials?portraitId=${portrait.id}&artistId=${portrait?.artist[0].id}`)
    }

    const handleCancel = () => {
        setOpenComplete(false)
    }

    return (
        <Dialog 
            onClose={() => setOpenComplete(false)} 
            open={openComplete} 
            fullWidth={true}
            maxWidth='sm'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenComplete(false)} className='text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            
            {role === 'Customer' && 
            <>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <div className="flex justify-center items-center mb-4">
                        <img className="mr-4 w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black accent paint splash'/>
                        <p className='text-3xl text-center font-bold mt-0'>Congratulations on Your Custom Artwork!</p>
                        <img className="ml-4 w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='black accent paint splash'/>
                    </div>
                    <p className='text-center text-lg mb-4'>Thank you for choosing Wattle Art Creations for your custom art commission. We&apos;re delighted to know that you&apos;re happy with the final artwork, and we can&apos;t wait for you to showcase and enjoy your digital masterpiece!</p>
                    <p className='text-center text-lg'>Clicking below will <span className='text-[#0075FF] font-semibold'>complete</span> your commission and <span className='text-[#0075FF] font-semibold'>release</span> your payment to your artist.*</p>
                </div>
                
                <div className='w-full mx-auto flex justify-around items-center'>
                    <button 
                        onClick={handleCancel} 
                        className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'
                    >
                        Cancel
                    </button>
                    
                    <button 
                        onClick={handleComplete} 
                        className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#0075FF] hover:text-white rounded-xl py-2 px-2'
                    >
                        Release Payment
                    </button>
                </div>
            </>}

            <p className='absolute bottom-2 left-2 text-[#8f8f8f] text-sm mt-8'>*This cannot be undone</p>

        </Dialog>
    )
}

export default CompleteCommission
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CompleteCommissionProps {
    role: string,
    openComplete: boolean,
    setOpenComplete: Function,
    setCompleted: Function,
    portraitId: string,
    artistId: string
}

const CompleteCommission = ({ role, openComplete, setOpenComplete, setCompleted, portraitId, artistId }: CompleteCommissionProps) => {
    const router = useRouter();

    console.log('portrait id: ', portraitId)

    const handleComplete = () => {
        setCompleted(true)        
        setOpenComplete(false)
        router.push(`/testimonials?portraitId=${portraitId}&artistId=${artistId}`)
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
            className='relative'
        >
            <IconButton onClick={() => setOpenComplete(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            
            {role === 'Customer' && 
            <>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <div className="flex justify-center items-center mb-4">
                        <img className="mr-4 w-[15%] justify-self-center" src="../../drips/side_splashL.png" />
                        <p className='text-xl text-center font-bold mt-0'>Congratulations on Your Custom Artwork!</p>
                        <img className="ml-4 w-[15%] justify-self-center" src="../../drips/side_splashR.png" />
                    </div>
                    <p className='text-center text-lg mb-4'>Thank you for choosing Wattle Art Creations for your custom art commission. We're delighted to know that you're happy with the final artwork, and we can't wait for you to showcase and enjoy your digital masterpiece!</p>
                    <p className='text-center text-lg'>Clicking below will <span className='text-[#0075FF] font-semibold'>complete</span> your commission and release your payment to your artist.*</p>
                </div>
                
                <div className='w-8/12 mx-auto flex justify-around items-center'>
                    <button onClick={handleCancel} className='text-xl text-[#282828] border-2 border-[#282828] hover:bg-red-600 hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                    <button onClick={handleComplete} className='text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#0075FF] hover:text-white rounded-xl py-2 px-2'>Release Payment</button>
                </div>
            </>}

            {role === 'Artist' && 
            <>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <div className="flex justify-center items-center mb-4">
                        <img className="mr-4 w-[15%] justify-self-center" src="../../drips/side_splashL.png" />
                        <p className='text-xl text-center font-bold mt-0'>Complete the Commission?</p>
                        <img className="ml-4 w-[15%] justify-self-center" src="../../drips/side_splashR.png" />
                    </div>
                    <p className='text-center text-lg mb-4'>Click complete below to indicate to the customer that you are finished with this portrait.</p>
                    <p className='text-center text-lg'>Clicking below will <span className='text-[#0075FF] font-semibold'>complete</span> your commission and notify the customer.*</p>
                </div>
                
                <div className='w-8/12 mx-auto flex justify-around items-center'>
                    <button onClick={handleCancel} className='text-xl text-[#282828] border-2 border-[#282828] hover:bg-red-600 hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                    <button onClick={handleComplete} className='text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#0075FF] hover:text-white rounded-xl py-2 px-2'>Mark Complete</button>
                </div>
            </>}
            <p className='absolute bottom-2 left-2 text-[#8f8f8f] text-sm mt-8'>*This cannot be undone</p>

        </Dialog>
    )
}

export default CompleteCommission
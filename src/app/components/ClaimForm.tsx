import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { updateUserData, addArtist } from '../firebase/firestore';
import { useRouter } from 'next/navigation';
import { UserData } from '../artistDashboard/[userId]/portfolio/page';
import { PortraitData } from '../portraits/components/PortraitCustomizer';

interface ClaimFormProps {
    openClaimForm: boolean
    setOpenClaimForm: Function,
    setOpenArtistDetails: Function,
    user: UserData | null,
    portrait: PortraitData
}

const ClaimForm = ({openClaimForm, setOpenClaimForm, setOpenArtistDetails, user, portrait}: ClaimFormProps) => {
    const router = useRouter()

    const [artistNote, setArtistNote] = useState('')

    const handleRequest = async () => {
        if (user) {
            const updatedArtist = {...user, activeCommissions: user.activeCommissions + 1}
            const update = await updateUserData(updatedArtist)
            const updatedPortrait = await addArtist(portrait.id, user.uid, user.artistName, artistNote)
        }
        
        setOpenClaimForm(false)
        setOpenArtistDetails(false)
        if (user) router.push(`/artistDashboard/${user.uid}`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newNote = e.target.value
        setArtistNote(newNote)
    }

    const handleCancel = () => {
        setOpenClaimForm(false)
    }
    
    return (
        <Dialog 
        onClose={() => setOpenClaimForm(false)} 
        open={openClaimForm} 
        fullWidth={true}
        maxWidth='lg'
        PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
    >
        <IconButton onClick={() => setOpenClaimForm(false)} className='absolute top-2 right-2 text-white'>
            <CloseIcon className='text-black hover:text-red-600'/>
        </IconButton>
        
        
        <div className='flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center mb-4">
                <img className="mr-4 w-[15%] justify-self-center" src="../../drips/side_splashL.png" alt='black accent paint splash' />
                <p className='text-2xl text-center font-bold mt-0'>Artist&apos;s Note</p>
                <img className="ml-4 w-[15%] justify-self-center" src="../../drips/side_splashR.png" alt='black accent paint splash'/>
            </div>
            
            <div className='w-full flex flex-col items-center'>
                <label className='w-10/12'>
                    Leave a note for the customer as to why you&apos;d be the best artist to create this portrait
                </label>
                <textarea
                    rows={10}
                    cols={60}
                    className='w-10/12 mt-4 border-2 border-[#E9E9E9] rounded-xl p-2'
                    onChange={handleChange}
                />
            </div>
            
            <div className='w-8/12 mx-auto mt-8 mb-4 flex justify-around items-center'>
                <button onClick={handleCancel} className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                <button onClick={handleRequest} className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#0075FF] hover:text-white rounded-xl py-2 px-2'>
                    Claim
                </button>
            </div>
        </div>
        
    </Dialog>
    );
}

export default ClaimForm


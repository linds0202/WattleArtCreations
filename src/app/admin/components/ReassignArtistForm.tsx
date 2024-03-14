import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { updateReassignedArtist, getAllArtists, updatePortrait} from '@/app/firebase/firestore';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';
import { Artist } from '@/app/components/Portrait';
import ReassignButtons from './ReassignButtons';

interface ReassignArtistFormProps {
    openReassign: boolean,
    setOpenReassign: Function,
    user: UserData | null,
    portrait: PortraitData
}

const ReassignArtistForm = ({openReassign, setOpenReassign, user, portrait}: ReassignArtistFormProps) => {

    const [artist, setArtist] = useState<Artist>({artistName: '', id: ''})
    const [allArtists, setAllArtists] = useState<Array<Artist>>([])

    useEffect(() => {
        const handleGetAllArtists = async() => {
            const listAllArtists = await getAllArtists()
            const allOptions = listAllArtists.map(artist => (
                {
                    artistName: artist.artistName,
                    id: artist.uid
                }
            ))
            const options = allOptions.filter(option => option.id !== portrait.artist[0].id)
            setAllArtists(options)
        }

        handleGetAllArtists()

    }, [])

 

    const handleOptionSelect = (value: any) => {
        setArtist(value);
    };

    const handleRequest = async () => {
        
        const newPortrait = {
            ...portrait,
            artist: [artist, ...portrait.artist],
            reassigned: true
        }

        console.log('newPortrait: ', newPortrait)
        const updatedPortrait = await updatePortrait(portrait.id, newPortrait)
        
        updateReassignedArtist(newPortrait)
        
        setOpenReassign(false)
    }

    const handleCancel = () => {
        setOpenReassign(false)
    }
    
    return (
        <Dialog 
        onClose={() => setOpenReassign(false)} 
        open={openReassign} 
        fullWidth={true}
        maxWidth='lg'
        PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
    >   
        <div className='absolute top-2 right-2 w-1/12 mb-4'>
            <IconButton onClick={() => setOpenReassign(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
        </div>
        
        <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl font-bold text-center mb-4'>Reassign Artist</p>
            <div className='w-10/12 flex'>
                <p className='w-[45%]'>Portrait Id: {portrait.id}</p>
                <p className='w-[45%]'>Portrait Title: {portrait.portraitTitle}</p>
            </div>

            <div className='w-10/12 flex'>
                <p className='w-[45%]'>Customer Name: {portrait.customer}</p>
                <p className='w-[45%]'>Customer Id: {portrait.customerId}</p>
            </div>

            <div className='w-10/12 my-8 flex'>
                <p className='w-[45%]'>Current Artist Name: {portrait.artist[0].artistName}</p>
                <p className='w-[45%]'>Current Artist Id: {portrait.artist[0].id}</p>
            </div>
            
            

            <ReassignButtons options={allArtists} onSelect={handleOptionSelect} />
            <div className='w-full my-8 bg-[#e9e9e9] rounded-xl p-4 flex items-center'>
                <p className='text-lg font-bold'>Selected Artist: </p>
                <p className='w-1/3 text-lg ml-4 bg-white rounded-lg py-2 px-4'>Name: {artist.artistName}</p>
                <p className='w-1/2 text-lg ml-4 bg-white rounded-lg py-2 px-4'>Id: {artist.id}</p>
            </div>
            

        
            
            <div className='w-full md:w-8/12 mx-auto mt-8 mb-4 flex justify-around items-center'>
                <button onClick={handleCancel} className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                <button onClick={handleRequest} className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#43b4e4] hover:text-white rounded-xl py-2 px-2'>
                    Assign New Artist
                </button>
            </div>
        </div>
        
    </Dialog>
    );
}

export default ReassignArtistForm

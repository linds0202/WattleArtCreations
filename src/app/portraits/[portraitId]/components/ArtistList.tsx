import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArtistDetails from './ArtistDetails';
import { useEffect, useState } from 'react';
import { getUserById } from '@/app/firebase/firestore';
import { PortraitData } from '../../components/PortraitCustomizer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ArtistListProps {
    openArtistList: boolean,
    setOpenArtistList: Function,
    artists: [{
        artistName: string,
        id: string
    }],
    artistIndex: number,
    setArtistIndex: Function,
    portrait: PortraitData,
    setPortrait: Function
}

const ArtistList = ({ openArtistList, setOpenArtistList, artists, artistIndex, setArtistIndex, portrait, setPortrait }: ArtistListProps) => {
    const [allArtists, setAllArtists] = useState([])
    
    useEffect(() => {
        const allArtistsInfo = []
        
        const handleGetAllArtists = async () => {
            
            for (const artist of artists){
                const artistInfo = await getUserById(artist.id)
                allArtistsInfo.push(artistInfo)
            }
        }
        
        handleGetAllArtists()

        setAllArtists(allArtistsInfo)
    }, [])

    const handleClose = () => {
        setOpenArtistList(false)
    }

    const handlePrevious = () => {
        setArtistIndex(artistIndex - 1)
    }

    const handleNext = () => {
        setArtistIndex(artistIndex + 1)
    }
    
    return (
        <Dialog 
            onClose={() => setOpenArtistList(false)} 
            open={openArtistList} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { px: 2, py: 4, backgroundColor: "white", minHeight: '80vh',
            maxHeight: '80vh', justifyContent: 'space-between', alignItems: 'center'} }}
        >
            <IconButton onClick={() => setOpenArtistList(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <h2 className='text-4xl font-bold'>Your Artist List</h2>
            <div className='w-full flex justify-between items-center'>
                <button 
                    type="button" 
                    onClick={handlePrevious}
                    className={`w-2/12 flex flex-col items-center ${artistIndex === 0 ? 'text-[#E5E5E5]' : 'text-[#282828] hover:text-[#0075FF]'}`}
                    disabled={artistIndex === 0}
                >
                    <ArrowBackIosIcon fontSize="large"/>
                    <p>Previous Artist</p>
                </button>

                <ArtistDetails 
                    artist={allArtists[artistIndex]} 
                    portrait={portrait} 
                    setPortrait={setPortrait} 
                    setOpenArtistList={setOpenArtistList}
                />
                
                <button 
                    type="button" 
                    onClick={handleNext}
                    className={`w-2/12 flex flex-col items-center ${artistIndex === allArtists.length - 1 ? 'text-[#E5E5E5]' : 'text-[#282828] hover:text-[#0075FF]'}`}
                    disabled={artistIndex === allArtists.length - 1 }
                >
                    <ArrowForwardIosIcon fontSize="large"/>
                    <p>Next Artist</p>
                </button>

            </div>
            


            <button 
                type="button" 
                onClick={handleClose}
                className='px-4 py-2 text-center border-2 border-black rounded-xl hover:text-white hover:bg-[#282828] '
            >
                Choose Later
            </button>

        </Dialog>
    )
}

export default ArtistList
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArtistDetails from './ArtistDetails';
import { useEffect, useState } from 'react';
import { getUserById } from '@/app/firebase/firestore';
import { PortraitData } from '../../components/PortraitCustomizer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import { Artist } from '@/app/components/Portrait';

interface ArtistListProps {
    openArtistList: boolean,
    setOpenArtistList: Function,
    artists: Array<Artist>,
    artistIndex: number,
    setArtistIndex: Function,
    portrait: PortraitData,
    setPortrait: Function
}

const ArtistList = ({ openArtistList, setOpenArtistList, artists, artistIndex, setArtistIndex, portrait, setPortrait }: ArtistListProps) => {
    const [allArtists, setAllArtists] = useState<UserData[]>([])
    
    useEffect(() => {
        const allArtistsInfo: Array<UserData> = []
        
        const handleGetAllArtists = async () => {
            
            for (const artist of artists){
                const artistInfo: UserData | null = await getUserById(artist.id)
                if (artistInfo) allArtistsInfo.push(artistInfo)
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
            maxWidth='lg'
            PaperProps={{ sx: { px: 2, py: 4, backgroundColor: "white", minHeight: '80vh',
            maxHeight: '80vh'} }}
        >
            <IconButton onClick={() => setOpenArtistList(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <div className="flex justify-center items-center mb-4">
                <img className="mr-4 w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black accent paint splash'/>
                <p className='text-4xl text-center font-bold mt-0'>Your Artist List</p>
                <img className="ml-4 w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='black accent paint splash'/>
            </div>
            {/* <h2 className='text-4xl font-bold'>Your Artist List</h2> */}
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
                    artistNote={portrait.artistNotes[artistIndex]}
                    handleClose={handleClose}
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




        </Dialog>
    )
}

export default ArtistList
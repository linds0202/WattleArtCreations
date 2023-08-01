import { useState } from 'react';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import DirectSelectArtist from './DirectSelectArtist';
import { PortraitData } from '../../components/PortraitCustomizer';
import { Rating } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Link from 'next/link';

interface ArtistDetailsProps {
    artist: UserData,
    portrait: PortraitData,
    setPortrait: Function,
    setOpenArtistList: Function
}

const ArtistDetails = ({artist, portrait, setPortrait, setOpenArtistList}: ArtistDetailsProps) => {
    const [openSelect, setOpenSelect] = useState(false)
    
    const handleSelect = () => {
        setOpenSelect(true)
    }
    
    return (
        <div className='p-4'>
            <div className='w-full h-full flex'>
                <div className='w-[40%]'>
                    <img src='../../../photoImgs/photo4.jpg' className='w-[240px] h-[240px] object-cover rounded-xl'/>
                </div>
                
                <div className='ml-4 w-[60%] flex flex-col justify-between items-start'>
                    <div>
                        <h2 className='text-3xl font-bold text-left'>{artist.artistName}</h2>
                        <div className='flex items-center'>
                            <Rating 
                                name="read-only" 
                                value={+`${artist.starRating ? artist.starRating : 0}`} 
                                readOnly 
                                precision={0.5} 
                                emptyIcon={<StarBorderOutlinedIcon style={{ color: '#E5E5E5' }} fontSize="inherit" />}
                            />
                            <span className={`ml-2 ${artist.starRating ? '' : 'text-sm'}`}>({`${artist.starRating ? artist.starRating : 'No Ratings Yet'}`})</span>
                            <p className='ml-2 text-sm'>&#x2022; 
                                <Link 
                                    href={`/artistDashboard/${artist.uid}/portfolio`} 
                                    rel="noopener noreferrer" 
                                    target="_blank"
                                    className="text-[#2DD42B] hover:text-[#165f15]"
                                >
                                    <span className='ml-2 font-semibold'>
                                        {`${artist.totalReviews >= 0 ? artist.totalReviews : 0}`} reviews
                                    </span> 
                                </Link>
                            </p>
                                
                        </div>

                        <p className=''>{artist.totalCompletedCommissions ? artist.totalCompletedCommissions : 0} completed commissions</p>
                    </div>
                    
                    
                    <p className=''>
                        {artist.bio.split(/\s+/).slice(0, 15).join(" ")} . . .
                        <span><Link 
                                href={`/artistDashboard/${artist.uid}/portfolio`} 
                                rel="noopener noreferrer" 
                                target="_blank"
                                className="text-[#2DD42B] hover:text-[#165f15]"
                            >
                            (more)
                            </Link>
                        </span>
                    </p>

                    <button 
                        onClick={handleSelect}
                        className='border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-[#0075FF] hover:bg-[#0075FF] hover:text-white'
                    >
                        Select Artist
                    </button>
                </div>
            </div>

            {openSelect && 
                <DirectSelectArtist 
                    open={openSelect} 
                    setOpen={setOpenSelect} 
                    portrait={portrait} 
                    setPortrait={setPortrait} 
                    artistId={artist.uid} 
                    setOpenArtistList={setOpenArtistList} 
                    name={artist.artistName} 
                />
            }
        </div>
    )
}

export default ArtistDetails
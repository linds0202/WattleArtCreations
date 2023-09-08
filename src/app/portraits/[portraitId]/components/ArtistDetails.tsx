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
    setOpenArtistList: Function,
    artistNote: string,
    handleClose: Function
}

const ArtistDetails = ({artist, portrait, setPortrait, setOpenArtistList, artistNote, handleClose}: ArtistDetailsProps) => {
    const [openSelect, setOpenSelect] = useState(false)
    
    const handleSelect = () => {
        setOpenSelect(true)
    }

    
    
    return (
        <div className='mt-2 p-4 flex flex-col items-center'>
            <div className='w-full h-full flex items-center'>
                <div className='w-[35%]'>
                    <img src='../../../photoImgs/photo4.jpg' className='w-[240px] h-[240px] mx-auto object-cover rounded-xl'/>
                </div>
                
                <div className='w-[65%] flex flex-col justify-between items-start'>
                    <div>
                        <h2 className='text-3xl font-bold text-left'>
                            <Link 
                                href={`/artistDashboard/${artist.uid}/portfolio`} 
                                rel="noopener noreferrer" 
                                target="_blank"
                                className="text-[#2DD42B] hover:text-[#165f15]"
                            >
                                <span className=''>
                                {artist.artistName}
                                </span> 
                            </Link>
                        </h2>
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
                    
                    
                    <p className='mt-4'>
                        {artist.bio.split(/\s+/).slice(0, 25).join(" ")} . . .
                        <p><Link 
                                href={`/artistDashboard/${artist.uid}/portfolio`} 
                                rel="noopener noreferrer" 
                                target="_blank"
                                className="text-[#2DD42B] hover:text-[#165f15]"
                            >
                            (see full portfolio)
                            </Link>
                        </p>
                    </p>
                    <div className='w-full bg-[#e8e8e8] rounded-lg p-4 mt-4'>
                        <p className='text-sm font-semibold'>Note from artist:</p>
                        <div className='h-[100px] mt-2 overflow-auto'>
                            <p className='overflow-auto' >{artistNote}</p>
                        </div>
                    </div>
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
            <div className='w-8/12 mt-4 flex justify-around'>
                <button 
                    type="button" 
                    onClick={handleClose}
                    className='w-5/12 px-4 py-2 border-2 border-black rounded-xl hover:text-white hover:bg-[#282828] '
                >
                    Choose Later
                </button>

                <button 
                    onClick={handleSelect}
                    className='w-5/12 border-2 border-[#282828] rounded-xl py-2 px-4 hover:bg-[#0075FF] hover:text-white'
                >
                    Select Artist
                </button>
            </div>
            
        </div>
    )
}

export default ArtistDetails
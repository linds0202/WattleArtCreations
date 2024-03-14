import { useState, MouseEventHandler } from 'react';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import DirectSelectArtist from './DirectSelectArtist';
import { PortraitData } from '../../components/PortraitCustomizer';
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Link from 'next/link';

interface ArtistDetailsProps {
    artist: UserData,
    portrait: PortraitData,
    setPortrait: Function,
    setOpenArtistList: Function,
    artistNote: string,
    handleClose: MouseEventHandler<HTMLButtonElement>
}

const ArtistDetails = ({artist, portrait, setPortrait, setOpenArtistList, artistNote, handleClose}: ArtistDetailsProps) => {
    const [openSelect, setOpenSelect] = useState(false)
    
    const handleSelect = () => {
        setOpenSelect(true)
    }
    
    return (
        <div className='w-9/12 md:w-8/12 mt-2 md:p-4 flex flex-col items-center'>
            <div className='w-full h-full flex flex-col lg:flex-row items-center'>
                <div className='lg:w-[35%]'>
                    <img src={artist.artistImgs.imgUrl7} className='w-[240px] h-[240px] mx-auto object-cover rounded-xl' alt='black paint drip background'/>
                </div>
                
                <div className='lg:w-[65%] md:px-8 mt-8 lg:mt-0 flex flex-col justify-between items-start'>
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
                        <div className='flex flex-row items-center'>
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
                                    className="text-xs md:text-base text-[#2DD42B] hover:text-[#165f15]"
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
                        <span><Link 
                                href={`/artistDashboard/${artist.uid}/portfolio`} 
                                rel="noopener noreferrer" 
                                target="_blank"
                                className="text-[#2DD42B] hover:text-[#165f15]"
                            >
                            (see full portfolio)
                            </Link>
                        </span>
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
            <div className='w-full lg:w-8/12 mt-4 flex flex-col md:flex-row justify-around'>
                <button 
                    type="button" 
                    onClick={handleClose}
                    className='w-full md:w-5/12 px-4 py-2 border-2 border-black rounded-xl hover:text-white hover:bg-[#282828] '
                >
                    Choose Later
                </button>

                <button 
                    onClick={handleSelect}
                    className='w-full md:w-5/12 mt-4 md:mt-0 border-2 border-[#282828] rounded-xl py-2 px-4 hover:bg-[#43b4e4]'
                >
                    Select Artist
                </button>
            </div>
            
        </div>
    )
}

export default ArtistDetails
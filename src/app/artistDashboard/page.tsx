'use client'

import '../globals.css'
import { useEffect, useState } from 'react';
import { getAllArtists } from '../firebase/firestore'
import { SocialIcon } from 'react-social-icons'
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Link from 'next/link';
import { UserData } from './[userId]/portfolio/page';
import Footer from '../components/Footer';
import { useAuth } from '../firebase/auth';


const ArtistDashboard = () => {
    const {isLoading} = useAuth()
    const [artistData, setArtistData] = useState<Array<UserData>>([])
    
    useEffect(() => {
        const handleGetArtists = async () => {
          const allArtists = await getAllArtists();
          setArtistData(allArtists)
        }
    
        handleGetArtists()
    }, [])

    const artistList = artistData.map((artist, i) => (
        <div key={i} className='w-11/12 md:w-5/12 lg:w-[30%] h-[70vh] xl:h-[65vh] bg-black border border-[#ffffff]/50 rounded-xl md:pt-4 z-10 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] hover:border-[#ffffff]/75'>
            <img className='w-[100%] md:w-[90%] h-[50%] xl:h-[60%] object-contain md:object-cover object-top mx-auto rounded-t-xl' src={artist.artistImgs.imgUrl7} alt='artist image'/>
            <div className='w-[100%] h-[50%] xl:h-[40%] bg-[#282828] rounded-b-xl text-white p-4 flex flex-col justify-between'>
                <Link prefetch={false} href={`/artistDashboard/${artist?.uid}/portfolio`} className=''>
                    <p className='text-center text-2xl font-semibold'>{artist.artistName}</p>
                    <div className='w-6/12 mx-auto mt-2 flex justify-around items-center'>
                        <Rating 
                            name="read-only" 
                            value={artist.starRating} 
                            readOnly 
                            precision={0.5} 
                            emptyIcon={<StarBorderOutlinedIcon style={{ color: '#E5E5E5' }} fontSize="inherit" />}
                        />
                        <span>({artist.starRating})</span>
                        <p className='ml-2 text-sm'>&#x2022; <span className='ml-2 font-semibold'>{artist.totalReviews}</span> reviews</p>
                    </div>
                    <p className='ml-4 text-sm text-center'><span className='font-semibold'>{artist.totalCompletedCommissions}</span> completed commissions</p>
                    <p className='mt-2 overflow-hidden text-sm md:text-base'>{artist.bio.split(/\s+/).slice(0, 20).join(" ")}...</p>
                </Link>
                {/* <div className='flex justify-center items-center mt-2'>
                    {artist.links.map((link, i) => 
                        <SocialIcon 
                            key={i} 
                            url={link} 
                            title={link}
                            target="_blank" 
                            fgColor={'#FFFFFF'} 
                            style={{width: '30px', height: '30px', marginRight: 10}} 
                            className='hover:scale-125 transition ease-in-out duration-300'
                        />)
                    }

                        {artist?.website !== "" &&
                            <SocialIcon 
                                url={`${artist?.website}`} 
                                target="_blank" 
                                fgColor={'#FFFFFF'} 
                                style={{width: '30px', height: '30px', marginRight: 10}} 
                                className='hover:scale-125 transition ease-in-out duration-300'
                                title={`${artist?.website}`} 
                            />
                        }
                </div> */}
            </div>
        </div>
    ))

    return ((isLoading) 
        ?  
            <p></p>
        :   
        (
            <div className='relative min-h-[100vh] bg-black'>
                <object type="image/svg+xml" data="/images/colored_dots_final.svg" className="absolute top-[3%] left-0 w-[100%] h-auto -z-1"/>
                <object type="image/svg+xml" data="/images/customizer/customizer.svg" className="absolute -top-[16px] -left-1 w-[101%] h-auto -z-1"/>
                <div className='pt-10 pb-36'>
                    <h1 className='text-6xl text-white font-bold p-4 text-center'>Our Artists</h1>
                    <p className='text-center text-white mb-8'>Something here about the artists</p>
                    <div className='flex flex-wrap justify-around items-center my-4 md:gap-x-4 gap-y-4'>
                        {artistList}
                    </div>
                </div>
                <Footer />
            </div>
        )
    )
}

export default ArtistDashboard
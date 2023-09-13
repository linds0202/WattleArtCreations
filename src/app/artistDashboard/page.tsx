'use client'

import { useEffect, useState } from 'react';
import { getAllArtists } from '../firebase/firestore'
import { SocialIcon } from 'react-social-icons'
import { Rating } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Link from 'next/link';
import { UserData } from './[userId]/portfolio/page';
import Footer from '../components/Footer';

const ArtistDashboard = () => {
    
    const [artistData, setArtistData] = useState<Array<UserData>>([])
    
    useEffect(() => {
        const handleGetArtists = async () => {
          const allArtists = await getAllArtists();
          setArtistData(allArtists)
        }
    
        handleGetArtists()
    }, [])

    const artistList = artistData.map((artist, i) => (
        <div key={i} className='w-[30%] h-[100%] border-2 border-[#282828] rounded-xl pt-4'>
            <img className='w-[90%] h-[50%] object-cover mx-auto rounded-t-xl' src='./animeImgs/anime10.png' alt='artist image'/>
            <div className='w-[100%] h-[50%] bg-[#282828] rounded-b-lg text-white p-4 flex flex-col justify-between'>
                <Link href={`/artistDashboard/${artist?.uid}/portfolio`} className=''>
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
                    <p className='mt-2'>{artist.bio.split(/\s+/).slice(0, 20).join(" ")}...</p>
                </Link>
                <div className='flex justify-center items-center mt-2'>
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
                </div>
            </div>
        </div>
    ))

    return (
        <div className='relative min-h-[100vh]'>
            <img className="w-full absolute -top-[16px] left-0" src="../customizer/customizer.png" alt='background black paint drips'/>
            <div className='pb-36'>
                <h1 className='text-6xl font-bold p-4'>Our Artists</h1>
                <p className='text-center'>Something here about the artists</p>
                <div className='h-[65vh] flex flex-wrap justify-around items-center my-4'>
                    {artistList}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ArtistDashboard
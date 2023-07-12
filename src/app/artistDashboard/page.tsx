'use client'

import { useEffect, useState } from 'react';
import { getAllArtists } from '../firebase/firestore'
import { SocialIcon } from 'react-social-icons'
import Link from 'next/link';

const page = () => {
    
    const [artistData, setArtistData] = useState([])
    
    useEffect(() => {
        const handleGetArtists = async () => {
          const allArtists = await getAllArtists();
          setArtistData(allArtists)
        }
    
        handleGetArtists()
    }, [])

    const artistList = artistData.map((artist, i) => (
        <div key={i} className='w-[30%] border-2 border-[#282828] rounded-xl'>
            <img className='w-[90%] h-[250px] object-cover mx-auto rounded-t-xl ml-4 mt-4 mr-4' src='./animeImgs/anime10.png' />
            <div className='bg-[#282828] rounded-b-lg text-white p-4'>
                <Link href={`/artistDashboard/${artist?.uid}/portfolio`} className=''>
                    <p className='text-center text-2xl font-semibold'>{artist.artistName}</p>
                    <p className='mt-2'>{artist.bio.split(/\s+/).slice(0, 10).join(" ")}...</p>
                </Link>
                <div className='flex justify-center items-center mt-2'>
                    {artist.links.map((link, i) => <SocialIcon key={i} url={link} target="_blank" fgColor={'#FFFFFF'} style={{width: '40px', height: '40px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>)}
                </div>
            </div>
        </div>
    ))

    return (
        <div className='p-4'>
            <h1 className='text-6xl font-bold'>Our Artists</h1>
            <p className='text-center'>Something here about the artists</p>
            <div className='flex flex-wrap justify-around items-center mt-4'>
                {artistList}
            </div>
        </div>
    )
}

export default page
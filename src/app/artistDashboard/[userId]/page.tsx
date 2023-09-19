'use client'

import '../../globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getArtistsPortraits, getUserById } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '@/app/components/Portrait';
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';
import { UserData } from './portfolio/page';
import Footer from '@/app/components/Footer';
import { Artist } from '@/app/components/Portrait';
import { getAllMyPortraits } from '../../firebase/firestore';

type Params = {
  params: {
    userId: string
  }
}

export default function ArtistDashboard({ params: { userId }}: Params) {
  const { authUser, isLoading, setIsLoading } = useAuth();
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true)
  const [currentUser , setCurrentUser] = useState<UserData | null>(null)
  const [portraits, setPortraits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  // useEffect(() => {
  //   setPageLoading(true)
  //   let latestUser: UserData | null

  //   // const handleGetPortraits = async () => {
  //   //   const getMyPortraits = await getArtistsPortraits(latestUser?.artistName, authUser?.uid);
  //   //   setMyPortaits(getMyPortraits)
  //   //   setFiltered(getMyPortraits)
  //   // }
    
  //   const handleCurrentUser = async () => {
  //     latestUser = await getUserById(authUser?.uid)
  //     if (latestUser) setCurrentUser(latestUser)
  //     // handleGetPortraits()
  //   }

  //   handleCurrentUser()
  //   setPageLoading(false)
  // }, [])

  useEffect(() => {

    setPageLoading(true)
    let latestUser: UserData | null
    
    console.log('setting up listener')
    const getPortraits = async () => {
        const unsubscribe = await getAllMyPortraits(setPortraits, {artistName: latestUser?.artistName, artistId: latestUser?.uid });
        console.log('unsubscribe: ', unsubscribe)
        return () => unsubscribe()
    }

    const handleCurrentUser = async () => {
      latestUser = await getUserById(authUser?.uid)
      console.log('latestuser: ', latestUser)
      if (latestUser) setCurrentUser(latestUser)
      getPortraits()
    }

    handleCurrentUser()
     
    setPageLoading(false)

  }, []) 

  console.log('portraits: ', portraits)

  // useEffect(() => {
  //   const available = portraits.filter(portrait => portrait.artist.filter((artist: Artist) => artist.id === authUser?.uid).length === 0)
  //   setFiltered(available)
  // }, [portraits])

  const handleFilter= (filter: string) => {
    
    if(filter === 'Bid') {
      const filteredPortraits = portraits.filter(portrait => !portrait.artistAssigned)

      setFiltered(filteredPortraits)
    }
    if(filter === 'In Progress') {
      const filteredPortraits = portraits.filter(portrait => portrait.artistAssigned && portrait.status !== 'Completed')

       setFiltered(filteredPortraits)
    }
    if(filter === 'Completed') {
      const filteredPortraits = portraits.filter(portrait => portrait.status === 'Completed')
      setFiltered(filteredPortraits)
    }
    if(filter === 'Clear') {
      setFiltered(portraits)
    }
  }



  return ((!authUser || pageLoading || isLoading) ? 
    <></>
  :
  <div className='relative min-h-[100vh]'>
    <img className="w-[101%] absolute -top-[16px] left-0 -z-10" src="../images/customizer/customizer.png" alt='background black paint drips'/>
    <div className='text-black min-h-screen pt-3 relative pb-36'>
        <h1 className='text-4xl text-center font-bold my-8'>Artist Dashboard</h1>
        {currentUser && <p className='absolute top-4 right-14 text-white text-xl'>Active: <span className='text-[#2DD42B] font-bold'>{currentUser?.activeCommissions}</span> / Max: <span className='text-red-600 font-bold'>{currentUser?.maxCommissions}</span></p>}
        
        <div className='w-10/12 mx-auto flex justify-around items-center'>
          <button 
            onClick={() => handleFilter('Bid')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Bid
          </button>
          <button 
            onClick={() => handleFilter('In Progress')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            In Progress
          </button>
          <button 
            onClick={() => handleFilter('Completed')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Completed
          </button>
          <button 
            onClick={() => handleFilter('Clear')} 
            className='w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Clear
          </button>
        </div>
        
        
        <div className='mt-4 flex flex-col items-center'>
          {filtered.length === 0 ? 
            <p className='text-2xl font-bold mt-8'>No portraits to display</p>
          :  filtered?.map(portrait => (
            <Portrait key={portrait.id} portrait={portrait} user={currentUser} />
          )) }
        </div>
      </div>
    <Footer />
  </div>
  
  )
}
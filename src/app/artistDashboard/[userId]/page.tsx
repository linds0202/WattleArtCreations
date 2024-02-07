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


  useEffect(() => {

    setPageLoading(true)
    let latestUser: UserData | null
    
    const getPortraits = async () => {
        const unsubscribe = await getAllMyPortraits(setPortraits, setFiltered, {artistName: latestUser?.artistName, id: latestUser?.uid });
        
        return () => unsubscribe()
    }

    const handleCurrentUser = async () => {
      latestUser = await getUserById(authUser?.uid)
  
      if (latestUser) setCurrentUser(latestUser)
      getPortraits()
    }

    handleCurrentUser()
     
    setPageLoading(false)

  }, []) 


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
  <div className='relative min-h-[100vh] bg-black'>
    <object type="image/svg+xml" data="/images/white_dots.svg" className="absolute top-[15%] left-0 w-[100%] h-auto -z-1"/>
    <object type="image/svg+xml" data="/images/customizer/customizer.svg" className="absolute -top-1 -left-1 w-[101%] h-auto -z-1"/>
    
    <div className='text-black min-h-screen pt-6 md:pt-3 relative pb-36'>
        <h1 className='text-4xl text-white text-center font-bold my-8'>Artist Dashboard</h1>
        {currentUser && <p className='absolute top-8 md:top-4 lg:top-0 xl:top-4 right-36 md:right-72 lg:right-4 xl:right-14 text-white text-xl'>Active: <span className='text-[#2DD42B] font-bold'>{currentUser?.activeCommissions}</span> / Max: <span className='text-red-600 font-bold'>{currentUser?.maxCommissions}</span></p>}
        
        <div className='w-10/12 md:w-11/12 lg:w-10/12 mx-auto flex flex-col md:flex-row justify-around items-center'>
          <button 
            onClick={() => handleFilter('Bid')} 
            className='w-full md:[20%] xl:w-[14%] bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4]'
          >
            Bid
          </button>
          <button 
            onClick={() => handleFilter('In Progress')} 
            className='w-full md:[20%] xl:w-[14%] mt-4 md:mt-0 bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4]'
          >
            In Progress
          </button>
          <button 
            onClick={() => handleFilter('Completed')} 
            className='w-full md:[20%] xl:w-[14%] mt-4 md:mt-0 bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4]'
          >
            Completed
          </button>
          <button 
            onClick={() => handleFilter('Clear')} 
            className='w-full md:[20%] xl:w-[14%] mt-4 md:mt-0 bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4]'
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
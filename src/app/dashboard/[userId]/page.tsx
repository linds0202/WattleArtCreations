'use client'

import '../../globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getCustomersPortraits, getUserById } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../../components/Portrait';
import Profile from './components/Profile';
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';
import Footer from '@/app/components/Footer';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';

type Params = {
  params: {
    userId: string
  }
}


export default function Dashboard({ params: { userId }}: Params) {
  
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true)
  const [currentUser , setCurrentUser] = useState<UserData | null>(null)
  const [myPortraits, setMyPortaits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    setPageLoading(true)
    const handleCurrentUser = async () => {

      const latestUser: UserData | null = await getUserById(userId)
      if (latestUser) {
        console.log('setting currentUser to: ', latestUser)
        setCurrentUser(latestUser)
      }

    }
    handleCurrentUser()

    const handleGetPortraits = async () => {
      const getMyPortraits = await getCustomersPortraits(userId);
      setMyPortaits(getMyPortraits)
      setFiltered(getMyPortraits)
    }

    handleGetPortraits()
    setPageLoading(false)
  }, [])


  const handleFilter= (filter: string) => {
    if(filter === 'Unordered') {
      const filteredPortraits = myPortraits.filter(portrait => !portrait.paymentComplete)
      setFiltered(filteredPortraits)
    }
    if(filter === 'Unassigned') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.paymentComplete && !portrait.artistAssigned)
      setFiltered(filteredPortraits)
    }
    if(filter === 'Pending') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'Pending')
      setFiltered(filteredPortraits)
    }
    if(filter === 'In Progress') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'In Progress')
      setFiltered(filteredPortraits)
    }
    if(filter === 'Completed') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'Completed')
      setFiltered(filteredPortraits)
    }
    if(filter === 'Clear') {
      setFiltered(myPortraits)
    }
  }

  return ((!authUser || pageLoading || isLoading) ? 
    <></>
  :
  <div className='relative min-h-[100vh]'>
    <img className="w-[101%] absolute -top-[16px] left-0 -z-10" src="../../images/drips/dashboard_top.png" alt='background black paint drips'/> 

    <div className=' text-black pt-3 pb-36'>
    
      {currentUser && <Profile user={currentUser}/>}
      
      <h2 className='text-4xl text-center font-bold'>My Portraits</h2>
      
      <div className='flex justify-around items-center mt-4'>
        <button 
          onClick={() => handleFilter('Unordered')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
        >
          Unordered
        </button>
        <button 
          onClick={() => handleFilter('Unassigned')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
        >
          Select Artist
        </button>
        <button 
          onClick={() => handleFilter('In Progress')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
        >
          In Progress
        </button>
        <button 
          onClick={() => handleFilter('Completed')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
        >
          Completed
        </button>
        <button 
          onClick={() => handleFilter('Clear')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
        >
          Clear Filters
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

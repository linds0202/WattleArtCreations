'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { getCustomersPortraits, getUserById } from '../../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../../components/Portrait';
import Profile from './components/Profile';
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';
import Footer from '@/app/components/Footer';

type Params = {
  params: {
    userId: string
  }
}

// interface PortraitData {
//   uid: String,
//   mode: String, 
//   characters: [],
//   questions: [], 
//   price: Number,
//   customer: String,
//   customerId: String,
//   artist: String,
//   date: Timestamp,
//   status: String,
//   lastUpdatedStatus: Timestamp,
//   paymentComplete: Boolean,
// }

export default function Dashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [currentUser , setCurrentUser] = useState(null)
  const [myPortraits, setMyPortaits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    const handleCurrentUser = async () => {
      const latestUser = await getUserById(authUser?.uid)
      setCurrentUser(latestUser)
    }
    handleCurrentUser()

    const handleGetPortraits = async () => {
      const getMyPortraits = await getCustomersPortraits(userId);
      setMyPortaits(getMyPortraits)
      setFiltered(getMyPortraits)
    }

    handleGetPortraits()
  }, [])

  const handleFilter= (filter: string) => {
    if(filter === 'Unordered') {
      const filteredPortraits = myPortraits.filter(portrait => !portrait.paymentComplete)
      console.log(filteredPortraits)
      setFiltered(filteredPortraits)
    }
    // if(filter === 'UnClaimed') {
    //   const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'Unclaimed' && portrait.paymentComplete && portrait.artist.length > 0)
    //   setFiltered(filteredPortraits)
    // }
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


  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='relative min-h-[100vh]'>
    <div className='bg-white text-black pt-3 pb-36'>
        <Profile user={currentUser}/>
        <h2 className='text-3xl'>My Portraits</h2>
        <div className='flex justify-around items-center mt-4'>
          <button 
            onClick={() => handleFilter('Unordered')} 
            className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Unordered
          </button>
          <button 
            onClick={() => handleFilter('Unassigned')} 
            className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Unassigned
          </button>
          <button 
            onClick={() => handleFilter('In Progress')} 
            className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            In Progress
          </button>
          <button 
            onClick={() => handleFilter('Completed')} 
            className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Completed
          </button>
          <button 
            onClick={() => handleFilter('Clear')} 
            className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
          >
            Clear Filters
          </button>
        </div>
        <div className='flex flex-col items-center'>
          {filtered.length === 0 ? 
            <p className='text-2xl font-bold mt-8'>No portraits to display</p>
          :  filtered?.map(portrait => (
            <Portrait key={portrait.uid} portrait={portrait} user={currentUser} />
          )) }
        </div>   
      </div>

      <Footer />
  </div>
  
  )
}

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

  const handleFilter= (filter) => {
    if(filter === 'Incomplete') {
      const filteredPortraits = myPortraits.filter(portrait => portrait.status === 'Incomplete')
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
    if(filter === 'Clear') {
      setFiltered(myPortraits)
    }
  }


  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <Profile />
    <h2 className='text-3xl'>My Portraits</h2>
    <div className='flex justify-around items-center mt-4'>
      <button 
        onClick={() => handleFilter('Incomplete')} 
        className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
      >
        Incomplete
      </button>
      <button 
        onClick={() => handleFilter('Pending')} 
        className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
      >
        Pending
      </button>
      <button 
        onClick={() => handleFilter('In Progress')} 
        className='border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#0075FF]'
      >
        In Progress
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
        <p>No portraits to display</p>
      :  filtered?.map(portrait => (
        <Portrait key={portrait.uid} portrait={portrait} user={currentUser} />
      )) }
    </div>   
    <div className='w-6/12 mx-auto mb-6 text-center'>
      <Link href='/personal' className='block'>Return to Homepage</Link> 
    </div>
  </div>
  )
}

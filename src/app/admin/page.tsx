'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import { getAllPortraits, getAllUsers } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Portrait from '../components/Portrait';

type Params = {
  params: {
    userId: string
  }
}

interface PortraitData {
  uid: String,
  styleOne: String, 
  styleTwo: String, 
  styleThree: String, 
  characters: [],
  questions: [], 
  price: Number,
  customer: String,
  artist: String,
  date: Timestamp,
  status: String,
  lastUpdatedStatus: Timestamp,
  paymentComplete: Boolean,
}

interface UserData {
    uid: String,
    email: String
}

export default function Dashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [allPortraits, setAllPortaits] = useState<Array<PortraitData>>([])
  const [filteredPortraits, setFilteredPortraits] = useState<Array<PortraitData>>([])
  const [allUsers, setAllUsers] = useState<Array<UserData>>([])

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  useEffect(() => {
    const handleGetAllPortraits = async () => {
      const allPortraits = await getAllPortraits();
      setAllPortaits(allPortraits)
      setFilteredPortraits(allPortraits)
    }

    handleGetAllPortraits()
  }, [])

  const handleGetPending = () => {
    const filtered = allPortraits.filter(portrait => portrait.status === 'Pending')
    setFilteredPortraits(filtered)
  }

  const handleGetClaimed = () => {
    const filtered = allPortraits.filter(portrait => portrait.status === 'Claimed')
    setFilteredPortraits(filtered)
  }

  const handleClear = () => {
    setFilteredPortraits(allPortraits)
  }

  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <h1 className='text-2xl text-center'>Admin Dashboard</h1>
    <div className='w-6/12 mx-auto flex justify-between'>
        <button className='border-2 border-black rounded-lg p-2' onClick={handleGetPending}>Pending Commissions</button>
        <button className='border-2 border-black rounded-lg p-2' onClick={handleGetClaimed}>Claimed Commissions</button>
        <button className='border-2 border-black rounded-lg p-2' onClick={handleClear}>Clear</button>
    </div>
    
    <div className='flex flex-col items-center'>
      {filteredPortraits.length === 0 ? 
        <p>No portraits to display</p>
      :  filteredPortraits?.map(portrait => (
        <Portrait key={portrait.uid} portrait={portrait} />
      )) }
    </div>   
    <div className='w-6/12 mx-auto mb-6 text-center'>
      <Link href='/' className='block'>Return Home</Link> 
    </div>
  </div>
  )
}

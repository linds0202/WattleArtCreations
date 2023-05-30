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

  const [button, setButton] = useState<String>('')

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

    setButton('B1')
  }

  const handleGetClaimed = () => {
    const filtered = allPortraits.filter(portrait => portrait.status === 'Claimed')
    setFilteredPortraits(filtered)
    setButton('B2')
  }

  const handleClear = () => {
    setFilteredPortraits(allPortraits)
    setButton('')
  }

  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen pt-3'>
    <h1 className='text-2xl text-center mb-6'>Admin Dashboard</h1>
    <div className='w-6/12 mx-auto flex justify-between mb-6'>
        <button className={button === 'B1' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white transition duration-300' : 'border-2 border-black rounded-lg p-2 w-3/12 transition duration-300'} onClick={handleGetPending}>Pending Commissions</button>
        <button className={button === 'B2' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white transition duration-300' : 'border-2 border-black rounded-lg p-2 w-3/12 transition duration-300'} onClick={handleGetClaimed}>Claimed Commissions</button>
        <button className='border-2 border-black rounded-lg p-2 w-3/12' onClick={handleClear}>Clear Filters</button>
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

'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import { getAllPortraits, getAllUsers } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import PortraitList from './components/PortraitList';
import CustomersList from './components/CustomersList';
import ConsultList from './components/ConsultList';
import { MenuContainer } from './menu/MenuContainer';
import { ViewContext } from './AdminContext';

type Params = {
  params: {
    userId: string
  }
}

export default function Dashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [view, setView] = useState<string>('portraits')
  const value = { view, setView } 
  
  // const [allUsers, setAllUsers] = useState<Array<UserData>>([])
  // const [filteredUsers, setFilteredUsers] = useState<Array<UserData>>([])
  // const [allArtists, setAllArtists] = useState<Array<UserData>>([])

  // const [button, setButton] = useState<String>('')

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);


  // useEffect(() => {
  //   const handleGetAllPortraits = async () => {
  //     const portraitsArr = await getAllPortraits();
  //     setAllPortaits(portraitsArr)
  //     setFilteredPortraits(portraitsArr)
  //   }

  //   const handleGetAllUsers = async () => {
  //     const userArr = await getAllPortraits();
  //     setAllUsers(userArr)
  //     setFilteredUsers(userArr)
  //   }

  //   handleGetAllPortraits()
  //   handleGetAllUsers()
  // }, [])

  // const handleGetPending = () => {
  //   const filtered = allPortraits.filter(portrait => portrait.status === 'Pending')
  //   setFilteredPortraits(filtered)

  //   setButton('B1')
  // }

  // const handleGetClaimed = () => {
  //   const filtered = allPortraits.filter(portrait => portrait.status === 'Claimed')
  //   setFilteredPortraits(filtered)
  //   setButton('B2')
  // }

  // const handleClearPortraits = () => {
  //   setFilteredPortraits(allPortraits)
  //   setButton('')
  // }

  console.log(view)

  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen'>
    <div className='min-h-screen flex justify-between'>
      <div className='w-3/12 relative'>
        <ViewContext.Provider value={value}>
          <MenuContainer />
        </ViewContext.Provider> 
      </div>
        {view === 'Portraits' ?
          <PortraitList />
        : view === 'Consultations' ?
          <ConsultList />
        : <CustomersList />
        }
        
      
    </div>
    <div className='w-6/12 mx-auto mb-6 text-center'>
        <Link href='/' className='block'>Return Home</Link> 
    </div>
  </div>
  )
}

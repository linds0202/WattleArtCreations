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

type Params = {
  params: {
    userId: string
  }
}

export default function Dashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  return ((!authUser) ? 
    <p>Loading ...</p>
  :
  <div className='bg-white text-black min-h-screen'>
    <div className='min-h-screen flex justify-between'>
      <div className='w-3/12 relative'>
        <MenuContainer />
      </div>
        {/* <PortraitList /> */}
        {/* <CustomersList /> */}
        <ConsultList />
    </div>
    <div className='w-6/12 mx-auto mb-6 text-center'>
        <Link href='/' className='block'>Return Home</Link> 
      </div>
  </div>
  )
}

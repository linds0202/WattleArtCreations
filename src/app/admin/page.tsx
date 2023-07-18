'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import PortraitList from './components/PortraitList';
import UsersList from './components/UsersList';
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

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

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
          <PortraitList user={authUser} />
        : view === 'Consultations' ?
          <ConsultList />
        : <UsersList />
        }
    </div>
  </div>
  )
}

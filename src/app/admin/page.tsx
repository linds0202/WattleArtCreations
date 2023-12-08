'use client'

import '../globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../firebase/auth';
import PortraitList from './components/PortraitList';
import UnorderedPortraitList from './components/UnorderedPortraitsList';
import UsersList from './components/UsersList';
import TestimonialsList from './components/TestimonialsList';
import ConsultList from './components/ConsultList';
import EditPanel from './components/EditPanel';
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

  const [view, setView] = useState<string>('Portraits')
  const value = { view, setView } 

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
        <ViewContext.Provider value={value}>
          <MenuContainer />
        </ViewContext.Provider> 
      </div>
        {view === 'Portraits' ?
          <PortraitList user={authUser} />
        : view === 'Unordered Portraits' ?
          <UnorderedPortraitList user={authUser}/>
        : view === 'All Users' || view === 'Artists' ?
          <UsersList />
        : view === 'Testimonials' || view === 'Testimonials' ?
          <TestimonialsList />
        : view === 'Consultations' ?
          <ConsultList />
        : <EditPanel user={authUser}/>
        }
    </div>
  </div>
  )
}

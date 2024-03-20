'use client'

import '../../globals.css'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../firebase/auth'
import { getUserById, updateFailedAddOn, getAllCustomersPortraits } from '../../firebase/firestore'
import Portrait from '../../components/Portrait'
import Profile from './components/Profile'
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer'
import Footer from '@/app/components/Footer'
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page'
import Link from 'next/link'

type Params = {
  params: {
    userId: string,
  }
}

export interface Reward {
  badge: string,
  discount: number,
  level: number
}


export default function Dashboard({ params: { userId }}: Params) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams()
  const complete: string | null = searchParams.get('complete')
  const id: string | null = searchParams.get('id')
  const type: string | null = searchParams.get('type')
 
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
    if (complete === 'true') {
      sessionStorage.setItem('Cart', JSON.stringify([]))
      if (type === 'tip') {
        alert('Thanks for tipping your artist!')
      }
    } else if (complete === 'false' && type === 'addOn') {
      updateFailedAddOn(id)
      alert('Purchase of additional 3D model, character sheet, or weapons sheet was NOT successful')
    }

    let latestUser: UserData | null
    
    const getPortraits = async () => {
      const unsubscribe = await getAllCustomersPortraits(setPortraits, setFiltered, userId);
      
        return () => unsubscribe()
    }

    const handleCurrentUser = async () => {
      latestUser = await getUserById(userId)
      
      if (latestUser) {
        setCurrentUser(latestUser)
      }
      getPortraits()
    }

    handleCurrentUser()
     
    setPageLoading(false)

  }, []) 


  const handleFilter= (filter: string) => {
    if(filter === 'Unordered') {
      const filteredPortraits = portraits.filter(portrait => !portrait.paymentComplete)
      setFiltered(filteredPortraits)
    }
    if(filter === 'Unassigned') {
      const filteredPortraits = portraits.filter(portrait => portrait.paymentComplete && !portrait.artistAssigned)
      setFiltered(filteredPortraits)
    }
    if(filter === 'Pending') {
      const filteredPortraits = portraits.filter(portrait => portrait.status === 'Pending')
      setFiltered(filteredPortraits)
    }
    if(filter === 'In Progress') {
      const filteredPortraits = portraits.filter(portrait => portrait.status === 'In Progress')
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
  <div className='relative w-full min-h-[120vh] bg-black'>
    
    <object type="image/svg+xml" data="/images/white_dots.svg" className="absolute top-0 xl:top-[15%] left-0 w-[300%] md:w-[200%] xl:w-[100%] h-[100%] xl:h-auto object-cover -z-1"/>
    <object type="image/svg+xml" data="/images/drips/dashboard_top.svg" className="absolute top-0 left-0 w-[100%] h-auto -z-7"/>
    
    <div className='w-full text-black pt-3 pb-36 min-h-[100vh]'>
    
      {currentUser && <Profile user={currentUser} />}
      
      <h2 className='mt-8 text-4xl text-center font-bold text-white'>My Portraits</h2>
      
      <div className='mt-8 flex flex-col md:flex-row justify-around items-center gap-y-4'>
        <button 
          onClick={() => handleFilter('Unordered')} 
          className='w-10/12 md:w-auto bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Unordered
        </button>
        <button 
          onClick={() => handleFilter('Unassigned')} 
          className='w-10/12 md:w-auto bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Select Artist
        </button>
        <button 
          onClick={() => handleFilter('In Progress')} 
          className='w-10/12 md:w-auto bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          In Progress
        </button>
        <button 
          onClick={() => handleFilter('Completed')} 
          className='w-10/12 md:w-auto bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Completed
        </button>
        <button 
          onClick={() => handleFilter('Clear')} 
          className='w-10/12 md:w-auto bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Clear Filters
        </button>
      </div>
      <div className='mt-4 flex flex-col items-center'>
        {filtered.length === 0 ? 
          <div className='flex flex-col justify-center items-center'>
            <p className='text-white text-2xl font-bold mt-8'>No portraits to display</p>
            
            <Link 
              href={{
                pathname: '/',
                query: {selection: 'Home'},
                }} 
              className='text-white no-underline cursor-pointer z-30'
            >
              <div className='mt-8 py-2 px-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center text-2xl cursor-pointer hover:scale-105 transition duration-200 ease-in-out'>
                Return Home
              </div>
            </Link>
            
          </div>
        :  filtered?.map(portrait => (
          <Portrait key={portrait.id} portrait={portrait} user={currentUser} />
        )) }
      </div>   
    </div>
    
    <Footer />
  </div>
  
  )
}

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
import { getAllCustomersPortraits } from '../../firebase/firestore';
import Link from 'next/link';

type Params = {
  params: {
    userId: string
  }
}


export default function Dashboard({ params: { userId }}: Params) {
  console.log('userId in params: ', userId) 
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
 
  const [pageLoading, setPageLoading] = useState(true)
  const [currentUser , setCurrentUser] = useState<UserData | null>(null)
  const [portraits, setPortraits] = useState<Array<PortraitData>>([])
  const [filtered, setFiltered] = useState<Array<PortraitData>>([])
  const [badge, setBadge] = useState('../../../../images/badges/one.png')

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
        router.push('/')
    }
  }, [authUser, isLoading]);

  console.log('authUser in dashboard: ', authUser)
  console.log('currentUser: ', currentUser)
  console.log('portraits: ', portraits)
  console.log('filtered: ', filtered )

  useEffect(() => {
    console.log('running now')
    setPageLoading(true)
    let latestUser: UserData | null
    
    const getPortraits = async () => {
      console.log('called get Portraits')  
      const unsubscribe = await getAllCustomersPortraits(setPortraits, setFiltered, userId);
      
        return () => unsubscribe()
    }

    const handleCurrentUser = async () => {
      latestUser = await getUserById(userId)
      
      if (latestUser) {
        setCurrentUser(latestUser)
        getBadge(latestUser?.totalCompletedCommissions)
      }
      console.log('about to call getPortraits')
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

  const getBadge = (commissions: number) => {
      if (commissions === 0) {
        //setDiscount(awards[0])
        setBadge('../../../../images/badges/one.png')
      } else if (commissions > 0 && commissions < 3) {
          //setDiscount(awards[1])
          setBadge('../../../../images/badges/one.png')
      } else if (commissions >= 3 && commissions < 7) {
          //setDiscount(awards[2])
          setBadge('../../../../images/badges/two.png')
      } else if (commissions >= 7 && commissions < 10) {
          //setDiscount(awards[3])
          setBadge('../../../../images/badges/three.png')
      } else {
          //setDiscount(awards[4])
          setBadge('../../../../images/badges/four.png')
      }   
  }

  return ((!authUser || pageLoading || isLoading) ? 
    <></>
  :
  <div className='relative min-h-[120vh] bg-black'>
    {/* <img className="w-[101%] absolute -top-[16px] left-0 -z-10" src="../../images/drips/dashboard_top.png" alt='background black paint drips'/>  */}
    <object type="image/svg+xml" data="/images/white_dots.svg" className="absolute top-[15%] left-0 w-[100%] h-auto -z-1"/>
    <object type="image/svg+xml" data="/images/drips/dashboard_top.svg" className="absolute top-0 left-0 w-[100%] h-auto -z-1"/>
    <div className=' text-black pt-3 pb-36 min-h-[100vh]'>
    
      {currentUser && <Profile user={currentUser} badge={badge}/>}
      
      <h2 className='mt-8 text-4xl text-center font-bold text-white'>My Portraits</h2>
      
      <div className='flex justify-around items-center mt-8'>
        <button 
          onClick={() => handleFilter('Unordered')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Unordered
        </button>
        <button 
          onClick={() => handleFilter('Unassigned')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Select Artist
        </button>
        <button 
          onClick={() => handleFilter('In Progress')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          In Progress
        </button>
        <button 
          onClick={() => handleFilter('Completed')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
        >
          Completed
        </button>
        <button 
          onClick={() => handleFilter('Clear')} 
          className='bg-white border-2 border-[#282828] rounded-xl py-2 px-4 text-xl hover:text-white hover:bg-[#43b4e4] z-30'
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
              <div className='mt-4 py-2 px-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center text-2xl cursor-pointer hover:scale-105 transition duration-200 ease-in-out'>
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

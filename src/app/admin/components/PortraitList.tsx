import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { Timestamp } from 'firebase/firestore';
import { getAllPortraits, getUserById } from "@/app/firebase/firestore"
import Portrait from "@/app/components/Portrait";
import { PortraitData } from "@/app/portraits/components/PortraitCustomizer";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";

export default function PortraitList({ user }) {
  const [allPortraits, setAllPortaits] = useState<Array<PortraitData>>([])
  const [filteredPortraits, setFilteredPortraits] = useState<Array<PortraitData>>([])  
  const [button, setButton] = useState<String>('')
  const [currentAdmin, setCurrentAdmin] = useState<UserData>(null)

  useEffect(() => {
    const handleGetAllPortraits = async () => {
      const portraitsArr = await getAllPortraits();
      setAllPortaits(portraitsArr)
      setFilteredPortraits(portraitsArr)
    }

    const handleGetUser = async () => {
      const currentUser = await getUserById(user.uid)
      setCurrentAdmin(currentUser)
    }

    handleGetAllPortraits()
    handleGetUser()
  }, [])

  const handleGetPending = () => {
    const filtered = allPortraits.filter(portrait => portrait.artistAssigned === false)
    setFilteredPortraits(filtered)

    setButton('B1')
  }

  const handleGetClaimed = () => {
    const filtered = allPortraits.filter(portrait => portrait.artistAssigned === true)
    setFilteredPortraits(filtered)
    setButton('B2')
  }

  const handleGetCompleted = () => {
    const filtered = allPortraits.filter(portrait => portrait.status === 'Completed')
    setFilteredPortraits(filtered)
    setButton('B3')
  }

  const handleClearPortraits = () => {
    setFilteredPortraits(allPortraits)
    setButton('')
  }

  return (
        <div className="w-full flex flex-col items-center">
          <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Portrait List</h1>
          <div className='w-10/12 mx-auto flex justify-between mb-6 px-10'>
              <motion.button className={button === 'B1' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} onClick={handleGetPending} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Pending Commissions</motion.button>

              <motion.button className={button === 'B2' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} onClick={handleGetClaimed} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Claimed Commissions</motion.button>
              
              <motion.button className={button === 'B3' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} onClick={handleGetCompleted} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Completed Commissions</motion.button>
              
              <motion.button className='border-2 border-black rounded-lg p-2 w-3/12' onClick={handleClearPortraits} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Clear Filters</motion.button>
          </div>
          
          <div className='flex flex-col items-center w-10/12'>
            {filteredPortraits.length === 0 ? 
              <p>No portraits to display</p>
            :  filteredPortraits?.map(portrait => (
              <Portrait 
                key={portrait.uid} 
                portrait={portrait}
                user={currentAdmin} 
                // userId={user.uid} 
                // displayName={user.displayName} 
                // role={user.roles}
              />
            )) }
          </div>   
        </div>
    )
}

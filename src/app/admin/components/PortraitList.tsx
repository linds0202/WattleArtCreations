import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllAdminPortraits, getUserById } from "@/app/firebase/firestore"
import Portrait from "@/app/components/Portrait";
import { PortraitData } from "@/app/portraits/components/PortraitCustomizer";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import SearchPortraits from "./SearchPortraits";


interface PortraitListProps {
  user: UserData
}


export default function PortraitList({ user }: PortraitListProps) {
  const [allPortraits, setAllPortraits] = useState<Array<PortraitData>>([])
  const [filteredPortraits, setFilteredPortraits] = useState<Array<PortraitData>>([])  
  const [button, setButton] = useState<string>('')
  const [currentAdmin, setCurrentAdmin] = useState<null | UserData>(null)

  useEffect(() => {
    const handleGetPortraits = async () => {
      const unsubscribe = await getAllAdminPortraits(setAllPortraits, setFilteredPortraits);
      
        return () => unsubscribe()
    }


    const handleGetUser = async () => {
      const currentUser: UserData | null = await getUserById(user.uid)
      if(currentUser) setCurrentAdmin(currentUser)
    }

    handleGetPortraits()
    handleGetUser()
  }, [])

  const handleGetAwaitingArtistBid = () => {
    const filtered = allPortraits.filter(portrait => portrait.artist.length === 0)
    setFilteredPortraits(filtered)

    setButton('B1')
  }

  const handleGetAwaitingArtistSelection = () => {
    const filtered = allPortraits.filter(portrait => portrait.artist.length > 0 && portrait.artistAssigned === false)
    setFilteredPortraits(filtered)

    setButton('B2')
  }

  const handleGetInProgress = () => {
    const filtered = allPortraits.filter(portrait => portrait.artistAssigned === true && portrait.status !== 'Completed')
    setFilteredPortraits(filtered)
    setButton('B3')
  }

  const handleGetCompleted = () => {
    const filtered = allPortraits.filter(portrait => portrait.status === 'Completed')
    setFilteredPortraits(filtered)
    setButton('B4')
  }

  const handleGetNotReassigned = () => {
    const filtered = allPortraits.filter(portrait => (portrait.status === 'In Progress' || portrait.status === 'Completed'))
    setFilteredPortraits(filtered)
    setButton('B5')
  }

  const handleGetReassigned = () => {
    const filtered = allPortraits.filter(portrait => (portrait.status === 'In Progress' || portrait.status === 'Completed') && portrait.reassigned)
    setFilteredPortraits(filtered)
    setButton('B6')
  }

  const handleClearPortraits = () => {
    setFilteredPortraits(allPortraits)
    setButton('')
  }


  return (
        <div className="w-full flex flex-col items-center">
          <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Purchased Portraits</h1>
          <div className='w-11/12 mx-auto flex justify-between mb-6 px-10'>
              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B1' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetAwaitingArtistBid} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Awaiting Artist Bids
              </motion.button>

              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B2' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetAwaitingArtistSelection} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Awaiting Artist Selection
              </motion.button>

              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B3' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetInProgress} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                In Progress
              </motion.button>
              
              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B4' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetCompleted} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Completed Commissions
              </motion.button>
              
              <motion.button 
                className='w-1/5 mx-4 p-2 border-2 border-black rounded-lg'
                onClick={handleClearPortraits} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Clear Filters
              </motion.button>
          </div>

          <div className="w-11/12 mx-auto px-14 flex justify-between items-center">
            <SearchPortraits
              setFilteredPortraits={setFilteredPortraits} 
              allPortraits={allPortraits}  
            />

            <div className="w-1/2 flex justify-end">
              <motion.button 
                className={`w-5/12 border-2 border-black p-2 rounded-lg ${button === 'B6' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetReassigned} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Artist Reassigned
              </motion.button>

              <motion.button 
                className={`w-5/12 ml-6 border-2 border-black p-2 rounded-lg ${button === 'B5' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetNotReassigned} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Artist Able To Be Reassigned
              </motion.button>
            </div>
          </div>
          
          <div className='flex flex-col items-center w-11/12'>
            {filteredPortraits.length === 0 ? 
              <p>No portraits to display</p>
            :  filteredPortraits?.map(portrait => (
              <Portrait 
                key={portrait.id} 
                portrait={portrait}
                user={currentAdmin} 
              />
            )) }
          </div>   
        </div>
    )
}

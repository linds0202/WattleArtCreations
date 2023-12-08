import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllUndorderedPortraits, getUserById } from "@/app/firebase/firestore"
import Portrait from "@/app/components/Portrait";
import { PortraitData } from "@/app/portraits/components/PortraitCustomizer";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import SearchPortraits from "./SearchPortraits";


interface PortraitListProps {
  user: UserData
}

export default function UnorderedPortraitList({ user }: PortraitListProps) {
  const [allPortraits, setAllPortaits] = useState<Array<PortraitData>>([])
  const [filteredPortraits, setFilteredPortraits] = useState<Array<PortraitData>>([])  
  
  const [button, setButton] = useState<string>('')
  const [currentAdmin, setCurrentAdmin] = useState<null | UserData>(null)

  useEffect(() => {
    const handleGetAllPortraits = async () => {
      const portraitsArr = await getAllUndorderedPortraits();
      setAllPortaits(portraitsArr)
      setFilteredPortraits(portraitsArr)
    }

    const handleGetUser = async () => {
      const currentUser: UserData | null = await getUserById(user.uid)
      if(currentUser) setCurrentAdmin(currentUser)
    }

    handleGetAllPortraits()
    handleGetUser()
  }, [])


  const handleClearPortraits = () => {
    setFilteredPortraits(allPortraits)
    setButton('')
  }

  return (
        <div className="w-full flex flex-col items-center">
          <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Unordered Portraits</h1>
          <div className='w-11/12 mx-auto flex justify-between mb-6 px-10'>
              
              <SearchPortraits 
                setFilteredPortraits={setFilteredPortraits} 
                allPortraits={allPortraits}  
              />
              <motion.button 
                className='w-1/4 mx-4 p-2 self-center border-2 border-black rounded-lg'
                onClick={handleClearPortraits} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Clear Filters
              </motion.button>
          </div>
          
          <div className='w-11/12 flex flex-col items-center'>
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

import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { Timestamp } from 'firebase/firestore';
import { getAllPortraits } from "@/app/firebase/firestore"
import Portrait from "@/app/components/Portrait";

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


export default function PortraitList() {
  const [allPortraits, setAllPortaits] = useState<Array<PortraitData>>([])
  const [filteredPortraits, setFilteredPortraits] = useState<Array<PortraitData>>([])  
  const [button, setButton] = useState<String>('')

  useEffect(() => {
    const handleGetAllPortraits = async () => {
      const portraitsArr = await getAllPortraits();
      setAllPortaits(portraitsArr)
      setFilteredPortraits(portraitsArr)
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

  const handleClearPortraits = () => {
    setFilteredPortraits(allPortraits)
    setButton('')
  }

  return (
        <div>
            <h1 className='text-4xl text-center pt-10 mb-20 font-semibold'>Portrait List</h1>
          <div className='w-full mx-auto flex justify-between mb-6 px-10'>
              <motion.button className={button === 'B1' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} onClick={handleGetPending} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Pending Commissions</motion.button>
              <motion.button className={button === 'B2' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} onClick={handleGetClaimed} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Claimed Commissions</motion.button>
              <motion.button className='border-2 border-black rounded-lg p-2 w-3/12' onClick={handleClearPortraits} whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>Clear Filters</motion.button>
          </div>
          
          <div className='flex flex-col items-center w-full'>
            {filteredPortraits.length === 0 ? 
              <p>No portraits to display</p>
            :  filteredPortraits?.map(portrait => (
              <Portrait key={portrait.uid} portrait={portrait} />
            )) }
          </div>   
        </div>
    )
}

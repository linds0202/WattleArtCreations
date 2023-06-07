import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllConsults } from "@/app/firebase/firestore"
import ConsultRow from "./ConsultRow";

interface CorporateData {
    uid: String,
    category: String, 
    subcategories: String, 
    questions: [], 
    generalAnswers: {},
    advertisementAnswers: {},
    storyAnswers: {},
    tableAnswers: {},
    videoGameAnswers: {},
    price: Number,
    customerFirstName: String,
    customerLastName: String,
    customerEmail: String,
    consultant: String,
    date: Date,
    status: String,
    lastUpdatedStatus: Date,
    paymentComplete: Boolean,
  }

export default function ConsultList() {
  const [allConsults, setAllConsults] = useState<Array<CorporateData>>([])
  const [filteredConsults, setFilteredConsults] = useState<Array<CorporateData>>([])  
  const [button, setButton] = useState<String>('')

  useEffect(() => {
    const handleGetAllConsults = async () => {
      const consultsArr = await getAllConsults();
      setAllConsults(consultsArr)
      setFilteredConsults(consultsArr)
    }

    handleGetAllConsults()
  }, [])

  const handleGetPending = () => {
    const filtered = allConsults.filter(consult => consult.status.includes('Pending'))
    setFilteredConsults(filtered)

    setButton('B1')
  }

  const handleGetClaimed = () => {
    const filtered = allConsults.filter(consult => consult.status.includes('replied'))
    setFilteredConsults(filtered)
    setButton('B2')
  }

  const handleClearConsults = () => {
    setFilteredConsults(allConsults)
    setButton('')
  }

  console.log('filtered Consults: ', filteredConsults)

  return (
    <div className="w-9/12 py-10">
      <div className='w-full mx-auto flex justify-between mb-6 px-10'>
        <motion.button 
          className={button === 'B1' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetPending} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Pending Consults
        </motion.button>

        <motion.button 
          className={button === 'B2' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetClaimed} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Replied Consults
        </motion.button>

        <motion.button 
          className='border-2 border-black rounded-lg p-2 w-3/12' 
          onClick={handleClearConsults} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Clear Filters
        </motion.button>
      </div>
      
      <div className='flex flex-col items-center w-full'>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Display Name</th>
                    <th>Emial</th>
                    <th>Roles</th>
                    <th>View Orders</th>
                </tr>
            </thead>
          <tbody>
            {filteredConsults.length === 0 ? 
                <tr>
                <td>No customers to display</td>
                </tr>
            :  filteredConsults?.map(consult => (
                    <ConsultRow key={consult.uid} consult={consult} />
            )) }
          </tbody>
        </table>
      </div>   
    </div>
  )
}

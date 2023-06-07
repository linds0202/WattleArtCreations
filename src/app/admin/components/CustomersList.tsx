import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllUsers } from "@/app/firebase/firestore"
import Customer from "./Customer";

interface UserData {
  uid: String,
  email: String,
  displayName: String,
  roles: [String]
}

export default function CustomersList() {
  const [allCustomers, setAllCustomers] = useState<Array<UserData>>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Array<UserData>>([])  
  const [button, setButton] = useState<String>('')

  useEffect(() => {
    const handleGetAllCustomers = async () => {
      const customersArr = await getAllUsers();
      setAllCustomers(customersArr)
      setFilteredCustomers(customersArr)
    }

    handleGetAllCustomers()
  }, [])

  const handleGetPending = () => {
    const filtered = allCustomers.filter(customer => customer.roles.includes('artist'))
    setFilteredCustomers(filtered)

    setButton('B1')
  }

  const handleGetClaimed = () => {
    const filtered = allCustomers.filter(customer => customer.roles.includes('admin'))
    setFilteredCustomers(filtered)
    setButton('B2')
  }

  const handleClearPortraits = () => {
    setFilteredCustomers(allCustomers)
    setButton('')
  }

  return (
    <div className="w-9/12 py-10">
      <div className='w-full mx-auto flex justify-between mb-6 px-10'>
        <motion.button 
          className={button === 'B1' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetPending} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Pending Commissions
        </motion.button>

        <motion.button 
          className={button === 'B2' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetClaimed} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Claimed Commissions
        </motion.button>

        <motion.button 
          className='border-2 border-black rounded-lg p-2 w-3/12' 
          onClick={handleClearPortraits} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Clear Filters
        </motion.button>
      </div>
      
      <div className='flex flex-col items-center w-full'>
        <table>
          <tr>
            <th>Id</th>
            <th>Display Name</th>
            <th>Emial</th>
            <th>Roles</th>
            <th>View Orders</th>
          </tr>
          {filteredCustomers.length === 0 ? 
            <tr>
              <td>No customers to display</td>
            </tr>
          :  filteredCustomers?.map(customer => (
            <Customer key={customer.uid} customer={customer} />
          )) }
        </table>
      </div>   
    </div>
  )
}

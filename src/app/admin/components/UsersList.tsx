import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllUsers, getAllCustomers } from "@/app/firebase/firestore"
import User from "./User";

interface UserData {
  uid: String,
  email: String,
  displayName: String,
  roles: String
}

export default function UsersList() {
  const [allCustomers, setAllCustomers] = useState<Array<UserData>>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Array<UserData>>([])  
  const [button, setButton] = useState<String>('')

  useEffect(() => {
    const handleGetAllUsers = async () => {
      const customersArr = await getAllCustomers();
      setAllCustomers(customersArr)
      setFilteredCustomers(customersArr)
    }

    handleGetAllUsers()
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
    <div className="w-full py-10">
      <h1 className='text-4xl text-center pt-10 mb-20 font-semibold'>All Users</h1>
      <div className='w-full mx-auto flex justify-between mb-6 px-10 w-10/12'>
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
            <User key={customer.uid} customer={customer} />
          )) }
        </table>
      </div>   
    </div>
  )
}

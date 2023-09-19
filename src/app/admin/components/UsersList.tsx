import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllUsers, getAllCustomers } from "@/app/firebase/firestore"
import User from "./User";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { getAllUserInfo } from "@/app/firebase/firestore";


export default function UsersList() {
  const [allUsers, setAllUsers] = useState<Array<UserData>>([])
  const [filteredUsers, setFilteredUsers] = useState<Array<UserData>>([])  
  const [button, setButton] = useState<String>('')

  useEffect(() => {
    // const handleGetAllUsers = async () => {
    //   const usersArr = await getAllUsers();
    //   setAllUsers(usersArr)
    //   setFilteredUsers(usersArr)
    // }

    // handleGetAllUsers()

    const getUsersList = async () => {
      const unsubscribe = await getAllUserInfo(setAllUsers, setFilteredUsers);
    
      return () => unsubscribe()
      } 

      getUsersList()
  }, [])

  const handleGetArtists = () => {
    const filtered = allUsers.filter(user => user.roles === 'Artist')
    setFilteredUsers(filtered)

    setButton('B1')
  }

  const handleGetCustomers = () => {
    const filtered = allUsers.filter(user => user.roles === 'Customer')
    setFilteredUsers(filtered)

    setButton('B2')
  }

  const handleGetAdmins = () => {
    const filtered = allUsers.filter(user => user.roles.includes('Admin'))
    setFilteredUsers(filtered)
    setButton('B3')
  }

  const handleClearFilters = () => {
    setFilteredUsers(allUsers)
    setButton('')
  }

  return (
    <div className="w-full">
      <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>All Users</h1>
      <div className='w-full mx-auto flex justify-between mb-6 px-10'>
        <motion.button 
          className={button === 'B1' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetArtists} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Artists
        </motion.button>

        <motion.button 
          className={button === 'B2' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetCustomers} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Customers
        </motion.button>

        <motion.button 
          className={button === 'B3' ? 'border-2 border-black rounded-lg p-2 w-3/12 bg-black text-white' : 'border-2 border-black rounded-lg p-2 w-3/12'} 
          onClick={handleGetAdmins} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Admins
        </motion.button>

        <motion.button 
          className='border-2 border-black rounded-lg p-2 w-3/12' 
          onClick={handleClearFilters} 
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
                <th>Email</th>
                <th>Role</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? 
                <tr>
                  <td>No customers to display</td>
                </tr>
              :  filteredUsers?.map(user => (
                <User key={user.uid} user={user} />
              )) }
            </tbody>
        </table>
      </div>   
    </div>
  )
}

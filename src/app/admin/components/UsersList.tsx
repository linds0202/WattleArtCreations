import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllUsers, getAllCustomers } from "@/app/firebase/firestore"
import User from "./User";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { getAllUserInfo } from "@/app/firebase/firestore";
import SearchUsers from "./SearchUsers";


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
    <div className="w-full mb-20">
      <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Users</h1>
      <div className='w-full flex justify-between mb-6 px-10'>
        <motion.button 
          className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B1' ? 'bg-[#43b4e4] text-white' : ''}`}
          onClick={handleGetArtists} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Artists
        </motion.button>

        <motion.button 
          className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B2' ? 'bg-[#43b4e4] text-white' : ''}`} 
          onClick={handleGetCustomers} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Customers
        </motion.button>

        <motion.button 
          className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B3' ? 'bg-[#43b4e4] text-white' : ''}`}
          onClick={handleGetAdmins} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Admins
        </motion.button>

        <motion.button 
          className='w-1/4 mx-4 p-2 border-2 border-black rounded-lg' 
          onClick={handleClearFilters} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Clear Filters
        </motion.button>
      </div>

      <div className="w-full px-14 mb-4">
        <SearchUsers
          setFilteredUsers={setFilteredUsers} 
          allUsers={allUsers}  
        />
      </div>
      
      <div className=' w-full flex flex-col items-center'>
        <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Display Name</th>
                <th>Artist Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="w-2/12">View Details</th>
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

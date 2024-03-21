import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import Artist from "./Artist";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { getAllArtistsInfo } from "@/app/firebase/firestore";
import SearchUsers from "./SearchUsers";


export default function ArtistPayments() {
  const [allArtists, setAllArtists] = useState<Array<UserData>>([])
  const [filteredArtists, setFilteredArtists] = useState<Array<UserData>>([])  
  const [button, setButton] = useState<String>('')

  useEffect(() => {

    const getUsersList = async () => {
      const unsubscribe = await getAllArtistsInfo(setAllArtists, setFilteredArtists);
    
      return () => unsubscribe()
      } 

      getUsersList()
  }, [])

  const handleGetOwing = () => {
    // const filtered = allArtists.filter(artist => artist.paymentsOwing.reduce((sum, payment) => sum += !payment.released ? payment.amount : 0, 0) !== 0)
    // setFilteredArtists(filtered)

    setButton('B1')
  }

  const handleGetComplete = () => {
    // const filtered = allArtists.filter(artist => artist.paymentsOwing.reduce((sum, payment) => sum += !payment.released ? payment.amount : 0, 0) === 0)
    // setFilteredArtists(filtered)

    setButton('B2')
  }

  const handleClearFilters = () => {
    setFilteredArtists(allArtists)
    setButton('')
  }

  return (
    <div className="w-full mb-20">
      <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Artist Payments</h1>
      <div className='w-full flex justify-between mb-6 px-10'>
        <motion.button 
          className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B1' ? 'bg-[#43b4e4] text-white' : ''}`}
          onClick={handleGetOwing} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Payments Owing
        </motion.button>

        <motion.button 
          className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B2' ? 'bg-[#43b4e4] text-white' : ''}`} 
          onClick={handleGetComplete} 
          whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
        >
          Payments Complete
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
          setFilteredUsers={setFilteredArtists} 
          allUsers={allArtists}  
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
                <th>Owed Amount</th>
                <th>Lifetime Earnings</th>
                <th className="w-2/12">View Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtists.length === 0 ? 
                <tr>
                  <td>No artists to display</td>
                </tr>
              :  filteredArtists?.map(user => (
                <p>ok</p>
                // <Artist key={user.uid} user={user} />
              )) }
            </tbody>
        </table>
      </div>   
    </div>
  )
}

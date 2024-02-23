import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { getAllModels, getUserById } from "@/app/firebase/firestore"
import Portrait from "@/app/components/Portrait";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import SearchPortraits from "./SearchPortraits";
import { Timestamp } from "firebase/firestore";
import Model from "./Model";
import SearchModels from "./SearchModels";

export interface ModelData {
  portraitId: string,
  customerId: string,
  customerName: string,
  price: number,
  portraitComplete: boolean,
  delivered: boolean,
  admin: string,
  creationDate: Timestamp,
  uid: string
}

interface ModelListProps {
  user: UserData
}


export default function ModelList({ user }: ModelListProps) {
  const [allModels, setAllModels] = useState<Array<ModelData>>([])
  const [filteredModels, setFilteredModels] = useState<Array<ModelData>>([])  
  const [button, setButton] = useState<string>('')
  const [currentAdmin, setCurrentAdmin] = useState<null | UserData>(null)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    // const handleGetAllModels = async () => {
    //   const modelsArr = await getAllModels();
    //   setAllModels(modelsArr)
    //   setFilteredModels(modelsArr)
    // }

    const getModelsList = async () => {
      const unsubscribe = await getAllModels(setAllModels, setFilteredModels);
    
      return () => unsubscribe()
    } 

    getModelsList()

    const handleGetUser = async () => {
      const currentUser: UserData | null = await getUserById(user.uid)
      if(currentUser) setCurrentAdmin(currentUser)
    }

    // handleGetAllModels()
    handleGetUser()
  }, [])

  const handleGetPortraitIncomplete = () => {
    const filtered = allModels.filter(model => !model.portraitComplete)
    setFilteredModels(filtered)

    setButton('B1')
  }

  const handleGetPortraitComplete = () => {
    const filtered = allModels.filter(model => model.portraitComplete && !model.delivered)
    setFilteredModels(filtered)

    setButton('B2')
  }

  const handleGetDelievered = () => {
    const filtered = allModels.filter(model => model.delivered)
    setFilteredModels(filtered)

    setButton('B3')
  }

  const handleClearModels = () => {
    setFilteredModels(allModels)
    setButton('')
  }


  return (
        <div className="w-full flex flex-col items-center">
          <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Purchased Portraits</h1>
          <div className='w-11/12 mx-auto flex justify-between mb-6 px-10'>
              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B1' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetPortraitIncomplete} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Incomplete Portrait
              </motion.button>

              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B2' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetPortraitComplete} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Ready for Creation
              </motion.button>

              <motion.button 
                className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B3' ? 'bg-[#43b4e4] text-white' : ''}`}
                onClick={handleGetDelievered} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Delivered
              </motion.button>
              
              <motion.button 
                className='w-1/5 mx-4 p-2 border-2 border-black rounded-lg'
                onClick={handleClearModels} 
                whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                whileTap={{ scale: 1.03 }}
              >
                Clear Filters
              </motion.button>
          </div>

          <div className="w-11/12 mx-auto px-14">
            <SearchModels
              setFilteredModels={setFilteredModels} 
              allModels={allModels}  
            />
          </div>

          <div className=' w-full flex flex-col items-center'>
            <table>
                <thead>
                  <tr>
                    <th className="px-2">3D Model Id</th>
                    <th className="px-2">Portrait Id</th>
                    <th className="px-2">Customer Id</th>
                    <th className="px-2">Customer Name</th>
                    <th className="px-2">Ordered On</th>
                    <th className="px-2">Portrait Complete</th>
                    <th className="px-2">Delivered</th>
                    <th className="px-2">Admin</th>
                    {/* <th className="w-2/12">View Details</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.length === 0 ? 
                    <tr>
                      <td>No 3D Model orders to display</td>
                    </tr>
                  :  filteredModels?.map(model => (
                    <Model key={model.uid} model={model} user={user} />
                  )) }
                </tbody>
            </table>
          </div>   
          
          {/* <div className='flex flex-col items-center w-11/12'>
            {filteredModels.length === 0 ? 
              <p>No portraits to display</p>
            :  filteredModels?.map(model => (
              <Model 
                key={model.id} 
                model={model}
                user={currentAdmin} 
              />
            )) }
          </div>    */}
        </div>
    )
}

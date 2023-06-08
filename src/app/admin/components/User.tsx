import { motion } from "framer-motion"
import EditIcon from '@mui/icons-material/Edit';
import { updateUser } from "@/app/firebase/firestore";

import { useState, useEffect } from 'react'

export default function User({ customer, userId}) {

    const handleViewOrders = () => {
        console.log('clicked view orders')
    }

    const [openRole, setOpenRole] = useState(false)
    const [currentRole, setCurrentRole] = useState(customer.roles)

    const handleSelect = (e) => {
        if (e.target.value === customer.roles) alert('already that')
        else {
            updateUser(customer.uid, e.target.value)
            setCurrentRole(e.target.value)
            setOpenRole(false)
        }
    }

    return (
        <tr className="h-[75px]">
            <td className="pl-2">{customer.uid}</td>
            <td className="pl-2">{customer.displayName}</td>
            <td className="pl-2">{customer.email}</td>
            <td className="w-2/12 relative">
                <div className="flex justify-between px-4">
                    {!openRole && 
                        <p>{currentRole}</p>
                    }
                    {openRole && 
                        <select onChange={handleSelect} className="border-b-2 border-black leading-tight outline-none">
                            <option>customer</option>
                            <option>artist</option>
                            <option>admin</option>
                        </select>
                    }
                    <button className="border border-white rounded-md hover:border hover:border-black hover:rounded-md transition duration-200 ease-in" onClick={() => setOpenRole(prev => !prev)}>
                        <EditIcon />
                    </button>
                </div>
                
            </td>
            <td className="pl-[2%]">
                <motion.button 
                    className='border-2 border-black rounded-lg py-2 w-9/12 mx-auto h-8/12' 
                    onClick={handleViewOrders} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                    >
                    Clear Filters
                </motion.button>
            </td>
        </tr>
    )
}
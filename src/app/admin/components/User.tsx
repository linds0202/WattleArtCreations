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
        console.log('e.target.value: ', e.target.value)
        if (e.target.value === currentRole) alert('already that')
        else if (e.target.value === 'select one') return
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
                            <option>Select one</option>
                            <option>Customer</option>
                            <option>Artist</option>
                            <option>Admin</option>
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
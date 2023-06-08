import { motion } from "framer-motion"
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { useState, useEffect } from 'react'

export default function Customer({ customer, userId}) {
    
    useEffect(() => {
        console.log('rendering')
    })

    const handleViewOrders = () => {
        console.log('clicked view orders')
    }

    const [openRole, setOpenRole] = useState(false)
    const [currentRoles, setCurrentRoles] = useState(customer.roles)

    const handleRoleClick = (role:string) => {
        if (currentRoles.includes(role)) {
            let holderArr = currentRoles
            const index = holderArr.indexOf(role)
            holderArr.splice(index, 1)

            console.log('holder: ', holderArr)

            if (holderArr.length === 0) return
            else {

                setCurrentRoles(holderArr)
            }

        } else {
            setCurrentRoles(prev => [...prev, role])
        }
    }

    console.log('current roles: ', currentRoles)

    return (
        <tr className="h-[75px]">
            <td className="pl-2">{customer.uid}</td>
            <td className="pl-2">{customer.displayName}</td>
            <td className="pl-2">{customer.email}</td>
            <td className="w-2/12 relative">
                <div className="flex justify-between px-4">
                    {customer.roles}
                    <button className="border border-white rounded-md hover:border hover:border-black hover:rounded-md transition duration-200 ease-in" onClick={() => setOpenRole(prev => !prev)}>
                        {!openRole ? 
                            <EditIcon />
                        :
                            <SaveAltIcon />
                        }
                        
                    </button>
                </div>
                {openRole && 
                    <div className="absolute z-40 bottom-[-147%] border border-black bg-white w-full left-0 py-2">
                        <p className={currentRoles.indexOf('customer') !== -1 ? "text-xl pl-4 mb-px bg-neutral-300 hover:cursor-pointer hover:underline py-px" : "bg-white text-xl pl-4 mb-px hover:bg-neutral-300 hover:cursor-pointer hover:underline py-px text-red"} onClick={() => handleRoleClick('customer')}>customer</p>
                        <p className={currentRoles.includes('artist') ? "text-xl pl-4 mb-px bg-neutral-300 hover:cursor-pointer hover:underline py-px" : "bg-white text-xl pl-4 mb-px hover:bg-neutral-300 hover:cursor-pointer hover:underline py-px"} onClick={() => handleRoleClick('artist')}>artist</p>
                        <p className={currentRoles.includes('admin') ? "text-xl pl-4 mb-px bg-neutral-300 hover:cursor-pointer hover:underline py-px" : "bg-white text-xl pl-4 mb-px hover:bg-neutral-300 hover:cursor-pointer hover:underline py-px"} onClick={() => handleRoleClick('admin')}>admin</p>
                    </div>
                }
                
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
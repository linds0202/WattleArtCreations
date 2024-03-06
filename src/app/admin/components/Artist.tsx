import { motion } from "framer-motion"
import { useState } from 'react'
import UserDetails from "./UserDetails";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import ReleasePayment from "./ReleasePayment";

interface UserProps {
    user: UserData
}

export default function Artist( {user}: UserProps ) {

    const [openDetails, setOpenDetails] = useState(false)
    const [openRelease, setOpenRelease] = useState(false)

    const handleViewDetails = () => {
        setOpenDetails(true)
    }

    const handlePaymentReleased = () => {
        setOpenRelease(true)
    }

    return (
    <>
        <tr className="h-[75px] text-center">
            <td className="px-2">{user.uid }</td>
            <td className="px-2">{user.displayName ? user.displayName : 'N/A'}</td>
            <td className="px-2">{user.roles === 'Artist' ? user.artistName : ''}</td>
            <td className="px-2">{user.email}</td>
            <td className="w-[14%] px-2">
                <div className="flex justify-between items-center">
                    <p>$ {user.paymentsOwing.reduce((sum, payment) => sum += payment.released ? 0 : payment.amount, 0)}</p>
                    <motion.button 
                        className='border-2 border-black rounded-lg p-2 ml-2' 
                        onClick={handlePaymentReleased} 
                        whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                        >
                        Release $
                    </motion.button> 
                </div>
                
                   
            </td>
            <td className="px-2">$ {user.lifeTimeEarnings}</td>
            <td className="h-[75px] flex justify-center items-center">
                <motion.button 
                    className='border-2 border-black rounded-lg py-2 w-9/12 mx-auto' 
                    onClick={handleViewDetails} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                    >
                    View Details
                </motion.button>
            </td>
        </tr>
        <UserDetails user={user} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
        <ReleasePayment user={user} openDetails={openRelease} setOpenDetails={setOpenRelease}/>
    </>)
}
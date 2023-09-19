import { motion } from "framer-motion"
import EditIcon from '@mui/icons-material/Edit';
import { updateUser } from "@/app/firebase/firestore";
import { useState } from 'react'
import UserDetails from "./UserDetails";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";

interface UserProps {
    user: UserData
}

type SelectChangeEventHandler = React.ChangeEventHandler<HTMLSelectElement>

export default function User( {user}: UserProps ) {
    const [openRole, setOpenRole] = useState(false)
    const [currentRole, setCurrentRole] = useState(user.roles)
    const [openDetails, setOpenDetails] = useState(false)

    const handleViewDetails = () => {
        console.log('clicked view details')
        setOpenDetails(true)
    }

    const handleSelect: SelectChangeEventHandler = async (e) => {
        if (e.target.value === currentRole) alert('already that')
        else if (e.target.value === 'select one') return
        else {
            await updateUser(user.uid, e.target.value)
            setCurrentRole(e.target.value)
            setOpenRole(false)
        }
    }

    console.log('current role: ', currentRole)

    return (
    <>
        <tr className="h-[75px]">
            <td className="pl-2">{user.uid }</td>
            <td className="pl-2">{user.displayName}</td>
            <td className="pl-2">{user.email}</td>
            <td className="w-2/12 relative">
                <div className="flex justify-between px-4">
                    {!openRole && 
                        <p>{currentRole}</p>
                    }
                    {openRole && 
                        <select value={currentRole} onChange={handleSelect} className="border-b-2 border-black leading-tight outline-none">
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
                    onClick={handleViewDetails} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                    >
                    View Details
                </motion.button>
            </td>
        </tr>
        <UserDetails user={user} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
    </>)
}
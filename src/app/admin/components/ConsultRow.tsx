import { motion } from "framer-motion"

export default function ConsultRow({ consult }) {
    
    const handleViewConsult = () => {
        console.log('clicked view orders')
    }

    return (
        <tr>
            <td>{consult.category}</td>
            <td>{consult.customerFirstName}</td>
            <td>{consult.customerLastName}</td>
            <td>{consult.customerEmail}</td>
            <td>
                <motion.button 
                    className='border-2 border-black rounded-lg p-2 w-9/12 mx-auto' 
                    onClick={handleViewConsult} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                    >
                    View Details
                </motion.button>
            </td>
        </tr>
    )
}
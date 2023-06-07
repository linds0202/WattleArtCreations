import { motion } from "framer-motion"

export default function Customer({ customer, userId}) {
    
    const handleViewOrders = () => {
        console.log('clicked view orders')
    }

    return (
        <tr>
            <td>{customer.uid}</td>
            <td>{customer.displayName}</td>
            <td>{customer.email}</td>
            <td>{customer.roles}</td>
            <td>
                <motion.button 
                    className='border-2 border-black rounded-lg p-2 w-9/12 mx-auto' 
                    onClick={handleViewOrders} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                    >
                    Clear Filters
                </motion.button>
            </td>
        </tr>
    )
}
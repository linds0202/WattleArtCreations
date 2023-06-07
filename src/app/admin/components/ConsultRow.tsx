import { motion } from "framer-motion"
import { useState } from "react"

export default function ConsultRow({ consult }) {
    const [openModal, setOpenModal] = useState<Boolean>(false)

    const handleViewConsult = () => {
        setOpenModal(true)
        console.log('clicked view orders')
    }

    return (
        <>
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

            {openModal && 
                <div className="fixed top-[15%] left-[10%] bg-white h-4/5 w-10/12 rounded-xl border-2 border-black">
                    <p>{consult.category} {consult.subcategories}</p>
                    <p>Customer Name: {consult.customerFirstName} {consult.customerLastName}</p>
                    <p>Customer Email: {consult.customerEmail}</p>
                    {consult.questions.general.map((q, i) => 
                    <div>
                        <p>{q} {consult.generalAnswers[`q${i}`]}</p>
                    </div>    
                    )}
            </div>} 
        </>
        
    )
}
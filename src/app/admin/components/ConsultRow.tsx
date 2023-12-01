import { motion } from "framer-motion"
import { useState } from "react"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CorporateData } from "./ConsultList";

interface ConsultRowProps {
    consult: CorporateData
}

export default function ConsultRow({ consult }: ConsultRowProps) {
    const [openModal, setOpenModal] = useState<Boolean>(false)

    const handleViewConsult = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
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
                    <IconButton onClick={handleClose} className='absolute top-2 right-2 text-white'>
                        <CloseIcon className='text-black hover:text-red-600'/>
                    </IconButton>
                    <h2 className="text-4xl font-bold text-center mt-10">Consult Id: {consult.uid}</h2>
                    <div className="mt-10 pt-10 overflow-auto h-[450px] pl-4 border-black border-l-2 border-b-2 mx-4">
                        <p className="font-bold text-3xl mb-2">Consult Type:</p>
                        <p className="font-semibold text-xl mb-10">{consult.category} {consult.subcategories}</p>
                        <p className="font-semibold text-xl  mb-10"><span className="font-bold text-3xl">Customer Name: </span>{consult.customerFirstName} {consult.customerLastName}</p>
                        <p className="font-semibold text-xl  mb-10"><span className="font-bold text-3xl">Customer Email: </span>{consult.customerEmail}</p>
                        {/* {consult?.questions?.general.map((q, i) => 
                        
                        <div key={q} className="w-10/12">
                            <p className="text-xl font-bold mb-2">{q}</p>
                            <p className="text-lg font-semibold mb-10">{consult.generalAnswers[`q${i}`]}</p>
                        </div>    
                        )} */}
                    </div>
                    
            </div>} 
        </>
        
    )
}
import { useState } from "react"
import { PaymentType } from "./ArtistPayments"
import { motion } from "framer-motion"
import ReleasePayment from "./ReleasePayment"
import { Field } from 'formik'

interface PaymentProps {
    payment: PaymentType,
    releaseList: Array<string>,
    setReleaseList: Function,
    paymentType: string
}


const Payment = ({ payment, releaseList, setReleaseList, paymentType }: PaymentProps) => {
    const [openDetails, setOpenDetails] = useState(false)

    const handleViewDetails = () => {
        setOpenDetails(true)
    }
    

    const onChangeCheckBox = (e: {
        target: { checked: boolean; value: React.SetStateAction<string> }
      }) => {
        const { value, checked: isChecked } = e.target
        
        if(isChecked) {
            const newReleaseList = [...releaseList, value]
            setReleaseList(newReleaseList)
        } else {
            const newReleaseList = releaseList.filter(id => id !== value)
            setReleaseList(newReleaseList)
        }
        
    }

    return (
    <>
        <tr className="h-[65px] text-center text-sm">
            <td className="px-2">{payment.uid }</td>
            <td className="px-2">{new Date(payment.date.toDate()).toLocaleDateString("en-US")}</td>
            <td className="px-2">{payment.artistId}</td>
            <td className="px-2">{payment.portraitId}</td>
            {paymentType === 'pending' && <td className="py-2">
                <label htmlFor={payment.released ? 'true' : 'false'} className="checkLabel">
                {payment.released}
                    <input
                        type="checkbox"
                        value={payment.uid}
                        name="paymentId"
                        onChange={onChangeCheckBox}
                        id={payment.uid}
                        checked={releaseList.includes(payment.uid)}
                    />
                        <span className="checkSpan"></span>
                    </label>
            </td>}
            
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
        <ReleasePayment payment={payment} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
    </>
    )
}

export default Payment
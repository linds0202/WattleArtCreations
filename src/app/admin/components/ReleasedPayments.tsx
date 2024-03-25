import { useState, useEffect } from "react"
import { getReleasedPayments } from "@/app/firebase/firestore"
import { PaymentType } from "./ArtistPayments"
import Payment from "./Payment"
import SearchPayments from "./SearchPayments"

export const ReleasedPayments = () => {
    const [releasedPayments, setReleasedPayments] = useState<Array<PaymentType>>([])
    const [filteredPayments, setFilteredPayments] = useState<Array<PaymentType>>([])

    useEffect(() => {

        const getReleasedPaymentList = async () => {
          const unsubscribe = await getReleasedPayments(setReleasedPayments, setFilteredPayments)
        
          return () => unsubscribe()
        } 
    
        getReleasedPaymentList()
    }, [])

    const handleClearPortraits = () => {
        setFilteredPayments(releasedPayments)
    }
    
    return (
        <div>
            <div className="w-3/4 mx-auto mt-8 flex justify-center items-start">
                <SearchPayments setFilteredPayments={setFilteredPayments} allPayments={releasedPayments}/>
                <button 
                    className='w-1/5 ml-8 p-2 border-2 border-black rounded-lg hover:bg-[#282828] hover:text-white'
                    onClick={handleClearPortraits} 
                >
                    Clear Filter
                </button>
            </div>

            <div className='w-full mt-10 flex flex-col items-center'>
                {releasedPayments.length === 0 ? 
                    <p className="text-xl font-bold">No past payments</p>
                : 
                <table>
                    <thead>
                        <tr>
                            <th>Payment Id</th>
                            <th>Customer Release Date</th>
                            <th>Artist Id</th>
                            <th>Portrait Id</th>
                            <th className="w-2/12">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments?.map(payment => (
                            <Payment key={payment.uid} payment={payment} releaseList={[]} setReleaseList={setReleasedPayments} paymentType="paid"/>
                        )) }
                    </tbody>
                </table>}
            </div>   
        </div>
    )
}

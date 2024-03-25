import { useState, useEffect } from "react"
import { getPendingPayments, getUserById, updatePayment, updateUserData } from "@/app/firebase/firestore"
import { PaymentType } from "./ArtistPayments"
import Payment from "./Payment"
import { useAuth } from "@/app/firebase/auth"
import { Timestamp } from "firebase/firestore"
import SearchPayments from "./SearchPayments"


export const PendingPayments = () => {
    const { authUser } = useAuth()
    const [pendingPayments, setPendingPayments] = useState<Array<PaymentType>>([])
    const [filteredPayments, setFilteredPayments] = useState<Array<PaymentType>>([])
    const [releaseList, setReleaseList] = useState<Array<string>>([])

    useEffect(() => {

        const getPendingPaymentList = async () => {
          const unsubscribe = await getPendingPayments(setPendingPayments, setFilteredPayments);
        
          return () => unsubscribe()
        } 
    
        getPendingPaymentList()
    }, [])

    const handleRelease = () => {
        // Update artist after release
        const handleUpdateArtist = async (payment: PaymentType) => {
            
            if (releaseList.includes(payment.uid)) {
                //get the artist
                let updatedUser = await getUserById(payment.artistId)
                
                if (updatedUser) {
                    //remove payment ID from artist's payments owing
                    const newPaymentsOwing = updatedUser.paymentsOwing.filter((item: string) => !releaseList.includes(item))
                    
                    //cretae new payout
                    const newPayout = {
                        ...payment,
                        adminId: authUser.uid,
                        paidOn: Timestamp.fromDate(new Date()),
                        released: true
                    }
                    
                    //add new amount to lifetime, minus from pending, remove released payments from owning and create payout record
                    const newArtistData = {
                        ...updatedUser,
                        lifeTimeEarnings: updatedUser.lifeTimeEarnings += payment.amount,
                        paymentsOwing: newPaymentsOwing,
                        payouts: [...updatedUser.payouts, newPayout],
                        pendingAmount: updatedUser.pendingAmount - payment.amount
                    }

                    await updateUserData(newArtistData)
                } 
            }
        }

        pendingPayments.forEach(payment => {
            handleUpdateArtist(payment)
        })

        //update each payment after release
        for (const payment of releaseList) {
            updatePayment(payment, authUser.uid)
        }

        setReleaseList([])
    }

    const handleClearPortraits = () => {
        setFilteredPayments(pendingPayments)
    }
    
    return (
        <div>
            <div className="w-3/4 mx-auto mt-8 flex justify-center items-start">
                <SearchPayments setFilteredPayments={setFilteredPayments} allPayments={pendingPayments}/>
                <button 
                    className='w-1/5 ml-8 p-2 border-2 border-black rounded-lg hover:bg-[#282828] hover:text-white'
                    onClick={handleClearPortraits} 
                >
                    Clear Filter
                </button>
            </div>

            <div 
                className="w-1/4 mx-auto text-lg my-8 py-2 px-4 border border-[#282828] rounded-xl text-center cursor-pointer hover:bg-[#43b4e4] hover:text-white"
                onClick={handleRelease}
            >
                <p>Release Payments</p>
            </div>

            <div className='w-full flex flex-col items-center'>
                {pendingPayments.length === 0 ? 
                    <p className="text-xl font-bold">No payments to release</p>
                : 
                <table>
                    <thead>
                        <tr> 
                            <th className="px-2 text-sm">Payment Id</th>
                            <th className="px-2 text-sm">Customer Release Date</th>
                            <th className="px-2 text-sm">Artist Id</th>
                            <th className="px-2 text-sm">Portrait Id</th>
                            <th className="px-2 text-sm">Artist Paid?</th>
                            <th className="px-2 text-sm">Details</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {filteredPayments?.map(payment => (
                            <Payment key={payment.uid} payment={payment} releaseList={releaseList} setReleaseList={setReleaseList} paymentType="pending"/>
                        )) }        
                    </tbody>
                </table>}
            </div>   

        </div>
              
        
    )
}

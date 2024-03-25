import { useEffect, useState } from "react"
import { Formik, Form, Field } from 'formik';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { getPortrait, getUserById, updatePayment, updateUserData } from "@/app/firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@/app/firebase/auth";
import { PaymentType } from "./ArtistPayments";
import { PortraitData } from "@/app/portraits/components/PortraitCustomizer";

interface PaymentDetailsProps {
    payment: PaymentType,
    openDetails: boolean,
    setOpenDetails: Function
}



const ReleasePayment = ({payment, openDetails, setOpenDetails}: PaymentDetailsProps) => {
    const { authUser } = useAuth()
    const [artistDetails, setArtistDetails] = useState<UserData>()
    const [portraitDetails, setPortraitDetails] = useState<PortraitData>()

    useEffect(() => {
        const handleGetArtist = async () => {
            const artist = await getUserById(payment.artistId)

            if (artist) setArtistDetails(artist)
        }

        const handleGetPortrait = async () => {
            const portrait = await getPortrait(payment.portraitId)

            if (portrait) setPortraitDetails(portrait)
        }

        handleGetArtist()
        handleGetPortrait()

        
    }, [])

    return (
        <Dialog 
            onClose={() => setOpenDetails(false)} 
            open={openDetails} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenDetails(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <div className="flex justify-center items-center">
                <img className="mr-8 w-[10%] justify-self-center" src="./images/drips/side_splashL.png" alt='black paint drips' />
                <p className='text-xl text-center font-bold mt-0'>Info Associated with this Payment</p>
                <img className="ml-8 w-[10%] justify-self-center" src="./images/drips/side_splashR.png" alt='black paint drips'/>
            </div>

            <div className="mt-4 flex justify-between">
                <div className="w-1/2 bg-[#e9e9e9] rounded-xl p-4 flex flex-col">
                    <p className="text-center text-lg font-semibold">Artist Info</p>
                    <div className="w-full mt-2 flex justify-between">
                        <p>Display Name:</p>
                        <p className="w-[60%]">{artistDetails?.displayName}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Email:</p>
                        <p className="w-[60%]">{artistDetails?.email}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Country:</p>
                        <p className="w-[60%]">{artistDetails?.country}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Role:</p>
                        <p className="w-[60%]">{artistDetails?.roles}</p>
                    </div>
                </div>

                <div className="w-5/12 bg-[#e9e9e9] rounded-xl p-4 flex flex-col">
                    <p className="text-center text-lg font-semibold">Artist Commission Info</p>
                    <div className="w-full mt-2 flex justify-between">
                        <p>Active Commissions:</p>
                        <p className="pl-2">{artistDetails?.activeCommissions}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Available Commissions:</p>
                        <p className="pl-2">{artistDetails?.maxCommissions}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Total Completed Commissions:</p>
                        <p className="pl-2">{artistDetails?.totalCompletedCommissions}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Lifetime Earnings:</p>
                        <p className="pl-2">{artistDetails?.lifeTimeEarnings}</p>
                    </div>

                    <div className="w-full bg-[#f4ffa1] p-2 rounded-lg flex justify-between">
                        <p className="">Payments Owing:</p>
                        <p className="pl-2">$ {artistDetails?.pendingAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#e9e9e9] rounded-xl p-4 mt-8 flex flex-col">
                    <p className="text-center text-lg font-semibold">Portrait Info</p>
                    <div className="w-full mt-2 flex justify-between">
                        <p>Portrait Title:</p>
                        <p className="w-[60%]">{portraitDetails?.portraitTitle}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Completion Date:</p>
                        {portraitDetails && <p className="w-[60%]">{portraitDetails?.portraitCompletionDate !== null ? new Date(portraitDetails?.portraitCompletionDate.toDate()).toLocaleDateString("en-US") : "" }</p>}
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Customer Name</p>
                        <p className="w-[60%]">{portraitDetails?.customer}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Role:</p>
                        <p className="w-[60%]">{portraitDetails?.customerId}</p>
                    </div>

                    <div className="w-full mt-4 flex justify-between">
                        <p>Portrait Payment IDs:</p>
                        <div className="w-[60%]">{portraitDetails?.paymentIds.map((id, i) => {
                            if (id === payment.uid) {
                                return <p  key={i} className="font-semibold">{id} <span className="text-xs text-red-600">(currently selected payment)</span></p>
                            } else {
                                return <p key={i} >{id}</p>
                            }
                        })}</div>
                    </div>
                </div>

            {/* <Formik
                initialValues={{
                    checked: [],
                    stripePaymentId: ""
                }}
                onSubmit={async (values, { resetForm }) => {
                    
                    // Check for selected values
                    if (values.checked.length === 0) {
                        alert("No payments were selected for this payout")
                        return
                    }

                    console.log('values.checked: ', values.checked)

                    const indexes = values.checked.map(index => Number(index))
                    
                    const newPayouts = indexes.map(i => (
                        {
                            date: pendingPayments[i].date,
                            adminId: authUser.uid,
                            releaseDate: Timestamp.fromDate(new Date()),
                            portraitId: pendingPayments[i].portraitId,
                            amount: pendingPayments[i].amount,
                            artistId: pendingPayments[i].artistId,
                            paymentId: pendingPayments[i].uid
                        }
                    ))

                    console.log('newPayouts: ', newPayouts)
    
                    const newPayment = newPayouts.reduce((sum, payment) => sum += payment.amount, 0)

                    console.log('newPayment: ', newPayment)
                    
                    const newPaymentsOwing = pendingPayments.filter((payment, i) => !indexes.includes(i)).map(payment => payment.uid)
                    
                    // Update released for selected payments
                    const newlyReleasedPayments = pendingPayments.filter((payment, i) => indexes.includes(i))
                    let newPendingAmount = 0
                    for (const payment of newlyReleasedPayments) {
                        const updatedPayment = await updatePayment(payment.uid, authUser.uid)
                        newPendingAmount += payment.amount
                    }

                    console.log('new paymentsOwing: ', newPaymentsOwing)
                    const updatedUser = {
                        ...userDetails,
                        lifeTimeEarnings: Math.round((userDetails.lifeTimeEarnings + newPayment) * 100) / 100,
                        paymentsOwing: newPaymentsOwing,
                        pendingAmount: Math.round((userDetails.pendingAmount - newPendingAmount) *100) / 100,
                        payouts: [...userDetails.payouts, ...newPayouts]
                    }

                    console.log('updatedUser: ', updatedUser)

                    const newUpdatedUser = await updateUserData(updatedUser)
                    setUserDetails(updatedUser)

                    setOpenDetails(false)
                }}
                >
                {({ values }) => (
                <Form className="w-full mt-8 flex flex-col justify-between items-center">
                    <p className='text-lg text-center font-semibold'>Release Payment to Artist</p>
                    <div className="w-full text-left">
                        <p>Before clicking <span className="rounded-lg p-1 bg-[#04D939]">SAVE</span>, you must:</p>
                        <p className="ml-4 mt-2">- Select which payments are included in this payout</p>
                        <p className="ml-4">- Release the payment in the Stripe dashboard</p>
                        <p className="ml-4">- Copy the <span className="rounded-lg p-1 bg-[#f4ffa1]">Stripe Payment Id</span> and enter it below</p>
                    </div>
                    
                    <table className="w-full mt-4 bg-white">
                        <thead>
                            <tr>
                                <th>Released by customer on</th>
                                <th>Portrait Id</th>
                                <th>Amount</th>
                                <th>Release?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPayments && pendingPayments.filter(payment => !payment.released).length === 0 ? 
                                <tr className="text-center">
                                    <td>No payments are ready to be released for this artist</td>
                                </tr>
                            :  pendingPayments.map((payment, i) => {
                                return (
                                <tr key={i} className="text-center">
                                    <td className="py-2">{new Date(payment.date.toDate()).toLocaleDateString("en-US")}</td>
                                    <td className="py-2">{payment.portraitId}</td>
                                    <td className="py-2">$ {payment.amount.toFixed(2)}</td>
                                    <td className="py-2">
                                        <label className="w-1/4">
                                            <Field type="checkbox" name="checked" value={i.toString()} />
                                        </label>
                                    </td>
                                </tr>)
                                }) }
                            <tr className="text-center">
                                <td></td>
                                <td></td>
                                <td>Total: </td>
                                <td>$<span>{values.checked.reduce((sum, selected) => {
                                        const index = Number(selected)
                                        return sum += pendingPayments[index].amount
                                    }, 0).toFixed(2)}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button 
                        type="submit" 
                        className={`text-black  border-2 border-[#282828] rounded-lg py-2 px-4 mt-4 ${values.checked.length === 0 || values.stripePaymentId === "" ? 'bg-[#282828]/50 cursor-default' : 'cursor-pointer hover:text-white hover:bg-[#282828]'}`}
                    >
                        Save
                    </button>
                </Form>
                )}
            </Formik> */}


            {/* <div className="mt-8 bg-[#e9e9e9] rounded-xl p-4">
                <p className="text-lg text-center font-semibold">Past Artist Payouts</p>
                <table className="w-full mt-4 bg-white">
                    <thead>
                        <tr>
                            <th>Paid On</th>
                            <th>Amount</th>
                            <th>Admin Id</th>
                            <th>Portrait Id</th>
                            <th>Released by Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {releasedPayments.length === 0 ? 
                            <tr className="text-center">
                                <td>No Payouts to display</td>
                            </tr>
                        :  releasedPayments.map((payout, i) => (
                        <tr key={i} className="h-[75px] text-center text-sm">
                            <td className="px-2">{new Date(payout.paidOn.toDate()).toLocaleDateString("en-US")}</td>
                            <td className="px-2">$ {payout.amount.toFixed(2)}</td>
                            <td className="px-2">{payout.adminId}</td>
                            <td className="px-2">{payout.portraitId}</td>
                            <td className="px-2">{new Date(payout.date.toDate()).toLocaleDateString("en-US")}</td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div> */}
        </Dialog>
    )
}

export default ReleasePayment


import { useState } from "react"
import { Formik, Form, Field } from 'formik';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { updateUserData } from "@/app/firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface UserDetailsProps {
    user: UserData,
    openDetails: boolean,
    setOpenDetails: Function
}

const ReleasePayment = ({user, openDetails, setOpenDetails}: UserDetailsProps) => {
    const [userDetails, setUserDetails] = useState(user)

    return (
        <Dialog 
            onClose={() => setOpenDetails(false)} 
            open={openDetails} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenDetails(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <div className="flex justify-center items-center">
                <img className="mr-8 w-[10%] justify-self-center" src="./images/drips/side_splashL.png" alt='black paint drips' />
                <p className='text-xl text-center font-bold mt-0'>Release Payments to Artist</p>
                <img className="ml-8 w-[10%] justify-self-center" src="./images/drips/side_splashR.png" alt='black paint drips'/>
            </div>

            <div className="mt-4 flex justify-between">
                <div className="w-1/2 bg-[#e9e9e9] rounded-xl p-4 flex flex-col">
                    <p className="text-center text-lg font-semibold">User Info</p>
                    <div className="w-full mt-2 flex justify-between">
                        <p>Display Name:</p>
                        <p className="w-[60%]">{userDetails.displayName}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Email:</p>
                        <p className="w-[60%]">{userDetails.email}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Country:</p>
                        <p className="w-[60%]">{userDetails.country}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Role:</p>
                        <p className="w-[60%]">{userDetails.roles}</p>
                    </div>
                </div>

                <div className="w-5/12 bg-[#e9e9e9] rounded-xl p-4 flex flex-col">
                    <p className="text-center text-lg font-semibold">Commission Info</p>
                    <div className="w-full mt-2 flex justify-between">
                        <p>Active Commissions:</p>
                        <p className="pl-2">{userDetails.activeCommissions}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Available Commissions:</p>
                        <p className="pl-2">{userDetails.maxCommissions}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Total Completed Commissions:</p>
                        <p className="pl-2">{userDetails.totalCompletedCommissions}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p>Lifetime Earnings:</p>
                        <p className="pl-2">{userDetails.lifeTimeEarnings}</p>
                    </div>

                    <div className="w-full bg-[#f4ffa1] p-2 rounded-lg flex justify-between">
                        <p className="">Payments Owing:</p>
                        <p className="pl-2">$ {userDetails.paymentsOwing.reduce((sum, payment) => sum += payment.released ? 0 : payment.amount, 0)}</p>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={{
                    checked: [],
                    stripePaymentId: ""
                }}
                onSubmit={async (values, { resetForm }) => {
                    // Check for stripe Payment Id & selected values
                    if (values.stripePaymentId === "") {
                        alert("Enter a Stripe Payment Id for this payout")
                        return
                    }
                    if (values.checked.length === 0) {
                        alert("No payments were selected for this payout")
                        return
                    }

                    const indexes = values.checked.map(index => Number(index))
                    
                    const newPayouts = indexes.map(i => (
                        {
                            date: userDetails.paymentsOwing[i].date,
                            adminId: userDetails.uid,
                            releaseDate: Timestamp.fromDate(new Date()),
                            stripePaymentId: values.stripePaymentId,
                            portraitId: userDetails.paymentsOwing[i].portraitId,
                            amount: userDetails.paymentsOwing[i].amount
                        }
                    ))
    
                    const newPayment = newPayouts.reduce((sum, payment) => sum += payment.amount, 0)
                    
                    const newPaymentsOwing = user.paymentsOwing.map((payment, i) => (
                        {
                            ...payment,
                            released: indexes.includes(i) ? true : userDetails.paymentsOwing[i].released
                        }
                    ))

                    const updatedUser = {
                        ...userDetails,
                        lifeTimeEarnings: userDetails.lifeTimeEarnings += newPayment,
                        paymentsOwing: newPaymentsOwing,
                        payouts: [...userDetails.payouts, ...newPayouts]
                    }

                    const newUpdatedUser = await updateUserData(updatedUser)
                    setUserDetails(updatedUser)
                    setOpenDetails(false)
                }}
                >
                {({ values }) => (
                <Form className="w-full mt-8 flex flex-col justify-between items-center">
                    <p className='text-lg text-center font-semibold'>Update Info</p>
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
                            {user.paymentsOwing.filter(payment => !payment.released).length === 0 ? 
                                <tr className="text-center">
                                    <td>No payments are ready to be released for this artist</td>
                                </tr>
                            :  user.paymentsOwing.map((payment, i) => {
                                if (!payment.released) return (
                                <tr key={i} className="text-center">
                                    <td className="py-2">{new Date(payment.date.toDate()).toLocaleDateString("en-US")}</td>
                                    <td className="py-2">{payment.portraitId}</td>
                                    <td className="py-2">{payment.amount.toFixed(2)}</td>
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
                                        return sum += user.paymentsOwing[index].amount
                                    }, 0).toFixed(2)}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='w-10/12 mt-4 flex items-center'>
                        <label className='text-base text-gray-light leading-3 mr-2'>
                            Stripe Payment ID:
                        </label>
                        <Field 
                            name="stripePaymentId"
                            className="w-3/4 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`text-black  border-2 border-[#282828] rounded-lg py-2 px-4 mt-4 ${values.checked.length === 0 || values.stripePaymentId === "" ? 'bg-[#282828]/50 cursor-default' : 'cursor-pointer hover:text-white hover:bg-[#282828]'}`}
                    >
                        Save
                    </button>
                </Form>
                )}
            </Formik>
        </Dialog>
    )
}

export default ReleasePayment


import { useState } from "react"
import { Formik, Form, Field } from 'formik';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { updateUserData } from "@/app/firebase/firestore";

interface UserDetailsProps {
    user: UserData,
    openDetails: boolean,
    setOpenDetails: Function
}

interface EditUserForm {
    country: string,
    maxCommissions: number
}

const UserDetails = ({user, openDetails, setOpenDetails}: UserDetailsProps) => {
    const [userDetails, setUserDetails] = useState(user)

    const initialValues: EditUserForm = {
        country: userDetails.country,
        maxCommissions: userDetails.maxCommissions
    }

    const handleSubmit = (values: EditUserForm) => {
        setUserDetails({...userDetails, country: values.country, maxCommissions: values.maxCommissions}) 
        updateUserData({...userDetails, country: values.country, maxCommissions: values.maxCommissions})
        setOpenDetails(false)
    }

    return (
        <Dialog 
            onClose={() => setOpenDetails(false)} 
            open={openDetails} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenDetails(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            {/* <IconButton onClick={() => setOpenDetails(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton> */}
            <div className="flex justify-center items-center">
                <img className="mr-8 w-[10%] justify-self-center" src="./images/drips/side_splashL.png" alt='black paint drips' />
                <p className='text-xl text-center font-bold mt-0'>Edit {userDetails.roles}</p>
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

                    {userDetails.roles === 'Artist' && 
                    <div className="w-full flex justify-between">
                        <p>Payments Owing:</p>
                        <p className="pl-2">$ {userDetails.paymentsOwing.reduce((sum, payment) => sum += payment.released ? 0 : payment.amount, 0)}</p>
                    </div>}
                </div>
            </div>


            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                >
                {({ values }) => (
                <Form className="w-full mt-8 flex flex-col justify-between items-center">
                    <p className='text-lg text-center font-semibold'>Update Info</p>
                    <div className="w-full mt-4 flex justify-between items-center">
                        <div className='w-1/2 flex items-center'>
                            <label className='text-base text-gray-light leading-3 mr-2'>
                                Country:
                            </label>
                            <Field 
                                name="country" 
                                className="w-full text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>

                        <div className='5/12 flex items-center'>
                            <label className='text-base text-gray-light leading-3 mr-2'>
                                Max Commissions:
                            </label>
                            <Field 
                                name="maxCommissions" 
                                type="number"
                                min="0"
                                className="w-1/3 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                                disabled={userDetails.roles === 'Customer'}
                            />
                        </div>
                    </div>

                    <button type="submit" className='text-black hover:text-white border-2 border-[#282828] hover:bg-[#282828] rounded-lg py-2 px-4 mt-4'>
                        Update User
                    </button>
                </Form>
                )}
            </Formik>

            {user.roles === 'Artist' &&
            <div className="mt-8 bg-[#e9e9e9] rounded-xl p-4">
                <p className="text-lg text-center font-semibold">Artist Payouts</p>
                <table className="w-full mt-4 bg-white">
                    <thead>
                        <tr>
                            <th>Paid On</th>
                            <th>Amount</th>
                            <th>Admin Id</th>
                            <th>Stripe Payment Id</th>
                            <th>Portrait Id</th>
                            <th>Released by Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.payouts.length === 0 ? 
                            <tr className="text-center">
                                <td>No Payouts to display</td>
                            </tr>
                        :  user.payouts?.map((payout, i) => (
                        <tr key={i} className="h-[75px] text-center">
                            <td className="px-2">{new Date(payout.releaseDate.toDate()).toLocaleDateString("en-US")}</td>
                            <td className="px-2">$ {payout.amount.toFixed(2)}</td>
                            <td className="px-2">{payout.adminId}</td>
                            <td className="px-2">{payout.stripePaymentId}</td>
                            <td className="px-2">{payout.portraitId}</td>
                            <td className="px-2">{new Date(payout.date.toDate()).toLocaleDateString("en-US")}</td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            
            }
        </Dialog>
    )
}

export default UserDetails


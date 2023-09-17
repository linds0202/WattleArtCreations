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
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenDetails(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <div className="flex justify-center items-center">
                <img className="mr-8 w-[10%] justify-self-center" src="./images/drips/side_splashL.png" alt='black paint drips' />
                <p className='text-xl text-center font-bold mt-0'>Edit Artist</p>
                <img className="ml-8 w-[10%] justify-self-center" src="./images/drips/side_splashR.png" alt='black paint drips'/>
            </div>


            <table>
                <thead>
                <tr>
                    <th>Display Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th>Active Commissions</th>
                    <th>Available Commissions</th>
                    <th>Total Completed Commissions</th>
                    <th>Lifetime Earnings</th>
                    <th>Payments Owing</th>
                </tr>
                </thead>
                <tbody>
                    <tr className="h-[75px] w-full">
                        <td className="pl-2">{userDetails.displayName}</td>
                        <td className="pl-2">{userDetails.email}</td>
                        <td className="pl-2">{userDetails.country}</td>
                        <td className="pl-2">{userDetails.roles}</td>
                        <td className="pl-2">{userDetails.activeCommissions}</td>
                        <td className="pl-2">{userDetails.maxCommissions}</td>
                        <td className="pl-2">{userDetails.totalCompletedCommissions}</td>
                        <td className="pl-2">{userDetails.lifeTimeEarnings}</td>
                        <td className="pl-2">{userDetails.paymentsOwing}</td>
                    </tr>
                </tbody>
            </table>
            

            <div className="w-full p-4">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    >
                    {({ values }) => (
                    <Form className="w-full flex flex-col justify-between items-center">
                        <div className='w-full flex items-center'>
                            <label className='text-base text-gray-light leading-3 mr-2'>
                                Country:
                            </label>
                            <Field 
                                name="country" 
                                className="w-10/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>

                        <div className='w-full flex items-center'>
                            <label className='text-base text-gray-light leading-3 mr-2'>
                                Max Commissions:
                            </label>
                            <Field 
                                name="maxCommissions" 
                                type="number"
                                min="0"
                                className="w-10/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>
                        
                        <button type="submit" className='text-black hover:text-white border-2 border-[#282828] hover:bg-[#282828] rounded-lg py-2 px-4 mt-4'>
                            Update User
                        </button>
                    </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    )
}

export default UserDetails


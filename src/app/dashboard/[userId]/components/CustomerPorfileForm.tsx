import { Formik, Form, Field} from 'formik';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import UpdateInfoButton from '@/app/artistDashboard/[userId]/portfolio/components/UpdateInfoButton';
import CancelUpdateButton from '@/app/artistDashboard/[userId]/portfolio/components/CancelUpdate';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { updateUserData } from '@/app/firebase/firestore';

interface CustomerFormValues {
    displayName: String,
    country: string
}

interface customerFormProps {
    setUserData: Function,
    userData: UserData | null,
    setIsEdit: Function,
}
// className='absolute top-2 right-2 text-white'

const CustomerProfileForm = ({ setUserData, userData, setIsEdit }: customerFormProps) => {

    const initialValues: CustomerFormValues = userData ? { displayName: userData.displayName, country: userData.country} : 
        {displayName: "", country: ""}

    return (
        <div className='w-8/12 mx-auto my-10 bg-white border-2 border-black rounded-xl relative'>
            <p className='text-center text-3xl font-bold mt-4'>Customer Details</p>
            <div style={{position: 'absolute', top: 2, right: 2, zIndex: 1000, color: 'white'}}>
                <IconButton onClick={() => setIsEdit(false)} >
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    
                    updateUserData({...userData, ...values})

                    helpers.setSubmitting(false)

                    setUserData({...userData, ...values})
                    
                    helpers.resetForm()
                    setIsEdit(false)
                }}
            >
                <Form className='flex flex-col px-20 py-8'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='w-6/12'>
                        <label className='text-base text-gray-light leading-3 font-semibold text-[#0075FF]'>
                            Name:
                        </label>
                        <Field 
                            name="displayName" 
                            className="w-9/12 ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        />
                        </div>
                        <div className='w-6/12'>
                        <label className='text-base text-gray-light leading-3 font-semibold text-[#0075FF]'>
                            Country:
                        </label>
                        <Field 
                            name="country" 
                            className="w-9/12 ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        />
                        </div>    
                    </div>
                    
                    <div className='w-6/12 mx-auto flex justify-around items-center mt-4'>
                        <CancelUpdateButton setIsEdit={setIsEdit} />
                        <UpdateInfoButton editLink={true} />
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}

export default CustomerProfileForm
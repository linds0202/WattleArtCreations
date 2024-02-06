import { useState } from 'react';
import { Formik, Form, Field} from 'formik';
import { UserData } from '../page';
import { updateUserData } from '@/app/firebase/firestore';
import Dialog from '@mui/material/Dialog';
import UpdateInfoButton from './UpdateInfoButton';
import CancelUpdateButton from './CancelUpdate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import AddLinks from './AddLinks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ArtistFormValues {
    artistName: string,
    bio: string,
    links: string[],
    website: string,
    country: string
}

interface artistFormProps {
    setUserData: Function,
    userData: UserData,
    isEdit: boolean,
    setIsEdit: Function,
    links: string[] | [],
    setLinks: Function
}


const ArtistForm = ({ setUserData, userData, isEdit, setIsEdit, links, setLinks }: artistFormProps) => {

    const [openLinksMod, setOpenLinksMod] = useState(false);
    const [editLink, setEditLink] = useState(false)

    const initialValues: ArtistFormValues = {
        artistName: userData.artistName,
        bio: userData.bio,
        links: userData.links,
        website: userData.website,
        country: userData.country
    }

    const handleAddLink = () => {
        setOpenLinksMod(true)
    }

    const handleDeleteLink = (i: number) => {
        let updatedlinks: Array<string> = links?.filter((link) => link !== links[i])
        setLinks(updatedlinks)
        setEditLink(true)
    }

    

    return (
        <Dialog 
            onClose={() => setIsEdit(false)} 
            open={isEdit} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { maxHeight: '90vh', p: 4, backgroundColor: "white"} }}
        >
            <p className='text-center text-3xl font-bold mt-4'>Artist Details</p>


            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setIsEdit(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            

            <Formik
                initialValues={initialValues}
                onSubmit={async (values, helpers) => {
                    helpers.setSubmitting(true)
                    const updatedUser = await updateUserData({...userData, ...values, links: links.length !== 0 ? links : []})
                    
                    helpers.setSubmitting(false)
                    setUserData({...userData, ...values})
                    
                    helpers.resetForm()
                    setEditLink(false)
                    setIsEdit(false)
                }}
            >
                <Form className='w-full h-auto flex flex-col md:px-20 py-8'>
                    <div className='w-full flex flex-col md:flex-row justify-between items-center border border-red-600'>
                        <div className='w-full md:w-6/12 border border-blue-600'>
                            <label className='text-base md:text-sm lg:text-base text-gray-light leading-3 font-semibold text-[#43b4e4]'>
                                Name:
                            </label>
                            <Field 
                                name="artistName" 
                                className="w-full md:w-8/12 lg:w-9/12 md:ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                            </div>
                        <div className='w-full md:w-6/12'>
                            <label className='text-base md:text-sm lg:text-base text-gray-light leading-3 font-semibold text-[#43b4e4]'>
                                Country:
                            </label>
                            <Field 
                                name="country" 
                                className="w-full md:w-8/12 lg:w-9/12 md:ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='w-full mt-4'>
                        <label className='text-base text-gray-light leading-3 mr-2'>
                            <span className='font-semibold text-[#43b4e4]'>Bio: </span>What do you want customers to know about you/your experience? 
                        </label>
                        <Field 
                            required
                            as="textarea"
                            rows="5"
                            cols="60" 
                            name="bio"
                            className="w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg p-4"
                        />
                    </div>
                    
                    <div className='w-full flex flex-col justify-center items-center'>
                        <div className='w-full flex justify-around lg:justify-center items-center mt-4'>
                            <Button onClick={handleAddLink} className='w-1/3 md:w-2/12 ml-2 md:ml-0 flex flex-col items-center'>
                                <AddCircleOutlineIcon sx={{ fontSize: 40 }}/>
                                <h4 className='text-sm md:text-base m-0'>Add Link</h4>
                            </Button>
                            <p className='w-2/3 lg:w-5/12'>Add/Edit links to your Social media profiles.</p>
                        </div>
                        <div className='w-full flex flex-wrap justify-start items-center'>  
                            {links?.length === 0 
                                ? <p className='w-full text-center text-red-600 font-semibold'>No Links Uploaded</p>
                                : links?.map((name, i) => (
                                <div key={i} className='w-[30%] flex justify-between items-center border-2 border-black rounded-md m-2 p-2'>
                                    <p className='w-10/12 h-[25px] overflow-hidden text-sm'>{name}</p>
                                    <button type="button" onClick={() => handleDeleteLink(i)} className='ml-2'>
                                        <DeleteForeverIcon />
                                    </button>
                                </div>        
                            ))}

                            <AddLinks links={links} openLinksMod={openLinksMod} setOpenLinksMod={setOpenLinksMod} setLinks={setLinks} setEditLink={setEditLink} />
                        </div>
                        <div className='mt-4 w-full'>
                            <label className='text-base text-gray-light leading-3 mr-2 font-semibold text-[#43b4e4]'>
                                Portfolio website:
                            </label>
                            <Field 
                                name="website" 
                                className="w-full lg:w-9/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='w-full md:w-6/12 mx-auto flex justify-around items-center mt-4'>
                        <CancelUpdateButton setIsEdit={setIsEdit} />
                        <UpdateInfoButton editLink={editLink} />
                    </div>
                    
                </Form>
            </Formik>
        </Dialog>
    )
}

export default ArtistForm

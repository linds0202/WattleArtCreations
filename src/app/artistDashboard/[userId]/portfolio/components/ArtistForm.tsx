import { useState } from 'react';
import { Formik, Form, Field} from 'formik';
import { UserData } from '../page';
import { updateArtist } from '@/app/firebase/firestore';
import UpdateInfoButton from './UpdateInfoButton';
import CancelUpdateButton from './CancelUpdate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import AddLinks from './AddLinks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    setIsEdit: Function,
    links: string[],
    setLinks: Function
}


const ArtistForm = ({ setUserData, userData, setIsEdit, links, setLinks }: artistFormProps) => {

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

    const handleDeleteLink = (i) => {
        let updatedlinks: Array<string> = links.filter((link) => link !== links[i])
        setLinks(updatedlinks)
        setEditLink(true)
    }

    return (
        <div>
            <p>Artist Details</p>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    updateArtist({...userData, ...values, links: links})

                    helpers.setSubmitting(false)
                    setUserData({...userData, ...values})
                    
                    helpers.resetForm(values)
                    setEditLink(false)
                    setIsEdit(false)
                }}
            >
                <Form className='flex flex-col p-4'>
                    <label className='text-base text-gray-light leading-3 mr-2 mb-4'>
                        Name: {userData?.artistName}
                    </label>
                    <Field 
                        name="artistName" 
                        className="w-8/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                    />
                    <label className='text-base text-gray-light leading-3 mr-2'>
                        Country:
                    </label>
                    <Field 
                        name="country" 
                        className="w-8/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                    />
                    <label className='text-sm leading-3'>
                        Bio: What do you want customers to know about you/your experience? 
                    </label>
                    <Field 
                        required
                        as="textarea"
                        rows="3"
                        cols="60" 
                        name="bio"
                        className="w-full text-black mt-2 border-2 border-[#282828]"
                    />
                    <div>
                        <p>Enter links to your Social media profiles</p>
                        <div className='w-8/12 flex flex-wrap justify-start items-center'>  
                            <p>Current links</p>
                            {links?.length === 0 
                                ? <p>No Links Uploaded</p>
                                : links?.map((name, i) => (
                                <div key={i} className='w-5/12 flex justify-between items-center border-2 border-black rounded-md m-2 p-2'>
                                    <p className='w-10/12 h-[25px] overflow-hidden'>{name}</p>
                                    <button type="button" onClick={() => handleDeleteLink(i)} className='ml-2'>
                                        <DeleteForeverIcon />
                                    </button>
                                </div>        
                            ))}

                            <AddLinks openLinksMod={openLinksMod} setOpenLinksMod={setOpenLinksMod} setLinks={setLinks} setEditLink={setEditLink} />

                            <Button onClick={handleAddLink} className='flex flex-col items-center mt-10 mb-10'>
                                <AddCircleOutlineIcon sx={{ fontSize: 80 }}/>
                                <h4 className='m-0'>Edit Links</h4>
                            </Button>
                        </div>
    
                        <label className='text-base text-gray-light leading-3 mr-2'>
                            Portfolio website:
                        </label>
                        <Field 
                            name="website" 
                            className="w-8/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        />
                    </div>
                    <div className='w-6/12 mx-auto flex justify-around items-center'>
                        <UpdateInfoButton editLink={editLink} />
                        <CancelUpdateButton setIsEdit={setIsEdit} />
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}

export default ArtistForm


{/* <div className='w-full mt-4 flex justify-around items center'>
    <Button variant="outlined" component="label" color="secondary" className='self-start mt-2'>
        Upload Image
        <input type="file" hidden onInput={(event) => {setFileData(event.target)}} />
    </Button>
    
    <div className='w-8/12 flex flex-wrap justify-start items-center'>  
        {fileNames.length === 0 
            ? <p>No File Selected</p>
            : fileNames?.map((name, i) => (
            <div key={i} className='w-5/12 flex justify-between items-center border-2 border-black rounded-md m-2 p-2'>
                <p className='w-10/12 h-[25px] overflow-hidden'>{name}</p>
                <button type="button" onClick={() => handleDeleteImg(i)} className='ml-2'>
                    <DeleteForeverIcon />
                </button>
            </div>        
        ))}
    </div>
    
    
</div> */}
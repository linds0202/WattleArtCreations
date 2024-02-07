import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useAuth } from '@/app/firebase/auth';
import { replaceImage, uploadImage } from '../../../firebase/storage';
import { addAvatar, updateAvatar } from '@/app/firebase/firestore';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface FormState {
    fileName: string,
    file: File | null,
    imageBucket: string,
    imageUrl: string, 
}

const DEFAULT_FILE_NAME: string = "No file selected";

// Default form state for the dialog
const DEFAULT_FORM_STATE: FormState = {
  fileName: DEFAULT_FILE_NAME,
  file: null,
  imageBucket: "",
  imageUrl: "",
};

export default function AvatarUploader(props: any) {
    
    const isEdit = Object.keys(props.edit).length > 0;
    const { authUser } = useAuth();
    const [formFields, setFormFields] = useState(isEdit ? {...DEFAULT_FORM_STATE, imageBucket: props.edit.avatarBucket} : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // If the avatar to edit or whether to close or open the dialog ever changes, reset the form fields
    useEffect(() => {
        if (props.showDialog) {
            setFormFields(isEdit ? {...DEFAULT_FORM_STATE, imageBucket: props.edit.avatarBucket} : DEFAULT_FORM_STATE);
        }
    }, [props.edit, props.showDialog, isEdit])

    // Check whether any of the form fields are unedited
    const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME


    // Set the relevant fields for image
    const setFileData = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.files){
            const file: File = event?.currentTarget?.files[0];
            setFormFields(prevState => ({...prevState, fileName: file.name, file: file}));
            //setFormFields(prevState => ({...prevState, file}));
        }
        
    }

    const closeDialog = () => {
        setIsSubmitting(false);
        // props.onCloseDialog();
        props.setOpenUpload(false)
    }

    // Store Avatar information to Storage and Firestore
    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            if (isEdit) {
                // Check whether image was changed - fileName will be not null
                if (formFields.fileName) {
                    // Store image into Storage
                    await replaceImage(formFields.file, formFields.imageBucket);
                }
                await updateAvatar( authUser.uid, formFields.imageBucket); //const url = 
                props.setChangeAvatar((prev: boolean) => !prev)
            } else {
                // Adding avatar
                // Store image into Storage
                const bucket = await uploadImage(formFields.file, authUser.uid);

                // Store data into Firestore
                const url = await addAvatar(authUser.uid, bucket);
            
                props.setUserData((prev: UserData) => ({...prev, avatar: url,
                    avatarBucket: bucket
                }))
            } 
        }catch (error) {
            console.log(error)
          }


        // Clear all form data
        closeDialog();
    };

    return (
    <div className='w-11/12 md:w-8/12 mx-auto my-10 p-8 bg-white border-2 border-black rounded-xl relative'>
        
        <div style={{position: 'absolute', top: 2, right: 2, zIndex: 1000, color: 'white'}}>
            <IconButton onClick={() => props.setOpenUpload(false)} >
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
        </div>

        <div className='flex flex-col md:flex-row justify-center items-center'>
            <Button 
                variant="outlined" 
                component="label" 
                className='text-black border-2 rounded-xl border-[#282828] hover:text-[#0075FF]'
            >
                Upload Avatar
                <input type="file" hidden onInput={(event) => {setFileData(event)}} className='text-lg' />
            </Button>
            <p className='text-xl mt-4 md:mt-0 md:ml-8'>{formFields.fileName}</p>
        </div>

        <div className='w-full flex justify-end'>
            {isSubmitting ? 
            <Button variant="contained" disabled={true} className='w-1/3 mt-4'>
                Submitting...
            </Button> :
            <Button 
                variant="contained" 
                onClick={handleSubmit} 
                disabled={isDisabled()}
                className='text-[#0075FF] hover:text-white w-1/3 mt-4'
            >
                Submit
            </Button>}
        </div>
    </div>
    )
}


import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '@/app/firebase/auth';
import { replaceImage, uploadImage } from '../../../firebase/storage';
import { addAvatar, updateAvatar } from '@/app/firebase/firestore';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const DEFAULT_FILE_NAME = "No file selected";

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
  fileName: DEFAULT_FILE_NAME,
  file: null,
  imageBucket: "",
  imageUrl: "",
};

export default function AvatarUploader(props) {
    
    const isEdit = Object.keys(props.edit).length > 0;
    const { authUser } = useAuth();
    const [formFields, setFormFields] = useState(isEdit ? {...DEFAULT_FORM_STATE, imageBucket: props.edit.avatarBucket} : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);


    

    // If the receipt to edit or whether to close or open the dialog ever changes, reset the form fields
    useEffect(() => {
        if (props.showDialog) {
            setFormFields(isEdit ? {...DEFAULT_FORM_STATE, imageBucket: props.edit.avatarBucket} : DEFAULT_FORM_STATE);
        }
    }, [props.edit, props.showDialog])

    // Check whether any of the form fields are unedited
    const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME


    // Set the relevant fields for receipt image
    const setFileData = (target) => {
        const file = target.files[0];
        setFormFields(prevState => ({...prevState, fileName: file.name}));
        setFormFields(prevState => ({...prevState, file}));
    }

    const closeDialog = () => {
        setIsSubmitting(false);
        props.onCloseDialog();
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
                props.setChangeAvatar(prev => !prev)
            } else {
                // Adding avatar
                // Store image into Storage
                const bucket = await uploadImage(formFields.file, authUser.uid);

                // Store data into Firestore
                const url = await addAvatar(authUser.uid, bucket);
            
                props.setUserData((prev):UserData => ({...prev, avatar: url,
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
        <Dialog 
            onClose={closeDialog}
            open={props.showDialog}
            fullWidth={true}
            maxWidth='sm'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => props.onCloseDialog(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>

            <Typography variant="h4" className='text-center text-[#0075FF] text-semibold'>
                {isEdit ? "Edit" : "Add"} Avatar
            </Typography>
            <DialogContent >
                <div className='flex justify-center items-center'>
                <Button 
                    variant="outlined" 
                    component="label" 
                    className='text-black border-2 rounded-xl border-[#282828] hover:text-[#0075FF]'
                >
                    Upload Avatar
                    <input type="file" hidden onInput={(event) => {setFileData(event.target)}} className='text-lg' />
                </Button>
                <p className='text-xl ml-8'>{formFields.fileName}</p>
                </div>
            </DialogContent>
            <DialogActions>
                {isSubmitting ? 
                <Button variant="contained" disabled={true}>
                    Submitting...
                </Button> :
                <Button 
                    variant="contained" 
                    onClick={handleSubmit} 
                    disabled={isDisabled()}
                    className='text-[#0075FF] hover:text-white'
                >
                    Submit
                </Button>}
            </DialogActions>
        </Dialog>
    )
}

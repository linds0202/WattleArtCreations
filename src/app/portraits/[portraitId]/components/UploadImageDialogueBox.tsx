import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog } from '@mui/material';
import { useAuth } from '../../../firebase/auth';
import { uploadImage } from '../../../firebase/storage';
import { updatePortraitWithImage, getPortrait } from '@/app/firebase/firestore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const DEFAULT_FILE_NAME = "No file selected";

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
  fileName: DEFAULT_FILE_NAME,
  file: null,
};


export default function UploadImg(props) {
    const authUser = useAuth()

    const isEdit = false    //Object.keys(props.edit).length > 0;
    const [formFields, setFormFields] = useState(isEdit ? props.edit : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If the receipt to edit or whether to close or open the dialog ever changes, reset the form fields
    useEffect(() => {
        if (props.showDialog) {
            setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
        }
    }, [props.edit, props.showDialog])

    // Check whether any of the form fields are unedited
    const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME


    // Set the relevant fields for receipt image
    const setFileData = (target) => {
        if (target.files.length !== 0) {
            const file = target.files[0];
            setFormFields(prevState => ({...prevState, fileName: file.name}));
            setFormFields(prevState => ({...prevState, file}));
        }
    }

    const closeDialog = () => {
        setIsSubmitting(false);
        props.onCloseDialog();
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const bucket = await uploadImage(formFields.file, props.portrait.uid)
            
            const portraitWithImages = await updatePortraitWithImage(props.portrait.uid, {userId: props.userId, imageBucket: bucket})
                    
            const updatedPortrait = await getPortrait(props.portrait.uid)
            props.setPortrait(updatedPortrait)
        } catch (error) {
            console.log(error)
        }

        // Clear all form data
        closeDialog();
    };

    return (
        <Dialog
            onClose={() => closeDialog()}
            open={props.showDialog}
            fullWidth={true}
            maxWidth='sm'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => closeDialog()} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <div className="flex justify-center items-center mb-4">
                <img className="mr-4 w-[25%] justify-self-center" src="../../drips/side_splashL.png" />
                <h4 className='text-3xl font-bold text-center'>Add Image</h4>
                <img className="ml-4 w-[25%] justify-self-center" src="../../drips/side_splashR.png" />
            </div>
            
            
            <div className='my-4 flex items-center'>
                {(isEdit && !formFields.fileName) && <Avatar alt="portrait image" src={formFields.imageUrl} sx={{ marginRight: '1em' }}/> }
                
                <Button 
                    variant="outlined"
                    component="label" 
                    className='text-xl text-black px-4 py-2 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF]'
                >
                    Upload Image
                    <input type="file" hidden onInput={(event) => {setFileData(event.target)}} />
                </Button>

                <p className='ml-4'>{formFields.fileName}</p>
            </div>
            <div className='mt-8 flex justify-center items-center'>
                {isSubmitting ? 
                <button type='button' disabled={true} className='text-xl text-[#e8e8e8] px-4 py-2 border-2 border-[##e8e8e8] rounded-xl' >
                    Submitting...
                </button> :
                <button 
                    type='button'
                    disabled={isDisabled()} 
                    onClick={handleSubmit}
                    className='text-xl px-4 py-2 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF] cursor-pointer'    
                >
                    Submit
                </button>}
            </div>
        </Dialog>
    )
}
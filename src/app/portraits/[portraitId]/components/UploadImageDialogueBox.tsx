import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../../../firebase/auth';
import { uploadImage } from '../../../firebase/storage';
import { updatePortraitWithImage, getPortrait } from '@/app/firebase/firestore';


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

            console.log('bucket in upload is: ', bucket)
            
            const portraitWithImages = await updatePortraitWithImage(props.portrait.uid, {userId: props.userId, imageBucket: bucket})
            //console.log('updated portrait: ', {...props.portrait, images: [...props.portrait?.images, {userId: props.userId, imageBucket: bucket}], revised: true, artistSubmitted: [...props.portrait.artistSubmitted, new Date] })
            
            const updatedPortrait = await getPortrait(props.portrait.uid)
            console.log('updatedPortratit is: ', updatedPortrait)
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
            component="form">
            <Typography variant="h4" >
                {isEdit ? "EDIT" : "ADD"} Image
            </Typography>
            <DialogContent >
                <Stack direction="row" spacing={2} >
                {(isEdit && !formFields.fileName) && <Avatar alt="portrait image" src={formFields.imageUrl} sx={{ marginRight: '1em' }}/> }
                <Button variant="outlined" component="label" color="secondary">
                    Upload Image
                    <input type="file" hidden onInput={(event) => {setFileData(event.target)}} />
                </Button>
                <Typography>{formFields.fileName}</Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                {isSubmitting ? 
                <Button color="secondary" variant="contained" disabled={true}>
                    Submitting...
                </Button> :
                <Button color="secondary" variant="contained" disabled={isDisabled()} onClick={handleSubmit}>
                    Submit
                </Button>}
            </DialogActions>
        </Dialog>
    )
}
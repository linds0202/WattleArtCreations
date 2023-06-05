import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../../../firebase/auth';
import { uploadImage } from '../../../firebase/storage';
import { updatePortraitWithImage } from '@/app/firebase/firestore';


const DEFAULT_FILE_NAME = "No file selected";

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
  fileName: DEFAULT_FILE_NAME,
  file: null,
};

/* 
 Dialog to input receipt information
 
 props:
  - edit is the receipt to edit
  - showDialog boolean for whether to show this dialog
  - onError emits to notify error occurred
  - onSuccess emits to notify successfully saving receipt
  - onCloseDialog emits to close dialog
 */
export default function UploadImage(props) {
    const authUser = useAuth()

    console.log('userId: ', props.userId)

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
        const file = target.files[0];
        setFormFields(prevState => ({...prevState, fileName: file.name}));
        setFormFields(prevState => ({...prevState, file}));
    }

    const closeDialog = () => {
        setIsSubmitting(false);
        props.onCloseDialog();
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const bucket = await uploadImage(formFields.file, props.portraitId)
            await updatePortraitWithImage(props.portraitId, {userId: props.userId, imageBucket: bucket})
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
                {(isEdit && !formFields.fileName) && <Avatar alt="receipt image" src={formFields.imageUrl} sx={{ marginRight: '1em' }}/> }
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
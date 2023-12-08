import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useAuth } from '@/app/firebase/auth';
import { replaceImage, uploadArtistPortfolioImage } from '../../../../firebase/storage'
import { getImgUrl, updateUserData, updateArtistPortfolioImg } from '@/app/firebase/firestore';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
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

export default function ArtistImgUpload(props: any) {
    const isEdit = props.edit.length > 0;
    const { authUser } = useAuth();
    const [formFields, setFormFields] = useState(isEdit ? {...DEFAULT_FORM_STATE, imageBucket: props.edit} : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // If the avatar to edit or whether to close or open the dialog ever changes, reset the form fields
    useEffect(() => {
        if (props.showDialog) {
            setFormFields(isEdit ? {...DEFAULT_FORM_STATE, imageBucket: props.edit} : DEFAULT_FORM_STATE);
        }
    }, [props.edit, props.showDialog, isEdit])

    // Check whether any of the form fields are unedited
    const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME


    // Set the relevant fields for image
    const setFileData = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.files){
            const file: File = event?.currentTarget?.files[0];
            setFormFields(prevState => ({...prevState, fileName: file.name, file: file}));
        }
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
                
                const newUrl = await getImgUrl(formFields.imageBucket)
            
                const newUserData = await updateArtistPortfolioImg( props.userData, props.index, newUrl)
                props.setUserData(newUserData)
            } else {
                // Store image into Storage
                const bucket = await uploadArtistPortfolioImage(formFields.file, authUser.uid, props.index);
    
                // Store data into Firestore
                const url = await getImgUrl(bucket)

                let newArtistImgs

                if (props.index === 1) {
                    newArtistImgs = {
                        ...props.userData.artistImgs,
                        imgUrl1: url, 
                        imgBucket1: bucket
                    }
                } else if (props.index === 2) {
                    newArtistImgs = {
                        ...props.userData.artistImgs,
                        imgUrl2: url, 
                        imgBucket2: bucket
                    }
                } else if (props.index === 3) {
                    newArtistImgs = {
                        ...props.userData.artistImgs,
                        imgUrl3: url, 
                        imgBucket3: bucket
                    }
                } else if (props.index === 4) {
                    newArtistImgs = {
                        ...props.userData.artistImgs,
                        imgUrl4: url, 
                        imgBucket4: bucket
                    }
                } else if (props.index === 5) {
                    newArtistImgs = {
                        ...props.userData.artistImgs,
                        imgUrl5: url, 
                        imgBucket5: bucket
                    }
                } else {
                    newArtistImgs = {
                        ...props.userData.artistImgs,
                        imgUrl6: url, 
                        imgBucket6: bucket
                    }
                } 
               
                const newUserData = {
                    ...props.userData,
                    artistImgs: newArtistImgs
                }

                await updateUserData(newUserData)
                props.setUserData((prev: UserData) => ({ ...newUserData }))
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
            <button type='button' onClick={() => props.onCloseDialog(false)} className='!absolute top-2 right-8 text-white'>
                <CloseIcon className='text-black hover:text-red-600 absolute'/>
            </button>

            <div>
                
                <div className="flex justify-center items-center mb-4">
                    <p className='text-4xl text-center font-bold mt-0'>{isEdit ? "Edit" : "Add"} Img</p>
                </div>
        
                <DialogContent >
                    <p className='text-xl text-center font-semibold mb-8'>Image size: <span className='text-[#43b4e4]'>{props.imgSizeMsg}</span></p>
                    <div className='flex justify-center items-center'>
                        <Button 
                            variant="outlined" 
                            component="label" 
                            className='text-black border-2 rounded-xl border-[#282828] hover:text-[#43b4e4]'
                        >
                            Upload Img
                            <input type="file" hidden onInput={(event) => {setFileData(event)}} className='text-lg' />
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
                        className='text-[#43b4e4] hover:text-white'
                    >
                        Submit
                    </Button>}
                </DialogActions>
            </div>
        </Dialog>
    )
}


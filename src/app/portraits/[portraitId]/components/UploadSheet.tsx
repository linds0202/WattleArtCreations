import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useAuth } from '../../../firebase/auth';
import { uploadImage } from '../../../firebase/storage';
import { updatePortraitWithSheet, getPortrait } from '@/app/firebase/firestore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const DEFAULT_FILE_NAME = "No file selected";

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
  fileName: DEFAULT_FILE_NAME,
  file: null,
};


export default function UploadSheet(props: any) {
   
    const [formFields, setFormFields] = useState<{fileName: string, file: File | null}>(DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (props.showDialog) {
            setFormFields(DEFAULT_FORM_STATE); 
        }
    }, [props.showDialog]) 

    // Check whether any of the form fields are unedited
    const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME

    const setFileData = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.files){
            const file: File = event?.currentTarget?.files[0];
            if (file) setFormFields(prevState => ({...prevState, fileName: file.name, file: file}));
        }
        
    }

    const closeDialog = () => {
        setIsSubmitting(false);
        props.onCloseDialog();
    }

    const handleSubmit = async () => {
    
        setIsSubmitting(true)

        
        try {
            const bucket = await uploadImage(formFields.file, props.portrait.id)
            
            const portraitWithSheets = await updatePortraitWithSheet(props.portrait.id, {index: props.index, portrait: props.portrait, imageBucket: bucket})
                    
            const updatedPortrait = await getPortrait(props.portrait.id)
          
            props.setPortrait(updatedPortrait)
        } catch (error) {
            console.log(error)
        }


        // Clear all form data
        closeDialog()
    };

    return (
        <Dialog
            onClose={() => closeDialog()}
            open={props.showDialog}
            fullWidth={true}
            maxWidth='sm'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => closeDialog()} className='text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            
            <div className="flex justify-center items-center mb-4">
                <img className="mr-4 w-[25%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black paint accent splash' />
                <h4 className='text-3xl font-bold text-center'>Upload Sheet</h4>
                <img className="ml-4 w-[25%] justify-self-center" src="../../images/drips/side_splashR.png" alt='black paint accent splash'/>
            </div>
            
            {/* isEdit &&  */}
            <div className='my-4 flex justify-center xl:justify-start items-center'>
                  
                <Button 
                    variant="outlined"
                    component="label" 
                    className='xl:text-xl text-black px-4 py-2 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#43b4e4]'
                >
                    Upload Image
                    <input type="file" hidden onInput={(event) => {setFileData(event)}} />
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
                    className='text-xl px-4 py-2 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#43b4e4] cursor-pointer'    
                >
                    Submit
                </button>}
            </div>
        </Dialog>
    )
}
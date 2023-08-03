import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '@/app/firebase/auth';
import { replaceImage, uploadImage } from '../../../firebase/storage';
import { addAvatar, updateAvatar } from '@/app/firebase/firestore';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface EnlargedImageProps {
    openImage: boolean,
    setOpenImage: Function,
    src: string
}


const EnlargedImage = ({openImage, setOpenImage, src}: EnlargedImageProps ) => {
    
    
    return (
        <Dialog 
            onClose={() => setOpenImage(false)} 
            open={openImage} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { maxHeight: '100vh', p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenImage(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            <DialogContent
                style={{height:'80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                    <img src={src} className='max-h-[80%] w-auto'/>
            </DialogContent>
                    
                </Dialog>
    )
}

export default EnlargedImage
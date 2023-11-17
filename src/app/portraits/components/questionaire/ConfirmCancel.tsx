import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmCancelProps {
    cancelPortrait: boolean,
    setCancelPortrait: Function,
    setOpenWizard: Function
}

  
const ConfirmCancel = ({ cancelPortrait, setCancelPortrait, setOpenWizard }: ConfirmCancelProps) => {
    
    const handleCancel = () => {
        localStorage.setItem('charList', JSON.stringify([]))
        setOpenWizard(false)
    }

    return (

    <Dialog 
        onClose={() => setCancelPortrait(false)} 
        open={cancelPortrait} 
        fullWidth={true}
        maxWidth='md'
        PaperProps={{ sx: { p: 6, backgroundColor: "white", position: 'relative'} }}
        >
        <div className='absolute top-2 right-2 w-1/12 mb-4'>
            <IconButton onClick={() => setCancelPortrait(false)} className='text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
        </div>

        <div className="flex justify-center items-center mb-4">
            <img className="mr-4 w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black accent paint splash'/>
            <p className='text-4xl text-center font-bold mt-0'>Cancel Portrait?</p>
            <img className="ml-4 w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='cblack accent paint splash'/>
        </div>
        
        <div className='w-10/12 mx-auto flex flex-col justify-between items-center'>
            
            <p className='text-2xl text-[#4da0ff] font-semibold'>Are you sure? You will loose all progress.</p>
            <p>To save your progress, create at least one character and complete the required questions, then add your portrait to the cart. This will save your progress and make this portrait available on your dashboard</p>
            
        </div>
        
        <div className='mt-4 flex justify-around'>
            <button
                type='button'
                onClick={handleCancel}
                className={'w-1/3 ml-4 border-2 rounded-xl py-2 px-4 border-[#282828] hover:bg-[#282828] hover:text-white'}
            >
                Cancel Portrait
            </button>

            <button
                type='button'
                onClick={() => setCancelPortrait(false)}
                className='w-1/3 border-2 border-[#282828] rounded-xl py-2 px-4 hover:bg-[#4da0ff] hover:text-white'
            >
                Continue Customizing
            </button>
        </div>

    </Dialog>)
}

export default ConfirmCancel
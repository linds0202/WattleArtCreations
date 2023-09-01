import { Dialog, DialogContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface EnlargedImageProps {
    openImage: boolean,
    setOpenImage: Function,
    src: string,
    date: Date,
    final: boolean
}


const EnlargedImage = ({openImage, setOpenImage, src, date, final}: EnlargedImageProps ) => {
       
    const handleRightClick = (e) => {
        if (final) e.preventDefault()
    }

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
                style={{height:'80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
            >
                    <img onContextMenu={(e)=> handleRightClick(e)} src={src} className='max-h-[80%] w-auto'/>
                    {final && <div onContextMenu={(e)=> handleRightClick(e)} className='absolute top-0 left-0 bg-sky-500/10 h-[100%] w-[100%] border-2 border-[#282828]'></div>}
                    {final && <p className='mt-4'>Submitted: {new Date(date).toDateString() + ' at ' + new Date(date).toLocaleTimeString()}</p>}
            </DialogContent>
                    
                </Dialog>
    )
}

export default EnlargedImage
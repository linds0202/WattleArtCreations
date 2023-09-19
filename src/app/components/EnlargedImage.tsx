import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Timestamp } from 'firebase/firestore';

interface EnlargedImageProps {
    openImage: boolean,
    setOpenImage: Function,
    src: string,
    date: Timestamp,
    final: boolean
}


const EnlargedImage = ({openImage, setOpenImage, src, date, final}: EnlargedImageProps ) => {
       
    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (final) e.preventDefault()
    }

    const handleRightClickImg = (e: React.MouseEvent<HTMLImageElement>) => {
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
            <div className='w-full relative'>
                <IconButton onClick={() => setOpenImage(false)} className='absolute top-2 right-2 w-1/12 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
                
                <DialogContent
                    style={{height:'80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                >
                    <img onContextMenu={(e)=> handleRightClickImg(e)} src={src} className='max-h-[80%] w-auto' alt='enlarged final image'/>
                    {final && <div onContextMenu={(e)=> handleRightClick(e)} className='absolute top-0 left-0 bg-sky-500/10 h-[100%] w-[100%] border-2 border-[#282828]'></div>}
                    {final && <p className='mt-4'>Submitted: {new Date(date.toDate()).toLocaleDateString("en-US")}</p>}
                </DialogContent>
            </div>   
        </Dialog>
    )
}

export default EnlargedImage

// new Date(date).toDateString() + ' at ' + new Date(date).toLocaleTimeString()
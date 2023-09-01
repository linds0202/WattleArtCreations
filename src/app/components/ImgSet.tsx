import { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EnlargedImage from './EnlargedImage';


interface MyImgSet {
    imageUrls: Array<string>,
    fileNames: Array<string>,
    text: string
}

interface ImgSetProps {
    openImgSet: boolean,
    setOpenImgSet: Function,
    imgSet: Array<MyImgSet>
}


const ImgSet = ({openImgSet, setOpenImgSet, imgSet }: ImgSetProps ) => {
    const [openImage, setOpenImage] = useState(false)
    const [src, setSrc] = useState('')

    const handleEnlarge = (i: number) => {
        setSrc(imgSet.imageUrls[i])
        setOpenImage(true)
    }

    return (
        <Dialog 
            onClose={() => setOpenImgSet(false)} 
            open={openImgSet} 
            fullWidth={true}
            maxWidth='sm'
            PaperProps={{ sx: { maxHeight: '100vh', p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenImgSet(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            <DialogContent
                style={{height:'80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div className='w-full flex justify-center items-center'>
                    {imgSet.imageUrls.map((img, i) => <img 
                        className="w-[128px] h-[128px] object-contain m-8 cursor-pointer" 
                        key={i} 
                        src={img}
                        onClick={() => handleEnlarge(i)}
                    />)}
                </div>
                
                <p className='w-10/12 mx-auto border-2 border-[#E9E9E9] rounded-lg p-4 mt-8'>{imgSet.text}</p>

                
                {openImage &&
                  <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={src} final={false}/>
                }
            </DialogContent>
                    
        </Dialog>
    )
}

export default ImgSet
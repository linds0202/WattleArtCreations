import { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EnlargedImage from './EnlargedImage';
import { Timestamp } from 'firebase/firestore';


interface MyImgSet {
    imageUrls: Array<string>,
    fileNames: Array<string>,
    text: string
}

interface ImgSetProps {
    openImgSet: boolean,
    setOpenImgSet: Function,
    imgSet: MyImgSet
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
            maxWidth='lg'
            PaperProps={{ sx: { maxHeight: '80vh', p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenImgSet(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>

            <div className="flex justify-center items-center mb-4">
                <img className="mr-4 w-[15%] justify-self-center" src="../../drips/side_splashL.png" alt='black accent paint splash'/>
                <p className='text-4xl text-center font-bold mt-0'>Uploaded Image Set</p>
                <img className="ml-4 w-[15%] justify-self-center" src="../../drips/side_splashR.png" alt='black accent paint splash'/>
            </div>
            
            <DialogContent
                style={{height:'80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div className='w-full flex justify-center items-center'>
                    {imgSet.imageUrls.map((img, i) => <img 
                        alt='customer uploaded image thumbnail'
                        className="w-[128px] h-[128px] object-contain m-8 cursor-pointer" 
                        key={i} 
                        src={img}
                        onClick={() => handleEnlarge(i)}
                    />)}
                </div>
                
                <p className='w-10/12 mx-auto border-2 border-[#E9E9E9] rounded-lg p-4 mt-8'>{imgSet.text}</p>
                
                <button 
                    type='button' 
                    onClick={() => setOpenImgSet(false)}
                    className='w-1/3 mt-8 text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:bg-[#282828] hover:text-white'
                >
                    Close
                </button>
                
                {openImage &&
                  <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={src} final={false} date={Timestamp.now()}/>
                }
            </DialogContent>
                    
        </Dialog>
    )
}

export default ImgSet
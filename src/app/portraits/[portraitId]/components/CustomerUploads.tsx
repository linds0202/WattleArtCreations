import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Upload } from '../../components/PortraitCustomizer';

interface UploadImagesProps {
  uploads: Upload[],
  setUploads: Function,
  openUpload: boolean,
  setOpenUpload: Function,
}

const UploadImages = ({ uploads, setUploads, openUpload, setOpenUpload }: UploadImagesProps) => { 


  const [files, setFiles] = useState<Array<File>>([])
  const [text, setText] = useState('')  

  const handleFile = (event: React.FormEvent<HTMLInputElement>) => {
    const newFiles = (event.currentTarget as HTMLInputElement).files;
    if (!newFiles) {
      return;
    } else {
      setFiles([...files, newFiles[0]])
    }
    // if (event.target.files.length !== 0) {
    //     setFiles(prevState => [...prevState, event.target.files[0]])
    // }
  }

  
  const handleDeleteImg = (i: number) => {
  
    let updateImageFiles = files.filter((file, j) => j !== i)
  
    setFiles(updateImageFiles)
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSave = () => {

    const newUpload = {files: files, text: text}
    setUploads([...uploads, newUpload])

    setOpenUpload(false)
  }

  return (
    <Dialog 
      onClose={() => setOpenUpload(false)} 
      open={openUpload} 
      fullWidth={true}
      maxWidth='md'
      PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
    >
      <IconButton onClick={() => setOpenUpload(false)} className='absolute top-2 right-2 text-white'>
          <CloseIcon className='text-black hover:text-red-600'/>
      </IconButton>
      
      <div className='w-10/12 flex justify-between items-center'>
        <div className="flex justify-center items-center">
          <Button component="label" 
              variant="outlined"
              className='self-start mt-2 text-black hover:text-white border-2 border-[#282828] bg-white hover:bg-[#282828] hover:border-[#282828] rounded-xl'
          >
              Upload Image
              <input type="file" hidden onInput={(event) => {handleFile(event)}} />
          </Button>
        </div>
        
        <div className='w-8/12 flex flex-wrap justify-start items-center'>  
          {files.length === 0 
            ? <p>No Files Uploaded</p>
            : files?.map((file, i) => (
              <div key={i} className='w-5/12 flex justify-between items-center border-2 border-[#e5e5e5] rounded-lg m-2 p-2'>
                  <p className='w-10/12 h-[25px] overflow-hidden'>{file.name}</p>
                  <button type="button" onClick={() => handleDeleteImg(i)} className='ml-2'>
                      <DeleteForeverIcon />
                  </button>
              </div>        
            ))
          }
        </div>
      </div>
      
      <div className='w-10/12 '>
        <label className='text-sm leading-3'>
            Add info about your images
        </label>
  
        <textarea
            rows={3}
            cols={60} 
            value={ text || "" }
            name="text"
            onChange={ onChange } 
            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
        />
      </div>
      <div className='mt-4 flex'>
        <button
          type='button'
          onClick={() => setOpenUpload(false)}
          className='border-2 border-[#282828] rounded-xl py-2 px-4 hover:bg-red-600 hover:text-white'
        >
          Cancel
        </button>
        
        <button
          type='button'
          onClick={handleSave}
          className={`ml-4 border-2 rounded-xl py-2 px-4 ${files.length !== 0  ? 'border-[#282828] hover:bg-[#0075FF] hover:text-white' : 'border-[#bababa] text-[#bababa]'}`}
          disabled={ files.length === 0 }
        >
          Save
        </button>
      </div>
      
      
    </Dialog>
  )
}

export default UploadImages
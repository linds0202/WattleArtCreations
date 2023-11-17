import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Field } from 'formik';
import { Upload } from './PortraitCustomizer';

interface AddImagesProps {
  uploads: Upload[],
  setUploads: Function,
  openUpload: boolean,
  setOpenUpload: Function,
  editImgGroup: Upload | null,
  setEditImgGroup: Function,
  editImgIndex: number,
}

const AddImages = ({ uploads, setUploads, openUpload, setOpenUpload, editImgGroup, setEditImgGroup, editImgIndex }: AddImagesProps) => { 


  const [files, setFiles] = useState<Array<File>>(editImgGroup ? editImgGroup.files : [])
  const [text, setText] = useState(editImgGroup ? editImgGroup.text : '')  

  const handleFile = (event: React.FormEvent<HTMLInputElement>) => { 
    const newFiles = (event.currentTarget as HTMLInputElement).files;
    if (!newFiles) {
      return;
    } else {
      setFiles([...files, newFiles[0]])
    }

  }

  
  const handleDeleteImg = (i: number) => {
  
    let updateImageFiles = files.filter((file, j) => j !== i)
  
    setFiles(updateImageFiles)
  }

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setText(e.target.value)
  }

  const handleSave = () => {
    if (editImgGroup) {
      const newUpload: Upload = {files: files, text: text} //fileNames: fileNames,
      const uploadsCopy = [...uploads]
      uploadsCopy.splice(editImgIndex, 1, newUpload)
      
      setUploads(uploadsCopy)
    } else {
      const newUpload: Upload = {files: files, text: text} //fileNames: fileNames,
      setUploads([...uploads, newUpload])
    }
    
    setEditImgGroup(null)
    setOpenUpload(false)
  }

  return (
    <Dialog 
      onClose={() => setOpenUpload(false)} 
      open={openUpload} 
      fullWidth={true}
      maxWidth='md'
      PaperProps={{ sx: { p: 6, backgroundColor: "white", position: 'relative'} }}
    >
      <div className='absolute top-2 right-2 w-1/12 mb-4'>
        <IconButton onClick={() => setOpenUpload(false)} className='text-white'>
            <CloseIcon className='text-black hover:text-red-600'/>
        </IconButton>
      </div>

      <div className="flex justify-center items-center mb-4">
          <img className="mr-4 w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black accent paint splash'/>
          <p className='text-4xl text-center font-bold mt-0'>Image Upload</p>
          <img className="ml-4 w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='cblack accent paint splash'/>
      </div>
      
      <div className='w-10/12 flex justify-between items-center'>
        <div className="flex justify-center items-center">
          <Button component="label" 
              variant="outlined"
              className='self-start text-black hover:text-white border-2 border-[#282828] bg-white hover:bg-[#282828] hover:border-[#282828] rounded-xl'
          >
              Upload Image
              <input type="file" hidden onInput={(event) => handleFile(event)} />
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
      
      <div className='w-full mt-4 flex flex-col'>
        <label className='text-sm leading-3'>
            Add info about your images
        </label>
        <Field 
            as="textarea"
            rows="3"
            cols="60" 
            value={ text || "" }
            name="text"
            onChange={ onChange } 
            className="text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
        />
      </div>
      <div className='mt-4 flex'>
        <button
          type='button'
          onClick={() => setOpenUpload(false)}
          className='border-2 border-[#282828] rounded-xl py-2 px-4 hover:bg-[#282828] hover:text-white'
        >
          Cancel
        </button>
        
        <button
          type='button'
          onClick={handleSave}
          className={`ml-4 border-2 rounded-xl py-2 px-4 ${files.length !== 0  ? 'border-[#282828] hover:bg-[#4da0ff] hover:text-white' : 'border-[#bababa] text-[#bababa]'}`}
          disabled={ files.length === 0 }
        >
          Save
        </button>
      </div>
      
      
    </Dialog>
  )
}

export default AddImages
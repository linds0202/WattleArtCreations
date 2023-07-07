import { Formik, Form, Field } from 'formik';
import { Dialog } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface AddLinksProps {
    openLinksMod: boolean,
    setOpenLinksMod: Function,
    setLinks: Function,
    setEditLink: Function
}

interface AddLinkForm {
    link: string
}

const AddLinks = ({ openLinksMod, setOpenLinksMod, setLinks, setEditLink }: AddLinksProps) => {
    
    const initialValues = {
        link: ""
    }

    const handleSubmit = (values: AddLinkForm) => {
        if (values.link !== '') {
            setEditLink(true)
            setLinks(prev => [...prev, values.link])
        }
        setOpenLinksMod(false)
    }
    
    return (
        <div>
            <Dialog 
                onClose={() => setOpenLinksMod(false)} 
                open={openLinksMod} 
                fullWidth={true}
                maxWidth='md'
                PaperProps={{ sx: { p: 6, backgroundColor: "white" } }}
            >
                <IconButton onClick={() => setOpenLinksMod(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
                <p className='text-xl text-center font-bold mt-0'>Add a social media link</p>
                <div className="w-full">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        >
                        {({ values }) => (
                        <Form className="w-full flex flex-col justify-between items-center">
                            <label className='text-base text-gray-light leading-3 mr-2'>
                                Link:
                            </label>
                            <Field 
                                name="link" 
                                className="w-8/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                            
                            <button type="submit" className='text-black border-2 border-black rounded-lg py-2 px-4 mt-4'>
                                Add link
                            </button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </Dialog>
        </div>
    )
}

export default AddLinks
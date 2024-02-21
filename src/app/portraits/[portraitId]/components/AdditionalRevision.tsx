import { Formik, Form, Field } from 'formik'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useCategoriesContext } from '@/app/context/CategoriesContext'
import { PortraitData } from '../../components/PortraitCustomizer'
import { updatePortrait } from '@/app/firebase/firestore'

interface AdditionalRevisionProps {
    openAdditionalRevision: boolean,
    setOpenAdditionalRevision: Function,
    portrait: PortraitData,
    setPortrait: Function,
}

const AdditionalRevision = ({ openAdditionalRevision, setOpenAdditionalRevision, portrait, setPortrait }: AdditionalRevisionProps) => {
    const { categories } = useCategoriesContext()

    const [level, setLevel] = useState(portrait?.additionalRevisionInfo.type !== "" ? portrait?.additionalRevisionInfo.type : "Simple")

    const [initialRevisionValues, setInitialRevisionValues] = useState({
        additionalRevisionLevel: 'simple'
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(e.target.value)
    }

    const handleSelect = () => {

        let additionalRevision = {}
        switch(level) {
            case "Simple":
                additionalRevision = {
                    price: categories.customizer.pricing.additionalRevision[0],
                    type: level
                }
                // link = "https://buy.stripe.com/test_3cs14g82bbBX3nOcMM"
                break
            case "Intermediate":
                additionalRevision = {
                    price: categories.customizer.pricing.additionalRevision[1],
                    type: level
                }
                // link = "https://buy.stripe.com/test_00gaEQdmv6hD8I8cMO"
                break
            case "Complex":
                additionalRevision = {
                    price: categories.customizer.pricing.additionalRevision[2],
                    type: level
                }
                // link = "https://buy.stripe.com/test_7sI7sE96fcG10bC8wz"
                break
            default:
                break
        }

        // const updatedPortrait = {...portrait, revisionLevel: level, purchaseRevisionLink: link}
        const updatedPortrait = {...portrait, additionalRevisionInfo: additionalRevision }

        updatePortrait(portrait.id, updatedPortrait)
        
        setPortrait(updatedPortrait)

        setOpenAdditionalRevision(false)
    }

    const handleCancel = () => {
        setOpenAdditionalRevision(false)
    }

    
    return (
    <Dialog 
        onClose={() => setOpenAdditionalRevision(false)} 
        open={openAdditionalRevision} 
        fullWidth={true}
        maxWidth='md'
        PaperProps={{ sx: { px: 2, py: 4, backgroundColor: "white", minHeight: '60vh',
        maxHeight: '80vh', justifyContent: 'space-between', alignItems: 'center', position: 'relative'} }}
    >
        <IconButton onClick={() => setOpenAdditionalRevision(false)} className='absolute top-2 right-2 text-white'>
            <CloseIcon className='text-black hover:text-red-600'/>
        </IconButton>

        <Formik
            initialValues={initialRevisionValues}
            onSubmit={handleSelect}
        >
            {({ values }) => (
                <Form className="w-full flex flex-col justify-around items-center">
                    
                    <h2 className='text-2xl md:text-4xl font-bold'>Additional Revision Request</h2>
                    <div className='w-10/12 text-center'>
                        <p className='text-xl font-semibold mb-2'>Your customer has requested an additional revision beyond the included 2.</p>
                        <p>Please discuss via chat what this request will include. Once agreement has been reached. Select the level of revision below</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row my-4'>
                        <div className='flex'>
                            <input
                                type="radio" 
                                name="additionalRevisionLevel" 
                                value="Simple" 
                                id="simple" 
                                onChange={handleChange}
                                checked={level === "Simple"}
                            />
                            <label htmlFor="simple" className='ml-2 mr-8 text-xl' >${categories.customizer.pricing.additionalRevision[0]} - Simple</label>
                        </div>

                        <div className='flex'>
                            <input 
                                type="radio" 
                                name="additionalRevisionLevel" 
                                value="Intermediate" 
                                id="intermediate" 
                                onChange={handleChange}
                                checked={level === 'Intermediate'}
                            />
                            <label htmlFor="intermediate" className='ml-2 mr-8 text-xl' >${categories.customizer.pricing.additionalRevision[1]} - Intermediate</label>
                        </div>

                        <div className='flex'>
                            <input 
                                type="radio" 
                                name="additionalRevisionLevel" 
                                value="Complex" 
                                id="complex" 
                                onChange={handleChange}
                                checked={level === "Complex"}
                            />
                            <label htmlFor="complex" className='ml-2 text-xl' >${categories.customizer.pricing.additionalRevision[2]} - Complex</label>
                        </div>
                    </div>

                    <div className='w-full mx-auto mt-4 flex flex-col md:flex-row justify-around items-center'>
                        <button 
                            onClick={handleCancel} 
                            className='w-full md:w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'
                        >
                            Cancel
                        </button>
                        
                        <button 
                            type="submit" 
                            className='w-full md:w-5/12 order-first md:order-last text-xl mb-4 md:mb-0 text-[#282828] border-2 border-[#282828] hover:bg-[#43b4e4] hover:text-white rounded-xl py-2 px-2'
                        >
                            Create Payment Link
                        </button>
                    </div>   
                </Form>
            )}
        </Formik>
    </Dialog>
    )
}

export default AdditionalRevision
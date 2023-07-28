import { useEffect, useState } from 'react'
import { updatePortrait } from '@/app/firebase/firestore';
import { Formik, Form } from 'formik';
import { PortraitData } from '../../components/PortraitCustomizer'
import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StepTwo from '../../components/questionaire/StepTwo';
import RequiredQuestions from '../../components/questionaire/RequiredQuestions';

interface QuestionsProps {
    portrait: PortraitData,
    setPortrait: Function,
    openQuestions: boolean,
    setOpenQuestions: Function,
    canEditQs: boolean,
    role: string
}

const Questions = ({ portrait, setPortrait, openQuestions, setOpenQuestions, canEditQs, role }: QuestionsProps) => {
    
    const [charVariations, setCharVariations] = useState(false)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    useEffect(() => {
        portrait.characters.forEach((char) => {
            if (char.numCharVariations > 1) setCharVariations(true)

            if(char.pets) setPet(true)
        
            if(char.extras.includes('character')) setCharSheet(true)
        
            if(char.extras.includes('weapons')) setWeaponSheet(true)

        })
    }, [])

    const updateQuestions =(values: PortraitData) => {
        updatePortrait(values.uid, values)
        setPortrait(values)
        setOpenQuestions(false)
    }

    const handleClose = () => {
        setOpenQuestions(false)
    }

    console.log('canEditQs in questions: ', canEditQs)
    
    return (
        <Dialog 
            onClose={() => setOpenQuestions(false)} 
            open={openQuestions} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenQuestions(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            <Formik
                initialValues={portrait}
                onSubmit={updateQuestions}
            >
                {({ values }) => (
                    <Form className='w-full '>
                        <div className='flex flex-between'>
                            <div className='w-6/12 flex flex-col items-center'>
                                <RequiredQuestions />
                            </div>

                            <div className='w-6/12 px-8'>
                                <h3 className='text-xl font-bold'>Let us know more. . .</h3>
                                <p>Answering the <span className='font-semibold'>optional</span> questions below helps your artist understand your vision.</p>
                                <StepTwo 
                                    charVariations={charVariations}
                                    pet={pet}
                                    charSheet={charSheet}
                                    weaponSheet={weaponSheet} 
                                />
                            </div>                            
                        </div>

                        {canEditQs && role === 'Customer' &&
                            <button 
                                type="submit" 
                                className='w-3/12 rounded-lg p-2 text-center mt-4 text-black border-2 border-black'
                            >
                                Update Answers
                            </button>
                        }
                            <button 
                                type="button" 
                                onClick={handleClose}
                                className='w-3/12 rounded-lg p-2 text-center mt-4 text-black border-2 border-black'
                            >
                                {canEditQs ? "Don't save" : "Back to Portrait"}
                            </button>
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}

export default Questions
import { useEffect, useState } from 'react'
import { updatePortrait } from '@/app/firebase/firestore';
import { Formik, Form } from 'formik';
import { PortraitData } from '../../components/PortraitCustomizer'
import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StepTwo from '../../components/questionaire/StepTwo';
import RequiredQuestions from '../../components/questionaire/RequiredQuestions';
import CharList from '@/app/components/CharList';
import EnlargedImage from '@/app/components/EnlargedImage';
import DisplayedRequiredQuestions from '@/app/components/DisplayedRequiredQuestions';
import DisplayedOptionalQuestions from '@/app/components/DisplayedOptionalQuestions';
import { MyCharValues } from '../../components/questionaire/StepOne';

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
    const [openImage, setOpenImage] = useState(false)
    const [src, setSrc] = useState('')

    useEffect(() => {
        portrait.characters.forEach((char: MyCharValues) => {
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

    const handleEnlarge = (i) => {
        setSrc(portrait?.uploadedImageUrls[i])
        setOpenImage(true)
    }
    
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
            
            <h1 className='text-3xl font-bold mb-8'>Portrait Details</h1>

            
            <div className='flex justify-between items-center mb-4'>
                <p className='text-xl font-semibold'><span className='font-normal'>Title:</span> {portrait.portraitTitle} <span className='text-md text-[#9e9e9e] font-normal'>({portrait.mode})</span></p>

                <p className='text-md'>Purchase Date: <span className='font-semibold text-[#0075FF]'>{new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</span> </p>           
            
            </div>

            {/* display character details */}
            <CharList portrait={portrait} />

            {/* display images customer uploaded during creation */}
            <div className=' my-4'>
                <p className='text-black'>Images uploaded by customer: <span className='text-[#9e9e9e]'>(click image to enlarge)</span></p>

                <div className='w-full flex mt-4'>
                {portrait?.uploadedImageUrls.length === 0
                    ? <p className='text-lg text-red-600'>(No images uploaded)</p>
                    : portrait?.uploadedImageUrls.map((img, i) => 
                        <img 
                            className="w-[64px] h-[64px] object-contain mr-4 cursor-pointer" 
                            key={i} 
                            src={img}
                            onClick={() => handleEnlarge(i)}
                        />
                    )}
                </div>
            </div>

            {openImage &&
                <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={src}/>
            }

            <h2 className='text-2xl font-bold text-[#0075FF] border-t-2 border-[#E5E5E5] pt-4'>Customer Questions</h2>
            <p className='text-sm text-[#9e9e9e] text-center'>(You have 24 hours from purchase to update/revise your answers)</p>
            
            {canEditQs && role === 'Customer'
            ? <Formik
                initialValues={portrait}
                onSubmit={updateQuestions}
            >
                {({ values }) => (
                    <Form className='w-full '>
                        <div className='flex'>
                            <div className='w-6/12 flex flex-col items-center'>
                                <RequiredQuestions />
                            </div>

                            <div className='w-6/12 px-8'>
                                <h3 className='text-xl font-bold mt-4'>Let us know more. . .</h3>
                                <p>Answering the <span className='font-semibold'>optional</span> questions below helps your artist understand your vision.</p>
                                <StepTwo 
                                    charVariations={charVariations}
                                    pet={pet}
                                    charSheet={charSheet}
                                    weaponSheet={weaponSheet} 
                                />
                            </div>                            
                        </div>

                        <div className='w-8/12 mx-auto flex justify-between items-center'>

                            <button 
                                type="button" 
                                onClick={handleClose}
                                className='w-1/3 rounded-lg p-2 text-center mt-4 text-black border-2 border-black hover:text-white hover:bg-[#282828]'
                            >
                                Don't save
                            </button>

                            <button 
                                type="submit" 
                                className='w-1/3 rounded-lg p-2 text-center mt-4 text-black border-2 border-black hover:text-white hover:bg-[#2DD42B]'
                            >
                                Update Answers
                            </button>
                        </div>
                            
                    </Form>
                )}
            </Formik>
            :
            <div>
                <DisplayedRequiredQuestions portrait={portrait}/>
                <DisplayedOptionalQuestions 
                    portrait={portrait} 
                    charVariations={charVariations}
                    pet={pet}
                    charSheet={charSheet}
                    weaponSheet={weaponSheet} 
                />
                <div className='w-3/12 mx-auto'>
                    <button 
                        type="button" 
                        onClick={handleClose}
                        className='w-full mx-auto rounded-lg p-2 text-center mt-4 text-black border-2 border-black hover:text-white hover:bg-[#282828]'
                    >
                        {canEditQs && role === 'Customer' ? "Don't save" : "Back to Portrait"}
                    </button>
                </div>
                
            </div>
            } 
        </Dialog>
    )
}

export default Questions
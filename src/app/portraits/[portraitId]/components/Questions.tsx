import { useEffect, useState } from 'react'
import { updatePortrait } from '@/app/firebase/firestore';
import { Formik, Form } from 'formik';
import { PortraitData } from '../../components/PortraitCustomizer'
import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StepTwo from '../../components/questionaire/StepTwo';
import RequiredQuestions from '../../components/questionaire/RequiredQuestions';
import Accordion from '../../components/questionaire/Accordion';

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

    const requiredQuestions = (
        <div>
          <Accordion title="Character Basics" required={false} active={true}>
            <p className='text-sm'>
            Please provide a description of the character, including their name, age, gender, and any significant features. Additionally, please include their body type, hair color and style, eye color, and skin tone as is applicable.
            </p>
            <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.requiredQs[0]}</p>
          </Accordion>
          <Accordion title="Inspirations and References" required={false} active={true}>
            <p className='text-sm'>
            Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
            </p>
            <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.requiredQs[1]}</p>
          </Accordion>
        </div>
      )
  
      const optionalQuestions = (
        <div>
          {/* general character qs */}
          <Accordion title="Character Basics" required={false} active={true}>
            <div>
              <p className='text-sm'><span>Personality:</span> What is the character's personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q1}</p>
              <p className='text-sm'><span>Clothing and Accessories:</span> What kind of clothing and accessories does your character wear?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q2}</p>
              <p className='text-sm'><span>Pose and Expression:</span> Do you have a specific pose or expression in mind for the character?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q3}</p>
              <p className='text-sm'><span>Special Requests:</span> Are there any unique elements, features, or requests that you would like to include in your commission, which haven’t been covered in the previous questions?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q4}</p>
            </div> 
          </Accordion>
  
          {/* Character variation qs */}
          <Accordion title="Character Variations" required={false} active={charVariations}>
            <div>
                {charVariations ?
                <>
                    <p className='text-sm leading-3'>What variations would you like between each version (e.g., different outfits, expressions, poses, or color schemes)?</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[1].q1}</p>
                </>
                : <p className='text-sm font-semibold'>No Pets were added to this portrait.</p>
                }
            </div> 
          </Accordion>
  
          {/* Pet qs */}
          <Accordion title="Pet / Familiar:" required={false} active={pet}>
            <div>
                {pet ?
                <>
                    <p className='text-sm leading-3'>For your pet/familiar, please describe their appearance, including any unique features or accessories.</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[2].q1}</p>
                    <p className='text-sm leading-3'>How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character, perched on the character's shoulder, etc.)?</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[2].q2}</p>
                </>
                : <p className='text-sm font-semibold'>No Pet was added to this portrait.</p>
                }
            </div> 
          </Accordion>
  
          {/* Character Sheet qs */}
          <Accordion title="Character Sheet:" required={false} active={charSheet}>
            <div>
                {charSheet ?
                <>
                    <p className='text-sm leading-3'>Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[3].q1}</p>
                    <p className='text-sm leading-3'>Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[3].q2}</p>
                </>
                : <p className='text-sm font-semibold'>No Character sheet was added to this portrait</p>
                }
            </div> 
          </Accordion>
  
          {/* Weapon Sheet qs */}
          <Accordion title="Character Sheet:" required={false} active={weaponSheet}>
            <div>
                {weaponSheet ?
                <>
                    <p className='text-sm leading-3'>Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[4].q1}</p>
                    <p className='text-sm leading-3'>If you have any reference images or inspiration for the weapon design, please provide them.</p>
                    <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[4].q2}</p>
                </>
                : <p className='text-sm font-semibold'>No Weapon Sheet was added to this portrait.</p>
                }
            </div> 
          </Accordion>
        </div>
    )
      

    const updateQuestions =(values: PortraitData) => {
        updatePortrait(values.uid, values)
        setPortrait(values)
        setOpenQuestions(false)
    }

    const handleClose = () => {
        setOpenQuestions(false)
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
            <h2>Customer Questions</h2>
            
            {canEditQs && role === 'Customer'
            ? <Formik
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

                        <button 
                            type="submit" 
                            className='w-3/12 rounded-lg p-2 text-center mt-4 text-black border-2 border-black'
                        >
                            Update Answers
                        </button>

                        <button 
                            type="button" 
                            onClick={handleClose}
                            className='w-3/12 rounded-lg p-2 text-center mt-4 text-black border-2 border-black'
                        >
                            Don't save
                        </button>
                            
                    </Form>
                )}
            </Formik>
            :
            <div>
                {requiredQuestions}
                {optionalQuestions}
                <button 
                    type="button" 
                    onClick={handleClose}
                    className='w-3/12 rounded-lg p-2 text-center mt-4 text-black border-2 border-black'
                >
                    {canEditQs && role === 'Customer' ? "Don't save" : "Back to Portrait"}
                </button>
            </div>
            }
            
        </Dialog>
    )
}

export default Questions
import { Field } from 'formik';
import Accordion from './Accordion';
import { useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { useAuth } from '@/app/firebase/auth';
import { useRouter } from 'next/navigation';

// Configure FirebaseUI., 
const uiConfig = {
    signInFlow: 'popup', 
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

interface MyQuestionProps { 
    selection: string | null,
    charVariations: Boolean,
    pet: Boolean,
    charSheet: Boolean, 
    weaponSheet: Boolean,
}

const StepTwo = ({ selection, charVariations, pet, charSheet, weaponSheet } : MyQuestionProps) => {
    
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [stepLogin, setStepLogin] = useState(false);
    
    useEffect(() => {
        if (selection !== 'NSFW') {
            !authUser ? setStepLogin(true) : setStepLogin(false)
        }
        
    }, [authUser])

    const handleRedirect = () => {
        setStepLogin(false)
        router.push('/')
    }

    const handleClose = (event: object, reason: string) => {
        if (reason && reason == "backdropClick") {
            return
        }
    }
    
    return (
        <>
            {/* Prompt for login */}
            <Dialog onClose={handleClose} open={stepLogin}>
                <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[300px]  rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4 py-4'>
                    <h3 className='text-2xl font-bold pb-0'>Please Login to Continue</h3>
                    <p className='pb-4'>In order to fully customize your portrait, please Login or Create an Account</p>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                    <Button 
                        onClick={handleRedirect}
                        className='pt-4'
                    >
                        <div className='text-white border-2 border-white px-4 py-2 rounded-lg flex flex-col'>
                            <p className='text-md' >Return to Homepage</p>
                            <p className='text-xs text-[#DCDCDC]'>(You will lose any progress on your customization)</p>
                        </div>
                            
                    </Button>
                    
                </div>
            </Dialog>        
            {/* Character Qs */}
            <Accordion title="Character" required={false} active={true}>
                <label className='text-sm leading-3'>
                    Personality: What is the character’s personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60" 
                    name="questions[0].q1" 
                    className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                />
                <label className='text-sm leading-3'>
                    Clothing and Accessories: What kind of clothing and accessories does your character wear?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60" 
                    name="questions[0].q2"
                    className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                    />
                <label className='text-sm leading-3'>
                    Pose and Expression: Do you have a specific pose or expression in mind for the character?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60" 
                    name="questions[0].q3"
                    className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                />
            
                <label className='text-sm leading-3'>
                    Special Requests: Are there any unique elements, features, or requests that you would like to include in your commission, which haven’t been covered in the previous questions?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60"
                    name="questions[0].q4"
                    className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                />
            </Accordion>


            {/* General Qs */}
            <Accordion title="Multiple Versions of Character" required={false} active={charVariations}>
            { charVariations ? 
                <>
                    <label className='text-sm leading-3'>
                        What variations would you like between each version (e.g., different outfits, expressions, poses, or color schemes)?
                    </label>
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[1].q1"
                        className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4" 
                    />
                </>
                : <p className='text-sm font-semibold'>No extra characters variations have been added to this portrait</p>}
            </Accordion>

            {/* Pets Qs */}
            <Accordion title="Pets" required={false} active={pet}>
                {pet ? 
                    <>
                        <label className='text-sm leading-3'>
                            For your pet/familiar, please describe their appearance, including any unique features or accessories.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[2].q1" 
                            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"  
                        />
                        <label className='text-sm leading-3'>
                            How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character, perched on the character&#39;s shoulder, etc.)?
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[2].q2"
                            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"  
                        />
                    </> 
                    : <p className='text-sm font-semibold'>No pets have been added to this portrait</p>}
            </Accordion>
            
            {/* Character Sheets Qs */}
            <Accordion title="Character Sheet" required={false} active={charSheet}>
                {charSheet ? 
                    <>
                        <label className='text-sm leading-3'>
                            Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[3].q1"  
                            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4" 
                        />
                        <label className='text-sm leading-3'>
                            Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[3].q2"   
                            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                        />
                    </>
                    : <p className='text-sm font-semibold'>No Character Sheets have been added to this portrait</p>}
            </Accordion>

            {/* Weapons Sheet Qs */}
            <Accordion title="Weapons Sheet" required={false} active={weaponSheet}>
                {weaponSheet ? 
                    <>
                        <label className='text-sm leading-3'>
                            Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[4].q1"
                            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"  
                        />
                        <label className='text-sm leading-3'>
                            If you have any reference images or inspiration for the weapon design, please provide them.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[4].q2" 
                            className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"  
                        />
                    </> 
                    : <p className='text-sm font-semibold'>No Weapon Sheets have been added to this portrait</p>}
            </Accordion>
        </>
    )
}


export default StepTwo
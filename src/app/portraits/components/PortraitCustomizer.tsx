import { useAuth } from '@/app/firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { addPortrait } from "@/app/firebase/firestore"
import { useState, useEffect } from "react"

import { Formik, Form} from 'formik';

import StepOne from "./questionaire/StepOne"
import StepTwo from "./questionaire/StepTwo"

export interface PortraitData  {
    mode: String, 
    characters: [],
    questions: [{}, {}, {}, {}, {}], 
    price: Number,
    customer: String,
    customerId: '',
    artist: String,
    date: Date,
    status: String,
    lastUpdatedStatus: Date,
    paymentComplete: Boolean,
}

interface PortraitProps {
    editPortrait: PortraitData,
    setEditPortrait: Function,
    editIndex: Number,
    portraits: PortraitData[],
    setPortraits: Function,
    setOpenWizard: Function,
    option: String
}

// Configure FirebaseUI., 
const uiConfig = {
    signInFlow: 'popup', 
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
  };

const PortraitCustomizer = ({ editPortrait, setEditPortrait, editIndex, portraits, setPortraits, setOpenWizard, option }: PortraitProps) => {
    const { authUser, isLoading } = useAuth();
    const [login, setLogin] = useState(false);

    const [portraitData, setPortraitData] = useState<PortraitData>(editPortrait ? editPortrait : {
        mode: option, 
        characters: [],
        questions: [{}, {}, {}, {}, {}],
        price: 0,
        customer: '',
        customerId: '',
        artist: '',
        date: new Date(),
        status: '',
        lastUpdatedStatus: new Date(),
        paymentComplete: false,
    })

    const [chars, setChars] = useState(portraitData.characters)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)
    const [customizing, setCustomizing] = useState(false)


    const submitPortrait = async (portraitFormData: PortraitData) => {

        const newPortrait = {...portraitFormData, characters: chars}
        
        if (editPortrait) {
            let editedPortraitsData = portraits.map((portrait, i) => {
                if (editIndex === i) {
                    return newPortrait
                } else {
                    return portrait
                }
            })
            setPortraits(editedPortraitsData)
        } else {
            setPortraits(prev => ([ ...prev,  newPortrait]))
        }
        setEditPortrait(null)
        setOpenWizard(false)
    }    

    console.log('portraitData (in portrait customizer): ', portraitData)

    return (
        <div className="w-11/12 mx-auto">

            <StepOne 
                option={option} 
                portraitData={portraitData} 
                setPortraitData={setPortraitData}
                chars={chars}
                setChars={setChars} 
                setPet={setPet}
                setCharSheet={setCharSheet}
                setWeaponSheet={setWeaponSheet} 
                setCustomizing={setCustomizing}
            />
        
            {authUser && portraitData.characters.length !== 0 && !customizing && 
                <Formik
                    initialValues={portraitData}
                    onSubmit={submitPortrait}
                >
                {({ values }) => (
                    <Form className='w-full '>
                        <div>
                            <h3>Let us know more. . .</h3>
                            <StepTwo 
                                pet={pet}
                                charSheet={charSheet}
                                weaponSheet={weaponSheet} 
                            />
                        </div>
                        <div className='mt-8 w-full flex justify-around items-center'>
                            <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                                Finish Portrait
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>}

            { ( portraitData.characters.length !== 0 && !customizing && !authUser) && 
                <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[300px] h-[400px] rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4'>
                    <h3 className='text-2xl font-bold'>Please login to continue</h3>
                    <p>In order to fully customize your portrait, please create an account</p>
                    <Button variant="contained" color="secondary"
                        onClick={() => setLogin(true)}>
                        Login / Register
                    </Button>
                </div>
            }

            {/* Prompt for login */}
            <Dialog onClose={() => setLogin(false)} open={login}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </Dialog>
        </div>
    )
}

export default PortraitCustomizer
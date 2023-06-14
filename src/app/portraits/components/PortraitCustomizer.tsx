import { addPortrait } from "@/app/firebase/firestore"
import { useEffect, useState } from "react"

import { delay, motion } from 'framer-motion'
import { Formik, Form, Field } from 'formik';

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
    option: Object
}


const PortraitCustomizer = ({ editPortrait, setEditPortrait, editIndex, portraits, setPortraits, setOpenWizard, option }: PortraitProps) => {
    
    const [portraitData, setPortraitData] = useState<PortraitData>(editPortrait ? editPortrait : {
        mode: option.title, 
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

    return (
        <div className="w-11/12 mx-auto">
        <Formik
                initialValues={portraitData}
                onSubmit={submitPortrait}
            >
            {({ values }) => (
                <Form className='w-full '>
       
                    <StepOne 
                        option={option} 
                        portraitData={portraitData} 
                        setPortraitData={setPortraitData}
                        chars={chars}
                        setChars={setChars} 
                        setPet={setPet}
                        setCharSheet={setCharSheet}
                        setWeaponSheet={setWeaponSheet} 
                    />
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
        </Formik>
        </div>
    )
}

export default PortraitCustomizer
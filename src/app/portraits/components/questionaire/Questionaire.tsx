import { addPortrait } from "@/app/firebase/firestore"
import { useState, useRef } from "react"

import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import { PortraitData } from "../PortraitCustomizer"

// export interface PortraitData  {
//     mode: String, 
//     characters: [],
//     questions: [{}, {}, {}, {}, {}], 
//     price: Number,
//     customer: String,
//     artist: String,
//     date: Date,
//     status: String,
//     lastUpdatedStatus: Date,
//     paymentComplete: Boolean,
// }

interface QuestionaireProps {
    option: 
}


const Questionaire = ({ option, setOpenWizard }) => {
    
    // editPortrait ? editPortrait :
    const [portraitData, setPortraitData] = useState<PortraitData>( {
        mode: option.title, 
        characters: [],
        questions: [{}, {}, {}, {}, {}],
        price: 0,
        customer: '',
        artist: '',
        date: new Date(),
        status: '',
        lastUpdatedStatus: new Date(),
        paymentComplete: false,
    })

    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    // const submitPortrait = async (portraitFormData: PortraitData) => {
    //     if (editPortrait) {
    //     let editedPortraitsData = portraits.map((portrait, i) => {
    //         if (editIndex === i) {
    //         return portraitFormData
    //         } else {
    //         return portrait
    //         }
    //     })
    //     setPortraits(editedPortraitsData)
    //     } else {
    //     setPortraits(prev => ([ ...prev,  portraitFormData]))
    //     }
    //     setOpenWizard(false)
    // }
    

    // console.log('portraitData: :', portraitData)

    const handleSubmit = (values) => {
        setPortraitData(prev => ({ ...prev, ...values }))
        setOpenWizard(false)
    }


    return (
        <div className="w-11/12 mx-auto">
            <StepOne 
                option={option} 
                portraitData={portraitData} 
                setPortraitData={setPortraitData} 
                setPet={setPet}
                setCharSheet={setCharSheet}
                setWeaponSheet={setWeaponSheet} 
            />
            <div>
                <h3>Let us know more. . .</h3>
                <StepTwo 
                    portraitData={portraitData} 
                    setPortraitData={setPortraitData}
                    pet={pet}
                    charSheet={charSheet}
                    weaponSheet={weaponSheet} 
                    setOpenWizard={setOpenWizard}
                />
            </div>
            {/* <div className='mt-8 w-full flex justify-around items-center'>
                <button type="submit" onClick={handleSubmit} className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                    Finish Portrait
                </button>
            </div> */}
 
        </div>
    )
}

export default Questionaire
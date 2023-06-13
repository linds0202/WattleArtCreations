import { addPortrait } from "@/app/firebase/firestore"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import StepFour from "./StepFour"

interface PortraitData {
    mode: String, 
    characters: [],
    questions: [], 
    price: Number,
    customer: String,
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
    styleOne: string
}

const containerVariants = {
    hidden: {
      opacity: 0,
      x: "100vw"
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
      }
    },
    exit: {
        opacity: 1,
        x: "-100vw",
        transition: {duration: 0.5}
    }
}


const Questionaire = ({ option }) => {
    // editPortrait ? editPortrait :
    const [currentStep, setCurrentStep] = useState(0)
    const [portraitData, setPortraitData] = useState( {
        mode: option.title, 
        characters: [],
        questions: [{}, {}, {}, {}, {}],
        price: '',
        customer: '',
        artist: '',
        date: new Date(),
        status: '',
        lastUpdatedStatus: new Date(),
        paymentComplete: Boolean,
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

    const handleNextStep = (newData, final = false) => {
        setPortraitData(prev => ({ ...prev, ...newData }))

        // if (final) {
        // submitPortrait(newData)
        // if (editPortrait) setEditPortrait(null)
        // return
        // }

        if (currentStep > 3) {
        if (currentStep === 4) {
            pet ? setCurrentStep(prev => prev + 1) : charSheet ? setCurrentStep(prev => prev + 2) : weaponSheet ? setCurrentStep(prev => prev + 3) : setCurrentStep(prev => prev + 4)
        } 
        if (currentStep === 5) {
            charSheet ? setCurrentStep(prev => prev + 1) : weaponSheet ? setCurrentStep(prev => prev + 2) : setCurrentStep(prev => prev + 3)
        }
        if (currentStep === 6) {
            weaponSheet ? setCurrentStep(prev => prev + 1) : setCurrentStep(prev => prev + 2)
        }
        if (currentStep === 7) setCurrentStep(prev => prev + 1)
        } else {
        setCurrentStep(prev => prev + 1)
        }
    } 

    const handlePrevStep = (newData) => {
        setPortraitData(prev => ({ ...prev, ...newData }))

        if (currentStep > 4) {
        if (currentStep === 8) {
            weaponSheet ? setCurrentStep(prev => prev - 1) : charSheet ? setCurrentStep(prev => prev - 2) : pet ? setCurrentStep(prev => prev - 3) : setCurrentStep(prev => prev - 4)
        } 
        if (currentStep === 7) {
            charSheet ? setCurrentStep(prev => prev - 1) : pet ? setCurrentStep(prev => prev - 2) : setCurrentStep(prev => prev - 3)
        }
        if (currentStep === 6) {
            pet ? setCurrentStep(prev => prev - 1) : setCurrentStep(prev => prev - 2)
        }
        if (currentStep === 5) setCurrentStep(prev => prev - 1)
        } else {
        setCurrentStep(prev => prev - 1)
        }
    } 
    
    const steps = [
        <StepOne 
            next={handleNextStep} 
            data={portraitData} 
            variants={containerVariants} 
            key="stepOne"
        />, 
        <StepTwo 
            next={handleNextStep} 
            prev={handlePrevStep} 
            data={portraitData} 
            setPet={setPet} 
            setCharSheet={setCharSheet} 
            setWeaponSheet={setWeaponSheet}
            variants={containerVariants} 
            key="stepTwo"
        />,
        <StepThree 
            next={handleNextStep} 
            prev={handlePrevStep} 
            data={portraitData}
            variants={containerVariants} 
            key="stepThree"
        />,
        <StepFour 
            next={handleNextStep} 
            prev={handlePrevStep} 
            data={portraitData}
            variants={containerVariants}
            key="stepFour"    
        />,
        {/*/ <StepSix next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
        // <StepSeven next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
        // <StepEight next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
        // <StepNine next={handleNextStep} prev={handlePrevStep} data={portraitData} /> */}
    ]
  
    //console.log("portraitData: ", portraitData)


    return (
        <AnimatePresence mode="wait">              
                {steps[currentStep]}
        </AnimatePresence> 
  )
}

export default Questionaire
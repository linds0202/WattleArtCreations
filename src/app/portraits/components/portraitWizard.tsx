'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/firebase/auth';
import { AnimatePresence, motion, spring } from "framer-motion"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import StepSix from './stepSix';
import StepSeven from './stepSeven';
import StepEight from './stepEight';
import StepNine from './stepNine'
 
import * as React from 'react';
import { addPortrait } from '@/app/firebase/firestore';

interface PortraitData {
  styleOne: String, 
  styleTwo: String, 
  styleThree: String, 
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

export default function PortraitWizard({ editPortrait, editIndex, setEditPortrait, portraits, setPortraits, setOpenWizard, styleOne }: PortraitProps) {

  const [currentStep, setCurrentStep] = useState(0)
  const [portraitData, setPortraitData] = useState(editPortrait ? editPortrait : {
    styleOne: styleOne,
    styleTwo: '', 
    styleThree: '', 
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

  const submitPortrait = async (portraitFormData: PortraitData) => {
    if (editPortrait) {
      let editedPortraitsData = portraits.map((portrait, i) => {
        if (editIndex === i) {
          return portraitFormData
        } else {
          return portrait
        }
      })
      setPortraits(editedPortraitsData)
    } else {
      setPortraits(prev => ([ ...prev,  portraitFormData]))
    }
    setOpenWizard(false)
  }

  const handleNextStep = (newData, final = false) => {
    setPortraitData(prev => ({ ...prev, ...newData }))

    if (final) {
      submitPortrait(newData)
      if (editPortrait) setEditPortrait(null)
      return
    }

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

  const handleClose = () => {
    console.log('closing it')
    setOpenWizard(false)
  }

  const steps = [
    <StepOne next={handleNextStep} data={portraitData}/>, 
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={portraitData} setPet={setPet} setCharSheet={setCharSheet} setWeaponSheet={setWeaponSheet}/>,
    <StepFour next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepFive next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepSix next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepSeven next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepEight next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepNine next={handleNextStep} prev={handlePrevStep} data={portraitData} />
  ]

  console.log("portraitData: ", portraitData)

  return (
    <AnimatePresence>
      <motion.div
          key="backdrop"
          className="fixed top-0 left-0 w-full min-h-screen bg-stone-950/50 z-15"
          animate={{ opacity: 1 }}
          initial={{opacity: 0}}
      >
        <motion.div
          key="page"
          className='max-w-6xl h-[32rem] mx-auto bg-white rounded-xl relative border-8 border-[#282828]'
          animate={{
            y: "100px",
            opacity: 1,
            scale: 1,
            transition: { type: "spring", damping: 11, delay: 0.5, duration: 0.3 }
          }}
          initial={{
            y: "100px",
            opacity: 0,
            scale: 0
          }}
        >
          <IconButton onClick={handleClose} className='absolute top-2 right-2 text-white'>
            <CloseIcon className='text-black hover:text-red-600'/>
          </IconButton>
          {steps[currentStep]}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
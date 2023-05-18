'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/firebase/auth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import StepSix from './stepSix';
import StepSeven from './stepSeven';
import StepEight from './stepEight';
import StepNine from './stepNine'
import StepTen from './stepTen';
 
import * as React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
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

  const steps = [
    <StepOne next={handleNextStep} data={portraitData}/>, 
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={portraitData} setPet={setPet} setCharSheet={setCharSheet} setWeaponSheet={setWeaponSheet}/>,
    <StepFour next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepFive next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepSix next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepSeven next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepEight next={handleNextStep} prev={handlePrevStep} data={portraitData}/>,
    <StepNine next={handleNextStep} prev={handlePrevStep} data={portraitData} />,
    // <StepTen next={handleNextStep} prev={handlePrevStep} data={portraitData}/>

  ]

  console.log("portraitData: ", portraitData)

  return (
      <div className='w-10/12 h-10/12 bg-black border-2 border-white rounded-xl p-10'>
        {steps[currentStep]}
      </div>
  )
}
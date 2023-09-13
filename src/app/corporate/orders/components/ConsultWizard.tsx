import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import { useAuth } from '@/app/firebase/auth';
import { EmailAuthProvider } from 'firebase/auth';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from '@/app/firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { addConsult } from '@/app/firebase/firestore';
import { AnimatePresence, motion, spring } from "framer-motion"


interface CorporateData {
  category: String, 
  subcategories: String, 
  questions: [], 
  generalAnswers: {},
  advertisementAnswers: {},
  storyAnswers: {},
  tableAnswers: {},
  videoGameAnswers: {},
  price: Number,
  customerFirstName: String,
  customerLastName: String,
  customerEmail: String,
  consultant: String,
  date: Date,
  status: String,
  lastUpdatedStatus: Date,
  paymentComplete: Boolean,
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

interface ConsultWizardProps {
  category: string,
  selection: string,
  setStartConsult: Function,
  setOpenWizard: Function,
  setConsult: Function
}


const questions = {
  "general": ['What is your business about?', 'What are your brand values and your mission statement?', 'What is the timeline for the project?', 'Have you seen any of our previous work that you particularly like and/or dislike? This can help us understand your preferences and create an artwork that meets your expectations.', 'If you have any reference images you would like us to look at, please provide them.', 'Do you have any questions for us?'],
  "Advertisement": ['What type of advertisement are you looking for?', 'Who is the target audience for this advertisement?', 'Where will this advertisement be shown?', 'What is the message or objective you want to convey through this advertisement?', 'What is your budget for this advertisement(s)?'],
  "Story Or Book Illustrations": ['What is your book about?', 'What is the story or concept you want to be illustrated in this commission?', 'What is the desired style and aesthetic for the artwork?', 'What is your budget for this story art illustration(s)?', 'Are there any specific characters or objects that you want to be included in the artwork?'],
  "Table Top Illustrations": ['What is the name of the board game that you are designing?', 'What type of game is it (e.g., strategy, role-playing, party game, etc.)?', 'What type of illustrations are you looking for (e.g., characters, objects, backgrounds, etc.)?', 'What is the style and aesthetic you are looking for?', 'What is your budget for this art illustration(s)?', 'How will the artwork be used in the game (e.g., game cards, game board, rulebook, etc.)?', 'Are there any specific guidelines or requirements for the artwork (e.g., dimensions, file formats, color schemes, etc.)?'],
  "Video Game Assets": ['What is the name of the video game that you are developing?', 'What is the character&#39;s backstory and personality?', 'What is your budget for the video game model(s)?', 'What is the purpose of the character (e.g., playable character, NPC, etc.)?', 'Are there any specific poses or animations that you want to be included for the character?', 'Are there any specific guidelines or requirements for the character (e.g., size, proportions, color schemes, etc.)?']
}

export default function ConsultWizard({ category, selection, setStartConsult, setOpenWizard, setConsult }: ConsultWizardProps) {

  const { authUser } = useAuth();
  const [login, setLogin] = useState(false);

  const [currentStep, setCurrentStep] = useState(0)
  const [submitFinal, setSubmitFinal] = useState<Boolean>(false)
  const [corporateData, setCorporateData] = useState({
    category: category, 
    subcategories: selection, 
    questions: {
      'general': questions.general, 
      'Advertising': questions.Advertisement, 
      'Story Or Book Illustrations': questions['Story Or Book Illustrations'], 
      'Table Top Illustrations': questions['Table Top Illustrations'], 
      'Video Game Assets': questions['Video Game Assets']
    },
    generalAnswers: {
      q0: ' ',
      q1: ' ',
      q2: ' ',
      q3: ' ',
      q4: ' ',
      q5: ' '
    },
    advertisingAnswers: {
      q0: ' ',
      q1: ' ',
      q2: ' ',
      q3: ' ',
      q4: ' '
    },
    storyAnswers: {
      q0: ' ',
      q1: ' ',
      q2: ' ',
      q3: ' ',
      q4: ' '
    },
    tableAnswers: {
      q0: ' ',
      q1: ' ',
      q2: ' ',
      q3: ' ',
      q4: ' ',
      q5: ' ',
      q6: ' '
    },
    videoGameAnswers: {
      q0: ' ',
      q1: ' ',
      q2: ' ',
      q3: ' ',
      q4: ' ',
      q5: ' '
    },
    price: ' ',
    customerFirstName: ' ',
    customerLastName: ' ',
    customerEmail: ' ',
    consultant: ' ',
    date: new Date(),
    status: ' ',
    lastUpdatedStatus: new Date(),
    paymentComplete: Boolean,
  })


  const submitConsult = async () => {
      
    await addConsult(corporateData);
        
    setStartConsult(false)
    setOpenWizard(false)
    setConsult(true)
  }

  const handleNextStep = (newData: any, final=false) => {

    setCorporateData(prev => ({ ...prev, ...newData }))
    
    if(final) {
      setSubmitFinal(true)
      return
    }

    setCurrentStep(prev => prev + 1)   
  } 

  const handlePrevStep = (newData: any) => {
    setCorporateData(prev => ({ ...prev, ...newData }))

    setCurrentStep(prev => prev - 1)
  } 

  const handleClose = () => {

    setStartConsult(false)
    setOpenWizard(false)
  }

  const steps = [
    <General key={1} next={handleNextStep} data={corporateData}/>, 
    <Other key={2} next={handleNextStep} prev={handlePrevStep} data={corporateData}/>,
    <Final key={3} next={handleNextStep} prev={handlePrevStep} data={corporateData}/>,
  ]

  if (submitFinal) {
    submitConsult()
    setSubmitFinal(false)
  }

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
          className='max-w-6xl h-[32rem] mx-auto bg-black rounded-xl relative'
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
            <CloseIcon className='text-white hover:text-red-600'/>
          </IconButton>
          {steps[currentStep]}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


const General = (props: any) => {
  const handleSubmit = (values: any) => {
    props.next(values)
  }

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form className='h-[32rem] py-2 px-4 flex flex-col items-center justify-between'>
          <h3 className='text-white text-center text-lg'>General Questions</h3>
          <div className='max-h-96 flex flex-col flex-wrap'>
            {props.data.questions.general.map(({q, i}: {q: string, i: number}) => (
              <div key={i} className='w-6/12'>
                <label className='text-white text-sm leading-3 w-11/12 m-0'>
                  {q}
                </label>
                <Field 
                  as="textarea"
                  rows="3"
                  cols="60" 
                  name={`generalAnswers[q${i}]`} 
                  className="text-black mt-2 w-11/12" 
                />
              
              </div>
            ))}
          </div>
          
          <button type="submit" className='w-3/12 mt-2 text-white border-2 border-white rounded-lg p-2 text-center'>Next</button>
        </Form>
        )}
    </Formik>
  )
}

const Other = (props: any) => {
  const handleSubmit = (values: any) => {
    props.next(values)
  }

  let choice = ''
  switch(props.data.category) {
    case 'Advertising':
      choice='advertising'
      break;
    case 'Story Or Book Illustrations':
      choice='story'
      break;
    case 'Table Top Illustrations':
      choice='table'
      break;
    case 'Video Game Assets':
      choice='videoGame'
      break;
    default:
      break
  }

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form className='h-[32rem] py-2 px-4 flex flex-col items-center justify-between'>
          <h3 className='text-white text-center text-lg'>{choice} Questions</h3>
          <div className='max-h-96 flex flex-col flex-wrap'>
            {props.data.questions[props.data.category].map(({q, i}: {q: string, i: number}) => (
              <div key={i} className='w-6/12'>
                <label className='text-white text-sm text-left leading-3 w-10/12 m-0'>
                  {q}
                </label>
                <Field 
                  as="textarea"
                  rows="2"
                  cols="60" 
                  name={`${choice}Answers[q${i}]`} 
                  className="text-black" 
                />
              </div>
            ))}
          </div>
          <div className='flex w-8/12 justify-around'>
            <button 
                type="button" 
                className='w-3/12 text-white border-2 border-white rounded-lg p-2 text-center'
                onClick={() => props.prev(values)}  
            >
              Back
            </button>
            <button type="submit" className='w-3/12 text-white border-2 border-white rounded-lg p-2 text-center'>Next</button>
          </div>
          
        </Form>
        )}
    </Formik>
  )
}

const Final = (props: any) => {
  const handleSubmit = (values: any) => {
    props.next(values, true)
  }

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form className='h-[32rem] py-2 px-4 flex flex-col items-center justify-between'>
          <h3 className='text-white text-center text-lg'>Contact Info</h3>
          <div className='w-full  flex flex-col items-center'>
            <div className='w-1/3 flex justify-between mt-4'>
              <label className='text-white text-left text-md w-[125px] '>
                First Name
              </label>
              <Field 
                name='customerFirstName'
                className="text-black " 
              />
            </div>
            <div className='w-1/3 flex justify-between mt-4'>
              <label className='text-white text-left text-md  w-[125px]'>
                Last Name
              </label>
              <Field 
                name='customerLastName'
                className="text-black" 
              />
            </div>
            <div className='w-1/3 flex justify-between mt-4'>
              <label className='text-white text-left text-md  w-[125px]'>
                Email
              </label>
              <Field 
                name='customerEmail'
                className="text-black" 
              />
            </div>          
          </div>
          <div className='flex w-8/12 justify-around mt-4'>
            <button 
                type="button" 
                className='w-3/12 text-white border-2 border-white rounded-lg p-2 text-center'
                onClick={() => props.prev(values)}  
            >
              Back
            </button>
            <button type="submit" className='w-3/12 text-white border-2 border-white rounded-lg p-2 text-center'>Request Consultation</button>
          </div>
        </Form>
        )}
    </Formik>
  )
}

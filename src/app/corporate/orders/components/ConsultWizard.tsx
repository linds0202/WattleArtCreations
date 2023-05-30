import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import { useAuth } from '@/app/firebase/auth';
import { EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { addConsult } from '@/app/firebase/firestore';

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
  customer: String,
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

const questions = {
  "general": ['What is your business about?', 'What are your brand values and your mission statement?', 'What is the timeline for the project?', 'Have you seen any of our previous work that you particularly like and/or dislike? This can help us understand your preferences and create an artwork that meets your expectations.', 'If you have any reference images you would like us to look at, please provide them.', 'Do you have any questions for us?'],
  "Advertisement": ['What type of advertisement are you looking for?', 'Who is the target audience for this advertisement?', 'Where will this advertisement be shown?', 'What is the message or objective you want to convey through this advertisement?', 'What is your budget for this advertisement(s)?'],
  "Story Or Book Illustrations": ['What is your book about?', 'What is the story or concept you want to be illustrated in this commission?', 'What is the desired style and aesthetic for the artwork?', 'What is your budget for this story art illustration(s)?', 'Are there any specific characters or objects that you want to be included in the artwork?'],
  "Table Top Illustrations": ['What is the name of the board game that you are designing?', 'What type of game is it (e.g., strategy, role-playing, party game, etc.)?', 'What type of illustrations are you looking for (e.g., characters, objects, backgrounds, etc.)?', 'What is the style and aesthetic you are looking for?', 'What is your budget for this art illustration(s)?', 'How will the artwork be used in the game (e.g., game cards, game board, rulebook, etc.)?', 'Are there any specific guidelines or requirements for the artwork (e.g., dimensions, file formats, color schemes, etc.)?'],
  "Video Game Assets": ['What is the name of the video game that you are developing?', 'What is the character&#39;s backstory and personality?', 'What is your budget for the video game model(s)?', 'What is the purpose of the character (e.g., playable character, NPC, etc.)?', 'Are there any specific poses or animations that you want to be included for the character?', 'Are there any specific guidelines or requirements for the character (e.g., size, proportions, color schemes, etc.)?']
}

export default function ConsultWizard({ category, selection, setStartConsult, setOpenWizard, setConsult }) {

  const { authUser } = useAuth();
  const [login, setLogin] = useState(false);

  const [currentStep, setCurrentStep] = useState(0)
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
    customer: ' ',
    consultant: ' ',
    date: new Date(),
    status: ' ',
    lastUpdatedStatus: new Date(),
    paymentComplete: Boolean,
  })

  const submitConsult = async (corporateFormData: CorporateData) => {
    //setCorporateData(prev => ({ ...prev, ...corporateFormData }))
    
    console.log('submiting  corporate data: ', corporateFormData)
    
    
    await addConsult(corporateFormData);
    
    console.log('submitting request: ', corporateFormData)
    
    setStartConsult(false)
    setOpenWizard(false)
    setConsult(true)
  }

  const handleNextStep = (newData, final=false) => {
  
    setCorporateData(prev => ({ ...prev, ...newData }))
    
    if(final) {
      submitConsult(corporateData)
      return
    }

    setCurrentStep(prev => prev + 1)   
  } 

  const handlePrevStep = (newData) => {
    setCorporateData(prev => ({ ...prev, ...newData }))

    setCurrentStep(prev => prev - 1)
  } 

  const steps = [
    <General next={handleNextStep} data={corporateData}/>, 
    <Other next={handleNextStep} prev={handlePrevStep} data={corporateData}/>,
  ]

  console.log("corporateData: ", corporateData)

  return (
      <div className='h-full bg-black border-2 border-red-700 rounded-xl p-4'>
        {steps[currentStep]}
      </div>
  )
}

const General = (props) => {
  const handleSubmit = (values) => {
    props.next(values)
  }

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form className='h-full flex flex-col items-center justify-around'>
          <h3 className='text-white text-center text-lg'>General Questions</h3>
          <div className='h-5/6 flex flex-col flex-wrap'>
            {props.data.questions.general.map((q, i) => (
              <div key={i} className='w-6/12'>
                <label className='text-white text-sm leading-3 w-11/12 m-0'>
                  {q}
                  <Field 
                    as="textarea"
                    rows="5"
                    cols="60" 
                    name={`generalAnswers[q${i}]`} 
                    className="text-black mt-2" />
                </label>
              </div>
            ))}
          </div>
          
          <button type="submit" className='text-white border-2 border-white rounded-lg p-2 mt-4 text-center'>Next</button>
        </Form>
        )}
    </Formik>
  )
}

const Other = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true)
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
        <Form className='h-full flex flex-col items-center justify-around'>
          <h3 className='text-white text-center text-lg'>{choice} Questions</h3>
          <div className='h-5/6 flex flex-col flex-wrap'>
            {props.data.questions[props.data.category].map((q, i) => (
              <div key={i} className='w-6/12'>
                <label className='text-white text-sm leading-3 w-full m-0'>
                {q}
                  <Field 
                    as="textarea"
                    rows="5"
                    cols="60" 
                    name={`${choice}Answers[q${i}]`} 
                    className="text-black" />
                </label>
              </div>
            ))}
          </div>
          <div className='flex w-8/12 justify-around'>
            <button 
                type="button" 
                className='text-white border-2 border-white rounded-lg p-2 mt-4 text-center'
                onClick={() => props.prev(values)}  
            >
              Back
            </button>
            <button type="submit" className='text-white border-2 border-white rounded-lg p-2 mt-4 text-center'>Submit</button>
          </div>
          
        </Form>
        )}
    </Formik>
  )
}
import { useAuth } from '@/app/firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { addPortrait, updatePortrait } from "@/app/firebase/firestore"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { EmailAuthProvider } from 'firebase/auth';
import { Formik, Form, Field} from 'formik';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';

import StepOne from "./questionaire/StepOne"
import RequiredQuestions from './questionaire/RequiredQuestions';
import StepTwo from "./questionaire/StepTwo"
import Accordion from './questionaire/Accordion';


interface PortraitData  {
    mode: String, 
    characters: [],
    portraitTitle: String,
    requiredQs: [String, String, String],
    questions: [{}, {}, {}, {}, {}], 
    price: Number,
    customer: String,
    customerId: '',
    artist: String,
    date: Date,
    status: String,
    lastUpdatedStatus: Date,
    paymentComplete: Boolean,
    id: String
  }

interface PortraitProps {
    selection: String,
    editPortrait: PortraitData,
    setEditPortrait: Function,
    editIndex: number,
    portraits: PortraitData[],
    setPortraits: Function,
    setOpenWizard: Function,
    totalPrice: number,
    setTotalPrice: Function
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

const prices = {
    Photorealistic: {
        Headshot: 100,
        Half: 130,
        Full: 150,
        model: 150,
        character: 120,
        weapons: 125
    },
    Anime: {
        Headshot: 120,
        Half: 140,
        Full: 200
    },
    NSFW: {
        Headshot: 150,
        Half: 200,
        Full: 225
    }
}

const PortraitCustomizer = ({ selection, editPortrait, setEditPortrait, editIndex, portraits, setPortraits, setOpenWizard, totalPrice, setTotalPrice }: PortraitProps) => {
    
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [login, setLogin] = useState(false);

    const [portraitData, setPortraitData] = useState<PortraitData>(editPortrait ? editPortrait : {
        mode: `${selection}`, 
        characters: [],
        portraitTitle: '',
        requiredQs: ['', '', ''],
        questions: [{}, {}, {}, {}, {}],
        price: 0,
        customer: '',
        customerId: '',
        artist: '',
        date: new Date(),
        status: 'Unpaid',
        lastUpdatedStatus: new Date(),
        paymentComplete: false,
        id: ''
    })

    const [chars, setChars] = useState(portraitData.characters)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    const handleLogin = () => {
        setLogin(true)
    }

    // Redirect if finished loading and there's an existing user (user is logged in)
    useEffect(() => {
        if (authUser) {
        setLogin(false)
        }
    }, [authUser])


    const submitPortrait = async (portraitFormData: PortraitData) => {
        
        const price = chars.reduce((sum, char) => sum += char.total, 0)

        const newPortrait = {...portraitFormData, characters: chars, price: price, customerId: authUser?.uid, customer: authUser?.displayName }
        
        if (editPortrait) {
            let editedPortraitsData = portraits.map((portrait, i) => {
                if (editIndex === i) {
                    return newPortrait
                } else {
                    return portrait
                }
            })
            let updatedTotalPrice = editedPortraitsData.reduce((sum, p) => sum += p.price, 0)
            
            updatePortrait(newPortrait.id, newPortrait)
            
            setTotalPrice(updatedTotalPrice)
            setPortraits(editedPortraitsData)
        } else {
            const id = await addPortrait(newPortrait)
            setTotalPrice(totalPrice + price)
            setPortraits(prev => ([ ...prev,  {...newPortrait, id: id}]))
        }
        setEditPortrait(null)
        setOpenWizard(false)

        // console.log('portrait form data in customizer is: ', portraitFormData)
        // const newPortrait = {...portraitFormData, characters: chars, customerId: authUser?.uid}
        // setPortraits([...portraits, newPortrait])
        // addPortrait(newPortrait)
        // setOpenWizard(false)
    }  
  

    return (
        <div className='w-full flex flex-col justify-start items-center min-h-screen bg-white text-black pb-10'>
          <div className="h-[150px] w-full flex flex-col justify-center items-center">
            <h2 className="w-full text-4xl text-center">Welcome to the {selection} Portrait Customizer</h2>
            <p className="w-full text-center pt-4">Make your selections to customize your portrait</p>
          </div>
          {/* Display the portrait wizard */}
             <div className="w-full px-4">
                  <Formik
                      initialValues={portraitData}
                      onSubmit={submitPortrait}
                  >
                  {({ values }) => (
                      <Form className='w-full '>
                          <div className='flex flex-between'>
                            <div className='w-6/12 flex flex-col items-center'>
                                <StepOne 
                                prices={prices}
                                portraitData={portraitData} 
                                chars={chars}
                                setChars={setChars} 
                                setPet={setPet}
                                setCharSheet={setCharSheet}
                                setWeaponSheet={setWeaponSheet} 
                                />
                                <RequiredQuestions />

                                {authUser && <button 
                                    type="submit" 
                                    className={`w-3/12 rounded-lg p-2 text-center mt-4 ${chars.length !== 0 
                                        ? 'text-black border-2 border-black' 
                                        : 'text-[#EEEEEE] border-2 border-[#EEEEEE]'}`}
                                    disabled={chars.length === 0}
                                >
                                    Add to Cart
                                </button>}
                                {!authUser && chars.length !== 0 && <Button onClick={handleLogin} className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center mt-4'>
                                    Login/Create Account to Continue
                                </Button>}
                            </div>
                            
                            {chars.length !== 0 && 
                              <div className='w-6/12 px-8'>
                                <h3 className='text-xl font-bold'>Let us know more. . .</h3>
                                <StepTwo 
                                    pet={pet}
                                    charSheet={charSheet}
                                    weaponSheet={weaponSheet} 
                                />
                              </div>
                            }
                          </div>
                          
                          <div className='mt-8 w-full flex justify-around items-center'>
                            {/* Prompt for login */}
                            <Dialog onClose={() => setLogin(false)} open={login}>
                              {!authUser && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
                            </Dialog>
                          </div>
                      </Form>
                  )}
              </Formik>
          </div>
        </div>
      )
}

export default PortraitCustomizer


// const { authUser, isLoading } = useAuth();
// const [login, setLogin] = useState(false);

// const [portraitData, setPortraitData] = useState<PortraitData>(editPortrait ? editPortrait : {
//     mode: option, 
//     characters: [],
//     questions: [{}, {}, {}, {}, {}],
//     price: 0,
//     customer: '',
//     customerId: '',
//     artist: '',
//     date: new Date(),
//     status: '',
//     lastUpdatedStatus: new Date(),
//     paymentComplete: false,
// })

// const [chars, setChars] = useState(portraitData.characters)
// const [pet, setPet] = useState(false)
// const [charSheet, setCharSheet] = useState(false)
// const [weaponSheet, setWeaponSheet] = useState(false)
// const [customizing, setCustomizing] = useState(false)


// const submitPortrait = async (portraitFormData: PortraitData) => {

//     const newPortrait = {...portraitFormData, characters: chars}
    
//     if (editPortrait) {
//         let editedPortraitsData = portraits.map((portrait, i) => {
//             if (editIndex === i) {
//                 return newPortrait
//             } else {
//                 return portrait
//             }
//         })
//         setPortraits(editedPortraitsData)
//     } else {
//         setPortraits(prev => ([ ...prev,  newPortrait]))
//     }
//     setEditPortrait(null)
//     setOpenWizard(false)
// }    

// console.log('portraitData (in portrait customizer): ', portraitData)


// (
//     <div className="w-11/12 mx-auto">

//         <StepOne 
//             option={option} 
//             portraitData={portraitData} 
//             setPortraitData={setPortraitData}
//             chars={chars}
//             setChars={setChars} 
//             setPet={setPet}
//             setCharSheet={setCharSheet}
//             setWeaponSheet={setWeaponSheet} 
//             setCustomizing={setCustomizing}
//         />
    
//         {authUser && portraitData.characters.length !== 0 && !customizing && 
//             <Formik
//                 initialValues={portraitData}
//                 onSubmit={submitPortrait}
//             >
//             {({ values }) => (
//                 <Form className='w-full '>
//                     <div>
//                         <h3>Let us know more. . .</h3>
//                         <StepTwo 
//                             pet={pet}
//                             charSheet={charSheet}
//                             weaponSheet={weaponSheet} 
//                         />
//                     </div>
//                     <div className='mt-8 w-full flex justify-around items-center'>
//                         <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
//                             Finish Portrait
//                         </button>
//                     </div>
//                 </Form>
//             )}
//         </Formik>}

//         { ( portraitData.characters.length !== 0 && !customizing && !authUser) && 
//             <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[300px] h-[400px] rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4'>
//                 <h3 className='text-2xl font-bold'>Please login to continue</h3>
//                 <p>In order to fully customize your portrait, please create an account</p>
//                 <Button variant="contained" color="secondary"
//                     onClick={() => setLogin(true)}>
//                     Login / Register
//                 </Button>
//             </div>
//         }
            {/* {authUser && <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                                Add to Cart
                            </button>}
                            {!authUser && chars.length !== 0 && <Button onClick={handleLogin} className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>
                                Login/Create Account to Continue
                            </Button>} */}
//         {/* Prompt for login */}
//         <Dialog onClose={() => setLogin(false)} open={login}>
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
//         </Dialog>
//     </div>
// )
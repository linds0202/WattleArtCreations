import { useAuth } from '@/app/firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { addPortrait, updatePortrait } from "@/app/firebase/firestore"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Formik, Form, Field} from 'formik';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import StepOne from "./questionaire/StepOne"
import RequiredQuestions from './questionaire/RequiredQuestions';
import StepTwo from "./questionaire/StepTwo"
import { deleteImage, uploadImages } from '@/app/firebase/storage';
import { updateNewPortraitWithImages } from '@/app/firebase/firestore';
import { updateEditedPortraitWithImages } from '@/app/firebase/firestore';
import { deletePortraitImages } from '@/app/firebase/firestore';



export interface PortraitData  {
    mode: String, 
    characters: [],
    portraitTitle: String,
    requiredQs: [String, String, String],
    questions: [{}, {}, {}, {}, {}], 
    price: number,
    customer: String,
    customerId: '',
    artist: String,
    date: Date,
    status: String,
    lastUpdatedStatus: Date,
    paymentComplete: Boolean,
    uploadedImageUrls: Array<string>,
    uploadedImageBucket: Array<string>,
    uploadedImageInfo: Array<string>,
    id: String,
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
        GoogleAuthProvider.PROVIDER_ID,
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

const DEFAULT_FORM_STATE = {
    fileName: "No file selected",
    file: null,
};

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
        uploadedImageUrls: [],
        uploadedImageBucket: [],
        uploadedImageInfo: [],
        id: '',
    })

    const [chars, setChars] = useState(portraitData.characters)
    const [charVariations, setCharVariations] = useState(false)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)
    const [formFields, setFormFields] = useState(DEFAULT_FORM_STATE); //isEdit ? props.edit : 
    const [imageFiles, setImageFiles] = useState([])
    const [fileNames, setFileNames] = useState(editPortrait ? editPortrait.uploadedImageInfo : [])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(imageFiles.length !== 0) {
            const names = imageFiles.map(img => img.name)
            if (editPortrait) {
                console.log(fileNames)
                setFileNames(prev => [...prev, ...names])
            } else {
                setFileNames(names)
            } 
        }
    }, [imageFiles])


    const handleLogin = () => {
        setLogin(true)
    }

    // Redirect if finished loading and there's an existing user (user is logged in)
    useEffect(() => {
        if (authUser) {
        setLogin(false)
        }
    }, [authUser])


    const setFileData = (target) => {
        if (target.files.length !== 0) {
            const file = target.files[0];
            setFormFields(prevState => ({...prevState, fileName: file.name}));
            setFormFields(prevState => ({...prevState, file}));
            const newEntry = {
                fileName: file.name,
                file: file,
            }
            setImageFiles(prevState => [...prevState, newEntry.file])
        }
    }


    const submitPortrait = async (portraitFormData: PortraitData) => {
        
        const price = chars.reduce((sum, char) => sum += char.total, 0)

        const newPortrait = {...portraitFormData, characters: chars, price: price, customerId: authUser?.uid, customer: authUser?.displayName }
        
        if (editPortrait) {

            //Need to check if images has been changed - then update with new file info else just use the deleted set of files
            let newImgData = {}

            if (imageFiles.length !== 0) {
                const bucket = await uploadImages(imageFiles, editPortrait.id)
                const newFileNames = imageFiles.map(img => img.name)
                //update portrait with bucket info
                const updatedPortraitUrls = await updateEditedPortraitWithImages(editPortrait.id, bucket, newFileNames, portraitData)
                setPortraitData({...newPortrait, uploadedImageUrls: updatedPortraitUrls, uploadedImageBucket: [...portraitData.uploadedImageBucket, ...bucket], uploadedImageInfo: fileNames})
                newImgData = {uploadedImageUrls: updatedPortraitUrls, uploadedImageBucket: [...portraitData.uploadedImageBucket, ...bucket], uploadedImageInfo: fileNames}
            }
            console.log('newImgdata is: ', newImgData)
            
            let editedPortraitsData = portraits.map((portrait, i) => {
                if (editIndex === i) {
                    if (imageFiles.length !== 0) {
                        return {...newPortrait, ...newImgData}
                    } else {
                        return {...newPortrait, uploadedImageUrls: portraitData.uploadedImageUrls, uploadedImageBucket: portraitData.uploadedImageBucket, uploadedImageInfo: portraitData.uploadedImageInfo}
                    }
                } else {
                    return portrait
                }
            })
            let updatedTotalPrice = editedPortraitsData.reduce((sum, p) => sum += p.price, 0)
            
            updatePortrait(newPortrait.id, {...editedPortraitsData[editIndex]})
            
            setTotalPrice(updatedTotalPrice)
            setPortraits(editedPortraitsData)
        } else {
            
            const id = await addPortrait(newPortrait)
            
            //upload img to bucket
            const bucket = await uploadImages(imageFiles, id) //formFields.file
            //update portrait with bucket info
            const updatedPortraitUrls = await updateNewPortraitWithImages(id, bucket, fileNames)

            setTotalPrice(totalPrice + price)
            setPortraits(prev => ([ ...prev,  {...newPortrait, id: id, uploadedImageUrls: updatedPortraitUrls, uploadedImageBucket: bucket, uploadedImageInfo: fileNames}]))
        }

        setEditPortrait(null)
        setOpenWizard(false)

    }  

    const handleDeleteImg = async (i) => {
        if(editPortrait) {
            try {
                console.log('in edit mode')
                
                //removes from storage
                await deleteImage(portraitData.id, portraitData.uploadedImageInfo[i])
                
                //create new array of url
                let updateUploadedImageUrls: Array<string> = portraitData.uploadedImageUrls.filter((name, j) => j !== i)
                
                //create new array of bucket ref
                let updateUploadedImageBucket: Array<string> = portraitData.uploadedImageBucket.filter((name, j) => i !== j)
                
                //remove from filenames
                let updateFileNames: Array<string> = fileNames.filter((name) => name !== fileNames[i])
                setFileNames(updateFileNames)

                //update portrait in database
                await deletePortraitImages(editPortrait.id, updateUploadedImageBucket, updateUploadedImageUrls, updateFileNames)
                
                //setPortraits to update in live data
                setPortraitData((prev):PortraitData => ({...prev, uploadedImageUrls: updateUploadedImageUrls,
                    uploadedImageBucket: updateUploadedImageBucket,
                    uploadedImageInfo: updateFileNames,
                }))
            } catch (error) {
              console.log(error)
            }
        } else {
            console.log('not edit mode')
            let updateFileNames: Array<string> = fileNames.filter((name) => name !== fileNames[i])
            setFileNames(updateFileNames)

            let updateImageFiles = imageFiles.filter((file, j) => j !== i)
            setImageFiles(updateImageFiles)
        }
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
                                
                                {/* Create Characters */}
                                <StepOne 
                                prices={prices}
                                portraitData={portraitData} 
                                chars={chars}
                                setChars={setChars} 
                                setCharVariations={setCharVariations}
                                setPet={setPet}
                                setCharSheet={setCharSheet}
                                setWeaponSheet={setWeaponSheet} 
                                />
                                <RequiredQuestions />


                                {/* Add images */}
                                <div className='w-full mt-4 flex justify-around items center'>
                                    <Button variant="outlined" component="label" color="secondary" className='self-start mt-2'>
                                        Upload Image
                                        <input type="file" hidden onInput={(event) => {setFileData(event.target)}} />
                                    </Button>
                                    
                                    <div className='w-8/12 flex flex-wrap justify-start items-center'>  
                                        {fileNames.length === 0 
                                            ? <p>No File Selected</p>
                                            : fileNames?.map((name, i) => (
                                            <div key={i} className='w-5/12 flex justify-between items-center border-2 border-black rounded-md m-2 p-2'>
                                                <p className='w-10/12 h-[25px] overflow-hidden'>{name}</p>
                                                <button type="button" onClick={() => handleDeleteImg(i)} className='ml-2'>
                                                    <DeleteForeverIcon />
                                                </button>
                                            </div>        
                                        ))}
                                    </div>
                                    
                                    
                                </div>


                                {/* Submit Button */}
                                {authUser && <button 
                                    type="submit" 
                                    className={`w-3/12 rounded-lg p-2 text-center mt-4 ${chars.length !== 0 
                                        ? 'text-black border-2 border-black' 
                                        : 'text-[#EEEEEE] border-2 border-[#EEEEEE]'}`}
                                    disabled={chars.length === 0}
                                >
                                    Add Portrait to Cart
                                </button>}
                                {!authUser && chars.length !== 0 && 
                                    <>
                                        <Button onClick={handleLogin} className='w-6/12 text-black border-2 border-black rounded-lg p-2 text-center mt-4'>
                                            Login/Create Account to Continue
                                        </Button>
                                        <p>(You must be logined in to create a portrait)</p>
                                    </>
                                }
                            </div>
                            
                            {chars.length !== 0 && 
                              <div className='w-6/12 px-8'>
                                <h3 className='text-xl font-bold'>Let us know more. . .</h3>
                                <p>Answering the <span className='font-semibold'>optional</span> questions below helps your artist understand your vision.</p>
                                <StepTwo 
                                    charVariations={charVariations}
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
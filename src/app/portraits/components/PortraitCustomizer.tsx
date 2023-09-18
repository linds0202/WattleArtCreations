import { useAuth } from '@/app/firebase/auth';
import { auth } from '@/app/firebase/firebase';
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Formik, Form } from 'formik';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import StepOne from "./questionaire/StepOne"
import RequiredQuestions from './questionaire/RequiredQuestions';
import StepTwo from "./questionaire/StepTwo"
import AddImages from './AddImages';
import { deleteImages, uploadImages } from '@/app/firebase/storage';
import { 
    addPortrait, 
    updatePortrait, 
    getImageUrls,
    deletePortraitImages 
} from '@/app/firebase/firestore';
import { MyCharValues } from './questionaire/StepOne';
import { Timestamp } from 'firebase/firestore';
import { Artist } from '@/app/components/Portrait';

export interface UploadedImgs {
    imageUrls: Array<string>,
    fileNames: Array<string>,
    text: string,
}

interface FinalImages {
    imageUrl: string,
    userId: string,
    date: Timestamp,
}

export interface CustomerRevision {
    text: string,
    date: Timestamp
}

export interface Upload {
    files: File[],
    text: string
}


export interface PortraitData  {
    mode: string, 
    characters: [],
    portraitTitle: string,
    requiredQs: [string, string],
    questions: [{q1: string, q2: string, q3: string, q4: string}, {q1: string}, {q1: string, q2: string}, {q1: string, q2: string}, {q1: string, q2: string}], 
    price: number,
    customer: string,
    customerId: '',
    artist: Array<Artist>,
    artistNotes: [],
    artistAssigned: boolean,
    creationDate: Timestamp,
    purchaseDate: Timestamp,
    status: string,
    lastUpdatedStatus: Timestamp,
    paymentComplete: boolean,
    id: string,
    revisions: number,
    revised: boolean,
    reassigned: boolean,
    additionalRevision: boolean,
    images: Array<UploadedImgs>
    finalImages: Array<FinalImages>,
    revisionLevel: string,
    additionalRevisionRequest: boolean,
    purchaseRevisionLink: string,
    revisionNotes: Array<CustomerRevision>
  }

interface PortraitProps {
    selection: string | null,
    editPortrait: PortraitData | null,
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

const prices: any = {
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
        Full: 200,
        model: 150,
        character: 120,
        weapons: 125
    },
    NSFW: {
        Headshot: 150,
        Half: 200,
        Full: 225,
        model: 150,
        character: 120,
        weapons: 125
    }
}

const DEFAULT_FORM_STATE = {
    fileName: "No file selected",
    file: null,
};

const PortraitCustomizer = ({ selection, editPortrait, setEditPortrait, editIndex, portraits, setPortraits, setOpenWizard, totalPrice, setTotalPrice }: PortraitProps) => {
    if (selection === undefined || !selection) selection = ''
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [login, setLogin] = useState(false);

    const [portraitData, setPortraitData] = useState<PortraitData>(editPortrait ? editPortrait : {
        mode: `${selection}`, 
        characters: [],
        portraitTitle: '',
        requiredQs: ['', ''],
        questions: [{q1: '', q2: '', q3: '', q4: ''}, {q1: ''}, {q1: '', q2: ''}, {q1: '', q2: ''}, {q1: '', q2: ''}],
        price: 0,
        customer: '',
        customerId: '',
        artist: [],
        artistNotes: [],
        artistAssigned: false,
        creationDate: Timestamp.now(),
        purchaseDate: Timestamp.now(),
        status: 'Unpaid',
        lastUpdatedStatus: Timestamp.now(),
        paymentComplete: false,
        id: '',
        revisions: 2,
        revised: false,
        reassigned: false,
        additionalRevision: false,
        images: [],
        finalImages: [],
        revisionLevel: "",
        additionalRevisionRequest: false,
        purchaseRevisionLink: '',
        revisionNotes: []
    })

    const [customizerLoading, setCustomizerLoading] = useState(false)
    const [chars, setChars] = useState<Array<MyCharValues>>(portraitData.characters)
    const [charVariations, setCharVariations] = useState(false)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    const [openUpload, setOpenUpload] = useState(false)
    const [editImgGroup, setEditImgGroup] = useState<Upload | null>(null)
    const [editImgIndex, setEditImgIndex] = useState<number>(0)
    const [uploads, setUploads] = useState<Array<Upload>>([])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    // Redirect if finished loading and there's an existing user (user is logged in)
    useEffect(() => {
        if(selection === 'NSFW') {
            if (authUser) {
                setLogin(false)
               
                if (authUser?.oldEnough){
                    router.push('/portraits?selection=NSFW')
                    return
                    
                } else {
                    router.push('/')
                }                
            } else {
                setLogin(true)
            }
        }  
    }, [authUser])


    const handleLogin = () => {
        setLogin(true)
    }
    
    const handleClose = (event: object, reason: string) => {
        setCustomizerLoading(true)
        
        if (reason && reason == "backdropClick") {
            return
        }

        setCustomizerLoading(false)
    }

    const handleRedirect = () => {
        setLogin(false)
        router.push('/')
    }

    const submitPortrait = async (portraitFormData: PortraitData) => {
        
        const price = chars.reduce((sum, char) => sum += char?.total, 0)

        
        const newPortrait = {...portraitFormData, characters: chars, price: price, customerId: authUser?.uid, customer: authUser?.displayName }
        
        if (editPortrait) {
            let newImages: UploadedImgs[]
            if (uploads.length !== 0) {
                const bucket = await uploadImages(uploads, editPortrait.id)

                //update portrait with bucket info
                const updatedImages = await getImageUrls(editPortrait.id, bucket, uploads)
                newImages = [...updatedImages]
                console.log('newImages is: ', newImages)
            }

            let editedPortraitsData = portraits.map((portrait, i) => {
                if (editIndex === i) {
                    if (uploads.length !== 0) {
                        return {...newPortrait, images: [...editPortrait.images, ...newImages]}
                    } else {
                        return { ...newPortrait, images: [...portraitData.images]}
                    }
                } else {
                    return portrait
                }
            })

            

            let updatedTotalPrice = portraits.reduce((sum, p) => sum += p.price, 0)

            updatePortrait(newPortrait.id, {...editedPortraitsData[editIndex]})
            
            setTotalPrice(updatedTotalPrice)
            setPortraits(editedPortraitsData)
        } else {
            

            const id = await addPortrait(newPortrait)            

            //upload img to bucket
            const bucket = await uploadImages(uploads, id)

            //update portrait with bucket info
            const updatedImages = await getImageUrls(id, bucket, uploads)
            setTotalPrice(totalPrice + price)
            
            const updatedPortrait = {...newPortrait, id: id, images: [...updatedImages] }
               
            updatePortrait(id, updatedPortrait)
            
            setPortraits([ ...portraits, updatedPortrait ])

            //Add completed portrait to users reward totals
            //updateCustomerCommissionsTotal(authUser?.uid)
        }

        setEditPortrait(null)
        setOpenWizard(false)

    }  

    const handleEditImgGroup = (i: number) => {
        setEditImgIndex(i)
        setEditImgGroup(uploads[i])
               
        setOpenUpload(true)
    }
  
    const handleDeleteImgGroup = async (i: number) => {
        if (editPortrait) {
            try {
                
                //removes images from storage
                await deleteImages(portraitData.id, portraitData.images[i].fileNames)
                
                //create new array of images
                let updateUploadedImagesArr: Array<UploadedImgs> = portraitData.images.filter((img, j) => j !== i)
                console.log('updateUploadedImagesArr: ', updateUploadedImagesArr)

                //update portrait in database
                await deletePortraitImages(editPortrait.id, updateUploadedImagesArr)
                
                //setPortraits to update in live data
                setPortraitData((prev):PortraitData => ({...prev, images: updateUploadedImagesArr }))

                let editedPortraitsData = portraits.map((portrait, i) => {
                    if (editIndex === i) {
                       return {...editPortrait, images: updateUploadedImagesArr }
                    } else {
                        return portrait
                    }
                })

                setPortraits(editedPortraitsData)
                
            } catch (error) {
              console.log(error)
            }
        } else {
                       
            const updatedImgGroup = uploads.filter((imgGroup, index) => i !== index)
            setUploads(updatedImgGroup)
        }
        
    }

    return (
        <div className='relative w-full flex flex-col justify-start items-center min-h-screen bg-white text-black pb-10'>
            <img className="w-full absolute -top-[16px] left-0" src="./images/customizer/customizer.png" alt='background black paint drips'/>
            <div className="h-[150px] w-full flex flex-col justify-center items-center">
                <h2 className="w-full text-4xl text-center">Welcome to the <span className='text-[#0075FF] font-bold'>{selection}</span> Portrait Customizer</h2>
                <p className="w-full text-lg text-center pt-2">Make your selections to customize your portrait</p>
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

                                <div className='w-[100%] flex flex-wrap items-center mt-4'>
                                    {/* Add images */}
                                    <button
                                        type='button'
                                        onClick={() => setOpenUpload(true)}
                                        className='border-2 border-[#282828] rounded-xl px-4 py-2 hover:text-white hover:bg-[#0075FF]'
                                    >
                                        Add Images
                                    </button>
                                    <div className='flex'>
                                        {uploads.length !== 0 && uploads.map((imgGroup, i) => 
                                            <div key={i} className='border-2 border-[#282828] rounded-lg mx-4 p-2 flex '>
                                                {imgGroup.files.map((img, i) => <p key={i} className='mx-4'>{img.name}</p>)}
                                                
                                                <button type="button" onClick={() => handleEditImgGroup(i)} className='hover:text-[#0075FF] ml-4'>
                                                    <EditIcon />
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleDeleteImgGroup(i)} 
                                                    className='ml-4 hover:text-red-600 '
                                                    title='Remove from order? Unordered portraits can be found on your dashboard'
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {editPortrait && portraitData?.images.length !== 0 &&
                                    <div className='w-[100%] flex flex-wrap items-center mt-4 border-2 bg-[#e8e8e8] rounded-xl p-4'>
                                        <p>Previously uploaded images:</p>
                                        {portraitData.images.map((imgGroup, i) =>
                                        <div key={i} className='bg-white rounded-lg mx-4 p-2 flex '>
                                            {imgGroup.imageUrls.map((src, i) => <img src={src} key={i} className='mx-4 w-[32px] h-[32px] object-contain' alt='thumbnail of customer uploaded images'/>)}

                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteImgGroup(i)} 
                                                className='ml-4 hover:text-red-600 '
                                                title='Remove from order? Unordered portraits can be found on your dashboard'
                                            >
                                                <DeleteForeverIcon />
                                            </button>
                                        </div>)}
                                    </div>}
                                </div>
                                
                                
                                {openUpload && <AddImages 
                                    uploads={uploads}
                                    setUploads={setUploads}
                                    openUpload={openUpload}
                                    setOpenUpload={setOpenUpload}
                                    editImgGroup={editImgGroup}
                                    setEditImgGroup={setEditImgGroup}
                                    editImgIndex={editImgIndex}
                                />}


                                {/* Submit Button */}
                                {authUser && <button 
                                    type="submit" 
                                    className={`w-6/12 rounded-lg p-2 text-center mt-4 ${chars.length !== 0 
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
                                    selection={selection}
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
                            <Dialog 
                                onClose={handleClose} 
                                open={login} 
                                fullWidth={true}
                                maxWidth='xs'
                                PaperProps={{ sx: { p: 6, backgroundColor: "#282828", color: "white", display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", border: "4px solid white", borderRadius: "10px"} }}
                            >
                        
                                <h3 className='text-2xl font-bold pb-0 mb-4'>Please Login to Continue</h3>
                                <h4>Portrait Customizer</h4>
                                {selection === 'NSFW' 
                                    ? <p className='pb-4 text-center mt-4'>In order to customize a NSFW portrait, you must Login or Create an Account</p>
                                    :
                                    <p className='pb-4 text-center mt-4'>In order to fully customize your portrait, please Login or Create an Account</p>
                                }
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                                <Button 
                                    onClick={handleRedirect}
                                    className='pt-4'
                                >
                                    <div className='text-white border-2 border-white px-4 py-2 rounded-lg flex flex-col'>
                                        <p className='text-md' >Return to Homepage</p>
                                        <p className='text-xs text-[#DCDCDC]'>(You will lose any progress on your customization)</p>
                                    </div>
                                        
                                </Button>
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
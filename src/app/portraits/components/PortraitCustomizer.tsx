import { useAuth } from '@/app/firebase/auth';
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
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
import LoginDialog from '@/app/components/LoginDialog';
import ConfirmCancel from './questionaire/ConfirmCancel';

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
    characters: Array<MyCharValues>,
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
    setTotalPrice: Function,
}


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

    if (selection === undefined || !selection) selection = 'Photorealistic'
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [customizerLogin, setCustomizerLogin] = useState(false);

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

    const [chars, setChars] = useState<Array<MyCharValues>>(portraitData?.characters)
    const [charVariations, setCharVariations] = useState(false)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    const [openUpload, setOpenUpload] = useState(false)
    const [editImgGroup, setEditImgGroup] = useState<Upload | null>(null)
    const [editImgIndex, setEditImgIndex] = useState<number>(0)
    const [uploads, setUploads] = useState<Array<Upload>>([])

    const [cancelPortrait, setCancelPortrait] = useState<boolean>(false)


    useEffect(() => {
        window.scrollTo(0, 0)
        
        if (!editPortrait) {
            const charData = window.localStorage.getItem('charList')
            if (charData !== null && JSON.parse(charData).length !== 0) setChars(JSON.parse(charData))
        } 
    }, [])

    useEffect(() => {
        if(!customizerLogin) {
            window.localStorage.setItem('charList', JSON.stringify([]))
        }
    }, [customizerLogin])

    // Redirect if finished loading and there's an existing user (user is logged in)
    useEffect(() => {
        if(selection === 'NSFW') {
            if (authUser) {
                setCustomizerLogin(false)
                if (authUser?.oldEnough){
                    return
                } else {
                    setCustomizerLogin(true)
                    window.localStorage.setItem('charList', JSON.stringify(chars))
                }                
            } else {
                window.localStorage.setItem('charList', JSON.stringify(chars))
                setCustomizerLogin(true)
            }
        } else {
            if (chars.length !== 0) {
                if (!authUser) {
                    setPortraitData({...portraitData, characters: chars})
                    window.localStorage.setItem('charList', JSON.stringify(chars))
                    setCustomizerLogin(true)
                } else {
                    setPortraitData({...portraitData, characters: chars})
                    setCustomizerLogin(false)
                }
            }
        }
    }, [authUser, chars])


    const handleLogin = () => {
        console.log('clicked login')
        setCustomizerLogin(true)
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
                /* console.log('newImages is: ', newImages) */
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

            let updatedTotalPrice = editedPortraitsData.reduce((sum, p) => sum += p.price, 0)

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

        }
        window.localStorage.setItem('charList', JSON.stringify([]))
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
                /* console.log('updateUploadedImagesArr: ', updateUploadedImagesArr) */

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

    const handleReturn = () => {
        setCancelPortrait(true)
    }

    return (
        <div className='relative w-full flex flex-col justify-start items-center min-h-screen text-white pb-10 bg-gradient-to-b from-black from-20% via-[#282828] via-50% to-black to-90%'>
            <div className="h-[130px] w-full flex flex-col justify-center items-center">
                <h2 className="w-full text-4xl text-center">Welcome to the <span className='text-[#43b4e4] font-bold'>{selection}</span> Portrait Customizer</h2>
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
                            <div className='w-6/12 flex flex-col items-center border-b border-white'>
                                
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


                                {/* Submit Button */}
                                <div className='w-11/12 h-full my-8 flex justify-around items-center'>
                                    <div
                                        onClick={handleReturn}
                                        className='border border-white rounded-xl py-2 px-4 cursor-pointer flex flex-col justify-center items-center hover:text-red-600 hover:border-red-600'
                                    >
                                        <p>Cancel Portrait Creation</p>
                                        <p className='text-sm text-white/75'>(Return to cart, progress will be lost)</p>

                                    </div>

                                    {authUser && <button 
                                        type="submit" 
                                        className={`w-6/12 rounded-xl text-center ${chars.length !== 0 
                                            ? 'text-black text-center text-2xl py-2 px-4 font-semibold bg-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out' 
                                            : 'text-[#494949] p-4  border-2 border-[#494949] bg-[#E9E9E9] bg-opacity-50'}`}
                                        disabled={chars.length === 0}
                                        title='Complete required fields'
                                    >
                                        Add Portrait to Cart
                                    </button>}
                                
                                </div>

                                {cancelPortrait && <ConfirmCancel
                                    cancelPortrait={cancelPortrait}
                                    setCancelPortrait={setCancelPortrait}
                                    setOpenWizard={setOpenWizard}
                                />}

                                {/* {!authUser && chars.length !== 0 && 
                                    <>
                                        <Button onClick={handleLogin} className='w-6/12 text-black border-2 border-black rounded-lg p-2 text-center mt-4'>
                                            Login/Create Account to Continue
                                        </Button>
                                        <p>(You must be logined in to create a portrait)</p>
                                    </>
                                } */}
                            </div>
                        

                            <div className='w-6/12 px-8'>
                                <h2 className='text-2xl text-center font-bold'>Required Questions</h2>
                                <div className='p-3 flex justify-start items-center'>
                                    <label className='text-[#43b4e4] text-xl font-bold text-gray-light mr-2'>
                                        Name your portrait:
                                    </label>
                                    <Field 
                                        name="portraitTitle" 
                                        className="w-8/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                                        required
                                    />
                                </div>

                                {/* Images */}
                                <div className='w-[100%] flex flex-wrap items-center mt-4'>
                                    {/* Add images */}
                                    <button
                                        type='button'
                                        onClick={() => setOpenUpload(true)}
                                        className='text-lg font-bold ml-2 border-2 rounded-xl px-4 py-2 text-black border-black bg-gradient-to-r from-[#338cb2] to-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'
                                    >
                                        Add Images
                                    </button>
                                    {/* {uploads.length === 0 && */}
                                    <p className='text-[#43b4e4] text-lg font-bold ml-4'>Upload reference/inspiration images to help guide your artist</p>
                                    {/* } */}

                                    <div className='ml-2 flex flex-wrap'>
                                        {uploads.length !== 0 && uploads.map((imgGroup, i) => 
                                            <div key={i} className='border-2 border-[#E9E9E9] rounded-lg mr-4 my-2 p-2 flex '>
                                                {imgGroup.files.map((img, i) => <p key={i} className='mx-4'>{img.name}</p>)}
                                                
                                                <button type="button" onClick={() => handleEditImgGroup(i)} className='hover:text-[#43b4e4] ml-4'>
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
                                        <p className='text-black'>Previously uploaded images:</p>
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
                                
                                <RequiredQuestions />
                            </div>    
                        </div>



                        {chars.length !== 0 && 
                            <div className='w-10/12 mx-auto mt-8'>
                                <div className='text-center'>
                                    <h3 className='text-xl font-bold'>Let us know more. . .</h3>
                                    <p>Answering the <span className='font-semibold'>optional</span> questions below helps your artist understand your vision.</p>
                                </div>
                                
                                <StepTwo 
                                    selection={selection}
                                    charVariations={charVariations}
                                    pet={pet}
                                    charSheet={charSheet}
                                    weaponSheet={weaponSheet} 
                                />
                            </div>
                        }
                        
                        <div className='mt-8 w-full flex justify-around items-center'>
                            {customizerLogin && 
                                <LoginDialog
                                    selection={selection}
                                    customizer={true}
                                    login={customizerLogin}
                                    setLogin={setCustomizerLogin}
                                />
                            }
                        </div>
                          
                    </Form>
                )}
                </Formik>
            </div>
        </div>
      )
}

export default PortraitCustomizer



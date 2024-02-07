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
import { useCategoriesContext } from '@/app/context/CategoriesContext';

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

export interface MyAnimalValues {
    type: string,
    price: number
}

export interface MyBgValues {
    type: string,
    price: number
}


export interface PortraitData  {
    mode: string, 
    characters: Array<MyCharValues>,
    animals: Array<MyAnimalValues>,
    bg: MyBgValues,
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
    revisionNotes: Array<CustomerRevision>,
    portraitCompletionDate: Timestamp | null
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


const DEFAULT_FORM_STATE = {
    fileName: "No file selected",
    file: null,
};

const PortraitCustomizer = ({ selection, editPortrait, setEditPortrait, editIndex, portraits, setPortraits, setOpenWizard, totalPrice, setTotalPrice }: PortraitProps) => {
    const { categories } = useCategoriesContext()

    const choice = (selection === undefined || !selection) ? 'cat1' : selection
    if (selection === undefined || !selection) selection = categories['cat1'].type
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [customizerLogin, setCustomizerLogin] = useState(false);

    const [portraitData, setPortraitData] = useState<PortraitData>(editPortrait ? editPortrait : {
        mode: `${categories[choice].type}`, 
        characters: [],
        animals: [],
        bg: {type: 'None', price: 0},
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
        revisionNotes: [],
        portraitCompletionDate: null
    })

    const [chars, setChars] = useState<Array<MyCharValues>>(portraitData?.characters)
    const [charVariations, setCharVariations] = useState(false)
    const [animals, setAnimals] = useState<Array<MyAnimalValues>>(portraitData?.animals)
    const [bg, setBg] = useState<MyBgValues>(portraitData?.bg)
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

            const animalData = window.localStorage.getItem('animalList')
            if (animalData !== null && JSON.parse(animalData).length !== 0) setAnimals(JSON.parse(animalData))

            const bgData = window.localStorage.getItem('bgList')
            if (bgData !== null && JSON.parse(bgData).length !== 0) setBg(JSON.parse(bgData))
        } 
    }, [])

    useEffect(() => {
        if(!customizerLogin) {
            window.localStorage.setItem('charList', JSON.stringify([]))
            window.localStorage.setItem('animalList', JSON.stringify([]))
            window.localStorage.setItem('bgList', JSON.stringify({type: 'None', price: 0}))
        }
    }, [customizerLogin])

    // Redirect if finished loading and there's an existing user (user is logged in)
    useEffect(() => {
        if(selection === 'cat3') {
            if (authUser) {
                setCustomizerLogin(false) 
                if (authUser?.oldEnough){
                    return
                } else {
                    window.localStorage.setItem('charList', JSON.stringify(chars))
                    window.localStorage.setItem('animalList', JSON.stringify(animals))
                    window.localStorage.setItem('bgList', JSON.stringify(bg))
                    setCustomizerLogin(true)
                }
                               
            } else {
                window.localStorage.setItem('charList', JSON.stringify(chars))
                window.localStorage.setItem('animalList', JSON.stringify(animals))
                window.localStorage.setItem('bgList', JSON.stringify(bg))
                setCustomizerLogin(true)
            }
        } else {
            if (chars.length !== 0) {
                if (!authUser) {
                    setPortraitData({...portraitData, characters: chars})

                    window.localStorage.setItem('charList', JSON.stringify(chars))
                    window.localStorage.setItem('animalList', JSON.stringify(animals))
                    window.localStorage.setItem('bgList', JSON.stringify(bg))
                
                    setCustomizerLogin(true)
                } else {
                    setPortraitData({...portraitData, characters: chars, animals: animals, bg: bg})
                    setCustomizerLogin(false)
                }
            }
        }
    }, [authUser, chars, animals, bg])


    // const handleLogin = () => {
    //     console.log('clicked login')
    //     setCustomizerLogin(true)
    // }

    const submitPortrait = async (portraitFormData: PortraitData) => {
        
        const price = chars.reduce((sum, char) => sum += char?.total, 0) + animals.reduce((sum, animal) => sum += animal?.price, 0) + bg.price
    
        const newPortrait = {...portraitFormData, characters: chars, animals: animals, bg:bg, price: price, customerId: authUser?.uid, customer: authUser?.displayName }
        
        if (editPortrait) {
            let newImages: UploadedImgs[]
            if (uploads.length !== 0) {
                const bucket = await uploadImages(uploads, editPortrait.id)

                //update portrait with bucket info
                const updatedImages = await getImageUrls(editPortrait.id, bucket, uploads)
                newImages = [...updatedImages]
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
        window.localStorage.setItem('animalList', JSON.stringify([]))
        window.localStorage.setItem('bgList', JSON.stringify([]))
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
            <div className="my-8 xl:my-0 xl:h-[130px] w-full lg:w-9/12 xl:w-full flex flex-col justify-center items-center">
                <h2 className="w-full text-4xl text-center">Welcome to the <span className='text-[#43b4e4] font-bold'>{categories[choice].type}</span> Portrait Customizer</h2>
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
                        <div className='w-full flex flex-col xl:flex-row flex-between'>
                        
                            <div className='w-full xl:w-7/12 flex flex-col items-center'> 
                                
                                {/* Create Characters */}
                                <StepOne 
                                    prices={categories[choice].prices}
                                    portraitData={portraitData} 
                                    chars={chars}
                                    setChars={setChars} 
                                    setCharVariations={setCharVariations}
                                    animals={animals}
                                    setAnimals={setAnimals}
                                    bg={bg}
                                    setBg={setBg}
                                    setCharSheet={setCharSheet}
                                    setWeaponSheet={setWeaponSheet} 
                                />


                                {/* Submit Button */}
                                <div className='w-11/12 h-full my-8 hidden xl:flex justify-around items-center'>
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

                            </div>
                        

                            <div className='w-full xl:w-5/12 px-4 xl:px-8 mt-8 xl:mt-0'>
                                <h2 className='text-2xl text-center font-bold'>Required Questions</h2>
                                <div className='p-2 xl:p-3 flex flex-wrap xl:flex-nowrap justify-start md:justify-between xl:justify-start items-center'>
                                    <label className='text-[#43b4e4] text-md font-bold text-gray-light mr-2'>
                                        Name your portrait:
                                    </label>
                                    <Field 
                                        name="portraitTitle" 
                                        className="w-full md:w-9/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg mt-2 xl:mt-0"
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
                                    
                                    <p className='text-[#43b4e4] text-xs lg:text-base xl:text-xs font-bold ml-4 mt-2 lg:mt-0'>Upload reference/inspiration images to help guide your artist</p>
                                    

                                    <div className='ml-2 flex flex-wrap'>
                                        {uploads.length !== 0 && uploads.map((imgGroup, i) => 
                                            <div key={i} className='border-2 border-[#E9E9E9] rounded-lg mr-4 my-2 p-2 flex flex-wrap gap-1'>
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
                                        <p className='text-black mr-2'>Previously uploaded images:</p>
                                        {portraitData.images.map((imgGroup, i) =>
                                        <div key={i} className='bg-white rounded-lg md:mr-4 mb-2 p-2 flex'>
                                            {imgGroup.imageUrls.map((src, i) => <img src={src} key={i} className='mx-2 md:mx-4 w-[24px] h-[24px] md:w-[32px] md:h-[32px] object-contain' alt='thumbnail of customer uploaded images'/>)}

                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteImgGroup(i)} 
                                                className='ml-4 text-black hover:text-red-600 '
                                                title='Remove uploads? Clicking this will remove this set of uploaded images'
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

                                {chars.length !== 0 && 
                                    <div className='w-full mt-8'>
                                        <div className='text-center'>
                                            <h3 className='text-xl font-bold'>Let us know more. . .</h3>
                                            <p>Answering the <span className='font-semibold'>optional</span> questions below helps your artist understand your vision.</p>
                                        </div>
                                        
                                        <StepTwo 
                                            charVariations={charVariations}
                                            animals={animals.length > 0}
                                            charSheet={charSheet}
                                            weaponSheet={weaponSheet} 
                                        />
                                    </div>
                                }
                            </div>    
                        </div>

                        {/* Submit Button */}
                        <div className='xl:hidden w-full h-full my-8 flex flex-col md:flex-row justify-around items-center'>
                            

                            {authUser && <button 
                                type="submit" 
                                className={`w-full md:w-1/2 rounded-xl text-center ${chars.length !== 0 
                                    ? 'text-black text-center text-2xl py-2 px-4 font-semibold bg-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out' 
                                    : 'text-[#494949] p-4  border-2 border-[#494949] bg-[#E9E9E9] bg-opacity-50'}`}
                                disabled={chars.length === 0}
                                title='Complete required fields'
                            >
                                Add Portrait to Cart
                            </button>}

                            <div
                                onClick={handleReturn}
                                className='mt-4 md:mt-0 border border-white rounded-xl py-2 px-4 cursor-pointer flex flex-col justify-center items-center hover:text-red-600 hover:border-red-600'
                            >
                                <p>Cancel Portrait Creation</p>
                                <p className='text-sm text-white/75'>(Return to cart, progress will be lost)</p>

                            </div>
                        
                        </div>
                        
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



import { useEffect, useState } from 'react'
import { updatePortrait } from '@/app/firebase/firestore';
import { Formik, Form } from 'formik';
import { PortraitData } from '../../components/PortraitCustomizer'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StepTwo from '../../components/questionaire/StepTwo';
import RequiredQuestions from '../../components/questionaire/RequiredQuestions';
import CharList from '@/app/components/CharList';
import DisplayedRequiredQuestions from '@/app/components/DisplayedRequiredQuestions';
import DisplayedOptionalQuestions from '@/app/components/DisplayedOptionalQuestions';
import { MyCharValues } from '../../components/questionaire/StepOne';
import ImgSet from '@/app/components/ImgSet';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteImages } from '@/app/firebase/storage';
import { deletePortraitImages } from '@/app/firebase/firestore';
import { UploadedImgs } from '../../components/PortraitCustomizer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import { Upload } from '../../components/PortraitCustomizer';
import UploadImages from './CustomerUploads';
import { uploadImages } from '@/app/firebase/storage';
import { getImageUrls } from '@/app/firebase/firestore';
import AnimalList from '@/app/components/AnimalList';

interface QuestionsProps {
    portrait: PortraitData,
    setPortrait: Function,
    openQuestions: boolean,
    setOpenQuestions: Function,
    canEditQs: boolean,
    role: string
}

const Questions = ({ portrait, setPortrait, openQuestions, setOpenQuestions, canEditQs, role }: QuestionsProps) => {

    const [charVariations, setCharVariations] = useState(false)
    const [animals, setAnimals] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    const [openImgSet, setOpenImgSet] = useState(false)
    const [imgSetIndex, setImgSetIndex] = useState(0)

    const [openUpload, setOpenUpload] = useState(false)
    const [uploads, setUploads] = useState<Array<Upload>>([])

    useEffect(() => {
        portrait?.characters.forEach((char: MyCharValues) => {
            if (char.numCharVariations > 1) setCharVariations(true)
        
            if(char.extras.includes('character')) setCharSheet(true)
        
            if(char.extras.includes('weapons')) setWeaponSheet(true)

        })

        if (portrait.animals.length > 0) setAnimals(true)
    }, [])

    const updateQuestions = async (values: PortraitData) => {

        if (uploads.length !== 0) {
            const bucket = await uploadImages(uploads, portrait?.id)

            //update portrait with bucket info
            const updatedImages = await getImageUrls(portrait?.id, bucket, uploads)
            

            const updatedValues = {...values, images: [...portrait?.images, ...updatedImages]}
            updatePortrait(values.id, updatedValues)
            setPortrait(updatedValues)
        } else {
            setPortrait({...values, images: portrait?.images})
        }
        
        setOpenQuestions(false)
    }

    const handleClose = () => {
        setOpenQuestions(false)
    }

    const handleOpenImgSet = (i: number) => {
        setImgSetIndex(i)
        setOpenImgSet(true)
    }

    const handleDeleteImgGroup = async (i: number) => {
        //removes images from storage
        await deleteImages(portrait.id, portrait.images[i].fileNames)
        
        //create new array of images
        let updateUploadedImagesArr: Array<UploadedImgs> = portrait.images.filter((img, j) => j !== i)

        //update portrait in database
        await deletePortraitImages(portrait.id, updateUploadedImagesArr)
        
        //setPortraits to update in live data
        setPortrait({...portrait, images: updateUploadedImagesArr })
    }

    const handleAddImage = () => {
        setOpenUpload(true)
    }

    const handleDeleteNewImgGroup = (i: number) => {
        const updatedImgGroup = uploads.filter((upload, index) => i !== index)

        setUploads(updatedImgGroup)
    }

    return (
        <Dialog 
            onClose={() => setOpenQuestions(false)} 
            open={openQuestions} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenQuestions(false)} className='absolute top-2 -right-4 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>  
            <div className="flex justify-center items-center mb-4">
                <img className="mr-4 w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black accent paint splash'/>
                <p className='text-4xl text-center font-bold mt-0'>Portrait Details</p>
                <img className="ml-4 w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='black accent paint splash'/>
            </div>

            {canEditQs && role !== 'Customer' && <p className='text-sm text-[#9e9e9e] text-center mb-8'>Customer can still edit image uploads and question answers</p>}

            
            <div className='flex justify-between items-center mb-4'>
                <p className='text-xl font-semibold'><span className='font-normal'>Title:</span> {portrait.portraitTitle} <span className='text-md text-[#9e9e9e] font-normal'>({portrait.mode})</span></p>

                <p className='text-md'>Purchase Date: <span className='font-semibold text-[#43b4e4]'>{new Date(portrait.purchaseDate.toDate()).toLocaleDateString("en-US")}</span> </p>           
            
            </div>

            <div className='w-full flex justify-between'>
                {/* display character details */}
                <CharList portrait={portrait} />
                
                <div className='w-1/2 flex flex-col'>
                    
                    <div className="relative w-full h-[100px] bg-white bg-[url('/images/customizer/bg_button.svg')] bg-bottom bg-cover p-4 text-black flex justify-end items-center border-2 border-[#282828] rounded-xl mb-2">
                        <p className="w-1/2 text-lg text-center font-semibold mr-8 mb-6 ">{portrait.bg.type === 'bgSimple' ? 'Simple' : 'Complex Background'}</p>                       
                    </div>

                    <AnimalList portrait={portrait} />
                </div>
                
            </div>
            

            {/* display images customer uploaded during creation */}
            <div className='bg-[#e8e8e8] rounded-lg p-4 my-4'>
                <p className='text-black'>Images uploaded by customer: <span className='text-[#9e9e9e]'>(click image to enlarge)</span></p>

                <div className='w-full flex mt-4'>
                    {role !== 'Customer' && portrait?.images.length === 0 && <p className='text-lg text-red-600'>(No images uploaded)</p>}
                    
                    {portrait?.images.length !== 0 && ((!canEditQs && role === 'Customer') || role !== 'Customer') &&
                    <div className='w-full bg-white rounded-xl p-4 flex flex-wrap'> 
                            {portrait.images.map((imgSet, i) => 
                                <div 
                                    key={i} 
                                    className={`relative flex justify-start items-center border-2 border-[#282828] rounded-lg mr-4 ${canEditQs && role === 'Customer' ? 'pr-4' : ''}`}
                                    
                                >
                                    {imgSet.imageUrls.map((url, j) => <img 
                                        alt='customer uploaded image'
                                        className="w-[32px] h-[32px] object-contain m-2 cursor-pointer" 
                                        key={j} 
                                        src={url}
                                        onClick={() => handleOpenImgSet(i)}
                                    />)}
                                    
                                </div>
                            )}
                        </div>
                    }


                    {canEditQs && role === 'Customer' &&
                    <div className='w-full flex justify-around'>
                        <div className='w-[48%] bg-white rounded-xl px-4 py-2 flex flex-wrap'>
                            <p className='w-full mb-2'>Previously Uploaded Image Sets:</p>
                            {portrait?.images.length === 0
                                ? <p className='text-lg text-red-600'>(No images uploaded)</p>
                                : portrait.images.map((imgSet, i) => 
                                    <div 
                                        key={i} 
                                        className={`relative flex justify-start items-center border-2 border-[#282828] rounded-lg mr-4 ${canEditQs && role === 'Customer' ? 'pr-4' : ''}`}
                                        
                                    >
                                        {imgSet.imageUrls.map((url, j) => <img 
                                            alt='customer uploaded image'
                                            className="w-[32px] h-[32px] object-contain m-2 cursor-pointer" 
                                            key={j} 
                                            src={url}
                                            onClick={() => handleOpenImgSet(i)}
                                        />)}


                                        {canEditQs && role === 'Customer' && 
                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteImgGroup(i)} 
                                                className='absolute right-0 ml-4 hover:text-red-600 z-20'
                                                title='Remove this image set? This cannot be undone'
                                            >
                                                <DeleteForeverIcon />
                                            </button>
                                        }
                                        
                                    </div>
                                )
                            }
                        </div>

                    
                        <div  className='w-[48%] bg-white rounded-xl px-4 py-2 flex flex-wrap items-center'>
                            
                            <p className='w-full mb-2'>Upload Images:</p>
                        
                            {openUpload && 
                                <UploadImages 
                                    uploads={uploads}
                                    setUploads={setUploads}
                                    openUpload={openUpload}
                                    setOpenUpload={setOpenUpload}
                                />
                            }
                        
                            {uploads && 
                                uploads.map((imgSet, i) => 
                                <div 
                                    key={i} 
                                    className='flex justify-center items-center border-2 border-[#282828] rounded-lg mr-4 mt-2'
                                >
                                    {imgSet.files.map((file, i) => <p
                                        className="m-2" 
                                        key={i} 
                                    >{file.name}</p>)}
                                    
                                    <button 
                                        type="button" 
                                        onClick={() => handleDeleteNewImgGroup(i)} 
                                        className='ml-4 hover:text-red-600 '
                                        title='Remove this image set? This cannot be undone'
                                    >
                                        <DeleteForeverIcon />
                                    </button>
                                </div>
                                )
                            }
                            <button type='button' onClick={handleAddImage} className='flex flex-col items-center hover:bg-none hover:text-[#43b4e4]'>
                                <AddCircleOutlineIcon sx={{ fontSize: 40 }}/>
                            </button>
                        </div>
                    </div>}
                    
                    
                    
                    
                </div>

                {openImgSet && 
                  <ImgSet 
                    openImgSet={openImgSet} 
                    setOpenImgSet={setOpenImgSet} 
                    imgSet={portrait?.images[imgSetIndex]}
                  />
                }
            </div>

            <h2 className='text-2xl font-bold text-[#43b4e4] border-t-2 border-[#E5E5E5] pt-4'>Customer Questions</h2>
            {canEditQs && role === 'Customer' && <p className='text-sm text-[#9e9e9e] text-center'>(You have 24 hours from purchase to update/revise your answers)</p> }
            
            {canEditQs && role === 'Customer'
            ? <Formik
                initialValues={portrait}
                onSubmit={updateQuestions}
            >
                {({ values }) => (
                    <Form className='w-full '>
                        <div className='flex'>
                            <div className='w-6/12 flex flex-col items-center'>
                                <RequiredQuestions />
                            </div>

                            <div className='w-6/12 px-8'>
                                <h3 className='text-xl font-bold mt-4'>Let us know more. . .</h3>
                                <p>Answering the <span className='font-semibold'>optional</span> questions below helps your artist understand your vision.</p>
                                <StepTwo 
                                    charVariations={charVariations}
                                    animals={animals}
                                    charSheet={charSheet}
                                    weaponSheet={weaponSheet} 
                                />
                            </div>                            
                        </div>

                        <div className='w-8/12 mx-auto flex justify-between items-center'>

                            <button 
                                type="button" 
                                onClick={handleClose}
                                className='w-1/3 rounded-lg p-2 text-center mt-4 text-black border-2 border-black hover:text-white hover:bg-[#282828]'
                            >
                                Don&apos;t save
                            </button>

                            <button 
                                type="submit" 
                                className='w-1/3 rounded-lg p-2 text-center mt-4 text-black border-2 border-black hover:text-white hover:bg-[#2DD42B]'
                            >
                                Update Answers
                            </button>
                        </div>
                            
                    </Form>
                )}
            </Formik>
            :
            <div>
                <DisplayedRequiredQuestions portrait={portrait}/>
                <DisplayedOptionalQuestions 
                    portrait={portrait} 
                    charVariations={charVariations}
                    animals={animals}
                    charSheet={charSheet}
                    weaponSheet={weaponSheet} 
                />
                <div className='w-3/12 mx-auto'>
                    <button 
                        type="button" 
                        onClick={handleClose}
                        className='w-full mx-auto rounded-lg p-2 text-center mt-4 text-black border-2 border-black hover:text-white hover:bg-[#282828]'
                    >
                        {canEditQs && role === 'Customer' ? "Don't save" : "Back to Portrait"}
                    </button>
                </div>
                
            </div>
            } 
        </Dialog>
    )
}

export default Questions
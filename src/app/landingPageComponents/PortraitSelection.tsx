import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useAuth } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { updateUserById } from "../firebase/firestore";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Footer from "@/app/components/Footer"
import { Carousel } from "react-responsive-carousel"
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { ModeProps } from "./Home";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import LogoColor from '../../../public/images/Logo_Full_ups.png'
import Home2_testimonial_group from "./Home2_testimonial_group";
import { TestimonialType } from "../context/CategoriesContext";
import { useCategoriesContext } from "../context/CategoriesContext";


// Configure FirebaseUI.
const uiConfig = {
    signInFlow: 'popup', // popup signin flow rather than redirect flow
    signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        GoogleAuthProvider.PROVIDER_ID,
      ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        return false
      }
    },
};
  

const container = {
    hidden: {},
    show: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.25,
        }
    }
}

// const testimonialVariant = {
//     hidden: {
//         opacity: 0,
//         y: 200
//     },
//     show: {
//         opacity: 1,
//         y: 0
//     }
// }

// const splatterVariant = {
//     hidden: {
//         opacity: 0,
//         scale: 0
//     },
//     show: {
//         opacity: 1,
//         scale: 1
//     }
// }
// splashArt/PRBackground_V2.png

const PortraitSelection = ({ mode, setMode }: ModeProps) => {
    const { categories } = useCategoriesContext()

    const { authUser, isLoading } = useAuth();
    const router = useRouter();
    
    const catInfo = categories[mode]

    const testimonials: Array<TestimonialType> = categories.home.testimonials
    const featuredTestimonials = testimonials.filter(test => test.featured && test.category === catInfo.type)
   
    const imgSrc = catInfo.pics.selectionHero
    const bgImgSrc = catInfo.pics.selectionBG

    const [openLogin, setOpenLogin] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)  
    }, [])


    // Listen to changes for loading, authUser, and mode and redirect if needed
    useEffect(() => {

        if (!isLoading && mode === 'cat3' && !authUser ) {
            setOpenLogin(true)
        }
        
        if (!authUser?.oldEnough && mode === 'cat3') {
            setOpenConfirm(true)
        }

    }, [authUser, isLoading, mode]);

    let { scrollY } = useScroll()
    let y = useTransform(scrollY, [0, 300], ['100%', '0%'])
    let arrowOpacity = useTransform(scrollY, [0, 100], [1, 0])
    let opacity = useTransform(scrollY, [0, 200], [0, 1])


    const handleClose = ({event, reason}: {event: any, reason: any}) => {
        if (reason && reason == "backdropClick") {
            return
        }
    }

    const handleXClose = () => {
        if (mode === 'cat3') {
            router.push('/')
        }
        setOpenLogin(false)
    }

    const handleConfirm = () => {
        updateUserById(authUser?.uid)
        setOpenConfirm(false)
        setMode('cat3')
    }

    const handleCancel = () => {
        setOpenConfirm(false)
        setMode('Home')
    }

    const handleRedirect = () => {
        setOpenLogin(false)
        setMode('Home')
    }
    //options[`${mode}` as keyof OptionsType].tagline
  
    return (
        <div className="bg-black">
            {openLogin &&
                <Dialog onClose={handleClose} open={openLogin}>
                    <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[350px]  rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4 py-4'>
                        <IconButton onClick={handleXClose} className='absolute top-2 right-2 text-white'>
                            <CloseIcon className='text-white hover:text-red-600'/>
                        </IconButton>
                        <div className='relative w-[128px] h-[128px] object-cover my-4'>
                            <Image 
                                className=''
                                src={LogoColor} 
                                alt="Wattle Art Creations color logo" 
                                fill
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                priority={true}  
                            />
                        </div>
                        {/* <img src='Logo_Full_ups.png' className='w-[128px] h-[128px] my-4' alt='Wattle art creations logo'/> */}
                        <h3 className='text-2xl font-bold pb-0'>Please Login to Continue</h3>
                        <h4>Portrait Selection</h4>
                        <p className='pb-4'>In order to customize a NSFW portrait, you must Login or Create an Account</p>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                        
                        <Button 
                            onClick={handleRedirect}
                            className='pt-4'
                        >
                            <div className='text-white border-2 border-white px-4 py-2 rounded-lg flex flex-col'>
                                <p className='text-md' >Return to Homepage</p>
                            </div>
                                
                        </Button>
                        
                    </div>
                </Dialog>
            } 

            {openConfirm && authUser && !authUser?.oldEnough &&
            <div className="fixed w-full h-[100vh] bg-[#282828] z-[90]">
                <div className="fixed w-[40%] h-[40vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl p-8 bg-white border-2 border-[#282828] z-[100]">
                    <h2 className="text-3xl font-bold">You must be over <span className="text-[#43b4e4] text-4xl">18</span> to create a NSFW Portrait</h2>
                    <p className="text-center mt-4 text-xl">Are you over 18?</p>
                    <div className="w-8/12 mx-auto mt-2 flex justify-around items-center">
                        <button 
                            className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#282828] py-2" 
                            onClick={handleCancel}
                        >
                            No
                        </button>
                        
                        <button 
                            className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#43b4e4] py-2" 
                            onClick={handleConfirm}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
            }

            <div style={{backgroundImage: `url(${bgImgSrc})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} className="h-[200vh] relative flex justify-center pb-[2%]">
                <motion.object 
                    type="image/svg+xml" 
                    data="images/down-arrow.svg" 
                    className="absolute top-[70vh] left-[46%] w-[8%] h-[8%]"
                    initial={ { y: -10 }}
                    animate={{ y: 0}}
                    transition={{ duration: .75, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
                    style={{opacity: arrowOpacity}}
                />
                
                <motion.div 
                    className="w-[90%] sticky top-[12.5%] h-[80vh] rounded-2xl" 
                    style={{ opacity, y, backgroundColor: 'rgba(0, 0, 0, .7)'}} //rgba(255, 255, 255, .15)
                >
                    <div 
                        style={{ 
                            backgroundImage: `url(${imgSrc})`, 
                            backgroundRepeat: 'no-repeat', 
                            backgroundSize: 'cover'
                        }} 
                        className="w-full h-full flex items-center pl-[5%]"
                    >
                        <div className="w-[50%] flex flex-col justify-center bg-[#282828] rounded-2xl shadow-md  shadow-[#43b4e4]/50 text-white py-8 px-10 ">
                            <h2 className='font-bold text-4xl mb-8 text-left'>
                                Create a <span className="text-[#43b4e4]">{catInfo.type}</span> Portrait
                            </h2>
                            <p className="text-2xl font-light mb-[5%]">{catInfo.copy.selectionHeroBlurb}</p>
                            <motion.button 
                                disabled={authUser?.roles === 'Artist' || authUser?.roles === 'Admin'}
                                className="text-black mb-4 w-[50%] rounded-md px-4 py-2 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out" 
                                onClick={() => setMode(mode)} 
                                whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                                whileTap={{ scale: 1.05 }}
                            >
                                {authUser?.roles !== 'Artist' && authUser?.roles !== 'Admin'
                                ? <Link href={{
                                        pathname: '/portraits',
                                        query: {selection: mode, direct: 'true'},
                                        }} 
                                    className={`${(authUser?.roles !== 'Artist' && authUser?.roles !== 'Admin')
                                    ? 'text-2xl font-bold' : 'text-sm'} no-underline text-center`}
                                >
                                    Start Customizing
                                </Link>
                                : <p>Must be a customer to create a portrait</p>
                                }
                            </motion.button>  
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="relative w-full h-[110vh] flex justify-around items-center mt-[50px] mb-[50px] pt-[100px] pb-[50px] text-white bg-gradient-to-b from-black from-10% to-[#282828] to-95% z-10" >
                <object type="image/svg+xml" data="images/HIWIcons/b_w_bricks.svg" className="absolute top-0 -left-[3%] w-[105%] h-[100%]"/>
                
                <div className="absolute top-0 left-0 w-[90%] h-[100%] flex justify-around items-center z-50">
                    <motion.div className="w-[500px] h-[550px] ml-20 object-cover rounded-xl" >
                        <Carousel 
                            showArrows={true} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel rounded-xl shadow-[0_0_40px_-5px_rgba(255,255,255,0.8)]"
                        >
                            {catInfo.pics.selectionCarousel.map((img:string, i:number) => (<img key={i} src={`${img}`} alt="caro-img" className="w-[500px] h-[550px] object-cover object-top rounded-xl" />))}
                        </Carousel>
                    </motion.div>
                    
                    <motion.div className="w-[35%] mr-20" initial={{x: 500, opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{type:'spring', duration: 1, delay:.5}} viewport={{once: true}}>
                        <p className="font-bold text-5xl mb-8">{catInfo.type} Portrait</p>
                        <p className="font-light text-2xl mb-8">{catInfo.copy.selectionCarouselBlurb}</p>
                        <motion.button 
                            disabled={authUser?.roles === 'Artist' || authUser?.roles === 'Admin'}
                            className="text-black mb-4 w-[50%] rounded-md px-4 py-2 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out" 
                            onClick={() => setMode(mode)} 
                            whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                            whileTap={{ scale: 1.05 }}
                        >

                            {authUser?.roles !== 'Artist' && authUser?.roles !== 'Admin' 
                            ? <Link href={{
                                    pathname: '/portraits',
                                    query: {selection: mode, direct: 'true'},
                                    }} 
                                    className={`${(authUser?.roles !== 'Artist' && authUser?.roles !== 'Admin')
                                    ? 'text-2xl font-bold' : 'text-sm'} no-underline text-center`}
                            >
                                Start Customizing
                            </Link>
                            : <p>Must be a customer to create a portrait</p>
                            }
                        </motion.button>  
                    </motion.div>
                </div>
                
            </div>





            <div className='relative pt-[100px] mb-[70px] bg-black flex justify-center'>
                <object type="image/svg+xml" data="images/drips/personal_top_full2.svg" className="absolute w-[101%] -top-[7%] -left-[1px] right-0 z-20"></object>
                <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute -top-[10%] left-0 w-full h-auto -z-5"></object>
                
                
                <motion.div 
                    className='flex justify-around py-20 w-full relative z-30' 
                    variants={container} 
                    initial='hidden'
                    whileInView='show'
                    viewport={{ once: true }}
                >
                    <Home2_testimonial_group testGroup={featuredTestimonials}/>
                
                </motion.div>
            </div>

            <div className="relative w-[100%] h-[80vh] mb-[15%] bg-black flex flex-col justify-center items-center ">
                <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-0 left-0 w-full h-[110vh] -z-9"></object>
                <object type="image/svg+xml" data="images/splat.svg" className="absolute -top-[10%] left-0 w-full h-auto -z-8"/>
                
                <motion.button 
                    disabled={authUser?.roles === 'Artist' || authUser?.roles === 'Admin'}
                    className="text-black mt-[20%] mb-4 w-[30%] rounded-xl px-4 py-2 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] z-10 hover:scale-105 transition duration-200 ease-in-out" 
                    onClick={() => setMode(mode)} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                    whileTap={{ scale: 1.05 }}
                >
                    {authUser?.roles !== 'Artist' && authUser?.roles !== 'Admin'
                        ? <Link 
                            href={{
                                pathname: '/portraits',
                                query: {selection: mode, direct: 'true'},
                            }} 
                            className={`${(authUser?.roles !== 'Artist' && authUser?.roles !== 'Admin') ? 'text-2xl font-bold' : 'text-sm'} no-underline text-center`}
                        >
                            Start Customizing
                        </Link>
                        : <p>Must be a customer to create a portrait</p>
                        }
                </motion.button>  
            </div>

            <Footer />
        </div>
    )
}

export default PortraitSelection



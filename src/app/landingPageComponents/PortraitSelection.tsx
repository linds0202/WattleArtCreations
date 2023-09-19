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

const testimonialVariant = {
    hidden: {
        opacity: 0,
        y: 200
    },
    show: {
        opacity: 1,
        y: 0
    }
}

const splatterVariant = {
    hidden: {
        opacity: 0,
        scale: 0
    },
    show: {
        opacity: 1,
        scale: 1
    }
}


const PortraitSelection = ({ mode, setMode }: ModeProps) => {
    const { authUser, isLoading } = useAuth();
    const router = useRouter();
    
    const options: any = {
        Photorealistic: {
            title: mode,
            tagline: "Dissolve the Boundaries of Reality – Experience Unparalleled Artistry in Digital Photorealism",
            imgs: ["./images/heroImgs/heroImg2.png", "./images/heroImgs/heroImg3.png", "./images/heroImgs/heroImg4.png", "./images/heroImgs/heroImg5.png", "./images/heroImgs/heroImg6.JPG"],
            splashImg: './images/splashArt/PR.png',
            bgImg: './images/splashArt/PRBackground_V2.png',
            desc: "Embrace the power of precise strokes and discerning shadows, as our gifted artists capture your essence or your original characters in striking photorealistic detail. Here, the precision of digital technology marries the finesse of traditional artistry, resulting in a compelling photorealistic portrait that narrates your story or the tale of your created characters, and blurs the line between art and reality.",
            testimonials: [
                {author: 'Bob', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.Lorem ipsum dolor sit  pharetra sodales erat.'}, 
                {author: 'Jodie', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.'}, 
                {author: 'Alex', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}],
            basePrices: []
        },
        Anime: {
            title: mode,
            tagline: "Immerse Yourself in an Artistic Adventure with Custom Anime Portraits",
            imgs: ["./images/heroImgs/heroImg2.png", "./images/heroImgs/heroImg3.png", "./images/heroImgs/heroImg4.png", "./images/heroImgs/heroImg5.png", "./images/heroImgs/heroImg6.JPG"],
            splashImg: './images/splashArt/Anime.png',
            bgImg: './images/splashArt/PRBackground_V2.png',
            desc: "Take a step into the vibrant world of anime with our custom digital portraits. Rendered with passion and a flair for capturing the unique aesthetics of anime, we bring your characters—real or original—to life in breathtaking detail. Each stroke is a celebration of your imagination, intricately designed to resonate with the spirit of your narrative.",
            testimonials: [
                {author: 'Bob', body: 'good job'}, 
                {author: 'Jodie', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.'}, 
                {author: 'Alex', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}],
            basePrices: []
        },
        NSFW: {
            title: mode,
            tagline: "Unveil the Unspoken with Tasteful and Alluring NSFW Portraits",
            imgs: ["./images/heroImgs/heroImg2.png", "./images/heroImgs/heroImg3.png", "./images/heroImgs/heroImg4.png", "./images/heroImgs/heroImg5.png", "./images/heroImgs/heroImg6.JPG"],
            splashImg: './images/splashArt/NSFW.png',
            bgImg: './images/splashArt/PRBackground_V2.png',
            desc: "Indulge in the provocative yet tasteful world of NSFW portraits, where your desires are embraced with artistry and confidentiality. Our experienced artists are skilled at transforming your boldest visions into captivating digital art. Whether it's a daring depiction of a real individual or an original character, every piece is an exploration of sensuality and passion, handled with the utmost respect and professionalism.",
            testimonials: [{author: 'Bob', body: 'good job'}, 
                {author: 'Jodie', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.'}, 
                {author: 'Alex', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}],
            basePrices: []
        }
    }
    const imgSrc = options[`${mode}`].splashImg
    const bgImgSrc = options[`${mode}`].bgImg

    const [openLogin, setOpenLogin] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)        
    }, [])


    // Listen to changes for loading, authUser, and mode and redirect if needed
    useEffect(() => {

        if (!isLoading && mode === 'NSFW' && !authUser ) {
            setOpenLogin(true)
        }

        if (!authUser?.oldEnough && mode === 'NSFW') {
            setOpenConfirm(true)
        }

    }, [authUser, isLoading, mode]);

    let { scrollY } = useScroll()
    let y = useTransform(scrollY, [0, 300], ['100%', '0%'])
    let opacity = useTransform(scrollY, [0, 200], [0, 1])

    const handleClose = ({event, reason}: {event: any, reason: any}) => {
        if (reason && reason == "backdropClick") {
            return
        }
    }

    const handleXClose = () => {
        if (mode === 'NSFW') {
            router.push('/')
        }
        setOpenLogin(false)
    }

    const handleConfirm = () => {
        updateUserById(authUser?.uid)
        setOpenConfirm(false)
        setMode('NSFW')
    }

    const handleCancel = () => {
        setOpenConfirm(false)
        setMode('Home')
    }

    const handleRedirect = () => {
        setOpenLogin(false)
        setMode('Home')
    }
  
    return (
        <div>
            {openLogin &&
                <Dialog onClose={handleClose} open={openLogin}>
                    <div className='text-white text-center fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[300px]  rounded-lg bg-[#282828] flex flex-col justify-around items-center px-4 py-4'>
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
                    <h2 className="text-3xl font-bold">You must be over <span className="text-[#0075FF] text-4xl">18</span> to create a NSFW Portrait</h2>
                    <p className="text-center mt-4 text-xl">Are you over 18?</p>
                    <div className="w-8/12 mx-auto mt-2 flex justify-around items-center">
                        <button 
                            className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#282828] py-2" 
                            onClick={handleCancel}
                        >
                            No
                        </button>
                        
                        <button 
                            className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF] py-2" 
                            onClick={handleConfirm}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
            }

            <div style={{backgroundImage: `url(${bgImgSrc})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className="h-[200vh] relative flex justify-center pb-[2%]">
                <motion.div 
                    className="w-[90%] sticky top-[12.5%] h-[80vh] rounded-2xl" 
                    style={{ opacity, y, backgroundColor: 'rgba(0, 0, 0, .7)'}}
                >
                    <div 
                        style={{ 
                            backgroundImage: `url(${imgSrc})`, 
                            backgroundRepeat: 'no-repeat', 
                            backgroundSize: 'cover'
                        }} 
                        className="w-full h-full flex items-center pl-[5%]"
                    >
                        <div className="w-[50%] flex flex-col justify-center bg-[#282828] rounded-2xl shadow-md  shadow-amber-200/50 text-white py-4 px-10 ">
                            <h2 className='font-bold text-4xl mb-10 text-left'>
                                Create a <span className="text-amber-300">{options[`${mode}`].title}</span> Portrait
                            </h2>
                            <p className="text-xl mb-[5%]">{options[`${mode}`].tagline}</p>
                            <motion.button 
                                className="text-xl mb-4 border-2 border-white w-[50%] rounded-md px-4 py-2 hover:bg-white hover:text-black transition" onClick={() => setMode(mode)} 
                                whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                                whileTap={{ scale: 1.05 }}
                            >
                                <Link href={{
                                        pathname: '/portraits',
                                        query: {selection: mode},
                                        }} 
                                    className="text-2xl no-underline text-center"
                                >
                                    Start Customizing
                                </Link>
                            </motion.button>  
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-around items-center bg-[#282828] my-[50px] py-[50px] text-white relative" >
                <motion.div className="w-[40%] p-4 bg-white rounded-xl" >
                    <Carousel 
                        showArrows={false} 
                        showThumbs={false}
                        showStatus={false} 
                        autoPlay={true} 
                        infiniteLoop className="portrait-carousel-root portrait-carousel"
                    >
                        {options[`${mode}`].imgs.map((img:string, i:number) => (<img key={i} src={`${img}`} alt="caro-img" className="rounded-xl" />))}
                    </Carousel>
                </motion.div>
                
                <motion.div className="w-[35%]" initial={{x: 500, opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{type:'spring', duration: 1, delay:.5}} viewport={{once: true}}>
                    <p className="font-bold text-4xl mb-8">{options[`${mode}`].title} Portrait</p>
                    <p className="font-semibold text-xl mb-8">{options[`${mode}`].desc}</p>
                    <motion.button 
                        className="text-xl mb-4 border-2 border-white w-[50%] rounded-md px-4 py-2 hover:bg-white hover:text-black transition" onClick={() => setMode(mode)} 
                        whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                        whileTap={{ scale: 1.05 }}
                    >
                        <Link href={{
                                pathname: '/portraits',
                                query: {selection: mode},
                                }} 
                            className="text-2xl no-underline text-center"
                        >
                            Start Customizing
                        </Link>
                    </motion.button>  
                </motion.div>
                <img src='./drips/personal_top_full.png' className="absolute w-full top-[100%] left-0 right-0" alt='background black paint drips'/>
            </div>

            <div className='pt-[150px] pb-[75px] flex justify-center'>
                <motion.div 
                    className='flex justify-around py-20 w-[85%] relative' 
                    variants={container} 
                    initial='hidden'
                    whileInView='show'
                    viewport={{ once: true }}
                >
                    <div className="w-4/12 h-full flex justify-center items-center" >
                        <motion.div 
                            className="w-11/12 h-full flex flex-col justify-between items-center text-[#282828] p-8 border-2 rounded-xl border-black" 
                            variants={testimonialVariant} 
                            initial='hidden' 
                            whileInView='show' 
                            viewport={{ once: true }}
                            transition={{ delay: 0 + 1 / 3.5, duration: .25, type: 'spring' }}
                        >
                            <p>&ldquo;{options[`${mode}`].testimonials[0].body}&ldquo;</p>
                            <p className=' text-base font-bold text-right pr-10'>-{options[`${mode}`].testimonials[0].author}</p>
                        </motion.div>
                    </div>

                    <div className="w-4/12 h-full flex justify-center items-center" >

                        <motion.div 
                            className="w-11/12 h-full flex flex-col justify-between items-center text-[#282828] p-8 border-2 rounded-xl border-black" 
                            variants={testimonialVariant} 
                            initial='hidden' 
                            whileInView='show'
                            viewport={{ once: true }} 
                            transition={{ delay: .25 + 1 / 3.5, duration: .25, type: 'spring' }}
                        >
                            <p>&ldquo;{options[`${mode}`].testimonials[1].body}&ldquo;</p>
                            <p className=' text-base font-bold text-right pr-10'>-{options[`${mode}`].testimonials[1].author}</p>
                        </motion.div>
                    </div>

                    <div className="w-4/12 h-full flex justify-center items-center" >
                        <motion.div 
                            className="w-11/12 h-full flex flex-col justify-between items-center text-[#282828] p-8 border-2 rounded-xl border-black" 
                            variants={testimonialVariant} 
                            initial='hidden' 
                            whileInView='show' 
                            viewport={{ once: true }}
                            transition={{ delay: .5 + 1 / 3.5, duration: .25, type: 'spring' }}
                        >
                            <p>&ldquo;{options[`${mode}`].testimonials[2].body}&ldquo;</p>
                            <p className=' text-base font-bold text-right pr-10'>-{options[`${mode}`].testimonials[2].author}</p>
                        </motion.div>
                    </div>

                    {/* Splatters */}
                    <motion.img 
                        className="absolute -top-[50px] left-[75px] z-40" 
                        src='./images/testimonials/top_left.png' 
                        variants={splatterVariant} 
                        initial='hidden' 
                        whileInView='show' 
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: .25, type: 'spring' }}
                    />
                     
                    <motion.img 
                        className="absolute top-[75%] right-[50px] z-40" 
                        src='./images/testimonials/bottom_right.png' 
                        variants={splatterVariant} 
                        initial='hidden' 
                        whileInView='show' 
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: .5, type: 'spring' }}
                    />
                    <motion.img 
                        className="absolute -top-[50px] right-[190px] z-40" 
                        src='./images/testimonials/top_right.png' 
                        variants={splatterVariant} 
                        initial='hidden' 
                        whileInView='show' 
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: .25, type: 'spring' }}
                    />
                    <motion.img 
                        className="absolute top-[73%] left-[30px] z-40" 
                        src='./images/testimonials/bottom_left.png' 
                        variants={splatterVariant} 
                        initial='hidden' 
                        whileInView='show' 
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: .5, type: 'spring' }}
                    />

                </motion.div>
            </div>

            <div className="flex flex-col items-center pt-[100px]">
                <h2 className="text-4xl font-bold mb-4">Ready to start your own masterpiece?</h2>
                <p className="text-2xl font-semibold mb-8">Head on over to the portrait builder and </p>
                
                <motion.button 
                    className="text-xl mb-4 border-2 border-black w-[30%] rounded-md px-4 py-2 hover:bg-black hover:text-white transition" onClick={() => setMode(mode)} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                    whileTap={{ scale: 1.05 }}
                >
                    <Link href={{
                            pathname: '/portraits',
                            query: {selection: mode},
                            }} 
                        className="text-2xl no-underline text-center"
                    >
                        Start Customizing
                    </Link>
                </motion.button>  
            </div>

            <Footer />
        </div>
    )
}

export default PortraitSelection
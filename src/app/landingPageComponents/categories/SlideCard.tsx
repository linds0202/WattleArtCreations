'use client'

import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./styles.css";
import { ModeProps } from "../Home"
import { useState, useEffect } from "react";
import { useAuth } from "@/app/firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { getUserById, updateUserData } from "@/app/firebase/firestore";
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';

import { useRouter } from "next/navigation";
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";

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

export default function SlideCard({ setMode, mode }: ModeProps) {

    const { authUser, isLoading } = useAuth();
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState<UserData>(null)

    const [checkOpen, setCheckOpen] = useState(false)

    const handleLogin = () => {
        setLogin(true)
    }

    // Redirect if finished loading and there's an existing user (user is logged in)
    useEffect(() => {
        if (authUser) {
            setLogin(false)
        }
    }, [authUser])

    const category = {
        Photorealistic: {
            imgs: [
                './photoImgs/photo1.png',
                './photoImgs/photo2.png',
                './photoImgs/photo3.png',
                './photoImgs/photo4.jpg',
                './photoImgs/photo5.jpg',
                './photoImgs/photo6.jpg',
                './photoImgs/photo7.jpg',
                './photoImgs/photo8.png',
                './photoImgs/photo9.jpg',
            ],
            text: "Welcome to a world where art isn't just seen, but deeply felt. Where the lines blur between reality and canvas. Our bespoke photorealistic portraits aren't just images, they're narratives, crafted with skill and heart, capturing the essence of your story with breath-taking accuracy and depth."
        },
        Anime: {
            imgs: [
                './animeImgs/anime1.png',
                './animeImgs/anime2.jpg',
                './animeImgs/anime3.png',
                './animeImgs/anime4.png',
                './animeImgs/anime5.png',
                './animeImgs/anime6.png',
                './animeImgs/anime7.png',
                './animeImgs/anime8.png',
                './animeImgs/anime9.png',
                './animeImgs/anime10.png',
            ],
            text: "Ever dreamed of stepping into your favorite anime world, becoming a part of its vibrant colors, intricate lines, and ethereal aesthetics? We can help bring this dream to life! Our gifted artists will transform your image into a custom anime-style portrait that is unique, vibrant, and truly yours. Let us capture your essence in a style that resonates with your love for the world of anime. Whether it’s your favorite character or something completely original, let's turn the ordinary into extraordinary!"
        },
        NSFW: {
            imgs: [
                './nsfwImgs/nsfw1.jpg',
                './nsfwImgs/nsfw2.jpg',
                './nsfwImgs/nsfw3.jpg',
                './nsfwImgs/nsfw4.png',
                './nsfwImgs/nsfw5.png',
                './nsfwImgs/nsfw6.png',
                './nsfwImgs/nsfw7.png',
            ],
            text: "Step into a realm where art meets sensuality, where daring is celebrated and inhibition is a forgotten concept. Our curated selection of NSFW portraits pays tribute to the human form in its raw, honest, and enticing beauty. Commission your personalized NSFW portrait, and transform your deepest desires into a piece of art that's as provocative as it is personal. Navigate through our unique collection, and let's embark on a journey of artistic liberation."
        }
    }
    
    const handleSelection = async (mode: string) => {
        if (mode === 'NSFW') {
            const allowed = await getUserById(authUser?.uid)
            setUser(allowed)
            
            if(allowed.oldEnough) {
                setMode('NSFW')
            } else {
                setCheckOpen(true)
            }
        } else {
            setMode(mode)
        }
        
    }

    const handleConfirm = () => {
        updateUserData({...user, oldEnough: true})
        setCheckOpen(false)
        setMode('NSFW')
    }

    const handleCancel = () => {
        setCheckOpen(false)
        setMode('Home')
    }


    return (
        <div className="flex justify-start w-full">
            <div className="flex px-4 py-8 justify-between ">
                <div className="w-[49%]">
                    { (mode === "Photorealistic" || mode === 'Anime') &&
                        <Carousel
                            showArrows={false} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel"
                        >
                            {category[mode].imgs.map(el => {
                                    return (
                                    <img key={el} src={`${el}`} className="caro-img h-full object-contain"/>  
                                )})
                            }
                        </Carousel>
                    }

                    {mode === 'NSFW' && 
                        <img className='w-[80%] h-auto object-contain' src="./nsfwImgs/nsfw1.jpg" />
                    }
                </div>
                <div className="w-[45%] flex flex-col pt-14 pr-[5%] justify-center">
                    { (mode === "Photorealistic" || mode === 'Anime') &&
                        <>
                            <p className="font-bold text-4xl mb-10">{mode} Portrait</p>
                            <p className="text-xl mb-10">{category[mode].text}</p>
                        </>

                    }
                    <div className="flex justify-center">
                        {mode === 'NSFW' 
                            ? !authUser ?
                                <div>
                                    <button onClick={handleLogin} className='w-full text-black hover:text-white hover:bg-[#282828] border-2 border-black rounded-lg p-2 text-center mt-4'>
                                        Login/Create Account to Continue
                                    </button>
                                    <p className="text-black mt-2">(You must be logined in to create a NSFW portrait)</p>
                                </div>
                                : <motion.button 
                                    className="text-xl mb-4 border-2 border-black w-[50%] rounded-md px-4 py-2 hover:bg-black hover:text-white transition"
                                    onClick={() => handleSelection(mode)} 
                                    whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                                    whileTap={{ scale: 1.05 }}
                                    >
                                        Start Customizing
                                </motion.button>  
                            : <motion.button 
                                className="text-xl mb-4 border-2 border-black w-[50%] rounded-md px-4 py-2 hover:bg-black hover:text-white transition"
                                onClick={() => handleSelection(mode)} 
                                whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                                whileTap={{ scale: 1.05 }}
                                >
                                    Start Customizing
                            </motion.button>  
                        }
                    </div>
                </div>
            </div>

            {checkOpen && authUser && 

                <div className="fixed w-[40%] h-[40vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl p-8 bg-white border-2 border-[#282828]">
                    <h2 className="text-3xl font-bold">You must be over <span className="text-[#0075FF] text-4xl">18</span> to create a NSFW Portrait</h2>
                    <p className="text-center mt-4 text-xl">Are you over 18?</p>
                    <div className="w-8/12 mx-auto mt-2 flex justify-around items-center">
                        <button className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#0075FF] py-2" onClick={handleConfirm}>Yes</button>
                        <button className="w-4/12 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-red-600 py-2" onClick={handleCancel}>No</button>
                    </div>
                </div>
            }

            {/* Prompt for login */}
            {/* <Dialog onClose={() => setLogin(false)} open={login}>
                {!authUser && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
            </Dialog> */}
            <Dialog onClose={() => setLogin(false)} open={login}>
                <div className='bg-[#282828] flex flex-col justify-between items-center'>
                    <img src='Logo_Full_ups.png' className='w-[128px] h-[128px] my-4' />
                    <div className='bg-white rounded-b-lg py-4'>
                        <h3 className='text-black text-center text-lg font-semibold pb-4'>Login/Register</h3>
                        {!authUser && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
                    </div>
                </div>
            </Dialog>
            
        </div>

    )
}
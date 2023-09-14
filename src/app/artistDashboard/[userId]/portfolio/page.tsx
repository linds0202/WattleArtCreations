'use client'

import '../../../globals.css'
import { useEffect, useState } from 'react';
import { getUserById, getArtistsTestimonials, getNextTestimonials, getPreviousTestimonials } from '@/app/firebase/firestore';
import { useAuth } from '@/app/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import ArtistForm from './components/ArtistForm';
import { SocialIcon } from 'react-social-icons';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import { Rating } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FullReview from './components/FullReview';
import Footer from '@/app/components/Footer';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export interface UserData {
    uid: string,
    displayName: string,
    email: string,
    roles: string,
    artistName: string,
    bio: string,
    links: string[],
    website: string,
    country: string,
    activeCommissions: number,
    maxCommissions: number,
    totalCompletedCommissions: number,
    lifeTimeEarnings: number,
    paymentsOwing: number,
    totalPortraits: number,
    starRating: number,
    totalReviews: number,
    totalStars: number,
    oldEnough: boolean,
    joinedOn: Date,
    avatar: string,
}

export interface TestimonialData {
    artistId: string,
    customerDisplayName: string,
    customerId: string,
    imgUrl: string,
    includeImg: boolean,
    portraitId: string,
    stars: number,
    text: string
}


const Portfolio = () => {

    const currentUrl = usePathname()
    const artistId = currentUrl.split('/')[2]
    
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState<UserData | null>(null)
    const [isEdit, setIsEdit] = useState(false)
    const [links, setLinks] = useState<Array<string> | []>(userData ? userData.links : [])

    //For pagination of testimonials
    const [testimonials, setTestimonials] = useState<Array<TestimonialData>>([]);
    const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData>>()
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(true);
    const [page, setPage] = useState(1)
    const [openTestimonial, setOpenTestimnonial] = useState(false)


    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/')
        }
    }, [authUser, isLoading]);


    useEffect(() => {
        const handleGetUser = async () => {
          const getMyUserData: UserData | null = await getUserById(artistId);
          if (getMyUserData) setLinks(getMyUserData?.links)
          setUserData(getMyUserData)
        }
        handleGetUser()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            const firstTestimonials = await getArtistsTestimonials(artistId)
            console.log('firstTestimonials: ', firstTestimonials)
            
            if (firstTestimonials.testimonials.length < 5) {
                setDisableNext(true)
            }
            if (firstTestimonials) {
                setTestimonials(firstTestimonials.testimonials)
                setLast(firstTestimonials.lastVisible)
            }
            
        };

        fetchData();
    }, []);

    const handleNext = () => {
        const fetchNextData = async () => {
            const nextTestimonials = await getNextTestimonials(artistId, last)
        
            if (nextTestimonials.testimonials.length < 5) {
                setDisableNext(true)
            } else {
                setDisableNext(false) 
            }    
            setTestimonials(nextTestimonials.testimonials)
            setLast(nextTestimonials.lastVisible) 
            setPage(page + 1)
            setDisablePrevious(false)
        }

        fetchNextData();
    }
    

    const handlePrevious = () => {
        const fetchPreviousData = async () => {
            const previousTestimonials = await getPreviousTestimonials(artistId, last)
        
            if (page - 1 === 1) {
                setDisablePrevious(true)
            } else {
                setDisablePrevious(false)   
            }
            setTestimonials(previousTestimonials.testimonials)
            setLast(previousTestimonials.lastVisible)  
            setPage(page - 1)
            setDisableNext(false)
        }
        fetchPreviousData()
    }

    const handleOpenTestimonial = (i: number) => {
        setOpenTestimnonial(true)
    }

    const handleClick = () => {
        setIsEdit(true)
    }

    return (
        <div className='relative min-h-[100vh]'>
            <div className='relative pb-36'>
                <div className='flex justify-around'>
                    <div className='w-[48%]'>
                        <div className='w-full h-[80vh] flex flex-wrap justify-around items-center mt-4'>
                            <div className='w-[56%] h-[60%] border-2 border-black relative'>
                                <Image src={'/heroImgs/heroImg1.png'} alt='Default Avatar' fill style={{objectFit:"cover"}} /> 
                            </div>
                            <div className='w-[36%] h-[60%] flex flex-col justify-between items-center'>
                                <div className='w-full h-[48%] border-2 border-black relative'>
                                    <Image src={'/heroImgs/heroImg2.png'} alt='Default Avatar' fill style={{objectFit:"cover"}} /> 
                                </div>
                                <div className='w-full h-[48%] border-2 border-black relative'>
                                    <Image src={'/heroImgs/heroImg3.png'} alt='Default Avatar' fill style={{objectFit:"cover"}} /> 
                                </div>
                            </div>
                            <div className='w-[96%] h-[35%] flex justify-between items-center'>
                                <div className='w-[30%] h-full border-2 border-black relative'>
                                    <Image src={'/heroImgs/heroImg4.png'} alt='Default Avatar' fill style={{objectFit:"cover"}} /> 
                                </div>
                                <div className='w-[30%] h-full border-2 border-black relative'>
                                    <Image src={'/heroImgs/heroImg5.png'} alt='Default Avatar' fill style={{objectFit:"cover"}} /> 
                                </div>
                                <div className='w-[30%] h-full border-2 border-black relative'>
                                    <Image src={'/heroImgs/heroImg6.JPG'} alt='Default Avatar' fill style={{objectFit:"cover"}} /> 
                                </div>
                            </div>
                        </div>
                        
                        {userData &&  <div className='w-10/12 mx-auto my-8 flex justify-center items-center'>
                            <p>Follow me: </p>
                            <div className='flex justify-between items-center ml-4'>

                                {links.map((link, i) => 
                                    <SocialIcon 
                                        key={i} 
                                        url={link} 
                                        title={link}
                                        target="_blank" 
                                        fgColor={'#FFFFFF'} 
                                        style={{width: '40px', height: '40px', marginRight: 10}} 
                                        className='hover:scale-125 transition ease-in-out duration-300'
                                    />)
                                }

                                {userData?.website !== "" &&
                                <SocialIcon 
                                    url={`${userData?.website}`} 
                                    target="_blank" 
                                    fgColor={'#FFFFFF'} 
                                    style={{width: '40px', height: '40px', marginRight: 10}} 
                                    className='hover:scale-125 transition ease-in-out duration-300'
                                    title={`${userData?.website}`} 
                                />}
                                
                            </div>
                        </div>}
                        
                    </div>

                    {userData && <div className='w-[49%] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold mt-8'>{userData?.artistName}</h1>
                        <div className='flex justify-around items-center py-2'>
                            <p className='ml-2'><span className='font-semibold'>{userData?.totalCompletedCommissions}</span> completed {userData?.totalCompletedCommissions === 1 ? 'commission' : 'commissions'}</p>
                        </div>
                        <div className='flex justify-around items-center pb-4'>
                            <Rating name="read-only" value={userData?.starRating} readOnly precision={0.5} size="large"/>
                            <span>({userData?.starRating})</span>
                            <p className='ml-2'>&#x2022; <span>{userData?.totalReviews}</span> {userData?.totalReviews === 1 ? 'review' : 'reviews'}</p>
                        </div>
                        <p className='w-10/12 mt-4'>{userData?.bio}</p>
                        


                        <div className='w-10/12 border-2 border-[#282828] rounded-xl p-4 flex flex-col justify-center mt-4'>
                            <h3 className='text-2xl font-bold text-center'>Reviews</h3>
                            {testimonials?.map((testimonial, i) => (
                                <div key={i} className='w-10/12 mx-auto flex justify-center items-center border-b-2 border-[#E5E5E5] py-4'>
                                    <div className='w-[30%]'>
                                        <img src={testimonial.imgUrl} className='w-[128px] h-[128px] object-contain' alt='thumbnail for user testimonial'/>
                                    </div>
                                    <div className='w-[70%] mx-auto flex flex-col justify-between items-center py-4'>
                                        <div className='flex items-center'>
                                            <Rating name="read-only" value={testimonial.stars} readOnly precision={0.5} size="small" />
                                            <span className='ml-2'>({testimonial.stars})</span>
                                        </div>
                                        <p>
                                            {testimonial.text.split(/\s+/).slice(0, 20).join(" ")}... 
                                            <span 
                                                onClick={() => handleOpenTestimonial(i)}
                                                className='text-[#2DD42B] hover:text-[#165f15] cursor-pointer'
                                            >
                                                (Read more)
                                            </span>
                                        </p>
                                        <p className='self-end'>- {testimonial.customerDisplayName}</p>
                                    </div>
                                    <FullReview openTestimonial={openTestimonial} setOpenTestimnonial={setOpenTestimnonial} testimonial={testimonial}/>
                                </div>
                            ))}
                            
                            <div className='flex justify-center py-4'>
                                <button type='button' onClick={handlePrevious} disabled={disablePrevious}  className={`${!disablePrevious ? 'text-[#2DD42B]' : 'text-[#E9E9E9]' }`}>
                                    <ArrowBackIosIcon fontSize="large"/>
                                </button>

                                
                                <button type='button' onClick={handleNext} disabled={disableNext} className={`${!disableNext ? 'text-[#2DD42B]' : 'text-[#E9E9E9]' }`}>
                                    <ArrowForwardIosIcon fontSize="large"/>
                                </button>    
                            </div>                    
                        </div>
                    </div>}
                </div>
                
                {authUser?.uid === artistId && !isEdit && 
                        <button 
                            onClick={handleClick}
                            className="absolute top-4 right-8 border-2 rounded-full p-2 border-[#282828] hover:border-[#0075FF]"
                        >
                            <EditIcon sx={{ fontSize: 36, color: '#282828', ":hover": { color: "#0075FF"} }}/>
                        </button>
                }
                

                {isEdit && userData && links !== undefined && <ArtistForm 
                    setUserData={setUserData} 
                    userData={userData} 
                    setIsEdit={setIsEdit}
                    links={links}
                    setLinks={setLinks}
                />}

            </div>
            
            <Footer />
        </div>
        
    )
}

export default Portfolio

'use client'

import '../../../globals.css'
import { useEffect, useState } from 'react';
import { getUserById, getArtistsTestimonials, getNextTestimonials, getPreviousTestimonials } from '@/app/firebase/firestore';
import { useAuth } from '@/app/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import ArtistForm from './components/ArtistForm';
import ArtistImgUpload from './components/ArtistImgUpload';
import { SocialIcon } from 'react-social-icons';
import EditIcon from '@mui/icons-material/Edit';
import Rating from '@mui/material/Rating';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FullReview from './components/FullReview';
import Footer from '@/app/components/Footer';
import { QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';

interface ArtistImgs {
    imgUrl1: string,
    imgBucket1: string,
    imgUrl2: string,
    imgBucket2: string,
    imgUrl3: string,
    imgBucket3: string,
    imgUrl4: string,
    imgBucket4: string,
    imgUrl5: string,
    imgBucket5: string,
    imgUrl6: string,
    imgBucket6: string,
    imgUrl7: string,
    imgBucket7: string,
}

export interface Payout {
    date: Timestamp,
    amount: number,
    adminId: string,
    releaseDate: Timestamp,
    stripePaymentId: string,
    portraitId: string,
}
// export interface Payment {
//     date: Timestamp,
//     amount: number,
//     portraitId: string,
//     released: boolean,
// }

export interface Reward {
    badge: string,
    discount: number,
    level: number
}

export interface UserData {
    uid: string,
    displayName: string,
    email: string,
    roles: string,
    artistName: string,
    bio: string,
    links: string[],
    artistImgs: ArtistImgs,
    website: string,
    country: string,
    activeCommissions: number,
    maxCommissions: number,
    totalCompletedCommissions: number,
    lifeTimeEarnings: number,
    paymentsOwing: Array<string>,
    totalPortraits: number,
    starRating: number,
    totalReviews: number,
    totalStars: number,
    oldEnough: boolean,
    joinedOn: Date,
    avatar: string,
    payouts: Array<Payout>,
    customerDiscount: Reward
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
    const [openEditImg, setOpenEditImg] = useState(false)
    const [updateImg, setUpdateImg] = useState('')
    const [imgSizeMsg, setImgSizeMsg] = useState<string>('')
    const [index, setIndex] = useState<number>(0)
    const [links, setLinks] = useState<Array<string> | []>(userData ? userData.links : [])
    const [testimonialIndex, setTestimonialIndex] = useState<number>(0)
    const [getData, setGetData] = useState(false)

    //For pagination of testimonials
    const [testimonials, setTestimonials] = useState<Array<TestimonialData>>([]);
    const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData>>()
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(true);
    const [page, setPage] = useState(1)
    const [openTestimonial, setOpenTestimnonial] = useState(false)

    useEffect(() => {
        
        const handleGetUser = async () => {
          const getMyUserData: UserData | null = await getUserById(artistId);
          
          
          if (getMyUserData) setLinks(getMyUserData?.links)
          
          setUserData(getMyUserData)
        }
        handleGetUser()

        const fetchData = async () => {
            const firstTestimonials = await getArtistsTestimonials(artistId)
            if (firstTestimonials.testimonials.length < 5) {
                setDisableNext(true)
            }
            if (firstTestimonials) {
                setTestimonials(firstTestimonials.testimonials)
                setLast(firstTestimonials.lastVisible)
            }
            
        };

        fetchData();

        setGetData(true)
    }, [])


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
        window.scrollTo(0, 0) 
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
        window.scrollTo(0, 0) 
    }

    const handleOpenTestimonial = (i: number) => {
        setTestimonialIndex(i)
        setOpenTestimnonial(true)
    }

    const handleClick = () => {
        setIsEdit(true)
    }

    const handleEditImg = (num: number) => {
        if (!authUser || authUser?.uid !== artistId) return

        setIndex(num)
        switch(num) {
            case 1:
                if(userData?.artistImgs?.imgUrl1) {
                    setUpdateImg(userData.artistImgs.imgBucket1) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-500px h-450px')
              break;
            case 2:
                if(userData?.artistImgs?.imgUrl2) {
                    setUpdateImg(userData.artistImgs.imgBucket2) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-300px h-215px')
                break;
            case 3:
                if(userData?.artistImgs?.imgUrl3) {
                    setUpdateImg(userData.artistImgs.imgBucket3) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-300px h-215px')
                break;
            case 4:
                if(userData?.artistImgs?.imgUrl4) {
                    setUpdateImg(userData.artistImgs.imgBucket4) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-265px h-215px')
                break;
            case 5:
                if(userData?.artistImgs?.imgUrl5) {
                    setUpdateImg(userData.artistImgs.imgBucket5) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-265px h-215px')
                break;
            case 6:
                if(userData?.artistImgs?.imgUrl6) {
                    setUpdateImg(userData.artistImgs.imgBucket6) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-265px h-215px')
                break;
            case 7:
                if(userData?.artistImgs?.imgUrl7) {
                    setUpdateImg(userData.artistImgs.imgBucket7) 
                } else {
                    setUpdateImg('')
                }
                setImgSizeMsg('w-600px h-420px')
                break;
            default:
                break
        }
        
        setOpenEditImg(true)
    }


    return ((isLoading || !getData) ?
        <></>
        :
        <div className='relative min-h-[100vh] bg-black'>
            <object type="image/svg+xml" data="/images/colored_dots_final.svg" className="absolute top-[5%] left-0 w-[100%] h-auto z-0"/>
            <div className='relative pb-36'>
                <div className='px-8 pt-8 flex flex-col xl:flex-row justify-around'>
                    <div className='w-full xl:w-[50vw]'>  
                        <div className='w-full xl:w-[50vw] md:h-[50vh] xl:h-[80vh] flex flex-col items-center'>
                        
                            <div className='w-[100%] h-[70%] md:h-[60%] xl:h-[50vh] flex flex-wrap md:flex-nowrap justify-around items-center'>
                                <div 
                                    className={`w-full md:w-[50%] xl:w-[60%] h-[60%] md:h-[100%] p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-white cursor-pointer' : ''}`}
                                    onClick={() => handleEditImg(1)}   
                                >
                                    <img 
                                        src={userData?.artistImgs.imgUrl1} 
                                        alt='No artist img uploaded' 
                                        className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser?.roles === 'Artist' ? 'bg-white/50': ''}`} 
                                    />
                                </div>
                                <div className='w-full md:w-[45%] xl:w-[35%] h-[100%] mt-4 md:mt-0 flex flex-row xl:flex-col justify-between items-center'>
                                    <div 
                                        className={`w-full h-[100%] xl:h-[45%] p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-white cursor-pointer' : ''}`}
                                        onClick={() => handleEditImg(2)}
                                    >
                                        <img 
                                            src={userData?.artistImgs.imgUrl2} 
                                            alt='No artist img uploaded' 
                                            className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser?.roles === 'Artist' ? 'bg-white/50': ''}`}
                                        />
                                    </div>
                                    <div 
                                        className={`w-full h-[100%] xl:h-[45%] p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-white cursor-pointer' : ''}`}
                                        onClick={() => handleEditImg(3)}
                                    >
                                        <img 
                                            src={userData?.artistImgs.imgUrl3} 
                                            alt='No artist img uploaded' 
                                            className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser?.roles === 'Artist' ? 'bg-white/50': ''}`} 
                                        /> 
                                    </div>
                                </div>
                            </div>
                            
                            <div className='w-[98%] h-[35%] xl:h-[28vh] mt-4 flex justify-between items-center'>
                                <div 
                                    className={`w-[30%] h-full p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-white cursor-pointer' : ''}`}
                                    onClick={() => handleEditImg(4)}
                                >
                                    <img 
                                        src={userData?.artistImgs.imgUrl4} 
                                        alt='No artist img uploaded' 
                                        className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser?.roles === 'Artist' ? 'bg-white/50': ''}`} 
                                    /> 
                                </div>
                                <div 
                                    className={`w-[30%] h-full p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-white cursor-pointer' : ''}`}
                                    onClick={() => handleEditImg(5)}
                                >
                                    <img 
                                        src={userData?.artistImgs.imgUrl5} 
                                        alt='No artist img uploaded' 
                                        className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser?.roles === 'Artist' ? 'bg-white/50': ''}`}  
                                    /> 
                                </div>

                                <div 
                                    className={`w-[30%] h-full p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-white cursor-pointer' : ''}`}
                                    onClick={() => handleEditImg(6)}
                                >
                                    <img 
                                        src={userData?.artistImgs.imgUrl6} 
                                        alt='No artist img uploaded' 
                                        className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser?.roles === 'Artist' ? 'bg-white/50': ''}`} 
                                    /> 
                                </div>
                            </div>



                            {/* {authUser && authUser?.uid === artistId &&
                            <div className='w-full mt-8 bg-white p-2 rounded-xl flex'>
                                <div 
                                    className={`w-[40%] h-[300px] p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-black cursor-pointer' : ''}`}
                                    onClick={() => handleEditImg(7)}
                                >
                                    <img src={userData?.artistImgs.imgUrl7.length ? userData?.artistImgs.imgUrl7 : ''} alt='No artist img uploaded' className={`${userData?.artistImgs.imgUrl7.length ? 'w-[100%] h-[100%] object-cover': 'w-[100%] h-[100%] bg-black/50'}`} />
                                </div>
                                <div className='ml-4 pb-10 flex flex-col justify-between'>
                                    <p className='text-black text-2xl text-center'>Upload Images</p>
                                    <p className='text-black text-lg'>The above image collage is displayed on your individual artist details page.</p>
                                    <p className='text-black text-lg'>The image to the left is displayed on your artist card cover image on the All Artist page.</p>
                                </div>
                            </div>} */}

                        </div>

                        {authUser && authUser?.uid === artistId &&
                        <div className='w-full mt-8 bg-white p-2 rounded-xl flex flex-col md:flex-row'>
                            <div 
                                className={`w-full md:w-[40%] h-[300px] p-2 ${authUser && authUser?.uid === artistId && !openEditImg ? 'border-2 border-black cursor-pointer' : ''}`}
                                onClick={() => handleEditImg(7)}
                            >
                                    <img 
                                        src={userData?.artistImgs.imgUrl7} 
                                        alt='No artist img uploaded' 
                                        className={`w-[100%] h-[100%] object-contain ${userData?.artistImgs.imgUrl1 === "" && authUser.roles === 'Artist' ? 'bg-black/50': ''}`} 
                                    />
                            </div>
                            <div className='ml-4 pb-10 flex flex-col justify-between'>
                                <p className='text-black text-2xl text-center my-4 md:mt-0'>Click an image to upload/edit images</p>
                                <p className='text-black text-lg'>The above image collage is displayed on your individual artist details page.</p>
                                <p className='hidden md:block text-black text-lg'>The image to the left is displayed on your artist card cover image on the All Artist page.</p>
                                <p className='mt-8 md:hidden text-black text-lg'>The single image above is displayed on your artist card cover image on the All Artist page.</p>
                            </div>
                        </div>}
                    </div>                  
                        
                        {/* {userData &&  <div className='w-10/12 mx-auto my-8 flex justify-center items-center'>
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
                        </div>} */}

                    {userData && 
                    <div className='w-full xl:w-[48%] mt-8 xl:mt-0 flex flex-col items-center'>
                        <div className='relative w-full lg:w-10/12 bg-white rounded-xl p-4 flex flex-col justify-center items-center'>
                            {authUser?.uid === artistId && !isEdit && 
                            <button 
                                onClick={handleClick}
                                className="absolute top-4 right-4 md:right-8 border-2 rounded-full p-2 border-[#282828] hover:border-[#43b4e4]"
                            >
                                <EditIcon sx={{ fontSize: 36, color: '#282828', ":hover": { color: "#43b4e4"} }}/>
                            </button>
                            }

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
                        </div>


                        <div className='w-full lg:w-10/12 bg-white rounded-xl p-4 flex flex-col justify-center mt-4'>
                            <h3 className='text-black text-2xl font-bold text-center'>Reviews</h3>
                            {testimonials.length === 0
                            ? <p className='text-lg text-center mt-4'>No Reviews yet</p>
                            : testimonials?.map((testimonial, i) => (
                                <div key={i} className='w-full lg:w-10/12 mx-auto flex flex-col md:flex-row justify-center items-center border-b-2 border-[#E5E5E5] py-4'>
                                    <div className='w-full md:w-[30%]'>
                                        <img src={testimonial.imgUrl} className='w-[128px] h-[128px] object-contain mx-auto md:mx-0' alt='thumbnail for user testimonial'/>
                                    </div>
                                    <div className='w-full md:w-[70%] mx-auto flex flex-col justify-between items-center py-4'>
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
                                </div>
                            ))}

                            {openTestimonial && <FullReview openTestimonial={openTestimonial} setOpenTestimnonial={setOpenTestimnonial} testimonial={testimonials[testimonialIndex]}/>}
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
                
                
                

                {isEdit && userData && links !== undefined && <ArtistForm 
                    setUserData={setUserData} 
                    userData={userData}
                    isEdit={isEdit} 
                    setIsEdit={setIsEdit}
                    links={links}
                    setLinks={setLinks}
                />}

                {openEditImg && userData && 
                    <ArtistImgUpload
                    userData={userData}
                    setUserData={setUserData} 
                    edit={updateImg}
                    imgSizeMsg={imgSizeMsg}
                    index={index}
                    showDialog={openEditImg}
                    onCloseDialog={() => setOpenEditImg(false)}>
                </ArtistImgUpload>
                }
            </div>
            
            <Footer />
        </div>
        
    )
}

export default Portfolio

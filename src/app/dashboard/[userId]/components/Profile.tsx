'use client'

import { useEffect, useState } from 'react';
import { getUserById } from '@/app/firebase/firestore';
import { useAuth } from '@/app/firebase/auth';
import { useRouter } from 'next/navigation';
import CustomerProfileForm from './CustomerPorfileForm';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
import AvatarUploader from './AvatarUploader';
import AwardProgressBar from './AwardProgressBar';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import { Reward } from '../page';
import { useCategoriesContext } from '@/app/context/CategoriesContext';


interface ProfileProps {
    user: UserData | null,
}

const Profile = ({user}: ProfileProps) => {
    const { authUser, isLoading } = useAuth();
    const { categories } = useCategoriesContext()
    const router = useRouter();

    const [userData, setUserData] = useState<UserData | null>(user ? user : null)
    const [isEdit, setIsEdit] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)
    const [updateUser, setUpdateUser] = useState({})
    const [changeAvatar, setChangeAvatar] = useState<boolean>(false)

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/')
        }
    }, [authUser, isLoading]);


    useEffect(() => {
        const handleGetUser = async () => {
            const getMyUserData: UserData | null = await getUserById(authUser?.uid);
            if (getMyUserData !== null) setUserData(getMyUserData)
        }
          
        handleGetUser()
        
    }, [changeAvatar])

    const handleClick = () => {
        setIsEdit(true)
    }

    const onClickAdd = () => {
        setOpenUpload(true)
        
        if(userData?.avatar) {
            setUpdateUser({ avatarBucket: userData.avatar}) 
        } else {
            setUpdateUser({})
        }
    }

    return (
        <div className='w-full px-4 xl:px-14 py-4'>
            <div className='mt-12 md:mt-20 lg:mt-0 flex flex-col lg:flex-row justify-between items-center'>
                <div className='text-white flex justify-between items-center'>
                    <div className='w-[150px] h-[150px] bg-[#e5e5e5] border-2 border-[#282828] rounded-xl p-4 flex justify-center items-center relative'>
                        <Image 
                            priority={true} 
                            src={`${userData?.avatar ? userData.avatar : '/images/user.png'}`} 
                            alt='Default Avatar' 
                            width={128} 
                            height={128} 
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                        
                        <div style={{position: 'absolute', bottom: 0, right: 0, zIndex: 1000}}>
                            <IconButton aria-label="edit" color="secondary" onClick={onClickAdd} >
                                <EditIcon sx={{ fontSize: 24, color: '#282828', ":hover": { color: "#0075FF"} }} />
                            </IconButton>
                        </div>
                        
                    </div>

                    {userData && 
                        <div className='w-[60%] flex flex-col justify-center items-start ml-16 z-20'>
                            <div className='flex items-center'>
                                <h1 className='text-4xl font-bold'>{userData?.displayName}</h1>
                                {!isEdit && 
                                    <button 
                                        onClick={handleClick}
                                        className="ml-4 z-20"
                                    >
                                        <EditIcon sx={{ fontSize: 24, color: '#FFFFFF', ":hover": { color: "#0075FF"} }}/>
                                    </button>
                                }
                            </div>
                            
                            <p className='w-9/12 lg:w-8/12 mt-4'>Welcome to your dashboard</p>                    
                        </div>
                    }

                </div>
                
                {/* Rewards */}
                <div className='w-full lg:w-[60%] mt-8 lg:mt-0 bg-white border-2 border-[#282828] rounded-xl p-6 relative'>
                    <div className='absolute top-2 right-5 flex items-center'>
                        <p className='text-sm md:text-xl font-semibold mr-2 md:mr-4'>Rewards Discount</p>
                        <div className='w-[65px] h-[65px] mx-auto bg-[#43b4e4] text-white font-bold rounded-full flex justify-center items-center'>
                            {userData && <p className='text-xl text-center'>{Math.trunc(userData?.customerDiscount.discount * 100)}%</p>}
                        </div>
                    </div>
                    
                    <div className='md:px-2 flex flex-col xl:flex-row items-center'>
                        <img src={userData?.customerDiscount.badge} className='w-[96px] h-[96px] mr-4 self-start xl:self-auto' alt='user rewards badge icon'/>
                        <div className='w-full'>
                            <div className='mb-4 flex items-center'>
                                <h4 className='text-xl font-semibold'>My Rewards</h4>
                                <p className='ml-2'>(<span className='text-lg font-bold text-[#43b4e4] mx-[4px]'>{userData?.totalCompletedCommissions}</span>purchased portraits)</p>
                            </div>
                            <div className='md:mx-2 w-full'>
                                <p className='text-sm mb-10'>Progress to next discount level:</p>
                                <AwardProgressBar 
                                    completed={userData ? userData?.totalCompletedCommissions : 0} 
                                    bgcolor={'#43b4e4'}
                                    reward={userData?.customerDiscount !== null && userData?.customerDiscount !== undefined 
                                        ? userData?.customerDiscount 
                                        : {
                                            badge: '../../../../images/badges/zero.png',
                                            discount: 0,
                                            level: 0
                                        }
                                    }    
                                />
                            </div>
                        </div>      
                    </div>
                    <p className='text-center text-sm mt-10 font-light'>(# of purchased portraits)</p>
                    <p className='font-semibold mt-4'>Level up to save even more off future purchases. The more portraits you purchase, the more you save.</p>
                    <div className='mt-2 ml-6 flex gap-x-8'>
                        <p>Level 1 - <span>{Math.trunc(categories.customizer.rewardsDiscounts[0] * 100)}%</span></p>
                        <p>Level 2 - <span>{Math.trunc(categories.customizer.rewardsDiscounts[1] * 100)}%</span></p>
                        <p>Level 3 - <span>{Math.trunc(categories.customizer.rewardsDiscounts[2] * 100)}%</span></p>
                        <p>Level 4 - <span>{Math.trunc(categories.customizer.rewardsDiscounts[3] * 100)}%</span></p>
                        <p>Level 5 - <span>{Math.trunc(categories.customizer.rewardsDiscounts[4] * 100)}%</span></p>
                    </div>  
                    
                </div>
            </div>
            
            {openUpload && <AvatarUploader
                setChangeAvatar={setChangeAvatar}
                setUserData={setUserData} 
                edit={updateUser}
                showDialog={openUpload}
                setOpenUpload={setOpenUpload}
                >
            </AvatarUploader>}
            

            {isEdit && <CustomerProfileForm
                setUserData={setUserData} 
                userData={userData} 
                setIsEdit={setIsEdit}
            />}
        </div>
    )
}

export default Profile
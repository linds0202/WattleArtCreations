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

const awards = {
    0: {
        'next': 1, 
        'discount' : 0
    },
    1: {
        'next': 3, 
        'discount' : 5
    },
    3: {
        'next': 7, 
        'discount' : 10
    },
    7: {
        'next': 10, 
        'discount' : 15
    },
    10: {
        'num': 10, 
        'discount' : 20
    },
}

interface ProfileProps {
    user: UserData | null,
    badge: string
}

const Profile = ({user, badge}: ProfileProps) => {

    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState<UserData | null>(user ? user : null)
    const [isEdit, setIsEdit] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)
    const [updateUser, setUpdateUser] = useState({})
    const [changeAvatar, setChangeAvatar] = useState<boolean>(false)
    const [discount, setDiscount] = useState(awards[0])
 

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/')
        }
    }, [authUser, isLoading]);

    useEffect(() => {
        const handleGetUser = async () => {
            const getMyUserData: UserData | null = await getUserById(authUser?.uid);
            setUserData(getMyUserData)
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

    // className='absolute bottom-0 right-0 text-[#282828]'

    return (
        <div className='w-full px-4 md:px-14 py-4'>
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
                
                <div className='w-full lg:w-[40%] mt-8 lg:mt-0 bg-white border-2 border-[#282828] rounded-xl p-4  relative'>
                    <div className='absolute top-2 right-2 w-[50px] h-[50px] bg-[#43b4e4] text-white font-bold rounded-full flex justify-center items-center'>
                        <p className='text-center'>-{discount?.discount}%</p>
                    </div>
                    <div className='flex items-center'>
                        <img src={badge} className='w-[64px] h-[64px] mr-4' alt='user rewards badge icon'/> 
                        <div className='w-full'>
                            <div className='flex items-center mb-2'>
                                <h4 className='text-xl font-semibold'>My Rewards</h4>
                                <p className='ml-2'>(<span className='text-lg font-bold text-[#43b4e4] mx-[4px]'>{userData?.totalCompletedCommissions}</span>purchased portraits)</p>
                            </div>
                            <div className='ml-2 w-full'>
                                <p className='text-sm'>Progress to next discount:</p>
                                <AwardProgressBar completed={userData ? userData?.totalCompletedCommissions : 0} bgcolor={'#43b4e4'}/>
                            </div>
                        </div>      
                    </div>
                    <p className='text-sm mt-2'>Some explanation of the rewards system?</p>  
                    
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
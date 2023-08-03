'use client'

import { useEffect, useState } from 'react';
import { getUserById } from '@/app/firebase/firestore';
import { useAuth } from '@/app/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import CustomerProfileForm from './CustomerPorfileForm';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
import AvatarUploader from './AvatarUploader';
import AwardProgressBar from './AwardProgressBar';
import AddIcon from '@mui/icons-material/Add';
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

const Profile = (user: UserData) => {

    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)
    const [updateUser, setUpdateUser] = useState({})
    const [changeAvatar, setChangeAvatar] = useState(false)
    const [discount, setDiscount] = useState(awards[0])

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/')
        }
    }, [authUser, isLoading]);



    useEffect(() => {
        const handleGetUser = async () => {
          const getMyUserData = await getUserById(authUser?.uid);
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
            setUpdateUser({ avatarBucket: userData.avatarBucket}) 
        } else {
            setUpdateUser({})
        }
    }

    const handleSetBadge = () => {

        if (userData?.totalCompletedCommissions === 0) {
            //setDiscount(awards[0])
            return '../../badges/one.png'
        } else if (userData?.totalCompletedCommissions > 0 && userData?.totalCompletedCommissions < 3) {
            //setDiscount(awards[1])
            return '../../badges/one.png'
        } else if (userData?.totalCompletedCommissions >= 3 && userData?.totalCompletedCommissions < 7) {
            //setDiscount(awards[2])
            return '../../badges/two.png'
        } else if (userData?.totalCompletedCommissions >= 7 && userData?.totalCompletedCommissions < 10) {
            //setDiscount(awards[3])
            return '../../badges/three.png'
        } else {
            //setDiscount(awards[4])
            return '../../badges/four.png'
        }
    }
    
    return (
        <div className='relative p-10'>
            <div className='flex items-center'>
                <div className='w-[150px] h-[150px] bg-[#e5e5e5] border-2 border-[#282828] rounded-xl flex justify-center items-center relative'>
                    <Image src={`${userData?.avatar ? userData.avatar : '/user.png'}`} alt='Default Avatar' width={128} height={128} />
                    
                    <IconButton aria-label="edit" color="secondary" onClick={onClickAdd} className='absolute bottom-0 right-0 text-[#282828]' >
                        <EditIcon sx={{ fontSize: 24, color: '#282828', ":hover": { color: "#0075FF"} }} />
                    </IconButton>
                </div>

                

                <AvatarUploader
                    setChangeAvatar={setChangeAvatar}
                    setUserData={setUserData} 
                    edit={updateUser}
                    showDialog={openUpload}
                    onCloseDialog={() => setOpenUpload(false)}>
                </AvatarUploader>

                {userData && 
                    <div className='w-[30%] flex flex-col justify-center items-start ml-10'>
                        <div className='flex items-center'>
                            <h1 className='text-4xl font-bold'>{userData?.displayName}</h1>
                            {!isEdit && 
                                <button 
                                    onClick={handleClick}
                                    className="ml-4"
                                >
                                    <EditIcon sx={{ fontSize: 24, color: '#282828', ":hover": { color: "#0075FF"} }}/>
                                </button>
                            }
                        </div>
                        
                        <p className='w-8/12 mt-4'>Welcome to your dashboard</p>                    
                    </div>
                }

                <div className='w-[40%] border-2 border-[#282828] rounded-xl p-4  relative'>
                    <div className='absolute top-2 right-2 w-[50px] h-[50px] bg-[#0075FF] text-white font-bold rounded-full flex justify-center items-center'>
                        <p className='text-center'>-{discount?.discount}%</p>
                    </div>
                    <div className='flex items-center'>
                        <img src={handleSetBadge()} className='w-[64px] h-[64px] mr-4'/> 
                        <div className='w-full'>
                            <div className='flex items-center mb-2'>
                                <h4 className='text-xl font-semibold'>My Rewards</h4>
                                <p className='ml-2'>(<span className='font-semibold'>{userData?.totalCompletedCommissions}</span> purchased portraits)</p>
                            </div>
                            <div className='ml-2 w-full'>
                                <p className='text-sm'>Progress to next discount:</p>
                                <AwardProgressBar completed={userData?.totalCompletedCommissions} bgcolor={'#0075FF'}/>
                            </div>
                        </div>      
                    </div>
                    <p className='text-sm mt-2'>Some explanation of the rewards system?</p>  
                    
                </div>
            </div>
            
            
            

            {isEdit && <CustomerProfileForm
                setUserData={setUserData} 
                userData={userData} 
                setIsEdit={setIsEdit}
            />}
        </div>
    )
}

export default Profile
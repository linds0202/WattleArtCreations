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
import AddIcon from '@mui/icons-material/Add';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';

const Profile = () => {

    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)
    const [updateUser, setUpdateUser] = useState({})
    const [changeAvatar, setChangeAvatar] = useState(false)

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/')
        }
    }, [authUser, isLoading]);



    useEffect(() => {
        const handleGetUser = async () => {
          const getMyUserData = await getUserById(authUser.uid);
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
    
    return (
        <div className='relative p-10'>
            <div className='flex'>
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

                {userData && <div className='w-[49%] flex flex-col justify-start items-start ml-10'>
                    <h1 className='text-4xl font-bold mt-8'>{userData?.displayName}</h1>
                    
                    <p className='w-8/12 mt-4'>Welcome to your dashboard</p>                    
                </div>}
            </div>
            
            {!isEdit && 
              <button 
                  onClick={handleClick}
                  className="absolute top-4 right-8 border-2 rounded-full p-2 border-[#282828] hover:border-[#0075FF]"
              >
                  <EditIcon sx={{ fontSize: 36, color: '#282828', ":hover": { color: "#0075FF"} }}/>
              </button>
            }
            

            {isEdit && <CustomerProfileForm
                setUserData={setUserData} 
                userData={userData} 
                setIsEdit={setIsEdit}
            />}
        </div>
    )
}

export default Profile
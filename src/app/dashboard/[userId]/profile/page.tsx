'use client'

import { useEffect, useState } from 'react';
import { getUserById } from '@/app/firebase/firestore';
import { useAuth } from '@/app/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import CustomerProfileForm from './components/CustomerPorfileForm';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image'

export interface UserData {
    uid: String,
    displayName: String,
    email: String,
    roles: String,
    artistName: string,
    bio: string,
    links: string[],
    website: string,
    country: string
}


const Profile = () => {

    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

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
    }, [])

    const handleClick = () => {
        setIsEdit(true)
    }
    
    return (
        <div className='relative  p-10'>
            <div className='flex'>
                <div className='w-[175px] h-[175px] bg-[#e5e5e5] border-2 border-[#282828] rounded-full flex justify-center items-center'>
                  <Image src={'/user.png'} alt='Default Avatar' width={150} height={150} />
                </div>

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
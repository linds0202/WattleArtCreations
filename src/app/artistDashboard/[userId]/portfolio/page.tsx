'use client'

import { useEffect, useState } from 'react';
import { getUserById } from '@/app/firebase/firestore';
import { useAuth } from '@/app/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import ArtistForm from './components/ArtistForm';
import { SocialIcon } from 'react-social-icons';
import EditIcon from '@mui/icons-material/Edit';
import Images from './components/Images';

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



const page = () => {

    const currentUrl = usePathname()
    const artistId = currentUrl.split('/')[2]
    
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [links, setLinks] = useState([])

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/')
        }
    }, [authUser, isLoading]);


    useEffect(() => {
        const handleGetUser = async () => {
          const getMyUserData = await getUserById(artistId);
          setLinks(getMyUserData?.links)
          setUserData(getMyUserData)
        }
    
        handleGetUser()
    }, [])

    const handleClick = () => {
        setIsEdit(true)
    }
    
    return (
        <div className='relative'>
            <div className='flex'>
                <div className='w-[48%] h-[80vh] flex flex-wrap justify-around items-center mt-4'>
                    <div className='w-[56%] h-[60%] border-2 border-black'></div>
                    <div className='w-[36%] h-[60%] flex flex-col justify-between items-center'>
                        <div className='w-full h-[48%] border-2 border-black'></div>
                        <div className='w-full h-[48%] border-2 border-black'></div>
                    </div>
                    <div className='w-[96%] h-[35%] flex justify-between items-center'>
                        <div className='w-[30%] h-full border-2 border-black'></div>
                        <div className='w-[30%] h-full border-2 border-black'></div>
                        <div className='w-[30%] h-full border-2 border-black'></div>
                    </div>

                </div>

                {userData && <div className='w-[49%] flex flex-col justify-center items-center'>
                    <h1 className='text-4xl font-bold mt-8'>{userData?.artistName}</h1>
                    
                    <p className='w-8/12 mt-4'>{userData?.bio}</p>
                    
                    <div className='w-6/12 mt-8'>
                        <p>Follow me: </p>
                        <div className='flex justify-between items-center mt-4'>

                            {links.map((link, i) => <SocialIcon key={i} url={link} target="_blank" fgColor={'#FFFFFF'} style={{width: '50px', height: '50px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>)}

                            {userData?.website !== "" &&
                            <SocialIcon url={`${userData?.website}`} target="_blank" fgColor={'#FFFFFF'} style={{width: '50px', height: '50px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>}
                            
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
            

            {isEdit && <ArtistForm 
                setUserData={setUserData} 
                userData={userData} 
                setIsEdit={setIsEdit}
                links={links}
                setLinks={setLinks}
            />}

        </div>
    )
}

export default page
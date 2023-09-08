import React from 'react'
import { usePathname } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link'

export default function Footer(){
    const currentUrl = usePathname()

    return (
        <div className={`w-[100%] ${(currentUrl === '/' || currentUrl === '/corporate') ? '' : 'absolute bottom-0 h-28'}`}>
            {(currentUrl === '/' || currentUrl === '/corporate') 
            ? <div className='w-full h-[500px] relative mt-0 footer'>
                <div className='w-[37%] absolute bottom-[16%] left-[35%] flex justify-between'>
                    <Link href='/' className='no-underline'>
                        <div className='ml-4 flex items-center w-10/12'>
                            <img src={'./Logo_Circle.png'} alt={'logo'} className='w-[64px] h-[64px]' />
                            <div className='w-full ml-4 '>
                                <p className='font-semibold text-xl mb-0 text-white no-underline'>Wattle Art Creations</p>
                            </div>
                        </div>
                    </Link>
                    <div className='text-white w-3/12 flex flex-col justify-around'>
                        <p className='text-base mb-0 font-bold hover:underline hover:cursor-pointer'>Contact</p>
                        <p className='text-sm mb-0 font-semibold hover:underline hover:cursor-pointer'>Terms of Service</p>
                        <p className='text-sm mb-0 font-semibold hover:underline hover:cursor-pointer'>FAQ</p>
                    </div>
                    <div className='text-white flex flex-col justify-center items-center pb-px w-3/12 mr-8'>
                        <p className='mb-0'>Follow us</p>
                        <div className='flex mt-2'>
                            <SocialIcon url="https://www.instagram.com/wattleartcreations/" target="_blank" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>
                            <SocialIcon url="https://www.behance.net/wattleartcreations?tracking_source=search_projects" target="_blank" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>
                            <div className='hover:scale-125 transition ease-in-out duration-300'>
                                {currentUrl !== '/corporate' && 
                                <Link href={'/corporate'} className='hover:scale-125 transition ease-in-out duration-300'><img className='w-[25px] h-[25px]' src='./corporate.png' alt='Corporate Art Orders' title='Corporate Art Orders' /></Link>
                                }
                                {currentUrl === '/corporate' && 
                                <Link href={'/'} className=''><img className='w-[25px] h-[25px]' src='./HIWIcons/artwork2.png' alt='Personal Art Orders' title='Personal Art Orders' /></Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{fontSize : 8}} className='ml-4 mb-0 text-white absolute bottom-[12%] left-[50%]'>Copyright &#169; {new Date().getFullYear()}</p>
            </div>

            : <div className='w-[100%] h-full bg-[#282828] py-4' >
                <div className='w-8/12 mx-auto flex justify-around'>
                    <div>
                        <Link href='/' className='no-underline'>
                            <div className='ml-4 flex items-center w-10/12'>
                                <img src={'../Logo_Circle.png'} alt={'logo'} className='w-[64px] h-[64px]' />
                                <div className='w-full ml-4 '>
                                    <p className='font-semibold text-xl mb-0 text-white no-underline'>Wattle Art Creations</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='text-white flex flex-col justify-around'>
                        <p className='text-base mb-0 font-bold hover:underline hover:cursor-pointer'>Contact</p>
                        <p className='text-sm mb-0 font-semibold hover:underline hover:cursor-pointer'>Terms of Service</p>
                        <p className='text-sm mb-0 font-semibold hover:underline hover:cursor-pointer'>FAQ</p>
                    </div>

                    <div className='flex flex-col'>
                        <p className='mb-0 mr-2 text-white'>Follow us: </p>
                        <div className='flex mt-2'>
                            <SocialIcon url="https://www.instagram.com/wattleartcreations/" target="_blank" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>
                            <SocialIcon url="https://www.behance.net/wattleartcreations?tracking_source=search_projects" target="_blank" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
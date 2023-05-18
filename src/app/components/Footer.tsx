import React from 'react'

import { SocialIcon } from 'react-social-icons';

import Image from 'next/image'
import Link from 'next/link'

export default function Footer(){
  return (
    <div className='w-full h-[500px] relative mt-[200px] footer'>
        <div className='w-4/12 absolute bottom-[14%] left-[35%] flex justify-between'>
            <Link href='/' className='no-underline'>
            <div className='flex items-center w-5/12'>
                    <img src={'./Logo_Circle.png'} alt={'logo'} className='w-[64px] h-[64px]' />
                    <div className='w-5/12 ml-4'>
                        <p className='font-semibold text-xl mb-0 text-white no-underline'>Wattle Art Creations</p>
                    </div>
                
            </div>
            </Link>
            <div className='text-white w-3/12 flex flex-col justify-around'>
                <p className='text-base mb-0 font-bold hover:underline hover:cursor-pointer'>Contact</p>
                <p className='text-sm mb-0 font-semibold hover:underline hover:cursor-pointer'>Terms of Service</p>
                <p className='text-sm mb-0 font-semibold hover:underline hover:cursor-pointer'>FAQ</p>
            </div>
            <div className='text-white flex flex-col justify-center items-center pb-px w-3/12 mr-4'>
                <p className='mb-0'>Follow us</p>
                <div className='flex mt-2'>
                    <SocialIcon url="https://www.instagram.com/wattleartcreations/" target="_blank" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>
                    <SocialIcon url="https://www.behance.net/wattleartcreations?tracking_source=search_projects" target="_blank" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px'}} className='hover:scale-125 transition ease-in-out duration-300'/>
                </div>
            </div>
        </div>
        <p style={{fontSize : 8}} className='ml-4 mb-0 text-white absolute bottom-[12%] left-[50%]'>Copyright &#169; {new Date().getFullYear()}</p>
    </div>
  )
}
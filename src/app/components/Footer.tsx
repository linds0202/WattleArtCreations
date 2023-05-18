import React from 'react'

import { SocialIcon } from 'react-social-icons';

import Image from 'next/image'
import Link from 'next/link'

export default function Footer(){
  return (
    <div className='w-full h-[500px] relative mt-[200px] flex flex-col items-center'>
        <Image src={'/footer4.png'} alt={'puddle'} fill className='top-0 left-0 absolute'/>
        <div className='absolute top-[350px] flex justify-between w-[575px] ml-20'>
            <div className='flex w-5/12'>
                <img src={'./Logo_Circle.png'} alt={'logo'} className='w-[25%] h-[80%] mt-2' />
                <div className='w-5/12 ml-4'>
                    <p className='font-semibold text-xl mb-2 text-white'>Wattle Art Creations</p>
                    <p style={{fontSize : 8}} className='ml-4'>Copyright &#169; {new Date().getFullYear()}</p>
                </div>
            </div>
            <div className='text-white w-3/12 flex flex-col justify-center'>
                <p className='text-lg font-bold hover:underline hover:cursor-pointer'>Contact</p>
                <p className='text-sm font-semibold hover:underline hover:cursor-pointer'>Email</p>
                <p className='text-sm font-semibold hover:underline hover:cursor-pointer'>Need help?</p>
            </div>
            <div className='text-white flex justify-between items-end pb-px w-3/12 mr-4'>
                <p>Follow us</p>
                <div className='flex'>
                    <SocialIcon url="https://www.instagram.com/wattleartcreations/" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px', marginRight: 10}} className='hover:scale-125 transition ease-in-out duration-300'/>
                    <SocialIcon url="https://www.behance.net/wattleartcreations?tracking_source=search_projects" fgColor={'#FFFFFF'} style={{width: '25px', height: '25px'}} className='hover:scale-125 transition ease-in-out duration-300'/>
                </div>
            </div>
        </div>
    </div>
  )
}
'use client'

import React from 'react'

import { motion } from 'framer-motion'

const HIW = () => {

    const list = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 1,
            }
        }

    }

    const listItemVarient = {
        hidden: {
            opacity: 0,
            x: -200,
            transition: {
                duration: 0
            }
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: .5
            }
        }
    }

  return (
    <div className='flex flex-col items-center py-[400px] text-black'>
        <div className='w-[50%] flex flex-col items-center mb-[150px]'>
            <motion.h2 className='text-6xl font-bold mb-2' initial={{opacity: 0, x: -200}} whileInView={{opacity: 1, x: 0}} transition={{ease: 'easeInOut', duration: .5}}>How it works:</motion.h2>
            <motion.div className='h-[2px] bg-black pl-2' initial={{opacity: 0, left: 0, width: 0, x:-200}} whileInView={{opacity: 1, width: '45%', x:0}} transition={{ease: 'easeInOut', duration: .1}}/>
        </div>
        
        <motion.ul className='w-10/12 flex flex-col pl-[5%] border-l-2 border-black space-y-[75px]' variants={list} initial='hidden' whileInView='show' viewport={{amount: 0.4}}>       
            <motion.li className='w-10/12 text-xl'  variants={listItemVarient} /* transition={
                {delay:.5,
                duration: .5}} */><span className='font-bold text-2xl mr-2'>1. </span>Design your character(s): Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.</motion.li>
            <motion.li className=' w-10/12 text-xl' variants={listItemVarient} /* transition={
                {delay:.8,
                duration: .5}} */><span className='font-bold text-xl mr-2'>2. </span>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.</motion.li>
            <motion.li className=' w-8/12 text-xl' variants={listItemVarient} /* transition={
                {delay:1.1,
                duration: .5}} */><span className='font-bold text-xl mr-2'>3. </span>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.</motion.li>
            <motion.li className=' w-10/12 text-xl' variants={listItemVarient} /* transition={
                {delay:1.4,
                duration: .5}} */><span className='font-bold text-xl mr-2'>4. </span>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!</motion.li>
        </motion.ul>
    </div>
  )
}

export default HIW

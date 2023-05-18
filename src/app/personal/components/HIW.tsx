'use client'

import React, {useState, useEffect} from 'react'


import { Fade }from "react-awesome-reveal";

export const HIW = () => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (scrollPosition >= 800 && scrollPosition <= 900) {
        document.body.classList.add('h-full')
        document.body.classList.add('overflow-hidden')
        console.log('in target area')
    }

    console.log(scrollPosition)
  return (
    <div className='realitive mb-20 h-[800px]'>
         <img src='./side_drip_short.png' className='absolute w-[40%] left-[120px] top-0  onscroll'/>

        <div className={scrollPosition >= 800 && scrollPosition <= 900 ? 'flex flex-col items-center h-[640px] overflow-auto cardCon border-2 border-black' : 'hidden'}>

                <ul className='w-10/12 flex flex-col items-center pt-[650px]'>
                    <Fade delay={300} className='sticky top-[100px]'>
                        <p className='text-6xl font-semibold text-center mb-[100px] '>How it works:</p>
                    </Fade>
                    <Fade delay={300} /* direction={'left'} */>
                        <li className='w-6/12 mb-[100px] sticky top-[200px]'><span className='font-bold text-xl mr-2'>1. </span>Design your character(s): Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.</li>
                    </Fade>
                    
                    <Fade delay={300} /* direction={'right'} */>
                        <li className='mb-[100px] w-6/12 sticky top-[300px]'><span className='font-bold text-xl mr-2'>2. </span>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.</li>
                    </Fade>
                    
                    <Fade delay={300} /* direction={'left'} */>
                        <li className='mb-[100px] w-6/12 sticky top-[375px]'><span className='font-bold text-xl mr-2'>3. </span>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.</li>
                    </Fade>
                    
                    <Fade delay={300} /* direction={'right'} */>
                        <li className='mb-[85px] w-6/12 sticky top-[375px]'><span className='font-bold text-xl mr-2'>4. </span>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!</li>
                    </Fade>
                </ul>
                    
        </div> 
    </div>
  )
}
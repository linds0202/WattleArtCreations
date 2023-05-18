'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
interface Testimonials{
    obj : {
        index: number,
        body?: string,
        author?: string
    }[]
}



export default function Testimonials({obj}:Testimonials){
  return (
    <div className="w-full py-28 relative">
        <p className="text-black text-center text-6xl font-bold mb-10">Testimonials</p>
        <div className="absolute z-40 top-[32%] left-[27%] w-[42%] pt-20">
            <Carousel className='pb-12 px-14' controls={false} wrap>
                {obj.map((el) => {
                    if (el.index !== 3) {
                        return <Carousel.Item key={el.index}>
                                <div className='h-[125px]'>
                                    <p className='text-white'>{el.body}</p>
                                    <p className='text-white text-2xl font-bold text-right pr-10'>-{el.author}</p>
                                </div>
                                    
                                </Carousel.Item>
                    } else {
                        return <Carousel.Item key={el.index}>
                                    <div className='flex flex-col items-center h-[125px]'>
                                        <p className='text-white text-center text-2xl mb-10 font-bold'>Want to hear more testimonials?</p>
                                        <button className='text-lg font-semibold text-black bg-white rounded-md py-px px-3 transition-all ease-in-out duration-200 hover:underline hover:text-black'><Link href={`/personal/testimonials`}>Go to testimonials</Link></button>
                                    </div>
                                </Carousel.Item>
                    }
                    
                })}
            </Carousel>
        </div>
        <img src="./puddle.png" alt="puddle"/>
    </div>
  )
}
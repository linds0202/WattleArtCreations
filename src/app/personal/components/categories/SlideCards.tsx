'use client'
import { motion, MotionProps } from "framer-motion";


import "./styles.css";

export default function SlideCards() {
  return (
    <div className="w-[75%] py-[100px]">
      <div className="space-y-[100px] flex flex-col items-center">
        <div className="flex justify-start w-full">
            <motion.div className="motion-box w-full" initial={{opacity: 0, x: -50,}} whileInView={{opacity: 1, x: 50}} viewport={{amount: 0.4}} transition={{duration: .7}}>
                <div className="flex border-b-2 border-black px-4 pb-4 justify-between">
                    <img src="./featured_9.png" className='w-[35%]'/>
                    <div className="w-[50%] flex flex-col pt-14 pr-[5%]">
                        <p className="font-bold text-4xl mb-10">Photorealistic</p>
                        <p className="text-xl mb-10">Create your own photorealistic art piece or portrait for a pixel perfect
                            masterpiece that you&#39;re sure to love. So what are you waiting for? Click the button 
                            below and
                        </p>
                        <div className="flex justify-center">
                            <button className="mb-4 border-2 border-black w-[50%] rounded-md hover:bg-black hover:text-white transition">Start Customizing</button>
                        </div>
                        
                        <div className="h-[2px] bg-white"/>
                    </div>
                </div>
            </motion.div>
        </div>
        <div className="flex justify-end w-full">
            <motion.div className="motion-box my-20" initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: -50}} viewport={{amount: 0.4}} transition={{duration: .7}}>
            <div className="flex border-b-2 border-black px-4 pb-4 justify-between">
                    <div className="w-[50%] flex flex-col pt-14 pl-[5%]">
                        <p className="font-bold text-4xl mb-10">Anime</p>
                        <p className="text-xl mb-10">
                            With our custom anime commission, you can build the ultimate
                            anime portrait or piece that&#39;s sure to impress.
                            There&#39;s just one thing left to do: click the button below and
                        </p>
                        <div className="flex justify-center">
                            <button className="mb-4 border-2 border-black w-[50%] rounded-md hover:bg-black hover:text-white transition">Start Customizing</button>
                        </div>
                        
                        <div className="h-[2px] bg-white"/>
                    </div>
                    <img src="./featured_8.png" className='w-[35%]'/>
                </div>
            </motion.div>
        </div>
        <div className="flex justify-start w-full">
            <motion.div className="motion-box my-20" initial={{opacity: 0, x: -50}} whileInView={{opacity: 1, x: 50}} viewport={{amount: 0.4}} transition={{duration: .7}}>
                <div className="flex border-b-2 border-black px-4 pb-4 justify-between">
                    <img src="./featured_14.png" className='w-[30%]'/>
                    <div className="w-[50%] flex flex-col pt-14 pr-[5%]">
                            <p className="font-bold text-4xl mb-10">NSFW</p>
                            <p className="text-xl mb-10">
                                At wattle Art Creations, we create whatever your heart desires.
                                With our team, anything goes. <span className="border-b pb-px">ANYTHING. </span>
                                Unlock your ultimate fantasy and
                            </p>
                            <div className="flex justify-center">
                                <button className="mb-4 border-2 border-black w-[50%] rounded-md hover:bg-black hover:text-white transition">Start Customizing</button>
                            </div>
                            
                            <div className="h-[2px] bg-white"/>
                        </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
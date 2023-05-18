'use client'
import Image from "next/image"

import Router, { useRouter } from "next/navigation"

interface Data{
  info: 
    {
      style: string,
      img: string,
      abrv: string
    }[],
  scroll: boolean
}

export default function CardCon({info, scroll}:Data) {

  const router = useRouter()

  return (
    <div className="py-4 px-2 w-full">
        {scroll ? (
            <p className="text-6xl text-black mb-6 text-center font-bold">Top Sellers:</p> )
        : (
            <p className="text-6xl text-black mb-6 font-bold">Choose Your Style:</p>
        )}
        
        <div className={scroll ? "relative p-4 bg-[#262626] rounded-3xl" : "relative p-4"}>
          <div className={scroll ? "overflow-x-auto flex-nowrap pb-4 flex justify-between horz-scroll-con relative rounded-2xl" : "p-4 flex justify-around relative"}>
            {info.map(el =>
                <div key={el.style} className={scroll ? 'w-[30%] h-[500px] mx-4 flex flex-col items-center p-4 hover:cursor-pointer' : 'w-3/12 flex flex-col items-center drip-card hover:cursor-pointer'} style={scroll ? {flex: '0 0 auto'} : {}} onClick={() => router.push(`/portraits/?styleOne=${el.abrv}`)}>
                 
                    <img src={el.img} alt="it's pepe" className={scroll ? "w-full h-full rounded-lg" : "w-full h-[90%]"}/>
                    <img src="./frame.png" alt="frame" className={scroll ? "hidden" : "absolute w-[30%] mr-[2.5%] h-[730px] top-[3px] pr-px drip transition duration-200 ease-in-out"}/>
                  <button className={scroll ? 'text-2xl font-semibold text-black bg-white absolute z-40 bottom-7 w-[20.39%] py-px border-2 border-black hover:border-2 hover:border-black transition-all ease-in-out duration-200' : "text-2xl font-semibold text-black bg-white absolute z-40 bottom-14 w-[20%] py-px border-2 border-black hover:border-2 hover:border-black transition-all ease-in-out duration-200 "}>{el.style}</button>
                </div>
              )}
          </div>
        
        </div>
        {scroll &&
            <div className="w-[99%] h-[400px] absolute mr-20" >
              <Image src={'/full-divider-drip.png'} alt="it's pepe" fill className="absolute" style={{top: -35}}/>
            </div> 
          }

    </div>
  );
}



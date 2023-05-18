import Image from "next/image"

export const Hero = () => {
  return (
    <div className="w-full h-[900px]">
        <img src={'/headerBackground.PNG'} alt='hero' className="h-[800px]"/>
    </div>
  )
}
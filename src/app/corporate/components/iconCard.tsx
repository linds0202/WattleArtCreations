'use client'

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Data{
  info: 
    {
      style: string,
      img: string,
      abrv: string
    }[],
}



export default function IconCard({productChoice}:String) {

    const router = useRouter()

    const corpOptions = [
        {Advertising: ['Graphic Design', 'Social Media Kits', 'Commercial Storyboarding', 'Logo Design']},
        {StoryOrBookIllustrations: ['Cover Designs', 'Marketing Material', 'D&amp;D Campaign Modules']},
        {TableTopIllustrations: ['Boardgame', 'Battle maps', 'Custom card decks', 'Custom Character Sheets']},
        {VideoGameAssets: ['Pixel Art', '2d Character art']}
    ]

     return (
        <div className="w-6/12 mx-auto text-center mb-8">
            <p className="mb-4">You are customizing: {productChoice}</p>
        </div>
    );
}
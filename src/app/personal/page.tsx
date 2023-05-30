'use client' 

import { useState } from "react"
import HeroLoader from "./components/HeroLoader"
import HIW from "./components/HIW"
import CategoryContainer from "./components/categories/CategoryContainer"
import Gallery from "./components/Gallery"
// import CardCon from "./components/CardCon"
// import Testimonials from "./components/Testimonials"
import Footer from "../components/Footer"

export default function Personal() {

  const [loading, setLoading] = useState(true);

  // const chooseStyles = [
  //   {
  //       style: 'Photorealistic',
  //       img: './featured_9.png',
  //       abrv: 'Photorealistic'
  //   },
  //   {
  //       style: 'Anime',
  //       img: './featured_8.png',
  //       abrv: 'Anime'
  //   },
  //   {
  //       style: 'NSFW',
  //       img: './featured_14.png',
  //       abrv: 'Nsfw'
  //   }
  // ]

  // const topSellers = [
  //   {
  //       style: 'Sci-fi',
  //       img: '/featured_10.png',
  //       abrv: 'sci-fi'
  //   },
  //   {
  //       style: 'Anime',
  //       img: '/featured_15.png',
  //       abrv: 'anime'
  //   },
  //   {
  //       style: 'World of Warcraft',
  //       img: '/featured_12.png',
  //       abrv: 'wow'
  //   },
  //   {
  //       style: 'Warhammer',
  //       img: '/featured_13.png',
  //       abrv: 'warhammer'
  //   },
  //   {
  //       style: 'Portrait',
  //       img: '/featured_9.png',
  //       abrv: 'portrait'
  //   },
  //   {
  //       style: 'Fantasy',
  //       img: '/featured_11.png',
  //       abrv: 'fantasy'
  //   },
  // ]

  // const testimonials = [
  //   {
  //       index: 0,
  //       body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  //       author: 'Joe'
  //   },
  //   {
  //       index: 1,
  //       body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  //       author: 'Alex'
  //   },
  //   {
  //       index: 2,
  //       body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  //       author: 'Christie'
  //   },
  //   {
  //       index: 3
  //   }
  // ]
  
  return (
    <main className="bg-white text-black no-underline flex flex-col justify-around items-center min-h-screen">
        <HeroLoader setLoading={setLoading}/>
        <HIW />
        <CategoryContainer />
        <Gallery />
        
        {/* <Testimonials obj={testimonials} /> */}
        {/* <CardCon info={topSellers} scroll={true}/> */}
        <Footer />
    </main>
  )
}


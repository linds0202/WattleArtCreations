import Link from "next/link"
import { Hero } from "./components/Hero"
import HIW from "./components/HIW"
import CategoryContainer from "./components/categories/CategoryContainer"
import CardCon from "./components/CardCon"
import Testimonials from "./components/Testimonials"
import Footer from "../components/Footer"

export default function Personal() {
  const chooseStyles = [
    {
        style: 'Photorealistic',
        img: './featured_9.png',
        abrv: 'Photorealistic'
    },
    {
        style: 'Anime',
        img: './featured_8.png',
        abrv: 'Anime'
    },
    {
        style: 'NSFW',
        img: './featured_14.png',
        abrv: 'Nsfw'
    }
  ]

  const topSellers = [
    {
        style: 'Sci-fi',
        img: '/featured_10.png',
        abrv: 'sci-fi'
    },
    {
        style: 'Anime',
        img: '/featured_15.png',
        abrv: 'anime'
    },
    {
        style: 'World of Warcraft',
        img: '/featured_12.png',
        abrv: 'wow'
    },
    {
        style: 'Warhammer',
        img: '/featured_13.png',
        abrv: 'warhammer'
    },
    {
        style: 'Portrait',
        img: '/featured_9.png',
        abrv: 'portrait'
    },
    {
        style: 'Fantasy',
        img: '/featured_11.png',
        abrv: 'fantasy'
    },
  ]

  const testimonials = [
    {
        index: 0,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        author: 'Joe'
    },
    {
        index: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        author: 'Alex'
    },
    {
        index: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        author: 'Christie'
    },
    {
        index: 3
    }
  ]
  
  return (
    <main className="bg-white text-black no-underline flex flex-col justify-around items-center min-h-screen">
        <Hero />
        <HIW />
        <CategoryContainer />
        <CardCon info={chooseStyles} scroll={false}/>
        {/* <div className="flex w-10/12 justify-around">
          <div className="border-2 border-white rounded-lg p-4">
            <Link href={{
              pathname: '/portraits',
              query: {styleOne: 'Photorealistic'},
              }} 
              className="text-3xl no-underline"
            >
                <p>Photorealistic</p>
            </Link>
          </div>
          <div className="border-2 border-white rounded-lg p-4">
          <Link href={{
              pathname: '/portraits',
              query: {styleOne: 'Anime'},
              }} 
              className="text-3xl no-underline"
            >
                <p>Anime</p>
            </Link>
          </div>
          <div className="border-2 border-white rounded-lg p-4">
          <Link href={{
              pathname: '/portraits',
              query: {styleOne: 'NSFW'},
              }} 
              className="text-3xl no-underline"
            >
                <p>NSFW</p>
            </Link>
          </div>
        </div> */}
        <Testimonials obj={testimonials} />
        <CardCon info={topSellers} scroll={true}/>
        <Footer />
    </main>
  )
}


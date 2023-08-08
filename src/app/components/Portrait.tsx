import { useState, useEffect } from 'react'
import { addArtist, updateUserData } from '../firebase/firestore'
import { useRouter } from 'next/navigation'
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { UserData } from '../artistDashboard/[userId]/portfolio/page'
import Link from 'next/link'
import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'
import CharList from './CharList'
import { MyCharValues } from '../portraits/components/questionaire/StepOne'
import DisplayedOptionalQuestions from './DisplayedOptionalQuestions'
import DisplayedRequiredQuestions from './DisplayedRequiredQuestions'
import EnlargedImage from './EnlargedImage'

interface PortraitProps {
  portrait: PortraitData,
  user: UserData,
}

export default function Portrait({ portrait, user}: PortraitProps) {
    const router = useRouter()

    const [openArtistDetails, setOpenArtistDetails] = useState(false)
    const [openImage, setOpenImage] = useState(false)
    const [src, setSrc] = useState('')

    const [charVariations, setCharVariations] = useState(false)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    useEffect(() => {
      portrait.characters.forEach((char: MyCharValues) => {
          if (char.numCharVariations > 1) setCharVariations(true)

          if(char.pets) setPet(true)
      
          if(char.extras.includes('character')) setCharSheet(true)
      
          if(char.extras.includes('weapons')) setWeaponSheet(true)

      })
    }, [])

    const handleClaim = async () => {
      const updatedArtist = {...user, activeCommissions: user.activeCommissions + 1}
      updateUserData(updatedArtist)
      const updatedPortrait = addArtist(portrait.uid, user.uid, user.artistName)
      router.push(`/artistDashboard/${user.uid}`)
    }

    const handleViewDetails = () => {
      setOpenArtistDetails(true)
    }

    const handleEnlarge = (i) => {
      setSrc(portrait?.uploadedImageUrls[i])
      setOpenImage(true)
  }

    return (
      <div className='border-2 rounded-xl border-black w-11/12 p-8 m-4 text-black flex justify-between items-center'>
        <div className='relative w-[120px] h-[120px] object-cover object-top rounded-xl'>
          <Image
              src={`${portrait.mode === 'Photorealistic' 
                ? '/defaultImgs/photo.png' 
                : portrait.mode === 'Anime' 
                ? '/defaultImgs/anime.png' 
                : '/defaultImgs/nsfw.png'}`}
              fill
              alt="Default Image"
              className='self-start object-cover rounded-xl'
          />
        </div>


        <div className='flex flex-col'>
          <h4 className='text-xl font-bold text-[#0075FF]'>{portrait.portraitTitle}<span className='text-sm font-light text-black ml-4'>({portrait.mode})</span></h4>
          <div className='flex'>
            <div>
              {portrait?.status !== 'Unordered' && <p className='mb-2'>Ordered on: {new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</p>}
              <p className='mb-2'>Status: {portrait.status}</p>
            </div>
            <div className='ml-10'>
              {user?.roles === 'Artist' && <p className='mb-2'>Customer:<span className='ml-4'>{portrait.customer}</span></p>}
              {portrait?.status !== 'Unordered' && 
                <p className='mb-2'>
                  {portrait.status === 'Unassigned' ? 'Pending Artist(s): ' : 'Artist: '} 
                    {portrait.artist.length  
                      ? portrait.artist.map((artist, i) => 
                        <Link 
                          key={i} 
                          href={`/artistDashboard/${portrait.artist[i].id}/portfolio`} 
                          className="text-[#2DD42B] hover:text-[#165f15] text-xl group-hover:underline ml-4"
                          rel="noopener noreferrer" 
                          target="_blank"
                        >
                            <span>{artist.artistName}</span>
                        </Link>
                      )
                      : <span className={`ml-4 ${portrait.status === 'Unclaimed' ? 'text-red-600' : ''}`}>{user?.roles === 'Artist' ? 'No bids yet' : 'No artists available yet'}</span>}
                </p>
              }
            </div>        
          </div>
        </div>
        
        
        <div className='flex justify-between mt-2'>
                    
          {/* If artist & not max commissions show claim button*/}
          {(portrait.artist.filter(artist => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
            <button onClick={handleClaim} className='border-black border-2 rounded-lg px-4 mx-4'>Claim</button>
          }

          {/* If not ordered - click to add to cart */}
          {user?.roles === 'Customer' && !portrait.paymentComplete && 
            <div>
              <Link href={`/portraits?selection=${portrait.mode}&portrait_id=${portrait.uid}`} className="text-2xl"><p className='text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828]'>Add to Cart</p></Link>

              <Link href={`/portraits?selection=${portrait.mode}&portrait_id=${portrait.uid}&edit=true`} className="text-2xl"><p className='text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828]'>Continue Customizing</p></Link>
            </div>
          }

          {/* If payment complete - link to individual portrait page */}
          {user?.roles === 'Customer' && portrait.paymentComplete && <Link href={`/portraits/${portrait.uid}`} className="text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828]"><p>Portrait Page</p></Link>}
          
          {user?.roles === 'Artist' && (portrait.status === 'Unassigned' || portrait.status === 'Unclaimed') &&
            <div>
              {portrait?.reassigned && 
                <Link 
                  href={`/portraits/${portrait.uid}`}
                  rel="noopener noreferrer" 
                  target="_blank" 
                  className="text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828]">
                    See History
                </Link>
              }

              {!portrait.reassigned && <button className='text-black text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828]' onClick={handleViewDetails}>View Details</button>
              }    
            </div>     
          }

          {/* If on artists dashboard & claimed - link to individual portrait page */}
          {user?.roles === 'Artist' && portrait.status === 'In Progress' && <Link href={`/portraits/${portrait.uid}`} className="text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#282828]"><p>Portrait Page</p></Link>}

          {openArtistDetails && 
            <Dialog 
                onClose={() => setOpenArtistDetails(false)} 
                open={openArtistDetails} 
                fullWidth={true}
                maxWidth='md'
                PaperProps={{ sx: { px: 6, py: 4, backgroundColor: "white"} }}
            >
                <IconButton onClick={() => setOpenArtistDetails(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
                <div className="flex flex-col justify-center items-center">
                  <h2 className='text-3xl font-bold mt-2'>{portrait.portraitTitle} Portrait Details</h2>
                  <span className='text-md text-[#959595] mb-4'>({portrait.mode})</span>
                  <div className='w-full mb-4 flex justify-start items-center'>
                    <div className='w-full ml-4'>
                      <div className='flex justify-between items-center mb-8'>
                        <p className='font-semibold'>Purchase Date: <span className='text-2xl text-[#2DD42B] font-bold ml-2'>{new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</span></p>
                        <p className='font-semibold text-xl'>Commission: <span className='text-[#0075FF]'>${portrait.price}</span></p>
                      </div>
                      
                      <CharList portrait={portrait}/>
        
                    </div>
                  </div>

                  <div className='w-full my-4'>
                    <p className='text-black'>Images uploaded by customer: <span className='text-[#9e9e9e]'>(click image to enlarge)</span></p>

                    <div className='w-full flex mt-4'>
                      {portrait?.uploadedImageUrls.length === 0
                        ? <p className='text-lg text-red-600'>(No images uploaded)</p>
                        : portrait?.uploadedImageUrls.map((img, i) => 
                          <img 
                            className="w-[64px] h-[64px] object-contain mr-4 cursor-pointer" 
                            key={i} 
                            src={img}
                            onClick={() => handleEnlarge(i)}
                          />
                      )}
                    </div>
                  </div>
                  {openImage &&
                    <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={src}/>
                  }


                  <p className='text-xl font-bold mt-2 text-center'>Customer Responses</p>
                  
                  <DisplayedRequiredQuestions portrait={portrait} />
                  
                  <DisplayedOptionalQuestions 
                    portrait={portrait} 
                    charVariations={charVariations}
                    pet={pet}
                    charSheet={charSheet}
                    weaponSheet={weaponSheet} 
                  />
                </div>
                  {(portrait.artist.filter(artist => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
                    <button onClick={handleClaim} className='text-xl border-black border-2 rounded-lg px-4 py-2 w-1/4 mx-auto mt-4 hover:text-white hover:bg-[#0075FF]'>Claim</button>
                  }
                <button type='button' onClick={() => setOpenArtistDetails(false)} className='text-xl border-black border-2 rounded-lg px-4 py-2 w-1/4 mx-auto mt-4 hover:text-white hover:bg-[#282828]'>Close</button>
            </Dialog>}
        </div>  
      </div>
    )
}

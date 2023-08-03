import { useState, useEffect } from 'react'
import { addArtist, updateUserData } from '../firebase/firestore'
import { useRouter } from 'next/navigation'
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { UserData } from '../artistDashboard/[userId]/portfolio/page'
import Link from 'next/link'
import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '../portraits/components/questionaire/Accordion'
import Image from 'next/image'
import CharList from './CharList'

interface PortraitProps {
  portrait: PortraitData,
  user: UserData,
}

export default function Portrait({ portrait, user}: PortraitProps) {
    const router = useRouter()

    const [openArtistDetails, setOpenArtistDetails] = useState(false)

    const [charVariations, setCharVariations] = useState(false)
    const [pet, setPet] = useState(false)
    const [charSheet, setCharSheet] = useState(false)
    const [weaponSheet, setWeaponSheet] = useState(false)

    useEffect(() => {
      portrait.characters.forEach((char) => {
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

    // const characters = portrait.characters.map((char, i) => (
    //   <div key={i} className='w-[48%] h-[125px] border-2 border=[#282828] rounded-xl p-2 text-sm flex mb-2'>
    //     <img 
    //       className={` ${char.bodyStyle === 'Full' ? 'w-[48px] h-[96px]' : 'w-[96px] h-[96px]'} object-cover mx-auto rounded-xl`} 
    //       src={`./customizer/${char.bodyStyle}.png`} 
    //     />
    //     <div className='ml-2'>
    //       <p className='text-md font-semibold text-center'>Character {i + 1}</p>
    //       <div className='flex justify-between'>
    //         <p className='font-semibold'>Variations: <span className='font-light'>{char.numCharVariations}</span></p>
    //         <p className='font-semibold'>Pets: <span className='font-light'>{char.numPets}</span></p>
    //       </div>
          
    //       <p className='text-xs font-semibold'>Extras: <span className='font-light'>{char.extras.map(extra => {
    //         if (extra === 'character') return 'Character Sheet'
    //         if (extra === 'model') return '3D Model'
    //         if (extra === 'weapons') return 'Weapon Sheet'
    //       }).join(', ')}</span></p>
    //     </div>
        
    //   </div>
    // ))

    const requiredQuestions = (
      <div>
        <Accordion title="Character Basics" required={false} active={true}>
          <p className='text-sm leading-4 mt-2'>
          Please provide a description of the character, including their name, age, gender, and any significant features. Additionally, please include their body type, hair color and style, eye color, and skin tone as is applicable.
          </p>
          <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.requiredQs[0]}</p>
        </Accordion>
        <Accordion title="Inspirations and References:" required={false} active={true}>
          <p className='text-sm leading-4 mt-2'>
          Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
          </p>
          <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.requiredQs[1]}</p>
        </Accordion>
      </div>
    )

    const optionalQuestions = (
      <div>
        {/* general character qs */}
        <Accordion title="Character Basics" required={false} active={true}>
          <div>
            <p className='text-sm leading-4 mt-2'><span>Personality:</span> What is the character's personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?</p>
            <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
              {portrait.questions[0].q1 ? portrait.questions[0].q1 : 'N/A'}
            </p>
            <p className='text-sm leading-4 mt-2'><span>Clothing and Accessories:</span> What kind of clothing and accessories does your character wear?</p>
            <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
              {portrait.questions[0].q2 ? portrait.questions[0].q2 : 'N/A'}
            </p>
            <p className='text-sm leading-4 mt-2'><span>Pose and Expression:</span> Do you have a specific pose or expression in mind for the character?</p>
            <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
              {portrait.questions[0].q3 ? portrait.questions[0].q3 : 'N/A'}
            </p>
            <p className='text-sm leading-4 mt-2'><span>Special Requests:</span> Are there any unique elements, features, or requests that you would like to include in your commission, which haven’t been covered in the previous questions?</p>
            <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
              {portrait.questions[0].q4 ? portrait.questions[0].q4 : 'N/A'}
            </p>
          </div> 
        </Accordion>

        {/* Character variation qs */}
        <Accordion title="Character Variations" required={false} active={charVariations}>
          {charVariations
            ? <div>
              <p className='text-sm leading-4 mt-2'>What variations would you like between each version (e.g., different outfits, expressions, poses, or color schemes)?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[1].q1 ? portrait.questions[1].q1 : 'N/A'}
              </p>
            </div> 
            : <p className='text-sm font-semibold'>No Character Variations were ordered</p>
          }
        </Accordion>

        {/* Pet qs */}
        <Accordion title="Pet / Familiar:" required={false} active={pet}>
          {pet
            ? <div>
              <p className='text-sm leading-4 mt-2'>For your pet/familiar, please describe their appearance, including any unique features or accessories.</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[2].q1 ? portrait.questions[2].q1 : 'N/A'}
              </p>
              <p className='text-sm leading-4 mt-2'>How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character, perched on the character's shoulder, etc.)?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[2].q2 ? portrait.questions[2].q2 : 'N/A'}
              </p>
            </div> 
            : <p className='text-sm font-semibold'>No Pet was ordered</p>
          }
        </Accordion>

        {/* Character Sheet qs */}
        <Accordion title="Character Sheet:" required={false} active={charSheet}>
          {charSheet 
            ? <div>
              <p className='text-sm leading-4 mt-2'>Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[3].q1 ? portrait.questions[3].q1 : 'N/A'}
              </p>
              <p className='text-sm leading-4 mt-2'>Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[3].q2 ? portrait.questions[3].q2 : 'N/A'}
              </p>
            </div> 
            : <p className='text-sm font-semibold'>No Character Sheet was ordered</p>
          }
        </Accordion>

        {/* Weapon Sheet qs */}
        <Accordion title="Weapon Sheet:" required={false} active={weaponSheet}>
          {weaponSheet 
            ? <div>
              <p className='text-sm leading-4 mt-2'>Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[4].q1 ? portrait.questions[4].q1 : 'N/A'}
              </p>
              <p className='text-sm leading-4 mt-2'>If you have any reference images or inspiration for the weapon design, please provide them.</p>
              <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>
                {portrait.questions[4].q2 ? portrait.questions[4].q2 : 'N/A'}
              </p>
            </div> 
            : <p className='text-sm font-semibold'>No Weapon Sheet was ordered</p>
          }
          
        </Accordion>
      </div>
    )
    
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
                    {/* <div className='flex flex-col'> */}
                      <div className='relative w-[240px] h-[240px] object-cover object-top rounded-xl'>
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

                      {/* <div className='flex flex-col justify-between items-start'>
                        <p className='text-xl font-bold mt-2'>{portrait.portraitTitle} <span className='text-sm text-[#959595] ml-2'>({portrait.mode})</span></p>
                        <p className='font-semibold'>Customer: <span>{portrait.customer}</span></p>
                      </div> */}

                    <div className='w-full ml-4'>
                      <div className='flex justify-between items-center'>
                        <p className='font-semibold'>Number of Characters: <span className='text-2xl text-[#2DD42B] font-bold'>{portrait.characters.length}</span></p>
                        <p className='font-semibold text-xl'>Commission: <span className='text-[#0075FF]'>${portrait.price}</span></p>
                      </div>
                      
                      <CharList portrait={portrait}/>
                      {/* <div className='flex flex-wrap justify-between items-center mt-2'>
                        {characters}
                      </div> */}
                    </div>
                  </div>
                  
                  {requiredQuestions}
                  {optionalQuestions}
                </div>
                  {(portrait.artist.filter(artist => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
                    <button onClick={handleClaim} className='text-xl border-black border-2 rounded-lg px-4 py-2 w-1/4 mx-auto mt-4 hover:text-white hover:bg-[#0075FF]'>Claim</button>
                  }
            </Dialog>}
        </div>  
      </div>
    )
}

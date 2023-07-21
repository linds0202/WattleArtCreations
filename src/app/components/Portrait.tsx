import { useState } from 'react'
import { addArtist, updateUserData } from '../firebase/firestore'
import { useRouter } from 'next/navigation'
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { UserData } from '../artistDashboard/[userId]/portfolio/page'
import Link from 'next/link'
import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '../portraits/components/questionaire/Accordion'

interface PortraitProps {
  portrait: PortraitData,
  user: UserData,
}

export default function Portrait({ portrait, user}: PortraitProps) {
    const router = useRouter()

    const [openArtistDetails, setOpenArtistDetails] = useState(false)

    const handleClaim = async () => {
      const updatedArtist = {...user, activeCommissions: user.activeCommissions + 1}
      updateUserData(updatedArtist)
      const updatedPortrait = addArtist(portrait.uid, user.uid, user.displayName)
      router.push(`/artistDashboard/${user.uid}`)
    }

    const handleViewDetails = () => {
      setOpenArtistDetails(true)
    }

    const characters = portrait.characters.map((char, i) => (
      <div key={i} className='border-2 border=[#282828] rounded-xl p-2 mx-2 text-sm'>
        <p className='text-md font-semibold text-center'>Character {i + 1}</p>
        <p>Bodystyle: {char.bodyStyle}</p>
        <p>Variations{char.numCharVariations}</p>
        <p>Pets: {char.numPets}</p>
        <p>Extras: {char.extras.join(', ')}</p>
      </div>
    ))

    const requiredQuestions = (
      <div>
        <Accordion title="Character Basics" required={false} active={true}>
          <p className='text-sm leading-3'>
          Please provide a description of the character, including their name, age, gender, and any significant features. Additionally, please include their body type, hair color and style, eye color, and skin tone as is applicable.
          </p>
          <p>{portrait.requiredQs[0]}</p>
        </Accordion>
        <Accordion title="Inspirations and References:" required={false} active={true}>
          <p className='text-sm leading-3'>
          Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
          </p>
          <p>{portrait.requiredQs[1]}</p>
        </Accordion>
      </div>
    )

    const optionalQuestions = (
      <div>
        {/* general character qs */}
        <Accordion title="Character Basics" required={false} active={true}>
          <div>
            <p className='text-sm leading-3'><span>Personality:</span> What is the character's personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?</p>
            <p>{portrait.questions[0].q1}</p>
            <p className='text-sm leading-3'><span>Clothing and Accessories:</span> What kind of clothing and accessories does your character wear?</p>
            <p>{portrait.questions[0].q2}</p>
            <p className='text-sm leading-3'><span>Pose and Expression:</span> Do you have a specific pose or expression in mind for the character?</p>
            <p>{portrait.questions[0].q3}</p>
            <p className='text-sm leading-3'><span>Special Requests:</span> Are there any unique elements, features, or requests that you would like to include in your commission, which haven’t been covered in the previous questions?</p>
            <p>{portrait.questions[0].q4}</p>
          </div> 
        </Accordion>

        {/* Character variation qs */}
        <Accordion title="Character Variations" required={false} active={true}>
          <div>
            <p className='text-sm leading-3'>what variations would you like between each version (e.g., different outfits, expressions, poses, or color schemes)?</p>
            <p>{portrait.questions[1].q1}</p>
          </div> 
        </Accordion>

        {/* Pet qs */}
        <Accordion title="Pet / Familiar:" required={false} active={true}>
          <div>
            <p className='text-sm leading-3'>For your pet/familiar, please describe their appearance, including any unique features or accessories.</p>
            <p>{portrait.questions[2].q1}</p>
            <p className='text-sm leading-3'>How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character, perched on the character's shoulder, etc.)?</p>
            <p>{portrait.questions[2].q2}</p>
          </div> 
        </Accordion>

        {/* Character Sheet qs */}
        <Accordion title="Character Sheet:" required={false} active={true}>
          <div>
            <p className='text-sm leading-3'>Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.</p>
            <p>{portrait.questions[3].q1}</p>
            <p className='text-sm leading-3'>Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?</p>
            <p>{portrait.questions[3].q2}</p>
          </div> 
        </Accordion>

        {/* Weapon Sheet qs */}
        <Accordion title="Character Sheet:" required={false} active={true}>
          <div>
            <p className='text-sm leading-3'>Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.</p>
            <p>{portrait.questions[4].q1}</p>
            <p className='text-sm leading-3'>If you have any reference images or inspiration for the weapon design, please provide them.</p>
            <p>{portrait.questions[4].q2}</p>
          </div> 
        </Accordion>
      </div>
    )
    
    return (
      <div className='border-2 rounded-xl border-black w-11/12 p-8 m-4 text-black flex flex-col hover:cursor-pointer hover:scale-105 transition duration-500 group'>
            <h4 className='text-xl font-bold text-[#0075FF]'>{portrait.portraitTitle}<span className='text-sm font-light text-black ml-4'>({portrait.mode})</span></h4>
            <div className='flex justify-between mt-2'>
              <div className='w-9/12 flex'>
                <div>
                  <p className='mb-2'>Ordered on: {new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</p>
                  <p className='mb-2'>Status: {portrait.status}</p>
                </div>
                <div className='ml-10'>
                  {user?.roles === 'Artist' && <p className='mb-2'>Customer:<span className='ml-4'>{portrait.customer}</span></p>}
                  <p className='mb-2'>Artist: 
                  {portrait.artist.length  
                    ? portrait.artist.map((artist, i) => 
                      <Link key={i} href={`/artistDashboard/${portrait.artist[i].id}/portfolio`} className="text-xl group-hover:underline ml-4">
                        <span>{artist.artistName}</span>
                      </Link>
                    )
                    : <span className='ml-4'>No artist assigned yet</span>}
                  </p>
                </div>        
              </div>
              
              {/* If artist & not max commissions show claim button*/}
              {(portrait.artist.filter(artist => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
                <button onClick={handleClaim} className='border-black border-2 rounded-lg ml-4 px-4'>Claim</button>
              }

              {/* If not ordered - click to add to cart */}
              {user?.roles === 'Customer' && !portrait.paymentComplete && 
                <Link href={`/portraits?selection=${portrait.mode}&portrait_id=${portrait.uid}`} className="text-3xl group-hover:underline"><p>Add to Cart</p></Link>
              }

              {/* If payment complete - link to individual portrait page */}
              {user?.roles === 'Customer' && portrait.paymentComplete && <Link href={`/portraits/${portrait.uid}`} className="text-3xl group-hover:underline"><p>View Details</p></Link>}
              
              {user?.roles === 'Artist' && 
                <button className='text-black' onClick={handleViewDetails}>View Details</button>         
              }

              {openArtistDetails && 
                <Dialog 
                    onClose={() => setOpenArtistDetails(false)} 
                    open={openArtistDetails} 
                    fullWidth={true}
                    maxWidth='md'
                    PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
                >
                    <IconButton onClick={() => setOpenArtistDetails(false)} className='absolute top-2 right-2 text-white'>
                        <CloseIcon className='text-black hover:text-red-600'/>
                    </IconButton>
                    <div className="flex flex-col justify-center items-center">
                      <div className='w-1/12 h-1/12 bg-[#0075FF] rounded-full py-4 px-2'>
                        <p className='text-center text-white text-xl font-bold'>${portrait.price}</p>
                      </div>
                      <p className='text-xl text-center font-bold mt-0'>{portrait.portraitTitle} <span className='text-sm text-[#959595]'>({portrait.mode})</span></p>
                      <p>Number of Characters: {portrait.characters.length}</p>
                      {characters}
                      {requiredQuestions}
                      {optionalQuestions}
                    </div>
                      {(portrait.artist.filter(artist => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
                        <button onClick={handleClaim} className='border-black border-2 rounded-lg ml-4 px-4'>Claim</button>
                      }
                </Dialog>}
            </div>  
      </div>
    )
}

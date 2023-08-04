import { PortraitData } from "../portraits/components/PortraitCustomizer"
import Accordion from "../portraits/components/questionaire/Accordion"

interface DisplayedOptionalQuestionsProps {
  portrait: PortraitData,
  charVariations: boolean,
  pet: boolean,
  charSheet: boolean,
  weaponSheet: boolean
}

const DisplayedOptionalQuestions = ({portrait, charVariations, pet, charSheet, weaponSheet}: DisplayedOptionalQuestionsProps) => {
  
  return (
    <div>
      {/* general character qs */}
      <Accordion title="Character Basics" required={false} active={true}>
        <div>
          <p className='text-sm'><span>Personality:</span> What is the character's personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?</p>
          <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q1}</p>
          <p className='text-sm'><span>Clothing and Accessories:</span> What kind of clothing and accessories does your character wear?</p>
          <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q2}</p>
          <p className='text-sm'><span>Pose and Expression:</span> Do you have a specific pose or expression in mind for the character?</p>
          <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q3}</p>
          <p className='text-sm'><span>Special Requests:</span> Are there any unique elements, features, or requests that you would like to include in your commission, which haven’t been covered in the previous questions?</p>
          <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[0].q4}</p>
        </div> 
      </Accordion>

      {/* Character variation qs */}
      <Accordion title="Character Variations" required={false} active={charVariations}>
        <div>
            {charVariations ?
            <>
                <p className='text-sm leading-3'>What variations would you like between each version (e.g., different outfits, expressions, poses, or color schemes)?</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[1].q1}</p>
            </>
            : <p className='text-sm font-semibold'>No Pets were added to this portrait.</p>
            }
        </div> 
      </Accordion>

      {/* Pet qs */}
      <Accordion title="Pet / Familiar:" required={false} active={pet}>
        <div>
            {pet ?
            <>
                <p className='text-sm leading-3'>For your pet/familiar, please describe their appearance, including any unique features or accessories.</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[2].q1}</p>
                <p className='text-sm leading-3'>How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character, perched on the character's shoulder, etc.)?</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[2].q2}</p>
            </>
            : <p className='text-sm font-semibold'>No Pet was added to this portrait.</p>
            }
        </div> 
      </Accordion>

      {/* Character Sheet qs */}
      <Accordion title="Character Sheet:" required={false} active={charSheet}>
        <div>
            {charSheet ?
            <>
                <p className='text-sm leading-3'>Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[3].q1}</p>
                <p className='text-sm leading-3'>Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[3].q2}</p>
            </>
            : <p className='text-sm font-semibold'>No Character sheet was added to this portrait</p>
            }
        </div> 
      </Accordion>

      {/* Weapon Sheet qs */}
      <Accordion title="Character Sheet:" required={false} active={weaponSheet}>
        <div>
            {weaponSheet ?
            <>
                <p className='text-sm leading-3'>Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[4].q1}</p>
                <p className='text-sm leading-3'>If you have any reference images or inspiration for the weapon design, please provide them.</p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.questions[4].q2}</p>
            </>
            : <p className='text-sm font-semibold'>No Weapon Sheet was added to this portrait.</p>
            }
        </div> 
      </Accordion>
    </div>
  )
}

export default DisplayedOptionalQuestions
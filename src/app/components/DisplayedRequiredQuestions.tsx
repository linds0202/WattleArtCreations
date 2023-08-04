import { PortraitData } from "../portraits/components/PortraitCustomizer"
import Accordion from "../portraits/components/questionaire/Accordion"

interface DisplayedRequiredQuestionsProps {
    portrait: PortraitData
}

const DisplayedRequiredQuestions = ({portrait}: DisplayedRequiredQuestionsProps) => {
    
    return (
        <div>
            <Accordion title="Character Basics" required={false} active={true}>
                <p className='text-sm'>
                    Please provide a description of the character, including their name, age, gender, and any significant features. Additionally, please include their body type, hair color and style, eye color, and skin tone as is applicable.
                </p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.requiredQs[0]}</p>
            </Accordion>
            <Accordion title="Inspirations and References" required={false} active={true}>
                <p className='text-sm'>
                    Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
                </p>
                <p className='border-2 border-[#E5E5E5] rounded-lg px-4 py-2 mt-2 text-sm font-semibold'>{portrait.requiredQs[1]}</p>
            </Accordion>
        </div>
    )
}

export default DisplayedRequiredQuestions
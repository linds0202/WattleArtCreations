import { Field } from 'formik';
import Accordion from './Accordion';

const RequiredQuestions = () => {
    
    
    return (
        <div>
            {/* <h2 className='text-2xl text-center font-bold'>Required Questions</h2> */}
            <div>
                {/* <div className='p-3 flex justify-start items-center'>
                    <label className='text-[#4DFF90text-lg font-bold text-gray-light mr-2'>
                        Name your portrait:
                    </label>
                    <Field 
                        name="portraitTitle" 
                        className="w-8/12 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        required
                    />
                </div> */}
                
                <Accordion title="Character Basics" required={true} active={true}>
                    <label className='text-sm leading-3'>
                    Please provide a description of the character, including their name, age, gender, and any significant features. Additionally, please include their body type, hair color and style, eye color, and skin tone as is applicable.
                    </label>
                    <Field 
                        required
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="requiredQs[0]" 
                        className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                    />
                </Accordion>
                <Accordion title="Inspirations and References" required={true} active={true}>
                    <label className='text-sm leading-3'>
                        Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
                    </label>
                    <Field 
                        required
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="requiredQs[1]"
                        className="text-sm w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-lg py-2 px-4"
                    />
                </Accordion>
            </div>
        </div>
    )
}

export default RequiredQuestions
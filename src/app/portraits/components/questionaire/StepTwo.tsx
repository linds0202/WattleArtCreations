import { Field } from 'formik';
import Accordion from './Accordion';


interface MyQuestionProps { 
    pet: Boolean,
    charSheet: Boolean, 
    weaponSheet: Boolean,
}

const StepTwo = ({ pet, charSheet, weaponSheet } : MyQuestionProps) => {

    return (
        <>        
            {/* Character Qs */}
            <Accordion title="Characters" >
                <label className='text-sm leading-3'>
                    Character Basics: Can you provide a brief description of the character, including their name, age, gender, and any significant features (e.g., scars, tattoos, or birthmarks)?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60" 
                    name="questions[0].q1" 
                    className="w-full text-black mt-2 border-2 border-[#282828]"
                />
                <label className='text-sm leading-3'>
                    Personality: What is the character&#39;s personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60" 
                    name="questions[0].q2"
                    className="w-full text-black mt-2 border-2 border-[#282828]"
                    />
                <label className='text-sm leading-3'>
                    Physical Appearance: Please describe the character&#39;s physical appearance in detail, including body type, hair color and style, eye color, and skin tone. If you have any reference images or inspirations, please provide them.
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60" 
                    name="questions[0].q3"
                    className="w-full text-black mt-2 border-2 border-[#282828]"
                />
            
                <label className='text-sm leading-3'>
                    Clothing and Accessories: What kind of clothing and accessories does your character wear? Are there any particular styles, colors, or motifs you would like to see incorporated into the outfit? Please provide detailed descriptions or reference images if available.
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60"
                    name="questions[0].q4"
                    className="w-full text-black mt-2 border-2 border-[#282828]"
                />
                <label className='text-sm leading-3'>
                    Pose and Expression: Do you have a specific pose or expression in mind for the character, or would you like the artist to choose one that best represents the character&#39;s personality?
                </label>
                <Field 
                    as="textarea"
                    rows="3"
                    cols="60"
                    name="questions[0].q5" 
                    className="w-full text-black mt-2 border-2 border-[#282828]"
                />
            </Accordion>


            {/* General Qs */}
            <Accordion title="General">
                <label>
                    Inspirations and References: Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
                </label>
                <Field 
                    as="textarea"
                    rows="4"
                    cols="60" 
                    name="questions[1].q1"
                    className="w-full text-black mt-2 border-2 border-[#282828]" 
                />
                <label>
                    Mood and Atmosphere: What kind of mood or atmosphere would you like to convey through the artwork (e.g., happy, mysterious, dramatic, serene, etc.)?
                </label>
                <Field 
                    as="textarea"
                    rows="4"
                    cols="60" 
                    name="questions[1].q2" 
                    className="w-full text-black mt-2 border-2 border-[#282828]"  
                />
                <label>
                    Special Requests: Are there any unique elements, features, or requests that you would like to include in your commission, which haven&#39;t been covered in the previous questions?
                </label>
                <Field 
                    as="textarea"
                    rows="4"
                    cols="60" 
                    name="questions[1].q3" 
                    className="w-full text-black mt-2 border-2 border-[#282828]" 
                />
            </Accordion>

            {/* Pets Qs */}
            <Accordion title="Pets">
                {pet ? 
                    <>
                        <label>
                            For your pet/familiar, please describe their appearance, including any unique features or accessories.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[2].q1" 
                            className="w-full text-black mt-2 border-2 border-[#282828]"  
                        />
                        <label>
                            How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character,perched on the character&#39;s shoulder, etc.)?
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[2].q2"
                            className="w-full text-black mt-2 border-2 border-[#282828]"  
                        />
                    </> 
                    : <p>No pets have been added to this portrait</p>}
            </Accordion>
            
            {/* Character Sheets Qs */}
            <Accordion title="Character Sheet">
                {charSheet ? 
                    <>
                        <label>
                            Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[3].q1"  
                            className="w-full text-black mt-2 border-2 border-[#282828]" 
                        />
                        <label>
                            Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[3].q2"   
                            className="w-full text-black mt-2 border-2 border-[#282828]"
                        />
                    </>
                    : <p>No Character Sheets have been added to this portrait</p>}
            </Accordion>

            {/* Weapons Sheet Qs */}
            <Accordion title="Weapons Sheet">
                {weaponSheet ? 
                    <>
                        <label>
                            Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[4].q1"
                            className="w-full text-black mt-2 border-2 border-[#282828]"  
                        />
                        <label className='w-6/12 p-4'>
                            If you have any reference images or inspiration for the weapon design, please provide them.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[4].q2" 
                            className="w-full text-black mt-2 border-2 border-[#282828]"  
                        />
                    </> 
                    : <p>No Weapon Sheets have been added to this portrait</p>}
            </Accordion>
        </>
    )
}


export default StepTwo
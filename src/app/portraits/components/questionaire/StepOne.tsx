import { addPortrait } from "@/app/firebase/firestore"
import { useEffect, useState } from "react"
import { Formik, Form, Field } from 'formik';
import { Slider, Button, Dialog } from '@mui/material';
import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { PortraitData } from "./Questionaire";
import { motion } from "framer-motion";

interface MyCharValues {
    bodyStyle: string,
    numCharVariations: number,
    pets: boolean,
    numPets: number,
    extras: [],
    total: number
}

interface MyCharProps {
    prices: Object
    portraitData: PortraitData, 
    chars: MyCharValues[],
    setChars: Function,
    setPet: Function,
    setCharSheet: Function, 
    setWeaponSheet: Function,
}


const StepOne = ({ prices, portraitData, chars, setChars, setPet, setCharSheet, setWeaponSheet }: MyCharProps) => {
    const selection = portraitData.mode
    const [openCharMod, setOpenCharMod] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [editCharIndex, setEditCharIndex] = useState<number | null>(null)
    const [weaponsPrice, setWeaponsPrice] = useState<number>(0)
    const [characterSheetPrice, setCharacterSheetPrice] = useState<number>(0)
    const [modelPrice, setModelPrice] = useState<number>(0)
    
    const [initialCharValues, setInitialCharValues] = useState<MyCharValues>(isEdit ? portraitData.characters[editCharIndex] : { 
        bodyStyle: '',
        numCharVariations: 1,
        pets: false,
        numPets: 0,
        extras: [],
        total: 0
    })

    const [message, setMessage] = useState('')
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = (e) => {
        setMessage(e)
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setMessage('')
        setIsHovering(false);
    };

    useEffect(() => {
        chars.forEach(char => {
            if(char.pets) setPet(true)
        
            if(char.extras.includes('character')) setCharSheet(true)
        
            if(char.extras.includes('weapons')) setWeaponSheet(true)
        })

    }, [chars])

    const handleCharSubmit = (values) => {
        setPet(false)
        setCharSheet(false)
        setWeaponSheet(false)
        
        if(!values.pets) {
            values.numPets = 0
        } 

        let totalPrice = prices[selection][values.bodyStyle] 
                        + ((values.numCharVariations - 1) * 30) 
                        + values.numPets * 25
                        + (modelPrice ? prices[selection]['model'] : 0)
                        + (characterSheetPrice ? prices[selection]['character'] : 0)
                        + (weaponsPrice ? prices[selection]['weapons'] : 0)

        if (isEdit) {
            let updateCharArr = chars.map((char, i) => {
                if (i === editCharIndex) {
                    return {...values, total: totalPrice}
                } else {
                    return char
                }
            })
            setChars(updateCharArr)

        } else {
            setChars([...chars, {...values, total: totalPrice}])
        }
        setIsEdit(false)
        setModelPrice(0)
        setCharacterSheetPrice(0)
        setWeaponsPrice(0)
        setOpenCharMod(false)
    }

    function handleAddCharacter() {
        setInitialCharValues({
            bodyStyle: '',
            numCharVariations: 1,
            pets: false,
            numPets: 0,
            extras: [],
            total: 0
        })
        setOpenCharMod(true)
    }

    const handleEditChar = (i: number) => {
        
        setIsEdit(true)
        setEditCharIndex(i)
        setInitialCharValues(chars[i])


        if (chars[i].extras.includes('model')) setModelPrice(prices[selection]['model'])
        if (chars[i].extras.includes('character')) setCharacterSheetPrice(prices[selection]['character'])
        if (chars[i].extras.includes('weapons')) setWeaponsPrice(prices[selection]['weapons'])
        
        setOpenCharMod(true)
    }

    const handleDeleteChar = (index: number) => {
        let deleteCharArr = chars.filter((char, i) => i !== index)
        
        setChars(deleteCharArr)
    }

    const calcModelPrice = () => {
        setModelPrice(prev => {
            if (prev > 0) {
                return 0
            } else {
                return prices[selection].model
            }
        })
    }

    const calcCharacterSheetPrice = () => {
        setCharacterSheetPrice(prev => {
            if (prev > 0) {
                return 0
            } else {
                return prices[selection].character
            }
        })
    }

    const calcWeaponPrice = () => {
        setWeaponsPrice(prev => {
            if (prev > 0) {
                return 0
            } else {
                return prices[selection].weapons
            }
        })
    }


    // const handleSubmit = () => {
    //     setPortraitData({...portraitData, characters: chars}) 
    // }

    return (
    <>   
        <div className='self-start w-full bg-[#E5E5E5] rounded-xl px-4 py-4 flex flex-wrap justify-between items-center'>
            <h2 className="w-full text-2xl text-center">Character List</h2>
            {chars?.map((char, i) => (
                <div key={i} 
                    className='w-[48%] h-[300px] mt-2 flex flex-col justify-between items-start border-2 border-[#282828] rounded-xl bg-white p-4'
                >
                    <p>Body Style: {char.bodyStyle}</p>
                    <p># of Character variations: {char.numCharVariations}</p>
                    <p># of Pets: {char.numPets}</p>
                    <p>Extras: {char.extras?.join(', ')}</p>
                    <div className="w-full flex justify-between items-center">
                        <p>Price: ${char.total}</p>
                        <div className="flex justify-end items-center">
                            <button type="button" onClick={() => handleEditChar(i)} className='text-cyan-800 hover:text-cyan-400'>
                                <EditIcon />
                            </button>
                            <button type="button" onClick={() => handleDeleteChar(i)} className='ml-4 text-black hover:text-red-600'>
                                <DeleteForeverIcon />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {!openCharMod && 
                <div className='w-5/12 flex flex-col justify-center items-center'>
                    <Button onClick={handleAddCharacter} className='flex flex-col items-center mt-10 mb-10'>
                        <AddCircleOutlineIcon sx={{ fontSize: 80 }}/>
                        <h4 className='m-0'>Add character</h4>
                        {chars?.length !== 0 && <span className='text-red-600 text-xl mt-2'> Additional Characters 10% off</span>}
                    </Button>
                </div>
            }
        </div>


        {/* Character Selections Modal*/}
        <Dialog 
            onClose={() => setOpenCharMod(false)} 
            open={openCharMod} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white" } }}
        >
            <IconButton onClick={() => setOpenCharMod(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <p className='text-xl text-center font-bold mt-0'>Make your selections to add a character to your portrait</p>
            <div className="w-full">
                <Formik
                    initialValues={initialCharValues}
                    onSubmit={handleCharSubmit}
                    >
                    {({ handleChange, values }) => (
                    <Form className="w-full flex flex-col justify-between items-center">
                        {/* radio buttons */}
                        <div className="w-full mt-4 flex justify-between">
                            <div className="w-1/2 p-4">
                                <div className='w-10/12 flex justify-between items-end mb-4'>
                                    <div className="relative">
                                        <p className='mr-4 mb-0'>Body style:</p>                                        
                                        <label className='ml-4'>
                                            <Field type="radio" name="bodyStyle" value="Headshot" required />
                                            Headshot
                                        </label>
                                        <label className='ml-4'>
                                            <Field type="radio" name="bodyStyle" value="Half" required/>
                                            Half
                                        </label>
                                        <label className='ml-4'>
                                            <Field type="radio" name="bodyStyle" value="Full" required/>
                                            Full
                                        </label>
                                        <div
                                            className="absolute -top-[15%] left-[37%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('body')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-cyan-600"/>
                                            {isHovering && message === 'body' && (
                                                <div className="w-[300px] bg-[#E5E5E5] rounded-lg p-2 absolute -top-[15%] left-[37%] m-0">
                                                    <h2 className="text-sm text-left">Bodystyle message</h2>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-10/12 flex justify-between items-end mb-2'>
                                    <div className='relative flex items-center'>
                                        <p className='mr-4 mb-0'># of character variations:</p>

                                        <TextField
                                            type="number"
                                            name="numCharVariations"
                                            value={values.numCharVariations}
                                            onChange={handleChange}
                                            size="small"
                                            inputProps={{
                                            min: 1,
                                            style: {
                                                textAlign: "center",
                                                color: "black",
                                                fontSize: 12,
                                                width: '40px',
                                                marginLeft: '5px'
                                            }
                                            }}
                                        />
                                        <div
                                            className="absolute -top-[25%] left-[65%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('variations')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-cyan-600"/>
                                            {isHovering && message === 'variations' && (
                                                <div className="w-[300px] bg-[#E5E5E5] rounded-lg p-2 absolute -top-[25%] left-[65%] m-0">
                                                    <h2 className="text-sm text-left">Character variations message</h2>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>  
                                
                                {/* Pets */}
                                <div className="relative">
                                    <label>
                                        <Field type="checkbox" name="pets" className=''/>
                                        <span className='ml-2'>Pets </span>{values.pets && <span> (Use the slider to select # of pets)</span> }
                                    </label>
                                    <div
                                        className="absolute -top-[25%] left-[15%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('pets')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-cyan-600"/>
                                        {isHovering && message === 'pets' && (
                                            <div className="w-[300px] bg-[#E5E5E5] rounded-lg p-2 absolute -top-[25%] left-[15%] m-0">
                                                <h2 className="text-sm text-left">Pets message</h2>
                                            </div>
                                        )}
                                </div>

                                    {values.pets && 
                                        <div className='w-10/12 flex justify-between items-end mb-4'>
                                            <Slider
                                                name="numPets"
                                                min={0}
                                                max={10}
                                                step={1}
                                                defaultValue={0}
                                                valueLabelDisplay="auto"
                                                marks
                                                value={values.numPets}
                                                onChange={handleChange}
                                            /> 
                                        </div>             
                                    } 
                                </div> 

                                {/* Extras */}
                                <p className='mr-4 mb-0'>Extras:</p>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label>
                                        <Field type="checkbox" name="extras" value="model" className='mr-2' onClick={calcModelPrice}/>
                                        <span className='ml-2'>3D Model</span>
                                    </label>
                                    <div
                                        className="absolute -top-[25%] left-[30%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('model')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-cyan-600"/>
                                        {isHovering && message === 'model' && (
                                            <div className="w-[300px] bg-[#E5E5E5] rounded-lg p-2 absolute -top-[25%] left-[30%] m-0">
                                                <h2 className="text-sm text-left">3d Model message</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label className="relative">
                                        <Field type="checkbox" name="extras" value="character" className='mr-2' onClick={calcCharacterSheetPrice}/>
                                        <span className='ml-2'>Character Sheet</span>
                                    </label>
                                    <div
                                            className="absolute -top-[25%] left-[40%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('characterSheet')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-cyan-600"/>
                                            {isHovering && message === 'characterSheet' && (
                                                <div className="w-[300px] bg-[#E5E5E5] rounded-lg p-2 absolute -top-[25%] left-[40%] m-0">
                                                    <h2 className="text-sm text-left">Character Sheet message</h2>
                                                </div>
                                            )}
                                        </div>
                                </div>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label className="relative">
                                        <Field type="checkbox" name="extras" value="weapons" className='mr-2' onClick={calcWeaponPrice}/>
                                        <span className='ml-2'>Weapons Sheet</span>
                                    </label>
                                    <div
                                        className="absolute -top-[25%] left-[40%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('weaponSheet')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-cyan-600"/>
                                        {isHovering && message === 'weaponSheet' && (
                                            <div className="w-[300px] bg-[#E5E5E5] rounded-lg p-2 absolute -top-[25%] left-[40%] m-0">
                                                <h2 className="text-sm text-left">Weapons Sheet message</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-5/12 bg-[#E5E5E5] rounded-xl p-4 flex flex-col justify-between items-start">
                                <h2 className="w-full text-2xl font-bold">Options Pricing</h2>
                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <p className="">BodyStyle: </p>
                                        <p>{!prices[selection][values.bodyStyle] ? 0 : prices[selection][values.bodyStyle]}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Variants: </p>
                                        <p>{(values.numCharVariations - 1) * 30}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Pets: </p>
                                        <p>{!values.pets ? 0 : values.numPets * 25}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">3D model: </p>
                                        <p>{values.extras.includes('model') ? prices[selection].model : 0}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Character Sheet: </p>
                                        <p>{values.extras.includes('character') ? prices[selection].character : 0}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Weapons Sheet: </p>
                                        <p>{values.extras.includes('weapons') ? prices[selection].weapons : 0}</p>
                                    </div>
                                </div>
                                <div className="w-full border-b-2 border-[#282828]"></div>
                                <div className="self-end w-7/12 flex justify-between items-center">
                                    <p className="w-1/2 text-xl font-bold">Total: </p>
                                    <p className="w-1/2 ml-4 border-2 border-[#282828] bg-white py-2 px-4 rounded-md flex justify-between items-center text-xl"><span>$</span><span>{
                                        0 + (!prices[selection][values.bodyStyle] ? 0 : prices[selection][values.bodyStyle])
                                        + ((values.numCharVariations - 1) * 30) 
                                        + (values.pets ? values.numPets * 25 : 0)
                                        + modelPrice
                                        + characterSheetPrice
                                        + weaponsPrice
                                        }</span></p>
                                </div>
                            </div>
                        </div> 
                        {/* <motion.button 
                            type="submit"
                            className="w-[30%] mx-auto text-xl mt-4 border-2 border-black rounded-md px-4 py-2 hover:bg-black hover:text-white transition" 
                            whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                            whileTap={{ scale: 1.05 }}
                        >
                            Character Complete
                        </motion.button>  */}
                        <button type="submit" className='text-black border-2 border-black rounded-lg py-2 px-4 mt-2'>
                            Complete Character
                        </button>
                    </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    </>
  )
}

export default StepOne



        {/* <Formik
            initialValues={portraitData}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
            <Form> */}
                {/* <div className='flex justify-around items-center w-8/12 mx-auto'>
                    <button 
                        // type="submit" 
                        onClick={handleSubmit}
                        className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>
                        Finished Adding Characters
                    </button>
                </div> */}
{/*                 
            </Form>
            )}
        </Formik> */}
import { useEffect, useState } from "react"
import { Formik, Form, Field } from 'formik';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { PortraitData } from "../PortraitCustomizer";
import { motion } from "framer-motion";

export interface MyCharValues {
    bodyStyle: string,
    numCharVariations: number,
    pets: boolean,
    numPets: number,
    extras: string[],
    total: number,
    charDiscount: boolean
}

interface MyCharProps {
    prices: any,
    portraitData: PortraitData, 
    chars: MyCharValues[],
    setChars: Function,
    setCharVariations: Function,
    setPet: Function,
    setCharSheet: Function, 
    setWeaponSheet: Function,
}


const StepOne = ({ prices, portraitData, chars, setChars, setCharVariations, setPet, setCharSheet, setWeaponSheet }: MyCharProps) => {
    const selection = portraitData.mode
    const [openCharMod, setOpenCharMod] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [editCharIndex, setEditCharIndex] = useState<number>(0)
    const [weaponsPrice, setWeaponsPrice] = useState<number>(0)
    const [characterSheetPrice, setCharacterSheetPrice] = useState<number>(0)
    const [modelPrice, setModelPrice] = useState<number>(0)
    const [discount, setDiscount] = useState<boolean>(false)
    const [highPrice, setHighPrice] = useState<number>(0)
    const [highestPriceIndex, setHighestPriceIndex] = useState<number>(0)
    
    const [initialCharValues, setInitialCharValues] = useState<MyCharValues>(isEdit ? portraitData.characters[editCharIndex] : { 
        bodyStyle: '',
        numCharVariations: 1,
        pets: false,
        numPets: 0,
        extras: [],
        total: 0,
        charDiscount: false
    })

    const [message, setMessage] = useState('')
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = (e: any) => {
        setMessage(e)
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setMessage('')
        setIsHovering(false);
    };

    useEffect(() => {
        chars.forEach((char) => {
            if (char.numCharVariations > 1) setCharVariations(true)

            if(char.pets) setPet(true)
        
            if(char.extras.includes('character')) setCharSheet(true)
        
            if(char.extras.includes('weapons')) setWeaponSheet(true)

        })
    }, [chars])

    const handleCharSubmit = (values: MyCharValues) => {

        setCharVariations(false)
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


        console.log('totalprice calc: ', totalPrice)
        

        if (isEdit) {
            if (chars.length > 1) {
                setDiscount(true)
                if (totalPrice > highPrice && editCharIndex !== highestPriceIndex) {
                    const updatedDiscount = chars.map((char, i) => {
                        if (i === editCharIndex ) {
                            setHighPrice(totalPrice)
                            setHighestPriceIndex(i)
                            return {...char, total: totalPrice, charDiscount: false}
                        } else {
                            return {...char, charDiscount: true}
                        }
                    })
                    setChars(updatedDiscount)
                } else {
                    //if new price is less than highest price - update edited price & set new high price info
                    if (totalPrice > highPrice) {
                        setHighPrice(totalPrice)
                    }
                    let updateCharArr = chars.map((char, i) => {
                        if (i === editCharIndex) {
                            return {...values, total: totalPrice}
                        } else {
                            return char
                        }
                    })
                    setChars(updateCharArr)
                }
            } else {
                //if there's only 1 char - update the price
                let updateCharArr = chars.map((char, i) => {
                    if (i === editCharIndex) {
                        return {...values, total: totalPrice}
                    } else {
                        return char
                    }
                })
                setDiscount(false)
                setHighPrice(totalPrice)
                setHighestPriceIndex(0)
                setChars(updateCharArr)
            }
        } else {
            if (chars.length > 0) {
                setDiscount(true)
                const updatedDiscount = chars.map(char => {
                    if (totalPrice >= highPrice) {
                        setHighPrice(totalPrice)
                        setHighestPriceIndex(chars.length)
                        return {...char, charDiscount: true}
                    } else {
                        return char
                    }
                })
                if (updatedDiscount.every(char => char.charDiscount)) {
                    setChars([...updatedDiscount, {...values, total: totalPrice, charDiscount: false}])
                } else {
                    setChars([...updatedDiscount, {...values, total: totalPrice, charDiscount: true}])
                }
            } else {
                setDiscount(false)
                setHighPrice(totalPrice)
                setHighestPriceIndex(0)
                setChars([...chars, {...values, total: totalPrice}])
            }
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
            total: 0,
            charDiscount: false
        })

        setModelPrice(0)
        setCharacterSheetPrice(0)
        setWeaponsPrice(0)

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

        if (index === highestPriceIndex) {
            let highest = 0
            let highIndex = 0
            let deleteCharArr = chars.filter((char, i) => i !== index)
            
            //set new highest price & index
            deleteCharArr.forEach((char, i) => {
                if (char.total > highest) {
                    highest = char.total
                    highIndex = i
                    setHighPrice(char.total)
                    setHighestPriceIndex(i)
                }
            })

            const updateDeleteCharArr = deleteCharArr.map((char, i) => {
                if (i === highIndex) {
                    return {...char, charDiscount: false}
                } else {
                    return char
                }
            })
            
            setChars(updateDeleteCharArr)
        } else {
            let deleteCharArr = chars.filter((char, i) => i !== index)
            let highest = 0
            deleteCharArr.forEach((char, i) => {
                if (char.total > highest) {
                    setHighPrice(char.total)
                    setHighestPriceIndex(i)
                }
            })
            setChars(deleteCharArr)
        }
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

    console.log('chars is: ', chars)

    

    return (
    <>   
        <div className='self-start w-full bg-[#E5E5E5] rounded-xl px-4 py-4 flex flex-wrap justify-between items-center'>
            <h2 className="w-full text-4xl text-center mb-4 font-bold">Character List</h2>
            {!openCharMod && 
                <div className='w-[48%] h-auto mt-8 rounded-xl bg-white flex flex-col justify-center items-center'>
                    <Button onClick={handleAddCharacter} className='flex flex-col items-center mt-10 mb-10 hover:bg-none border-2 border-black'>
                        <AddCircleOutlineIcon sx={{ fontSize: 80 }}/>
                        <h4 className='m-0'>Add character</h4>
                        {chars?.length !== 0 && <div className="flex flex-col justify-center items-center"><span className='text-red-600 text-xl mt-2'> Additional Characters 10% off*</span><span className='text-[#929191] text-sm mt-2'>(*discount applied to lowest value characters)</span></div>}
                    </Button>
                </div>
            }

            {chars.length === 0 && !openCharMod &&
                <div className='relative w-[48%] h-auto mt-8 rounded-xl flex flex-col justify-center'>
                    <p className="text-4xl font-bold text-[#0075FF]">Start Here!</p>
                    <p className="">Add a character to your portrait</p>
                    <motion.img 
                        src="/images/customizer/arrow-left.png" 
                        alt="arrow pointing to add character button"
                        className="top-10 -left-[30%] absolute w-[128px] h-[128px] object-cover"
                        initial={{ rotate: 30, scale: 1 }}
                        animate={{ scale: 1.1 }}
                        transition={{ ease: "linear", duration: .75, repeat: Infinity, repeatType: "reverse" }}
                    >
                    </motion.img>
                </div>
            }

            {chars?.map((char, i) => (
                <div key={i} 
                    className='w-[48%] h-auto mt-8 flex flex-col justify-between items-start border-2 border-[#282828] rounded-xl bg-white relative'
                >
                    <div className={`w-[110px] h-[110px] absolute -top-[15px] -left-[10px] rounded-full ${char.charDiscount ? 'bg-red-600' : 'bg-[#0075FF]'} flex flex-col justify-center items-center`}>
                        <p className="text-white text-2xl font-bold">
                            ${!char.charDiscount 
                            ? <span>{char.total.toFixed(2)}</span> 
                            : 
                            <span>{(char.total * .9).toFixed(2)}</span>
                            }                        
                        </p>
                        {char.charDiscount && <p className="text-white text-xs line-through">${char.total.toFixed(2)}</p>}
                    </div>

                    <button type="button" onClick={() => handleDeleteChar(i)} className='absolute top-[5px] right-[5px] ml-4 text-black hover:text-red-600'>
                        <DeleteForeverIcon />
                    </button>

                    <img className={` ${char.bodyStyle === 'Full' ? 'w-[64px] h-[128px]' : 'w-[128px] h-[128px]'} object-cover mx-auto rounded-xl my-4`} src={`./images/customizer/${char.bodyStyle}.png`} alt='thumbnail for body style of portrait selection'/>
                    
                    <div className="w-full bg-[#282828] text-white rounded-b-lg p-4">
                        <div className="w-full flex justify-center">
                            <p className="text-center text-xl">{char.bodyStyle}</p>
                            <button type="button" onClick={() => handleEditChar(i)} className='ml-4 text-white hover:text-[#0075FF]'>
                                <EditIcon />
                            </button>
                        </div>
                        <div>
                        <p># of Character variations: {char.numCharVariations}</p>
                        <p># of Pets: {char.numPets}</p>
                    </div>
                    <p>Extras: {char.extras.length === 0 ? "None" : char.extras?.join(', ')}</p>
                    </div>
                </div>
            ))}
        </div>


        {/* Character Selections Modal*/}
        <Dialog 
            onClose={() => setOpenCharMod(false)} 
            open={openCharMod} 
            fullWidth={true}
            maxWidth='xl'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenCharMod(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <div className="flex justify-center items-center">
                <img className="mr-8 w-[10%] justify-self-center" src="./images/drips/side_splashL.png" alt='black accent paint splash'/>
                <p className='text-2xl text-center font-bold mt-0'>Make your selections to add a character to your portrait</p>
                <img className="ml-8 w-[10%] justify-self-center" src="./images/drips/side_splashR.png" alt='black accent paint splash'/>
            </div>

            <div className="w-full">
                <Formik
                    initialValues={initialCharValues}
                    onSubmit={handleCharSubmit}
                    >
                    {({ handleChange, values }) => (
                    <Form className="w-full flex flex-col justify-between items-center">
                        {/* radio buttons */}
                        <div className="relative w-full mt-4 flex justify-between">
                            
                            {values.bodyStyle === "" &&
                                <div className='absolute -top-[25%] left-0 w-1/6 h-auto mt-8 rounded-xl flex flex-col justify-center'>
                                    <p className="text-3xl font-bold text-[#0075FF]">Start Here!</p>
                                    <p className="font-bold">Choose a body style to start customizing</p>
                                    <motion.img 
                                        src="/images/customizer/arrow-left.png" 
                                        alt="arrow pointing to add character button"
                                        className="absolute top-2 left-[55%] w-[128px] h-[128px] object-cover"
                                        initial={{ rotate: -25, scale: 1 }}
                                        animate={{ scale: 1.1 }}
                                        transition={{ ease: "linear", duration: .75, repeat: Infinity, repeatType: "reverse" }}
                                    >
                                    </motion.img>
                                </div>
                            }


                            <div className="w-1/5 py-8">
                                <div className='w-10/12 flex justify-between items-end mb-4'>
                                    <div className="relative">
                                        <p className='text-xl mr-4 mb-2 font-semibold'>Body style:</p>                                        
                                        <label className='text-lg'>
                                            <Field type="radio" name="bodyStyle" value="Headshot" required className='mr-2'/>
                                            Headshot
                                        </label>
                                        <label className='text-lg ml-4'>
                                            <Field type="radio" name="bodyStyle" value="Half" required className='mr-2'/>
                                            Half
                                        </label>
                                        <label className='text-lg ml-4'>
                                            <Field type="radio" name="bodyStyle" value="Full" required className='mr-2'/>
                                            Full
                                        </label>
                                        <div
                                            className="absolute -top-[15%] left-[45%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('body')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#0075FF]"/>
                                            {isHovering && message === 'body' && (
                                                <div className="w-[300px] bg-[#282828] border-4 border-[#282828] rounded-lg p-2 absolute -top-[75px] left-[42%] m-0 ml-8 z-40">
                                                    <img src="./images/body_type.png"  className="max-w-[280px] h-auto object-contain mx-auto border-4 border-white rounded-lg" alt='thumbnail for selected body type'/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full flex justify-between items-end mb-2'>
                                    <div className='w-full relative flex justify-between items-center'>
                                        <p className='text-xl mr-4 my-4 font-semibold'>Character Variations:</p>

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
                                                fontSize: 24,
                                                width: '40px',
                                                marginLeft: '5px',
                                                marginRight: '5px'
                                            }
                                            }}
                                        />
                                        <div
                                            className="absolute top-0 left-[65%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('variations')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#0075FF]"/>
                                            {isHovering && message === 'variations' && (
                                                <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[70%] m-0 ml-4 z-40">
                                                    <h2 className="text-white text-md text-left">How many versions of this character are you looking for? For additional <span className="text-[#0075FF] font-bold">different</span> characters please click &quot;Complete Character&quot; then use the “add character” button.</h2>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>  
                                
                                {/* Pets */}
                                <div className="relative">
                                    <label>
                                        <Field type="checkbox" name="pets" className=''/>
                                        <span className='text-xl ml-2 font-semibold'>Pets </span>{values.pets && <span className="text-sm"> (Use the slider to select # of pets)</span> }
                                    </label>
                                    <div
                                        className="absolute -top-[23%] left-[20%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('pets')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#0075FF]"/>
                                        {isHovering && message === 'pets' && (
                                            <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[20%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Does your character have a <span className="text-[#0075FF] font-bold">companion</span> you’d like included? If so - check this box!</h2>
                                            </div>
                                        )}
                                    </div>
                                    <div className='w-10/12 h-8 flex justify-between items-end mb-4'>
                                        {values.pets && 
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
                                                disabled={!values.pets}
                                            />            
                                        } 
                                    </div>  
                                </div> 

                                {/* Extras */}
                                <p className='text-xl mr-4 mb-0 font-semibold'>Extras:</p>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label>
                                        <Field type="checkbox" name="extras" value="model" className='mr-2' onClick={calcModelPrice}/>
                                        <span className='text-lg ml-2'>3D Model</span>
                                    </label>
                                    <div
                                        className="absolute -top-[30%] left-[39%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('model')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#0075FF]"/>
                                        {isHovering && message === 'model' && (
                                            <div className="w-[300px]  bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[35%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Once you have approved of your final portrait, we&apos;ll design and ship you a custom <span className="text-[#0075FF] font-bold">3d-model</span> based off the image design!</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label className="relative">
                                        <Field type="checkbox" name="extras" value="character" className='mr-2' onClick={calcCharacterSheetPrice}/>
                                        <span className='text-lg ml-2'>Character Sheet</span>
                                    </label>
                                    <div
                                            className="absolute -top-[30%] left-[55%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('characterSheet')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#0075FF]"/>
                                            {isHovering && message === 'characterSheet' && (
                                                <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[45%] m-0 ml-4 z-40">
                                                    <h2 className="text-white text-md text-left">If you&apos;re planning on using this character for a <span className="text-[#0075FF] font-bold">DnD campaign</span>, we can create a personalized character sheet to make all your friends jealous.</h2>
                                                </div>
                                            )}
                                        </div>
                                </div>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label className="relative">
                                        <Field type="checkbox" name="extras" value="weapons" className='mr-2' onClick={calcWeaponPrice}/>
                                        <span className='text-lg ml-2'>Weapons Sheet</span>
                                    </label>
                                    <div
                                        className="absolute -top-[30%] left-[55%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('weaponSheet')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#0075FF]"/>
                                        {isHovering && message === 'weaponSheet' && (
                                            <div className="w-[350px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[45%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Have a <span className="text-[#0075FF] font-bold">special weapon</span> that deserves it&apos;s own attention? Add this option and we will design a separate weapon sheet that will display it from multiple perspectives, showcasing it in all it&apos;s glory.</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>






                            <div className="w-1/2 flex flex-col">
                            
                                {values.bodyStyle !== "" 
                                ?<div className="w-[100%] flex">
                                     {/* <object type="image/svg+xml" data={`images/${values.bodyStyle}.svg`} className="w-[250px] h-[275px] rounded-lg"></object> */}
                                     <motion.img 
                                        src={`images/customizer/${values.bodyStyle}.png`} 
                                        className="w-[250px] h-[275px] object-cover object-top rounded-xl"
                                        initial={{ 
                                            scale: 0,
                                            rotate: 0
                                        }}
                                        animate={{ scale: 1, rotate: 360}}
                                        transition={{ type: "spring", duration: .5 }}
                                    />
                                    <div className="h-[175px] ml-8 mt-4 flex flex-wrap items-start">
                                        {[...Array(values.numCharVariations)].map((n, i) => <object key={i} type="image/svg+xml" data="images/createCharacter.svg" className="w-[100px] h-[100px]"></object>)}
                                    </div>
                                </div>
                                : <div className="w-[250px] h-[275px] border-2 border-[#282828] rounded-xl">                                 
                                </div>}
                                

                                <div className="h-[190px] mt-4 flex items-start">
                                     {values.extras.includes("model") && 
                                     <div className="pb-2 mr-12 bg-[#e9e9e9] rounded-lg">
                                        <img src="images/3DModel.png" className="w-[188px] h-[130px] object-cover rounded-lg"/>
                                        <p className="text-center font-semibold mt-2">3D Model</p>
                                    </div>}

                                     {values.extras.includes("character") && 
                                     <div className="pb-2 mr-12 bg-[#e9e9e9] rounded-lg">
                                        <object type="image/svg+xml" data="images/characterSheet.svg" className="w-[188px] h-[128px] rounded-lg"></object>
                                        <p className="text-center font-semibold mt-2">Character Sheet</p>
                                    </div>}

                                     {values.extras.includes("weapons") && 
                                     <div className="pb-2 bg-[#e9e9e9] rounded-lg">
                                        <object type="image/svg+xml" data="images/weaponSheet.svg" className="w-[188px] h-[128px] rounded-lg"></object>
                                        <p className="text-center font-semibold mt-2">Weapons Sheet</p>
                                    </div>}
                                </div>
                            </div>
            




                            <div className="w-1/4 bg-[#E5E5E5] rounded-xl p-4 flex flex-col justify-between items-start relative border-b-8 border-[#282828]">
                                
                                <h2 className="w-full text-3xl text-center text-[#0075ff] font-bold">Options Pricing</h2>
                                
                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <p className="">BodyStyle: </p>
                                        <p>${!prices[selection][values.bodyStyle] ? (0).toFixed(2) : prices[selection][values.bodyStyle].toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Variants: </p>
                                        <p>${((values.numCharVariations - 1) * 30).toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Pets: </p>
                                        <p>${!values.pets ? (0).toFixed(2) : (values.numPets * 25).toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">3D model: </p>
                                        <p>${values.extras.includes('model') ? prices[selection].model.toFixed(2) : (0).toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">Character Sheet: </p>
                                        <p>${values.extras.includes('character') ? prices[selection].character.toFixed(2) : (0).toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b-2 border-[#282828]">
                                        <p className="">Weapons Sheet: </p>
                                        <p>${values.extras.includes('weapons') ? prices[selection].weapons.toFixed(2) : (0).toFixed(2)}</p>
                                    </div>
                                </div>
                                
                                <div className="self-end w-full flex justify-between items-center">
                                    <p className={`w-full ${!discount ? "font-bold text-xl" : "font-semibold"}`}>{!values.charDiscount ? 'Total: ' : 'Sub total: '}</p>
                                    <p className={`w-3/4 flex justify-between items-center ${!values.charDiscount ? "ml-4 border-2 border-[#282828] bg-white py-2 px-4 rounded-md text-xl" : "font-semibold"}`}>
                                        <span className="w-full text-right">
                                            $ {(0 + 
                                                (!prices[selection][values.bodyStyle] ? 0 : prices[selection][values.bodyStyle])
                                                + ((values.numCharVariations - 1) * 30) 
                                                + (values.pets ? values.numPets * 25 : 0)
                                                + modelPrice
                                                + characterSheetPrice
                                                + weaponsPrice).toFixed(2)}
                                        </span>
                                    </p>
                                </div> 

                                { values.charDiscount && 
                                <> 
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-red-600 text-sm">Additional Character Discount (10%)</p>
                                        <p>-${((0 + (!prices[selection][values.bodyStyle] ? 0 : prices[selection][values.bodyStyle])
                                        + ((values.numCharVariations - 1) * 30) 
                                        + (values.pets ? values.numPets * 25 : 0)
                                        + modelPrice
                                        + characterSheetPrice
                                        + weaponsPrice) * .1).toFixed(2)}</p>
                                    </div>
                                    <div className="self-end w-9/12 flex justify-between items-center">
                                        <p className="w-1/4 text-xl font-bold">Total: </p>
                                        <p className="w-3/4 ml-4 border-2 border-[#282828] bg-white py-2 px-4 rounded-md flex justify-between items-center text-xl"><span>$</span><span>{((0 + (!prices[selection][values.bodyStyle] ? 0 : prices[selection][values.bodyStyle])
                                        + ((values.numCharVariations - 1) * 30) 
                                        + (values.pets ? values.numPets * 25 : 0)
                                        + modelPrice
                                        + characterSheetPrice
                                        + weaponsPrice) * .9).toFixed(2)}
                                        </span></p>
                                    </div>         
                                </>}

                            </div>   
                        </div> 

                        <div className="w-10/12 flex justify-center items-center">
                            <button type="submit" className='text-xl text-black hover:text-white border-2 border-black hover:bg-[#282828] rounded-lg py-2 px-4 mt-4'>
                                Complete Character
                            </button>
                        </div>
                        
                    </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    </>
  )
}

export default StepOne
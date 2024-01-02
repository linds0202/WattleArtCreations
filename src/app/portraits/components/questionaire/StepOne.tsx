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
import { MyAnimalValues, MyBgValues, PortraitData } from "../PortraitCustomizer";
import { useCategoriesContext } from "@/app/context/CategoriesContext";
import { motion } from "framer-motion";
import './styles.css'
import PawSvg from "./PawSvg";
import CharacterSvg from "./CharacterSvg";
import BackgroundSvg from "./BackgroundSvg";

export interface MyCharValues {
    bodyStyle: string,
    numCharVariations: number,
    complexity: number,
    weapon: string,
    armourComplex: boolean,
    wings: boolean,
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
    animals: MyAnimalValues[],
    setAnimals: Function,
    bg: MyBgValues,
    setBg: Function,
    setCharSheet: Function, 
    setWeaponSheet: Function,
}


const StepOne = ({ prices, portraitData, chars, setChars, setCharVariations, animals, setAnimals, bg, setBg, setCharSheet, setWeaponSheet }: MyCharProps) => {
    const { categories } = useCategoriesContext()

    const [openCharMod, setOpenCharMod] = useState(false);
    const [openAddAnimal, setOpenAddAnimal] = useState(false)
    const [openAddBackground, setOpenAddBackground] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editCharIndex, setEditCharIndex] = useState<number>(0)
    const [discount, setDiscount] = useState<boolean>(false)
    let highPrices = chars.map(char => char.total)
    const [highPrice, setHighPrice] = useState<number>(highPrices.length === 0 ? 0 : highPrices.length === 1 ? highPrices[0] : Math.max(...highPrices))
    const [highestPriceIndex, setHighestPriceIndex] = useState<number>(highPrices.length === 0 ? 0 : highPrices.indexOf(highPrice))

    const [initialCharValues, setInitialCharValues] = useState<MyCharValues>(isEdit ? portraitData.characters[editCharIndex] : { 
        bodyStyle: '',
        numCharVariations: 1,
        complexity: 1,
        weapon: 'none',
        armourComplex: false,
        wings: false,
        extras: [],
        total: 0,
        charDiscount: false
    })

    const [initialAnimalValues, setInitialAnimalValues] = useState({animal: 'petSmall'})
    const [initialBgValues, setInitialBgValues] = useState({})

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
        
            if(char.extras.includes('character')) setCharSheet(true)
        
            if(char.extras.includes('weapons')) setWeaponSheet(true)

        })
    }, [chars, animals])

    const handleCharSubmit = (values: MyCharValues) => {

        setCharVariations(false)
        setCharSheet(false)
        setWeaponSheet(false)

        let totalPrice = prices[values.bodyStyle] 
                        + ((values.numCharVariations - 1) * prices['charVariations']) 
                        + (prices.complexity[values.complexity - 1])
                        + (values.weapon === 'simple' ? prices.weaponSimple : values.weapon === 'complex' ? prices.weaponComplex :  0)
                        + (values.armourComplex ? prices.armourComplex : 0)
                        + (values.wings ? prices.wings : 0)
                        + (values.extras.includes('model') ? prices.model : 0)
                        + (values.extras.includes('character') ? prices.character : 0)
                        + (values.extras.includes('weapons') ? prices.weapons : 0)

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
        setOpenCharMod(false)
    }

    function handleAddCharacter() {
        setInitialCharValues({
            bodyStyle: '',
            numCharVariations: 1,
            complexity: 1,
            weapon: 'none',
            armourComplex: false,
            wings: false,
            extras: [],
            total: 0,
            charDiscount: false
        })

        setOpenCharMod(true)
    }

    const handleEditChar = (i: number) => {
        
        setIsEdit(true)
        setEditCharIndex(i)
        setInitialCharValues(chars[i])
        
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

    const handleAddAnimal = (values: any) => {
        let newAnimal
        switch (values.animal) {
            case 'petSmall':
                newAnimal = {
                    type: 'Small Pet',
                    price: Number(prices.petSmall)
                }
                setAnimals([...animals, newAnimal])
                break
            case 'petLarge':
                newAnimal = {
                    type: 'Large Pet',
                    price: Number(prices.petLarge)
                }
                setAnimals([...animals, newAnimal])
                break
            case 'petMonster':
                newAnimal = {
                    type: 'Monster/Dragon',
                    price: Number(prices.petMonster)
                }
                setAnimals([...animals, newAnimal])
                break
        }
        setOpenAddAnimal(false)
    }

    const handleDeleteAnimal = (index: number) => {
        let deleteAnimalArr = animals.filter((animal, i) => i !== index)
        setAnimals(deleteAnimalArr)
    }

    const handleBgSelection = (type: string) => {
        setBg({type: type, price: prices[type]})
    }

    const handleAddBackground = () => {
        setOpenAddBackground(false)
    }

    const handleDeleteBg = () => {
        setBg({type: 'None', price: 0})
        setOpenAddBackground(false)
    }

    return (
    <>   
        <div className='relative self-start w-full bg-[#E5E5E5] rounded-xl px-4 pt-4 pb-12 flex flex-col justify-between items-center'>
            <div className="w-2/3 self-end flex justify-between items-center">
                <h2 className="w-2/3 text-3xl text-left font-bold text-black">Portrait Details</h2>
                {!openCharMod && chars.length !== 0 && <p className="text-black text-2xl">
                    Total: ${(chars.reduce((sum, char) => sum += char.total, 0) + animals.reduce((sum, animal) => sum += animal.price, 0) + bg.price).toFixed(2)}
                </p>}
            </div>
            
            {/* buttons to add details */}
            {!openCharMod && 
                <div className={`w-full h-auto mt-4 flex ${chars.length === 0 ? 'justify-center' : 'justify-between'} items-center gap-x-2`}>
                    {chars.length === 0 &&
                    <div className='w-[48%] h-[75px] py-2 px-4 bg-[#282828] rounded-xl mr-8 text-center flex justify-center items-center'>
                        <div>
                            <p className="text-4xl font-bold text-[#43b4e4]">Start Here!</p>
                            <p className="text-white">Add a character to your portrait</p>
                        </div>
                        <motion.object 
                            type="image/svg+xml" 
                            data={`images/arrow-right.svg`} 
                            className="w-[64px] h-[64px] object-cover ml-8"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.05 }}
                            transition={{ ease: "linear", duration: .75, repeat: Infinity, repeatType: "reverse" }}
                        >
                        </motion.object>
                    </div>
                    }

                    <div 
                        className={`w-1/3 h-[75px] p-2 rounded-xl bg-white cursor-pointer relative flex justify-end items-center`}
                        onClick={handleAddCharacter}
                    >
                        <div className="absolute -top-[50%] -left-[35px] w-[150px]">
                            <CharacterSvg />
                        </div>
                            {/* <object 
                                type="image/svg+xml" 
                                data={`images/customizer/Person_LightUp.svg`} 
                                className="absolute -top-[50%] -left-[50px] w-[200px] h-[200px] cursor-pointer"
                            /> */}
                            {/* <AddCircleOutlineIcon sx={{ fontSize: 80, color: '#43b4e4' }}/> */}
                        <div className="w-3/4 flex flex-col">
                            <h4 className='text-[#43b4e4] text-xl text-center font-bold m-0'>Add Character</h4>
                            {chars?.length !== 0 && 
                            <div className="flex flex-col">
                                <p className='text-red-600 text-sm text-center font-semibold'> Additional Characters 10% off*</p>
                            </div>}
                        </div>
                    </div>
        
                    { chars.length !==0 &&
                    <div 
                        className={`w-1/3 h-[75px] p-2 rounded-xl bg-white cursor-pointer relative flex justify-end items-center`}
                        onClick={() => setOpenAddAnimal(true)}
                    >
                        <div className="absolute -top-[50%] -left-[35px] w-[150px]">
                            <PawSvg />
                        </div>
                        {/* <object 
                            type="image/svg+xml" 
                            data={`images/customizer/Paw_Light.svg`} 
                            className="tester absolute -top-[50%] -left-[50px] w-[200px] h-[200px] cursor-pointer"
                        /> */}
                        {/* <AddCircleOutlineIcon sx={{ fontSize: 80, color: '#43b4e4' }}/> */}
                        <div className="w-3/4 h-full text-center flex flex-col justify-center">
                            <h4 className='text-[#43b4e4] text-xl font-bold m-0'>Add Animal</h4>
                            <object 
                                type="image/svg+xml" 
                                data={`images/customizer/addAnimal.svg`} 
                                className="w-[100%] h-[50%] object-cover object-top cursor-pointer"
                            />
                        </div>
                    </div>
                    }
                    
                    { chars.length !==0 &&
                    <div 
                        className={`w-1/3 h-[75px] p-2 rounded-xl bg-white cursor-pointer relative flex justify-end items-center`}
                        onClick={() => setOpenAddBackground(true)}
                    >
                        <div className="absolute -top-[50%] -left-[35px] w-[150px]">
                            <BackgroundSvg />
                        </div>
                        {/* <object 
                            type="image/svg+xml" 
                            data={`images/customizer/Painting_Icon_LightUp.svg`} 
                            className="absolute -top-[50%] -left-[50px] w-[200px] h-[200px] cursor-pointer"
                        /> */}
                        {/* <AddCircleOutlineIcon sx={{ fontSize: 80, color: '#43b4e4' }}/> */}
                        <div className="w-3/4 text-center flex flex-col justify-center">
                            <h4 className='text-[#43b4e4] text-xl font-bold m-0'>Add Background</h4>
                        </div>
                    </div>
                    }
                </div>
            }

            <div className="w-full flex flex-wrap gap-x-4">
                {chars.length !== 0 && <div className="w-full flex flex-col"> 
                    <div className="mt-4 flex flex-col">
                        <p className="text-[#282828] font-semibold text-xl text-center my-2 pb-2 border-b border-[#282828]">Background</p>
                        {bg.type !== 'None' 
                            ? <div className="relative w-full h-[100px] bg-white bg-[url('/images/customizer/bg_button.svg')] bg-top bg-cover p-4 text-black flex justify-end items-center border-2 border-[#282828] rounded-xl">
                                <p className="w-1/2 text-xl text-center font-semibold mr-8 ">{bg.type === 'bgSimple' ? 'Simple' : 'Complex Background'}</p>
                                <p>${bg.price.toFixed(2)}</p>
                                <button 
                                    type="button" 
                                    onClick={handleDeleteBg} 
                                    className='absolute top-0 right-0 text-black hover:text-red-600'
                                >
                                    <DeleteForeverIcon />
                                </button>
                            </div>
                            : <p className="text-center text-red-600 font-semibold">No Background Added</p>
                            }
                    </div>                    
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                        <p className="w-full text-[#282828] font-semibold text-xl text-center mt-4 pb-2 border-b border-[#282828]">Animals</p>
                        {/* Animal & bg cards */}
                        {animals?.map((animal, i) => (
                            <div 
                                key={i}
                                className='relative w-[23%] h-auto p-2 flex flex-col justify-between items-start border-2 border-[#282828] rounded-xl bg-white text-black'
                            >
                                <div className="w-[100px] h-[100px] mx-auto flex justify-center items-center">
                                    {animal.type === 'Small Pet' && <object 
                                        type="image/svg+xml" 
                                        data={categories.customizer.defaults.petSmall} 
                                        className='w-[95px] h-[95px] object-cover object-top'
                                    />}
                                    {animal.type === 'Large Pet' && <object 
                                        type="image/svg+xml" 
                                        data={categories.customizer.defaults.petLarge} 
                                        className='w-[85px] h-[85px] object-cover object-top'
                                    />}
                                    {animal.type === 'Monster/Dragon' && <object 
                                        type="image/svg+xml" 
                                        data={categories.customizer.defaults.petMonster} 
                                        className='w-[100px] h-[100px] object-cover object-top'
                                    />}
                                </div>
                                <p className="w-full text-center font-semibold text-sm">{animal.type}</p>
                                <p className="w-full text-center">${animal.price.toFixed(2)}</p>
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteAnimal(i)} 
                                    className='absolute top-0 right-0 text-black hover:text-red-600'
                                >
                                    <DeleteForeverIcon />
                                </button>
                            </div>
                        ))}
                        {animals.length === 0 && <p className="text-center text-red-600 font-semibold">No Animals Added</p>}
                    </div>   
                </div>}

                <div className="w-full h-auto flex flex-wrap justify-between gap-y-2">
                    {chars.length !== 0 && <p className="w-full text-[#282828] font-semibold text-xl text-center mt-4 pb-2 border-b border-[#282828]">Characters</p>}
                    {/* Character Cards */}
                    {chars?.map((char, i) => (
                        <div key={i} 
                            className='w-[47%] h-auto flex flex-col justify-between items-start border-2 border-[#282828] rounded-xl bg-white relative'
                        >
                            <div className={`w-[100px] h-[100px] absolute bottom-6 right-2 rounded-full ${char.charDiscount ? 'bg-red-600' : 'bg-[#43b4e4]'} flex flex-col justify-center items-center`}>
                                <p className="text-white text-xl font-bold">
                                    ${!char.charDiscount 
                                    ? <span>{Number(char.total).toFixed(2)}</span> 
                                    : 
                                    <span>{(char.total * .9).toFixed(2)}</span>
                                    }                        
                                </p>
                                {char.charDiscount && <p className="text-white text-xs line-through">${char.total.toFixed(2)}</p>}
                            </div>

                            <button type="button" onClick={() => handleDeleteChar(i)} className='absolute top-[5px] right-[5px] ml-4 text-black hover:text-red-600'>
                                <DeleteForeverIcon />
                            </button>

                            <div className="w-full h-[100%] my-4 flex items-center">

                                <div className='w-[150px] h-[100%] object-cover object-top rounded-xl'>
                                    <object 
                                        type="image/svg+xml" 
                                        data={`images/customizer/${char.bodyStyle}.svg`} 
                                        className="w-[100%] h-[100%]"
                                    />                             
                                </div>

                                <div className="w-[60%] h-full mx-2 flex flex-wrap">
                                    <div className="w-[100%] h-1/2 pb-2 flex flex-wrap items-start">
                                        <p className="text-[#282828] text-sm w-[100%]">Character Variations</p>
                                        {[...Array(char.numCharVariations)].map((n, i) => <object key={i} type="image/svg+xml" data={`images/var${i%2}.svg`} className="w-1/6 h-[70%]"></object>)}
                                    </div>
                                    <div className="w-full h-1/2 flex justify-between items-stretch">
                                        <div className="w-1/4 h-[100%] mr-4 flex flex-col items-center">
                                            <p className="text-[#282828] text-center text-sm">Weapon</p>
                                            {char.weapon === 'simple' ?
                                                <object type="image/svg+xml" data={`images/simpleWeapon.svg`} className="w-[100%] h-[100%]" />
                                            : char.weapon === 'complex' ? 
                                                <object type="image/svg+xml" data={`images/complexWeapon.svg`} className="w-[100%] h-[100%]" />
                                            : <p className="text-sm text-red-600 mt-6">None</p> 
                                            }        
                                        </div>

                                        <div className="w-1/4 h-full mr-4 flex flex-col items-center">
                                            <p className="text-[#282828] text-center text-sm">Wings</p>
                                            {char.wings ? 
                                                <object type="image/svg+xml" data={`images/wings.svg`} className="w-[100%] h-[100%]" />
                                            : <p className="text-sm text-red-600 mt-6">None</p> 
                                            }
                                        </div>

                                        <div className="w-1/4 h-full mr-4 flex flex-col items-center">
                                            <p className="text-[#282828] text-center text-sm">Armour</p>
                                            {char.armourComplex ? 
                                                <object type="image/svg+xml" data={`images/armour.svg`} className="w-[80%] h-[80%]" />
                                            : <p className="text-sm text-red-600 mt-6">None</p> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-[#282828] text-white rounded-b-lg px-4 py-8 flex flex-col justify-between">
                                <div className="w-full flex justify-center">
                                    <p className="text-center text-xl">{char.bodyStyle}</p>
                                    <button type="button" onClick={() => handleEditChar(i)} className='ml-4 text-white hover:text-[#43b4e4]'>
                                        <EditIcon />
                                    </button>
                                </div>
                                <p className="mt-2">Extras:</p>
                                <p className="w-3/4">{char.extras.length === 0 ? "None" : char.extras?.map(extra => {
                                    if (extra === 'model') {
                                        return "3D Model"
                                    } else if (extra === "character") {
                                        return "Character Sheet"
                                    } else {
                                        return "Weapons Sheet"
                                    }
                                }).join(',  ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
                

                
                
            </div>
            
            { chars.length !==0 && <p className='absolute bottom-2 right-4 w-full text-[#929191] text-sm text-right'>*discount applied to lowest value characters</p>}
        </div>


        {/* Add Animal */}
        <Dialog 
            onClose={() => setOpenAddAnimal(false)} 
            open={openAddAnimal} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { p: 4, backgroundColor: "#E9E9E9"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4 flex justify-center items-center'>
                <IconButton onClick={() => setOpenAddAnimal(false)} className='absolute top-0 right-0 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <div className="flex justify-center items-center">
                
            </div>

            <Formik
                initialValues={initialAnimalValues}
                onSubmit={handleAddAnimal}
                >
                {({ handleChange, values }) => (
                <Form className="w-full flex justify-around items-center">
                    <div className="w-[400px] h-[400px] border border-[#282828] rounded-xl flex justify-center items-center">
                        {values.animal === 'petSmall' && <object 
                            type="image/svg+xml" 
                            data={categories.customizer.defaults.petSmall} 
                            className='w-[225px] h-[225px] object-cover object-top'
                        />}
                        {values.animal === 'petLarge' && <object 
                            type="image/svg+xml" 
                            data={categories.customizer.defaults.petLarge} 
                            className='w-[275px] h-[275px] object-cover object-top'
                        />}
                        {values.animal === 'petMonster' && <object 
                            type="image/svg+xml" 
                            data={categories.customizer.defaults.petMonster} 
                            className='w-[400px] h-[400px] object-cover object-top'
                        />}
                    </div>
                    

                    <div className="w-1/2 self-stretch flex flex-col justify-between">
                        <p className='text-3xl text-center font-bold mt-0 mb-4'>Add an animal to your portrait</p>
                        <label className='text-lg mb-4'>
                            <Field type="radio" name="animal" value="petSmall" required className='mr-2'/>
                            <span className="text-xl font-bold">Small</span> - Nunc sit amet velit ut eros sodales congue. Curabitur sit amet auctor elit. Nunc eleifend eu magna vel maximus. Sed quis lacinia nisi. Maecenas luctus diam quis sem elementum, et fringilla tortor suscipit. 
                        </label>
                        <label className='text-lg mb-4'>
                            <Field type="radio" name="animal" value="petLarge" required className='mr-2'/>
                            <span className="text-xl font-bold">Large</span> - Etiam ut luctus mauris, nec eleifend diam. Vivamus dictum ex vel tortor sodales fringilla. Integer eget neque tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        </label>
                        <label className='text-lg'>
                            <Field type="radio" name="animal" value="petMonster" required className='mr-2'/>
                            <span className="text-xl font-bold">Monster / Dragon</span> - Proin viverra mi a augue eleifend convallis. Curabitur condimentum tincidunt cursus. Proin vel dictum nunc. Pellentesque iaculis sodales lorem, ac efficitur quam cursus non. 
                        </label>

                        <button 
                            type="submit" 
                            className='w-1/2 mx-auto mt-4 text-xl text-black rounded-lg py-2 px-4 border-2 border-black bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out '
                        >
                            Add Animal
                        </button> 
                    </div>
  
                </Form>
                )}
            </Formik>
        </Dialog>

        {/* Add Background */}
        <Dialog 
            onClose={() => setOpenAddBackground(false)} 
            open={openAddBackground} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { p: 4, backgroundColor: "#E9E9E9"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4 flex justify-center items-center'>
                <IconButton onClick={() => setOpenAddBackground(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <div className="flex justify-center items-center">
                <p className='text-3xl text-center font-bold mt-0'>Add a background to your portrait</p>
            </div>

            <Formik
                initialValues={initialBgValues}
                onSubmit={handleAddBackground}
                >
                {({ handleChange, values }) => (
                <Form className="w-full flex flex-col justify-between items-center">
                    <div className="w-[675px] h-[400px] bg-[url('/images/customizer/bg.jpg')] bg-top bg-cover my-4 flex">
                        <div 
                            // src="" 
                            onClick={() => handleBgSelection('bgSimple')} 
                            className={`w-[337px] h-[400px] border-4 ${bg.type === 'None' ? 'hover:border-blue-600' : bg.type === 'bgSimple' ? 'border-blue-600' : ''} `}
                        ></div>
                        <div 
                            // src="" 
                            onClick={() => handleBgSelection('bgComplex')} 
                            className={`w-[338px] h-[400px] border-4 ${bg.type === 'None' ? 'hover:border-green-600' : bg.type === 'bgComplex' ? 'border-green-600' : ''} `}
                        ></div>
                    </div>
                    <div className="w-7/12 flex justify-center">
                        {bg.type === 'bgSimple' && <p className="w-full text-xl font-bold text-center">Simple Background - ${bg.price}</p>}
                        {bg.type === 'bgComplex' && <p className="w-full text-xl font-bold text-center">Complex Background - ${bg.price}</p>}
                        {bg.type === 'None' && <p className="w-full mx-auto text-xl font-semibold text-center">Click the image above to select background style</p>}
                    </div>
                    <div className="w-7/12 flex">
                        <button 
                            type="button" 
                            className='w-1/2 mx-4 mt-8 text-xl text-black rounded-lg py-2 px-4 border-2 border-black bg-white cursor-pointer hover:bg-black hover:text-white hover:scale-105 transition duration-200 ease-in-out'
                            onClick={handleDeleteBg}
                        >
                            No Background
                        </button> 
                        <button 
                            type="submit" 
                            className={`w-1/2 mx-4 mt-8 text-xl text-black rounded-lg py-2 px-4 border-2 border-black ${bg.type === 'None' ? 'bg-transparent' : 'bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'}`}
                            disabled={bg.type === 'None'}
                        >
                            Add Background
                        </button> 
                    </div>
                    
                </Form>
                )}
            </Formik>
        </Dialog>



        {/* Character Selections Modal*/}
        <Dialog 
            onClose={() => setOpenCharMod(false)} 
            open={openCharMod} 
            fullWidth={true}
            maxWidth='xl'
            PaperProps={{ sx: { p: 4, backgroundColor: "#E9E9E9"} }}
        >   
            <div className='absolute top-0 right-0 w-1/12 mb-4 flex justify-center items-center'>
                <IconButton onClick={() => setOpenCharMod(false)} className='absolute top-0 -right-10 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <div className="w-full h-full">
                <Formik
                    initialValues={initialCharValues}
                    onSubmit={handleCharSubmit}
                    >
                    {({ handleChange, values }) => (
                    <Form className="w-full h-full flex justify-between items-center">
                        
                        {/* radio buttons */}
                        {/* <div className="relative w-full flex justify-between "> */}
                            
                            {/* {values.bodyStyle === "" &&
                                <div className='absolute -top-[25%] left-0 w-1/6 h-auto mt-8 rounded-xl flex flex-col justify-center'>
                                    <p className="text-3xl font-bold text-[#43b4e4]">Start Here!</p>
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
                            } */}


                            <div className="w-1/5">
                                <div className='w-full flex justify-between items-end mb-4'>
                                    <div className="relative">
                                        {values.bodyStyle === "" 
                                        ? <motion.p 
                                            initial={{ 
                                                opacity: 0.5,
                                            }}
                                            animate={{ opacity: 1}}
                                            transition={{ type: "spring", duration: .75, repeat: Infinity, repeatType: "reverse" }}
                                            className='text-[#28C328] text-xl mr-4 mb-2 font-semibold'
                                        >
                                            Body style:
                                        </motion.p>                                        
                                        : <p className='text-lg mr-4 mb-2 font-semibold'>Body style:</p>                                        
                                        }
                                        
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
                                            className="absolute -top-[15%] left-[42%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('body')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                            {isHovering && message === 'body' && (
                                                <div className="w-[300px] bg-[#282828] border-4 border-[#282828] rounded-lg p-2 absolute top-0 left-[42%] m-0 ml-8 z-40">
                                                    <img src="./images/body_type.png"  className="max-w-[280px] h-auto object-contain mx-auto border-4 border-white rounded-lg" alt='thumbnail for selected body type'/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full flex justify-between items-end mb-2'>
                                    <div className='w-full relative flex justify-between items-center'>
                                        <p className='text-lg mr-4 my-4 font-semibold'>Character Variations:</p>

                                        <TextField
                                            type="number"
                                            name="numCharVariations"
                                            value={values.numCharVariations}
                                            onChange={handleChange}
                                            size="small"
                                            inputProps={{
                                            min: 1,
                                            max: 6,
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
                                            className="absolute top-0 left-[58%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('variations')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                            {isHovering && message === 'variations' && (
                                                <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[70%] m-0 ml-4 z-40">
                                                    <h2 className="text-white text-md text-left">How many versions of this character are you looking for? For additional <span className="text-[#43b4e4] font-bold">different</span> characters please click &quot;Complete Character&quot; then use the “add character” button.</h2>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>  
                                
                                {/* Pets */}
                                {/* <div className="relative">
                                    <label>
                                        <Field type="checkbox" name="pets" className=''/>
                                        <span className='text-lg ml-2 font-semibold'>Pets </span>{values.pets && <span className="text-sm"> (Use the slider to select # of pets)</span> }
                                    </label>
                                    <div
                                        className="absolute -top-[23%] left-[20%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('pets')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                        {isHovering && message === 'pets' && (
                                            <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[20%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Does your character have a <span className="text-[#43b4e4] font-bold">companion</span> you’d like included? If so - check this box!</h2>
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
                                </div>  */}

                                {/* Complexity Slider */}
                                <div className="relative mb-4 border border-transparent">
                                    <label>
                                        <span className='text-lg font-semibold'>Complexity </span>
                                    </label>
                                    <p className="absolute -bottom-1 -left-4">Simple</p>
                                    <p className="absolute -bottom-1 -right-6">Complex</p>
                                    <div className=' h-8 flex justify-between items-end mb-4'>
                                        <Slider
                                            name="complexity"
                                            min={1}
                                            max={5}
                                            step={1}
                                            defaultValue={1}
                                            valueLabelDisplay="auto"
                                            marks
                                            value={values.complexity}
                                            onChange={handleChange}
                                        />             
                                    </div> 
    
                                    <div
                                        className="absolute -top-[16%] left-[32%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('complexity')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                        {isHovering && message === 'complexity' && (
                                            <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[20%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Copy needed for<span className="text-[#43b4e4] font-bold">Complexity</span></h2>
                                            </div>
                                        )}
                                    </div>
                                    
                                </div> 

                                {/* Add Weapon */}
                                <div className='w-full flex justify-between items-end mb-3'>
                                    <div className="relative">
                                        <p className='text-lg mr-4 mb-2 font-semibold'>Weapon:</p>                                        
                                        <label className='text-lg'>
                                            <Field type="radio" name="weapon" value="none" required className='mr-2'/>
                                            None
                                        </label>
                                        <label className='text-lg ml-4'>
                                            <Field type="radio" name="weapon" value="simple" required className='mr-2'/>
                                            Simple
                                        </label>
                                        <label className='text-lg ml-4'>
                                            <Field type="radio" name="weapon" value="complex" required className='mr-2'/>
                                            Complex
                                        </label>
                                        <div
                                            className="absolute -top-[25%] left-[27%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('weapon')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                            {isHovering && message === 'weapon' && (
                                                <div className="w-[350px] bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[45%] m-0 ml-4 z-40">
                                                    <h2 className="text-white text-md text-left">Copy needed for<span className="text-[#43b4e4] font-bold">Weapon</span></h2>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Character attributes */}
                                <div className='w-full flex flex-col justify-between mb-3'>
                                    <p className='text-lg my-4 font-semibold'>Additional Character Attributes:</p>
                                    <div className="w-full flex">
                                        <div className='relative w-1/2 flex justify-between items-end mb-2'>
                                            <label>
                                                <Field type="checkbox" name="wings" className='mr-2'/>
                                                <span className='text-lg ml-2'>Add Wings</span>
                                            </label>
                                            <div
                                                className="absolute -top-4 right-0 m-0 p-0"
                                                onMouseOver={() => handleMouseOver('wings')}
                                                onMouseOut={handleMouseOut}
                                            >
                                                <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                                {isHovering && message === 'wings' && (
                                                    <div className="w-[300px]  bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[35%] m-0 ml-4 z-40">
                                                        <h2 className="text-white text-md text-left">Need Copy <span className="text-[#43b4e4] font-bold"> Add Wings</span></h2>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className='relative w-1/2 flex justify-between items-center mb-2'>
                                            <label>
                                                <Field type="checkbox" name="armourComplex" className='mr-2'/>
                                                <span className='text-lg ml-2'>Add Armour</span>
                                            </label>
                                            <div
                                                className="absolute -top-4 right-0 m-0 p-0"
                                                onMouseOver={() => handleMouseOver('armour')}
                                                onMouseOut={handleMouseOut}
                                            >
                                                <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                                {isHovering && message === 'armour' && (
                                                    <div className="w-[300px]  bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[35%] m-0 ml-4 z-40">
                                                        <h2 className="text-white text-md text-left">Need Copy <span className="text-[#43b4e4] font-bold">Add Armour</span></h2>
                                                    </div>
                                                )}
                                            </div>
                                        </div>    
                                    </div>
                                    
                                </div>              


                                {/* Extras */}
                                <p className='text-lg mr-4 mb-0 font-semibold'>Extras:</p>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label>
                                        <Field type="checkbox" name="extras" value="model" className='mr-2'/>
                                        <span className='text-lg ml-2'>3D Model</span>
                                    </label>
                                    <div
                                        className="absolute -top-[30%] left-[39%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('model')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                        {isHovering && message === 'model' && (
                                            <div className="w-[300px]  bg-[#282828] rounded-lg p-4 absolute -top-[25%] left-[35%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Once you have approved of your final portrait, we&apos;ll design and ship you a custom <span className="text-[#43b4e4] font-bold">3d-model</span> based off the image design!</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label className="relative">
                                        <Field type="checkbox" name="extras" value="character" className='mr-2'/>
                                        <span className='text-lg ml-2'>Character Sheet</span>
                                    </label>
                                    <div
                                            className="absolute -top-[30%] left-[55%] m-0 p-0"
                                            onMouseOver={() => handleMouseOver('characterSheet')}
                                            onMouseOut={handleMouseOut}
                                        >
                                            <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                            {isHovering && message === 'characterSheet' && (
                                                <div className="w-[300px] bg-[#282828] rounded-lg p-4 absolute bottom-0 left-[45%] m-0 ml-4 z-40">
                                                    <h2 className="text-white text-md text-left">If you&apos;re planning on using this character for a <span className="text-[#43b4e4] font-bold">DnD campaign</span>, we can create a personalized character sheet to make all your friends jealous.</h2>
                                                </div>
                                            )}
                                        </div>
                                </div>
                                <div className='relative ml-4 mt-2 w-full flex justify-between items-end mb-2'>
                                    <label className="relative">
                                        <Field type="checkbox" name="extras" value="weapons" className='mr-2'/>
                                        <span className='text-lg ml-2'>Weapons Sheet</span>
                                    </label>
                                    <div
                                        className="absolute -top-[30%] left-[55%] m-0 p-0"
                                        onMouseOver={() => handleMouseOver('weaponSheet')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <InfoIcon className="text-sm hover:text-[#43b4e4]"/>
                                        {isHovering && message === 'weaponSheet' && (
                                            <div className="w-[350px] bg-[#282828] rounded-lg p-4 absolute bottom-0 left-[45%] m-0 ml-4 z-40">
                                                <h2 className="text-white text-md text-left">Have a <span className="text-[#43b4e4] font-bold">special weapon</span> that deserves it&apos;s own attention? Add this option and we will design a separate weapon sheet that will display it from multiple perspectives, showcasing it in all it&apos;s glory.</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>






                            <div className="self-stretch w-1/2 ml-4 flex flex-col justify-between">
                                
                                <div className="mb-2 flex justify-center items-center">
                                    <img className="mr-8 w-[10%] justify-self-center" src="./images/drips/side_splashL.png" alt='black accent paint splash'/>
                                    <p className='text-2xl text-center font-bold mt-0'>Make your selections to add a character to your portrait</p>
                                    <img className="ml-8 w-[10%] justify-self-center" src="./images/drips/side_splashR.png" alt='black accent paint splash'/>
                                </div>

                                <div className="w-full h-1/2 flex justify-between items-stretch">
                                    <div className={`${values.bodyStyle === "" ? "border border-[#282828]" : ""} w-[250px] h-[100%] object-cover object-top rounded-xl`}>
                                        {values.bodyStyle !== "" &&
                                        <motion.object 
                                            type="image/svg+xml" 
                                            data={`images/customizer/${values.bodyStyle}.svg`} 
                                            className="w-[100%] h-[100%]"
                                            initial={{ 
                                                scale: 0,
                                                rotate: 0 
                                            }}
                                            animate={{ scale: 1, rotate: 360}}
                                            transition={{ type: "spring", duration: .5 }}
                                        />}                              
                                    </div>
                                    
                                    <div className="w-[57%] h-full flex flex-col">
                                        
                                        <div className="w-[100%] h-1/3 flex flex-col">
                                            {values.bodyStyle !== '' && <p className="ml-4 font-semibold">Character Variations</p>}
                                            {values.bodyStyle !== '' && <div className="w-full h-[65%] flex flex-wrap items-start">
                                                {[...Array(values.numCharVariations)].map((n, i) => <object key={i} type="image/svg+xml" data={`images/var${i%2}.svg`} className="w-1/6 h-[90%]"></object>)}
                                            </div>}
                                        </div>

                                        <div className="w-[100%] h-2/3 mt-2 flex justify-between">
                                            
                                            <div className="w-1/3 h-full">
                                                <div className="w-full h-[50%] flex flex-col justify-center items-center">
                                                    {values.weapon !== 'none' && <p className="font-semibold">{values.weapon !== 'none' ? values.weapon[0].toUpperCase() + values.weapon.slice(1) : 'No'} Weapon</p>}
                                                    {values.weapon !== 'none' && <div className="w-[114px] h-[50px] flex justify-center items-center">
                                                        {values.weapon === 'simple' && 
                                                            <object type="image/svg+xml" data={`images/simpleWeapon.svg`} className="w-[100%] h-[100%]" />
                                                        }
                                                        {values.weapon === 'complex' && 
                                                            <object type="image/svg+xml" data={`images/complexWeapon.svg`} className="w-[100%] h-[100%]" />
                                                        } 
                                                    </div>}
                                                </div>
                                            
                                                <div className="w-full h-[50%] flex flex-col justify-center items-center ">
                                                    {values.wings && <p className="font-semibold">Wings</p>}
                                                    {values.wings && <div className="w-[114px] h-[75px] flex justify-center items-center">
                                                        <object type="image/svg+xml" data={`images/wings.svg`} className="w-[100%] h-[90%]" />
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className="w-7/12 h-full">
                                                <div className="w-full h-full flex flex-col items-center">
                                                    {values.armourComplex && <p className="font-semibold">Armour</p>}
                                                    {values.armourComplex && <div className="w-[60%] h-[70%] flex justify-center items-center">
                                                        <object type="image/svg+xml" data={`images/armour.svg`} className="w-[100%] h-[100%]" />
                                                    </div>}
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                                
                                
                                {/* {values.bodyStyle !== "" 
                                ?<div className="w-[100%] flex border border-green-600">
                                    <motion.object 
                                        type="image/svg+xml" 
                                        data={`images/customizer/${values.bodyStyle}.svg`} 
                                        className="w-[180px] h-[205px] object-cover object-top rounded-xl shadow-md"
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
                                : <div className="w-[180px] h-[205px] border-2 border-[#282828] rounded-xl">                                 
                                </div>} */}

                                

                                <div className="h-[175px] mt-4 flex items-start">

                                    {values.extras.includes("model") && 
                                     <motion.div 
                                        className="w-[150px] h-[165px] pb-2 mr-12 bg-white rounded-lg"
                                        initial={{ 
                                            scale: 0
                                        }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", duration: .5 }}    
                                    >
                                        <object type="image/svg+xml" data="images/customizer/3d.svg" className="w-full h-[60%] rounded-lg pt-4"></object>
                                        <p className="mt-8 text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4]">3D Model</p>
                                    </motion.div>}

                                    {values.extras.includes("character") && 
                                        <object type="image/svg+xml" data="images/customizer/character_sheet.svg" className="relative -top-[50px] w-[175px] h-[225px] rounded-lg"></object>
                                    }

                                    {values.extras.includes("weapons") && 
                                        <object type="image/svg+xml" data="images/customizer/weapons_sheet.svg" className="relative -top-[57px] w-[175px] h-[225px] rounded-lg"></object>    
                                    }
                                </div>
                            </div>
            




                            <div className="self-start w-1/4 bg-[#ffffff] rounded-xl p-4 flex flex-col border-b-8 border-[#282828]">
                                <div className="w-full flex flex-col">
                                    <h2 className="w-full mb-8 text-3xl text-center text-[#43b4e4] font-bold">Options Pricing</h2>
                                    
                                    <div className="w-full mb-4 pb-4 border-b-2 border-[#282828]">
                                        {values.bodyStyle !== '' && <div className="flex justify-between items-center">
                                            <p className="">BodyStyle</p>
                                            <p>${!prices[values.bodyStyle] ? (0).toFixed(2) : prices[values.bodyStyle].toFixed(2)}</p>
                                        </div>}
                                        {values.numCharVariations > 1 && <div className="flex justify-between items-center">
                                            <p className="">Variants</p>
                                            <p>${((values.numCharVariations - 1) * prices.charVariations).toFixed(2)}</p>
                                        </div>}
                                        {values.complexity !== 1 && <div className="flex justify-between items-center">
                                            <p className="">Complexity</p>
                                            <p>${(prices.complexity[values.complexity - 1]).toFixed(2)}</p>
                                        </div>}
                                        {values.weapon !== 'none' && <div className="flex justify-between items-center">
                                            <p className="">{values.weapon === 'simple' ? 'Simple' : values.weapon === 'complex' ? 'Complex' : ''} Weapon</p>
                                            <p>${values.weapon === 'simple' ? prices.weaponSimple.toFixed(2) : values.weapon === 'complex' ? prices.weaponComplex.toFixed(2) : (0).toFixed(2)}</p>                                        
                                        </div>}
                                        {values.armourComplex && <div className="flex justify-between items-center">
                                            <p className="">Armour</p>
                                            <p>${values.armourComplex ? prices.armourComplex.toFixed(2) : (0).toFixed(2)}</p>
                                        </div>}
                                        {values.wings && <div className="flex justify-between items-center">
                                            <p className="">Wings</p>
                                            <p>${values.wings ? prices.wings.toFixed(2) : (0).toFixed(2)}</p>
                                        </div>}
                                        {values.extras.includes("model") && <div className="flex justify-between items-center">
                                            <p className="">3D model</p>
                                            <p>${values.extras.includes('model') ? prices.model.toFixed(2) : (0).toFixed(2)}</p>
                                        </div>}
                                        {values.extras.includes("character") && <div className="flex justify-between items-center">
                                            <p className="">Character Sheet</p>
                                            <p>${values.extras.includes('character') ? prices.character.toFixed(2) : (0).toFixed(2)}</p>
                                        </div>}
                                        {values.extras.includes("weapons") &&  <div className="flex justify-between items-center">
                                            <p className="">Weapons Sheet</p>
                                            <p>${values.extras.includes('weapons') ? prices.weapons.toFixed(2) : (0).toFixed(2)}</p>
                                        </div>}
                                    </div>
                                    
                                    <div className="self-end w-full flex justify-between items-center">
                                        <p className={`w-full ${!discount ? "font-bold text-xl" : "font-semibold"}`}>{!values.charDiscount ? 'Total: ' : 'Sub total: '}</p>
                                        <p className={`w-3/4 flex justify-between items-center ${!values.charDiscount ? "ml-4 border-2 border-[#282828] bg-white py-2 px-4 rounded-md text-xl" : "font-semibold"}`}>
                                            <span className="w-full text-right">
                                                $ {(0 + 
                                                    (!prices[values.bodyStyle] ? 0 : prices[values.bodyStyle])
                                                    + ((values.numCharVariations - 1) * prices.charVariations) 
                                                    + (prices.complexity[values.complexity - 1])
                                                    + (values.weapon === 'simple' ? prices.weaponSimple : values.weapon === 'complex' ? prices.weaponComplex :  0)
                                                    + (values.armourComplex ? prices.armourComplex : 0)
                                                    + (values.wings ? prices.wings : 0)
                                                    + (values.extras.includes('model') ? prices.model : 0)
                                                    + (values.extras.includes('character') ? prices.character : 0)
                                                    + (values.extras.includes('weapons') ? prices.weapons : 0)).toFixed(2)}
                                            </span>
                                        </p>
                                    </div> 

                                    { values.charDiscount && 
                                    <> 
                                        <div className="w-full flex justify-between items-center">
                                            <p className="text-red-600 text-sm">Additional Character Discount (10%)</p>
                                            <p>-${((0 + (!prices[values.bodyStyle] ? 0 : prices[values.bodyStyle])
                                            + ((values.numCharVariations - 1) * prices.charVariations) 
                                            + (prices.complexity[values.complexity - 1])
                                            + (values.weapon === 'simple' ? prices.weaponSimple : values.weapon === 'complex' ? prices.weaponComplex :  0)
                                            + (values.armourComplex ? prices.armourComplex : 0)
                                            + (values.wings ? prices.wings : 0)
                                            + (values.extras.includes('model') ? prices.model : 0)
                                            + (values.extras.includes('character') ? prices.character : 0)
                                            + (values.extras.includes('weapons') ? prices.weapons : 0)) * .1).toFixed(2)}</p>
                                        </div>
                                        <div className="self-end w-9/12 flex justify-between items-center">
                                            <p className="w-1/4 text-xl font-bold">Total: </p>
                                            <p className="w-3/4 ml-4 border-2 border-[#282828] bg-white py-2 px-4 rounded-md flex justify-between items-center text-xl"><span>$</span><span>{((0 + (!prices[values.bodyStyle] ? 0 : prices[values.bodyStyle])
                                            + ((values.numCharVariations - 1) * prices.charVariations) 
                                            + (prices.complexity[values.complexity - 1])
                                            + (values.weapon === 'simple' ? prices.weaponSimple : values.weapon === 'complex' ? prices.weaponComplex :  0)
                                            + (values.armourComplex ? prices.armourComplex : 0)
                                            + (values.wings ? prices.wings : 0)
                                            + (values.extras.includes('model') ? prices.model : 0)
                                            + (values.extras.includes('character') ? prices.character : 0)
                                            + (values.extras.includes('weapons') ? prices.weapons : 0)) * .9).toFixed(2)}
                                            </span></p>
                                        </div>         
                                    </>}
                                </div>
                                <button 
                                    type="submit" 
                                    className='w-4/5 mx-auto mt-8 text-xl text-black rounded-lg py-2 px-4 border-2 border-black bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out '
                                >
                                    Complete Character
                                </button> 
                            </div>  
                        {/* </div>                          */}
                    </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    </>
  )
}

export default StepOne
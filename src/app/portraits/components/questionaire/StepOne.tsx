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
import { PortraitData } from "./Questionaire";

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

    useEffect(() => {
        chars.forEach(char => {
            if(char.pets) setPet(true)
        
            if(char.extras.includes('character')) setCharSheet(true)
        
            if(char.extras.includes('weapons')) setWeaponSheet(true)
        })

    }, [chars])

    const handleCharSubmit = (values) => {
        console.log('values is: ', values)
        
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
        

        {/* <div className='flex justify-between'> */}
            
            <div className='self-start w-6/12 bg-[#E5E5E5] rounded-xl px-4 py-4 flex flex-wrap justify-between items-center'>
                <h2 className="w-full text-2xl text-center">Character List</h2>
                {chars?.map((char, i) => (
                    <div key={i} 
                        className='w-[48%] h-[300px] mt-2 flex flex-col justify-between items-start border-2 border-[#282828] rounded-xl bg-white p-4'
                    >
                            <p>Body Style: {char.bodyStyle}</p>
                            <p># of Character variations: {char.numCharVariations}</p>
                            <p># of Pets: {char.numPets}</p>
                            <p>Extras: {char.extras?.join(', ')}</p>
                        <div className="flex justify-around items-center p-4">
                            <p>Base Price: ${char.total}</p>
                            <Button onClick={() => handleEditChar(i)} className=' border-2 border-[#282828] rounded-md p-2 text-black'>
                                <EditIcon />
                            </Button>
                            <button onClick={() => handleDeleteChar(i)} className='ml-4 border-2 border-[#282828] rounded-md p-2 '>
                                <DeleteForeverIcon />
                            </button>
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
            
        {/* </div> */}
        <Dialog 
            onClose={() => setOpenCharMod(false)} 
            open={openCharMod} 
            maxWidth='xl'
            PaperProps={{ sx: { p: 10, backgroundColor: "white" } }}
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
                    <Form>
                        {/* radio buttons */}
                        <div className='w-10/12 flex justify-between items-end mb-4 border-2 border-red-600'>
                            <div>
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
                            </div>
                            <p>BodyStyle: {prices[selection][values.bodyStyle]}</p>
                        </div>

                        <div className='w-10/12 flex justify-between items-end mb-4 border-2 border-red-600'>
                            <div className='flex items-center'>
                                <p className='mr-4 mb-0'>Number of character variations:</p>
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
                                        width: '40px'
                                    }
                                    }}
                                />
                            </div>
                            <p>Variants: {(values.numCharVariations - 1) * 30}</p>
                        </div>  
                        
                        {/* Pets */}
                        <div>
                            <label>
                                <Field type="checkbox" name="pets" className='mt-4'/>
                                Pets {values.pets && <span>Use the slider to select # of pets</span> }
                            </label>

                            {values.pets && 
                                <div className='w-10/12 flex justify-between items-end mb-4 border-2 border-red-600'>
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
                                    <p className="ml-4">Pets: {values.numPets * 25}</p>     
                                </div>
                                                    
                            } 
                        </div> 
                        

                        {/* Extras */}
                        <p className='mr-4 mb-0'>Extras:</p>
                        <div className='ml-4 mt-2 w-full flex justify-between items-end mb-4 border-2 border-red-600'>
                            <label>
                                <Field type="checkbox" name="extras" value="model" className='mr-2' onClick={calcModelPrice}/>
                                <span className='ml-2'>3D Model</span>
                            </label>
                            <p className="ml-4">3D model: {values.extras.includes('model') ? prices[selection].model : 0}</p>
                        </div>
                        <div className='ml-4 mt-2 w-full flex justify-between items-end mb-4 border-2 border-red-600'>
                            <label>
                                <Field type="checkbox" name="extras" value="character" className='mr-2' onClick={calcCharacterSheetPrice}/>
                                <span className='ml-2'>Character Sheet</span>
                            </label>
                            <p className="ml-4">Character Sheet: {values.extras.includes('character') ? prices[selection].character : 0}</p>
                        </div>
                        <div className='ml-4 mt-2 w-full flex justify-between items-end mb-4 border-2 border-red-600'>
                            <label>
                                <Field type="checkbox" name="extras" value="weapons" className='mr-2' onClick={calcWeaponPrice}/>
                                <span className='ml-2'>Weapons Sheet</span>
                            </label>
                            <p className="ml-4">Weapons Sheet: {values.extras.includes('weapons') ? prices[selection].weapons : 0}</p>
                        </div>

                        <div className="border-black border-2 text-right">
                            <p>Base Price: {
                                0 + (!prices[selection][values.bodyStyle] ? 0 : prices[selection][values.bodyStyle])
                                + ((values.numCharVariations - 1) * 30) 
                                + (values.pets ? values.numPets * 25 : 0)
                                + modelPrice
                                + characterSheetPrice
                                + weaponsPrice
                                }</p>
                        </div>
                        <button type="submit" className='text-black border-2 border-black rounded-lg p-2 mt-4'>Submit</button>
                    </Form>
                    )}
                </Formik>
                {/* <div>
                    <p>{}</p>
                </div> */}
            </div>
        </Dialog>

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
    </>
  )
}

export default StepOne
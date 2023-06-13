import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Slider, Button, Dialog } from '@mui/material';
import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

interface MyCharValues {
    bodyStyle: string,
    numCharVariations: number,
    pets: boolean,
    numPets: number,
    extras: [],
}

const StepTwo = (props) => {
    
    const [openCharMod, setOpenCharMod] = useState(false);
    const [charData, setCharData] = useState(props.data.characters);
    const [isEdit, setIsEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null)
    
    const [initialCharValues, setInitialCharValues] = useState<MyCharValues>({ 
        bodyStyle: '',
        numCharVariations: 1,
        pets: false,
        numPets: 0,
        extras: [],
    })
    

    const handleSubmit = (values) => {
        props.next({...values, characters: charData}) 
    }

    const handleCharSubmit = (values) => {
        if(values.pets) props.setPet(true)
        if(values.extras.includes('character')) props.setCharSheet(true)
        if(values.extras.includes('weapons')) props.setWeaponSheet(true)
        
        if(!values.pets) values.numPets = 0
        
        if (isEdit) {
            let updateCharArr = charData.map((char, i) => {
                if (i === editIndex) {
                    return values
                } else {
                    return char
                }
            })
            
            setCharData(updateCharArr)
        } else {
            setCharData(prev => [...prev, values])
        }
        setOpenCharMod(false)
        setIsEdit(false)
    }


    function handleAddCharacter() {
        setInitialCharValues({
            bodyStyle: '',
            numCharVariations: 1,
            pets: false,
            numPets: 0,
            extras: []
        })
        setOpenCharMod(true)
    }

    const handleEdit = (i: number) => {
        setIsEdit(true)
        setEditIndex(i)

        setInitialCharValues(charData[i])
        
        setOpenCharMod(true)
    }

    const handleDelete = (index: number) => {
        let deleteCharArr = charData.filter((char, i) => i !== index)
        
        setCharData(deleteCharArr)
    }

    return (
        <motion.div 
            className='h-full flex flex-col justify-between'
            variants={props.variants}
            initial='hidden'
            animate='visible'
            exit="exit"
        >
            <p className='text-2xl mt-4 ml-4'>Customizing a {props.data.mode} portrait</p>
            <div className='flex justify-between'>
                <div className='w-6/12'>
                    {charData?.map((char, i) => (
                        <div key={i} className='flex justify-around items-center border-b-2 border-[#282828] rounded-lg p-2 m-4'>
                            <div>
                                <p>Body Style: {char.bodyStyle}</p>
                                <p># of Character variations: {char.numCharVariations}</p>
                            </div>
                            <div>
                                <p># of Pets: {char.numPets}</p>
                                <p>Extras: {char.extras.join(', ')}</p>
                            </div>
                            <button onClick={() => handleEdit(i)} className=' border-2 border-[#282828] rounded-md p-2 '>
                                <EditIcon />
                            </button>
                            <button onClick={() => handleDelete(i)} className=' border-2 border-[#282828] rounded-md p-2 '>
                                <DeleteForeverIcon />
                            </button>
                        </div>
                    ))}
                </div>
                {!openCharMod && 
                    <div className='w-6/12 flex flex-col'>
                        <Button onClick={handleAddCharacter} className='flex flex-col items-center mt-10 mb-10'>
                            <AddCircleOutlineIcon sx={{ fontSize: 80 }}/>
                            <h4 className='m-0'>Add character</h4>
                            {charData?.length !== 0 && <span className='text-red-600 text-xl mt-2'> Additional Characters 10% off</span>}
                        </Button>
                    </div>
                }
            </div>
            <Dialog 
                onClose={() => setOpenCharMod(false)} 
                open={openCharMod} 
                maxWidth='lg'
                PaperProps={{ sx: { p: 10, backgroundColor: "white" } }}
            >
                <p className='text-xl text-center font-bold mt-0'>Make your selections to add a character to your portrait</p>
                <IconButton onClick={() => setOpenCharMod(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
                <Formik
                    initialValues={initialCharValues}
                    onSubmit={handleCharSubmit}
                    enableReinitialize
                    >
                    {({ handleChange, values }) => (
                    <Form>
                        {/* radio buttons */}
                        <div className='w-10/12 flex mb-4'>
                            <p className='mr-4 mb-0'>Body style:</p>
                            <label className='ml-4'>
                                <Field type="radio" name="bodyStyle" value="Headshot" />
                                Headshot
                            </label>
                            <label className='ml-4'>
                                <Field type="radio" name="bodyStyle" value="Half" />
                                Half
                            </label>
                            <label className='ml-4'>
                                <Field type="radio" name="bodyStyle" value="Full" />
                                Full
                            </label>
                        </div>
                            
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

                        {/* check boxes */}
                        <label>
                        <Field type="checkbox" name="pets" className='mt-4'/>
                        Pets {values.pets && <span>Use the slider to select # of pets</span> }
                        </label>

                        {values.pets && 
                            <div>
                                <Slider
                                    name="numPets"
                                    min={1}
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

                        {/* Extras */}
                        <p className='mr-4 mb-0'>Extras:</p>
                        <div className='ml-4 mt-2'>
                            <label>
                                <Field type="checkbox" name="extras" value="model" className='mr-2' />
                                <span className='ml-2'>3D Model</span>
                            </label>
                        </div>
                        <div className='ml-4 mt-2'>
                            <label>
                                <Field type="checkbox" name="extras" value="character" className='mr-2' />
                                <span className='ml-2'>Character Sheet</span>
                            </label>
                        </div>
                        <div className='ml-4 mt-2'>
                            <label>
                                <Field type="checkbox" name="extras" value="weapons" className='mr-2'/>
                                <span className='ml-2'>Weapons Sheet</span>
                            </label>
                        </div>
                        <button type="submit" className='text-black border-2 border-black rounded-lg p-2 mt-4'>Submit</button>
                    </Form>
                    )}
                    </Formik>
            </Dialog>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                <Form>
                    <div className='flex justify-around items-center w-8/12 mx-auto'>
                        <button type="button" onClick={() => props.prev({...values, characters: charData})} className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Back</button>
                        <button type="submit" className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Finished Adding Characters</button>
                    </div>
                </Form>
                )}
            </Formik>
        </motion.div>
    )
}

export default StepTwo
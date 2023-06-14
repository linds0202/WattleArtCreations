<div className="h-[300px] w-full flex flex-col justify-center items-center">
                <h2 className="w-full text-4xl text-center">Welcome to the Portrait Customizer</h2>
                <p className="w-full text-center pt-4">Make your selections to customize your personal portrait</p>
            </div>

            <div className='flex justify-between'>
                <div className='w-6/12'>
                <h2 className="w-full text-2xl text-center">Character List</h2>
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
                            <button onClick={() => handleDeleteChar(i)} className=' border-2 border-[#282828] rounded-md p-2 '>
                                <DeleteForeverIcon />
                            </button>
                        </div>
                    ))}
                </div>
                {!openCharMod && 
                    <div className='w-6/12 flex flex-col justify-center items-center'>
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
                initialValues={portraitData}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                <Form>
                    <div className='flex justify-around items-center w-8/12 mx-auto'>
                        <button type="submit" className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Finished Adding Characters</button>
                    </div>
                </Form>
                )}
            </Formik>
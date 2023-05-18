'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/auth';
import { addCharacter } from '../../firebase/firestore';
import { Slider, Button } from '@mui/material';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { TextField, InputAdornment, IconButton, Dialog, CircularProgress, Container } from '@mui/material';

import * as React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

interface MyFormValues {
  bodyStyle: string,
  numCharVariations: number,
  pets: boolean,
  numPets: number,
  extras: [],
}

const initialValues: MyFormValues = { 
  bodyStyle: '',
  numCharVariations: 0,
  pets: false,
  numPets: 0,
  extras: [],
};

export default function AddCharacter({ portraitId, setOpenCharMod }) {
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        await addCharacter( portraitId, values.bodyStyle, values.numCharVariations, values.pets, values.numPets, values.extras)
        setOpenCharMod(false)
        actions.setSubmitting(false);
      }}
    >
      {({ handleChange, values }) => (
      <Form>
        {/* radio buttons */}
        <div>
          <label>
            <Field type="radio" name="bodyStyle" value="Headshot" />
              Headshot
          </label>
          <label>
            <Field type="radio" name="bodyStyle" value="Half" />
            Half
          </label>
          <label>
            <Field type="radio" name="bodyStyle" value="Full" />
            Full
          </label>
        </div>
        
        <div>
          <p>Number of character variations:</p>
          <TextField
            type="number"
            name="numCharVariations"
            value={values.numCharVariations}
            onChange={handleChange}
            inputProps={{
              min: 0,
              style: {
                textAlign: "center",
                color: "black"
              }
            }}
          />
        </div>

        {/* check boxes */}
        <label>
          <Field type="checkbox" name="pets" />
          Pets
        </label>

        {values.pets && 
          <div>
            <p>Use the slider to select # of pets</p>
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
        <div>
          <label className='w-full'>
            <Field type="checkbox" name="extras" value="model" />
            3D Model by Hero Forge
          </label>
        </div>
        <div>
          <label>
            <Field type="checkbox" name="extras" value="character" />
            Character Sheet
          </label>
        </div>
        <div>
          <label>
            <Field type="checkbox" name="extras" value="weapons" />
            Weapons Sheet
          </label>
        </div>
        

        <button type="submit" className='text-black border-2 border-black rounded-lg p-2'>Submit</button>
      </Form>
      )}
    </Formik>
  )
}
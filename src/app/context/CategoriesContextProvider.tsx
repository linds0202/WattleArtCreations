"use client";

import { Categories } from "./CategoriesContext";
import React, { ReactNode, useState, useEffect } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { getCategories, setNewCategories } from "../firebase/firestore";

interface IProps {
  children: ReactNode;
}

const CategoryContextProvider = ({ children }: IProps) => {
  
  const [categories, setCategories] = useState<Categories>({
    cat1: {
        type: 'Photorealistic',
        copy: {
            homeBlurb: '',
            selectionHeroBlurb: '',
            selectionCarouselBlurb: '',
        },
        prices: {
            Headshot: 100,
            Half: 130,
            Full: 150,
            pet: 25,
            weaponSimple: 35,
            weaponComplex: 50,
            model: 150,
            character: 120,
            weapons: 125
        },
        pics: {
            homeCarousel: [],
            selectionBG: "",
            selectionCarousel: [],
            selectionHero: ""
        }
    },
    cat2: {
        type: 'Anime',
        copy: {
            homeBlurb: '',
            selectionHeroBlurb: '',
            selectionCarouselBlurb: '',
        },
        prices: {
            Headshot: 100,
            Half: 130,
            Full: 150,
            pet: 25,
            weaponSimple: 35,
            weaponComplex: 50,
            model: 150,
            character: 120,
            weapons: 125
        },
        pics: {
            homeCarousel: [],
            selectionBG: "",
            selectionCarousel: [],
            selectionHero: ""
        }
    },
    cat3: {
        type: 'NSFW',
        copy: {
            homeBlurb: '',
            selectionHeroBlurb: '',
            selectionCarouselBlurb: '',
        },
        prices: {
            Headshot: 100,
            Half: 130,
            Full: 150,
            pet: 25,
            weaponSimple: 35,
            weaponComplex: 50,
            model: 150,
            character: 120,
            weapons: 125
        },
        pics: {
            homeCarousel: "",
            selectionBG: "",
            selectionCarousel: [],
            selectionHero: ""
        }
    },
    customizer: {
        defaults: {
            Headshot: "",
            Half: "",
            Full: "",
            noImg: ""
        }
    },
    home: {
        gallery: [],
        splatters: [],
        testimonials: [],
        title: '',
        tagline: ''
    }})

    useEffect(() => {
        const getNewCategories = async () => {
            const data = await getCategories('giDGFUqgQ3FQHYh0sr8x')
            const newCategoriesObj = {
                cat1: data.cat1,
                cat2: data.cat2,
                cat3: data.cat3,
                customizer: data.customizer,
                home: data.home
            }
            setCategories(newCategoriesObj)
         }

        
       
        getNewCategories()
        
    }, [])
  
    const changeCategories = async (categories: Categories) => {
        await setNewCategories('giDGFUqgQ3FQHYh0sr8x', categories)
        setCategories(categories);
    }

    return (
        <CategoriesContext.Provider
        value={{
            categories,
            changeCategories,
        }}
        >
        {children}
        </CategoriesContext.Provider>
    );
};

export default CategoryContextProvider;



  
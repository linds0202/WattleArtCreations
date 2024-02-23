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
            charVariations: 20,
            weaponSimple: 35,
            weaponComplex: 50,
            armourComplex: 15,
            wings: 30,
            petSmall: 15,
            petLarge: 25,
            petMonster: 50,
            bgSimple: 15,
            bgComplex: 25,
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
            charVariations: 50,
            weaponSimple: 35,
            weaponComplex: 50,
            armourComplex: 25,
            wings: 30,
            petSmall: 15,
            petLarge: 25,
            bgSimple: 30,
            bgComplex: 50,
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
            charVariations: 50,
            weaponSimple: 35,
            weaponComplex: 50,
            armourComplex: 25,
            wings: 30,
            petSmall: 15,
            petLarge: 25,
            bgSimple: 30,
            bgComplex: 50,
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
            noImg: "",
            petSmall: "",
            petLarge: "",
            petMonster: "",
            cat1DefaultImg: "",
            cat2DefaultImg: "",
            cat3DefaultImg: ""
        },
        bgOptions: [],
        pricing: {
            model: 500,
            character: 125,
            weapons: 100,
            complexity: [0, 15, 30, 45, 100],
            additionalRevision: [25, 50, 100],
            commissionPercentage: 0.9
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
                home: data.home,
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



  
import { Timestamp } from "firebase/firestore";
import { createContext, useContext } from "react";

interface Category {
    type: string,
    copy: CategoryCopy,
    prices: CategoryPrice,
    pics: CategoryPics,
    testimonials: Array<TestimonialType>
}

export interface CategoryPrice {
    Headshot: number,
    Half: number,
    Full: number,
    charVariations: number,
    weaponSimple: number,
    weaponComplex: number,
    armourComplex: number,
    wings: number,
    petSmall: number,
    petLarge: number,
    petMonster: number,
    bgSimple: number,
    bgComplex: number
}

interface CategoryPics {
    homeCarousel?: Array<string>,
    homeImg?: string,
    selectionBG: string,
    selectionCarousel: Array<string>,
    selectionHero: string
}

interface CategoryCopy {
    homeBlurb: string,
    selectionHeroBlurb: string,
    selectionCarouselBlurb: string,
}

interface Customizer {
    defaults: {
        Headshot: string,
        Half: string,
        Full: string,
        noImg: string,
        petSmall: string,
        petLarge: string,
        petMonster: string,
        cat1DefaultImg: string,
        cat2DefaultImg: string,
        cat3DefaultImg: string
    },
    bgOptions: Array<string>,
    pricing: {
        model: number,
        character: number,
        weapons: number,
        complexity: Array<number>,
        additionalRevision: Array<number>
    }
}

interface Home {
    gallery: Array<string>,
    splatters: Array<string>,
    testimonials: Array<TestimonialType>,
    title: string,
    tagline: string
}


export interface TestimonialType {
    portraitId: string,
    artistId: string,
    category: string,
    customerId: string,
    customerDisplayName: string,
    text: string,
    stars: number,
    includeImg: boolean,
    imgUrl: string,
    featured: boolean,
    featuredHome: boolean,
    portraitCompletionDate: Timestamp
    uid: string
}


export interface Categories {
    [index:string]: Category | Customizer | Home | any
}

interface ICategoriesContext {
  categories: Categories;
  changeCategories: (categories: Categories) => void;
}

export const CategoriesContext = createContext<ICategoriesContext>({
    categories: {
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
            },
            testimonials: []
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
                charVariations: 25,
                weaponSimple: 35,
                weaponComplex: 50,
                armourComplex: 20,
                wings: 35,                           
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
            },
            testimonials: []
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
                homeImg: "",
                selectionBG: "",
                selectionCarousel: [],
                selectionHero: ""
            },
            testimonials: []
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
                additionalRevision: [25, 50, 100]
            }
        },
        home: {
            gallery: [],
            splatters: [],
            testimonials: [],
            title: '',
            tagline: ''
        },
    },
    changeCategories(categories) {},
});

export const useCategoriesContext = () => useContext(CategoriesContext);
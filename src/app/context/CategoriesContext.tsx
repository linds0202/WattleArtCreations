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
    pet: number,
    weaponSimple: number,
    weaponComplex: number,
    model: number,
    character: number,
    weapons: number,
    wings: number,
    bgSimple: number,
    bgComplex: number,
    charVariations: number,
    armourComplex: number,
    complexity: Array<number>,
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
        noImg: string
    },
    bgOptions: Array<string>
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
    // cat1: {
    //     type: string,
    //     copy: CategoryCopy,
    //     prices: CategoryPrice,
    //     pics: CategoryPics
    // },
    // cat2: {
    //     type: string,
    //     copy: CategoryCopy,
    //     prices: CategoryPrice,
    //     pics: CategoryPics
    // },
    // cat3: {
    //     type: string,
    //     copy: CategoryCopy,
    //     prices: CategoryPrice,
    //     pics: {
    //         homeCarousel: string,
    //         selectionBG: string,
    //         selectionCarousel: Array<string>,
    //         selectionHero: string
    //     }
    // },
    // customizer: Customizer,
    // home: Home
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
                pet: 25,
                weaponSimple: 35,
                weaponComplex: 50,
                model: 150,
                character: 120,
                weapons: 125,
                wings: 30,
                bgSimple: 15,
                bgComplex: 25,
                charVariations: 20,
                armourComplex: 15,
                complexity: [17, 20, 23, 26, 29]
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
                pet: 25,
                weaponSimple: 35,
                weaponComplex: 50,
                model: 150,
                character: 120,
                weapons: 125,
                wings: 35,
                bgSimple: 35,
                bgComplex: 45,
                charVariations: 25,
                armourComplex: 20,
                complexity: [20, 23, 26, 29, 32]
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
                pet: 25,
                weaponSimple: 35,
                weaponComplex: 50,
                model: 150,
                character: 120,
                weapons: 125,
                wings: 30,
                bgSimple: 30,
                bgComplex: 50,
                charVariations: 50,
                armourComplex: 25,
                complexity: [30, 33, 36, 39, 42]
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
                noImg: ""
            },
            bgOptions: []
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
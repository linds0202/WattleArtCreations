import { Categories } from '@/app/context/CategoriesContext';
import { EditProps } from './EditHero';
import { EditCarouselSelection } from './EditCarouselSelection';
import { EditCarouselSelection1 } from './EditCarouselSelection1';
import { EditCarouselSelection2 } from './EditCarouselSelection2';
import { EditCarouselSelection3 } from './EditCarouselSelection3';

export const EditSelectionCarousels = ({ categories, changeCategories }: EditProps) => {
  
    return (
        <div className='w-11/12 mx-auto'>
            <EditCarouselSelection categories={categories} changeCategories={changeCategories} cat={'cat1'}/>
            <EditCarouselSelection categories={categories} changeCategories={changeCategories} cat={'cat2'}/>
            <EditCarouselSelection categories={categories} changeCategories={changeCategories} cat={'cat3'}/>  
        </div>
    )
}
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { MyAnimalValues } from '../portraits/components/PortraitCustomizer'
import { useCategoriesContext } from '../context/CategoriesContext'

interface AnimalListProps {
    portrait: PortraitData
}

const AnimalList = ({ portrait }: AnimalListProps) => {
    const {categories} = useCategoriesContext()

    const animalList = portrait.animals.map((animal: MyAnimalValues, i) => (
        <div key={i} className='w-[45%] md:w-[30%] h-auto border-2 border-[#282828] rounded-xl px-4 py-2 text-sm flex flex-col md:justify-between items-center mb-2'>
          <p className='text-md font-semibold text-center'>{animal.type}</p>
          <div className="w-[75px] h-[100px] rounded-xl flex justify-center items-center">
              {animal.type === 'Small Pet' && <object 
                  type="image/svg+xml" 
                  data={categories.customizer.defaults.petSmall} 
                  className='w-[90px] h-[90px] object-cover object-top'
              />}
              {animal.type === 'Large Pet' && <object 
                  type="image/svg+xml" 
                  data={categories.customizer.defaults.petLarge} 
                  className='w-[100px] h-[100px] object-cover object-top'
              />}
              {animal.type === 'Monster/Dragon' && <object 
                  type="image/svg+xml" 
                  data={categories.customizer.defaults.petMonster} 
                  className='w-[100px] h-[100px] object-cover object-top'
              />}
          </div>
          
        </div>
    ))
    
    return (
        <div className='w-full flex flex-wrap justify-around md:justify-between items-center'>
            {animalList}
        </div>
    )
}

export default AnimalList
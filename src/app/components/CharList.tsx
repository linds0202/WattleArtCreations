import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { MyCharValues } from '../portraits/components/questionaire/StepOne'

interface CharListProps {
    portrait: PortraitData
}

const CharList = ({ portrait }: CharListProps) => {
    
    const charList = portrait.characters.map((char: MyCharValues, i) => (
        <div key={i} className='w-[48%] h-[125px] border-2 border-[#282828] rounded-xl px-4 py-2 text-sm flex justify-between items-center mb-2'>
          <img 
            alt='default character style thumbnail'
            className={` ${char.bodyStyle === 'Full' ? 'w-[48px] h-[96px]' : 'w-[96px] h-[96px]'} object-cover rounded-xl`} 
            src={`../../customizer/${char.bodyStyle}.png`} 
          />

          <div className='w-full ml-4 self-start'>
            <p className='text-md font-semibold text-center'>Character {i + 1}</p>
            <div className='flex justify-between'>
              <p className='font-semibold'>Variations: <span className='font-light'>{char.numCharVariations}</span></p>
              <p className='font-semibold'>Pets: <span className='font-light'>{char.numPets}</span></p>
            </div>
            
            <p className='text-md font-semibold'>Extras: <span className='text-sm font-light'>{char.extras.map(extra => {
              if (extra === 'character') return 'Character Sheet'
              if (extra === 'model') return '3D Model'
              if (extra === 'weapons') return 'Weapon Sheet'
            }).join(', ')}</span></p>
          </div>
          
        </div>
    ))
    
    return (
        <div className='w-full flex flex-wrap justify-between items-center'>
            {charList}
        </div>
    )
}

export default CharList
import React from 'react'
import { PortraitData } from '../portraits/components/PortraitCustomizer'

interface CharListProps {
    portrait: PortraitData
}

const CharList = ({ portrait }: CharListProps) => {
    
    const charList = portrait.characters.map((char, i) => (
        <div key={i} className='w-[48%] h-[125px] border-2 border=[#282828] rounded-xl p-2 text-sm flex mb-2'>
          <img 
            className={` ${char.bodyStyle === 'Full' ? 'w-[48px] h-[96px]' : 'w-[96px] h-[96px]'} object-cover mx-auto rounded-xl`} 
            src={`../../customizer/${char.bodyStyle}.png`} 
          />
          <div className='ml-2'>
            <p className='text-md font-semibold text-center'>Character {i + 1}</p>
            <div className='flex justify-between'>
              <p className='font-semibold'>Variations: <span className='font-light'>{char.numCharVariations}</span></p>
              <p className='font-semibold'>Pets: <span className='font-light'>{char.numPets}</span></p>
            </div>
            
            <p className='text-xs font-semibold'>Extras: <span className='font-light'>{char.extras.map(extra => {
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
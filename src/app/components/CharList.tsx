import { PortraitData } from '../portraits/components/PortraitCustomizer'
import { MyCharValues } from '../portraits/components/questionaire/StepOne'

interface CharListProps {
    portrait: PortraitData
}

const CharList = ({ portrait }: CharListProps) => {
    
    const charList = portrait.characters.map((char: MyCharValues, i) => (
        <div key={i} className='w-full h-[175px] border-2 border-[#282828] rounded-xl px-4 py-2 text-sm flex flex-col mb-2'>
          <div className='w-full flex justify-between items-center'>
            <img 
              alt='default character style thumbnail'
              className={` ${char.bodyStyle === 'Full' ? 'w-[48px] h-[96px]' : 'w-[96px] h-[96px]'} object-cover rounded-xl`} 
              src={`../../images/customizer/${char.bodyStyle}.png`} 
            />

            <div className='w-full h-full ml-2 flex flex-col'>
              <p className='text-md font-semibold text-center'>Character {i + 1} - ({char.bodyStyle === 'Headshot' ? char.bodyStyle : `${char.bodyStyle} Body`})</p>
        
              <div className="w-[100%] h-1/3 flex flex-wrap items-start">
                {[...Array(char.numCharVariations)].map((n, i) => <object key={i} type="image/svg+xml" data={`../../../images/var${i%2}.svg`} className="w-1/6 h-[100%]"></object>)}
              </div>

              <div className='w-full h-7/12 flex items-stretch'>
                <div className="w-1/4 h-full mr-4 flex flex-col items-center">
                  <p className="text-[#282828] text-center text-sm">Weapon</p>
                  {char.weapon === 'simple' ?
                      <object type="image/svg+xml" data={`../../../images/simpleWeapon.svg`} className="w-[100%] h-[100%]" />
                  : char.weapon === 'complex' ? 
                      <object type="image/svg+xml" data={`../../../images/complexWeapon.svg`} className="w-[100%] h-[100%]" />
                  : <p className="text-sm text-red-600 mt-6">None</p> 
                  }        
                </div>

                <div className="w-1/4 h-full mr-4 flex flex-col items-center ">
                      <p className="text-[#282828] text-center text-sm">Wings</p>
                      {char.wings ? 
                          <object type="image/svg+xml" data={`../../../images/wings.svg`} className="w-[100%] h-[100%]" />
                      : <p className="text-sm text-red-600 mt-6">None</p> 
                      }
                  </div>

                  <div className="w-1/4 h-full mr-4 flex flex-col items-center">
                        <p className="text-[#282828] text-center text-sm">Armour</p>
                        {char.armourComplex ? 
                            <object type="image/svg+xml" data={`../../../images/armour.svg`} className="w-[80%] h-[80%]" />
                        : <p className="text-sm text-red-600 mt-6">None</p> 
                        }
                    </div>
              </div>
            </div>
          </div>
          

          <div className='w-full pt-1'>            
            <p className='text-md font-semibold'>Extras: <span className='text-[12px] font-light'>{char.extras.map(extra => {
              if (extra === 'character') return 'Character Sheet'
              if (extra === 'model') return '3D Model'
              if (extra === 'weapons') return 'Weapon Sheet'
            }).join(', ')}</span></p>
          </div>
          
        </div>
    ))
    
    return (
        <div className='w-5/12 flex flex-col items-center'>
            {charList}
        </div>
    )
}

export default CharList
import { useState } from "react"
import { Artist } from '@/app/components/Portrait';

interface ReassignButtonsProps {
    options: Array<Artist>,
    onSelect: Function,
}

const ReassignButtons = ({ options, onSelect }: ReassignButtonsProps) => {
    const [selectedOption, setSelectedOption] = useState<Artist> ({artistName: '', id: ''})

    const handleOptionChange = (option: Artist) => {
        const value = option
        setSelectedOption(value)
        onSelect(value)
    };
  
    return (
      <div className="w-1/2 ml-8">
        <h3 className="text-xl font-bold mb-2 pt-4">Select New Artist:</h3>
        <div className="w-full flex flex-col flex-wrap">
          {options.map((option) => (
            <div key={option.id} className="w-1/2 pl-4">
              <input
                type="radio"
                id={option.id}
                name="dynamicRadio"
                value={option.id}
                checked={selectedOption.id === option.id}
                onChange={() => handleOptionChange(option)}
              />
              <label htmlFor={option.id} className="ml-4">{option.artistName}</label>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default ReassignButtons
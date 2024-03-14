import { useState } from "react"
import { Artist } from '@/app/components/Portrait';

interface ReassignButtonsProps {
    options: Array<Artist>,
    onSelect: Function,
}

const ReassignButtons = ({ options, onSelect }: ReassignButtonsProps) => {
    const [selectedOption, setSelectedOption] = useState<Artist> ({artistName: '', id: ''});

    const handleOptionChange = (option: Artist) => {
        const value = option;
        setSelectedOption(value);
        onSelect(value);
    };
  
    return (
      <div>
        <h3>Select an option:</h3>
        {options.map((option) => (
          <div key={option.id}>
            <input
              type="radio"
              id={option.id}
              name="dynamicRadio"
              value={option.id}
              checked={selectedOption.id === option.id}
              onChange={() => handleOptionChange(option)}
            />
            <label htmlFor={option.id}>{option.artistName}</label>
          </div>
        ))}
      </div>
    );
  };
  
  export default ReassignButtons;
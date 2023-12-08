import React, { useState } from 'react';


const BackgroundSelector = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleOptionChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div>
      <h3>Select an option:</h3>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="dynamicRadio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default BackgroundSelector
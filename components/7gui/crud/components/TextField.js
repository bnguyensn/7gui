import React from 'react';

const TextField = ({ name, labelText, textValue, setTextValue }) => {
  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="w-full p-1">
      <label htmlFor={name} className="pr-2 whitespace-no-wrap">
        {labelText}
      </label>
      <input
        className="border-b border-solid border-gray-900 p-1"
        id={name}
        type="text"
        name={name}
        value={textValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;

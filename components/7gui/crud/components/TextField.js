import React from 'react';

const TextField = ({ name, labelText, textValue, setTextValue }) => {
  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="crud-text-field-ctn">
      <label htmlFor={name}>{labelText}</label>
      <input
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

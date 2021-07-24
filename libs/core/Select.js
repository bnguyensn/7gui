import * as React from 'react';

export default function Select({ items, value, setValue }) {
  const handleChange = (e) => {
    const { value: newValue } = e.target;
    setValue(newValue);
  };

  const optionEls = items.map((it) => (
    <option key={it} value={it} className="px-2">
      {it}
    </option>
  ));

  return (
    <select value={value} onChange={handleChange}>
      {optionEls}
    </select>
  );
}

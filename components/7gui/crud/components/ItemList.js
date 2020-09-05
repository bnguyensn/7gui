import React from 'react';
import clsx from 'clsx';

const filterFn = (filter, text) =>
  text.toLowerCase().includes(filter.toLowerCase());

const ItemList = ({ items, lastNameFilter, selectedItem, setSelectedItem }) => {
  // We expect items to be in the form of:
  // {
  //   id: {
  //     firstName: 'xxx',
  //     lastName: 'xxx',
  //   },
  // }
  const itemEls = Object.entries(items)
    .filter(
      ([id, { lastName }]) =>
        !lastNameFilter || filterFn(lastNameFilter, lastName)
    )
    .map(([id, { firstName, lastName }]) => {
      const handleClick = () => {
        if (selectedItem === id) {
          setSelectedItem('');
        } else {
          setSelectedItem(id);
        }
      };

      const contentText = `${lastName}, ${firstName}`;

      return (
        <div
          key={id}
          className={clsx(
            'p-1 cursor-pointer',
            selectedItem === id && 'bg-blue-500 text-white'
          )}
          onClick={handleClick}
        >
          {contentText}
        </div>
      );
    });

  return <div>{itemEls}</div>;
};

export default ItemList;

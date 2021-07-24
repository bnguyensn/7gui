import * as React from 'react';
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

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      };

      const contentText = `${lastName}, ${firstName}`;

      return (
        <div
          key={id}
          tabIndex={0}
          className={clsx(
            'p-1 cursor-pointer',
            selectedItem === id && 'bg-blue-500 text-white'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {contentText}
        </div>
      );
    });

  return <div>{itemEls}</div>;
};

export default ItemList;

import React from "react";

const filterFn = (filter, text) =>
  (text.toLowerCase()).includes(filter.toLowerCase());

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
        !lastNameFilter || filterFn(lastNameFilter, lastName),
    )
    .map(([id, { firstName, lastName }]) => {
      const handleClick = () => {
        if (selectedItem === id) {
          setSelectedItem("");
        } else {
          setSelectedItem(id);
        }
      };

      const contentText = `${lastName}, ${firstName}`;

      return (
        <div
          key={id}
          className={`crud-item-list-item ${selectedItem === id && "selected"}`}
          onClick={handleClick}
        >
          {contentText}
        </div>
      );
    });

  return <div className="crud-item-list-ctn">{itemEls}</div>;
};

export default ItemList;

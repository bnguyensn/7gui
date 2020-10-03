import React, { useState } from 'react';
import useDb from './db/dbHook';
import TextField from './components/TextField';
import ItemList from './components/ItemList';

const CRUD = () => {
  const { db, createItem, updateItem, deleteItem } = useDb();

  const [selectedItem, setSelectedItem] = useState('');

  const [lastNameFilterText, setLastNameFilterText] = useState('');
  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');

  const [errText, setErrText] = useState('');

  const handleCreate = () => {
    if (!firstNameText || !lastNameText) {
      setErrText('Both first name and last name need to be present!');

      return;
    }

    const id = `${firstNameText}.${lastNameText}`;

    if (db[id]) {
      setErrText('This person already exists!');

      return;
    }

    createItem(id, {
      firstName: firstNameText,
      lastName: lastNameText,
    });

    setFirstNameText('');
    setLastNameText('');

    setErrText('');
  };

  const handleUpdate = () => {
    if (!firstNameText && !lastNameText) {
      setErrText('Either first name or last name needs to be present!');

      return;
    }

    if (!selectedItem) {
      setErrText('No item is selected for update!');

      return;
    }

    updateItem(selectedItem, {
      firstName: firstNameText ? firstNameText : db[selectedItem].firstName,
      lastName: lastNameText ? lastNameText : db[selectedItem].lastName,
    });

    setFirstNameText('');
    setLastNameText('');

    setErrText('');
  };

  const handleDelete = () => {
    if (!selectedItem) {
      setErrText('No item is selected for delete!');

      return;
    }

    deleteItem(selectedItem);

    setSelectedItem('');

    setErrText('');
  };

  return (
    <div className="flex flex-col p-2 w-full">
      <div className="py-2 w-6/12">
        <TextField
          labelText="Surname filter:"
          name="crud-filter-text"
          textValue={lastNameFilterText}
          setTextValue={setLastNameFilterText}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <div className="h-40 overflow-y-auto flex flex-col border-solid border border-gray-900 px-2">
          <ItemList
            items={db}
            lastNameFilter={lastNameFilterText}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>

        <div className="py-2">
          <TextField
            labelText="Name:"
            name="crud-first-name-text"
            textValue={firstNameText}
            setTextValue={setFirstNameText}
          />
          <TextField
            labelText="Surname:"
            name="crud-last-name-text"
            textValue={lastNameText}
            setTextValue={setLastNameText}
          />
        </div>
      </div>

      <div className="py-2">
        <div className="crud-action-buttons-ctn">
          <button className="btn btn-blue mr-2" onClick={handleCreate}>
            Create
          </button>
          <button className="btn btn-blue mr-2" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-blue" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="py-2 text-red-500">{errText && `🛑 ${errText}`}</div>
    </div>
  );
};

export default CRUD;

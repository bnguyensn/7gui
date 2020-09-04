import React, { useState } from 'react';
import useDb from './db/dbHook';
import TextField from './components/TextField';
import Button from './components/Button';
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
      setErrText('Both first name and last name need be to present!');

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
      <div className="crud-header-ctn">
        <div className="crud-filter-ctn">
          <TextField
            labelText="Surname filter:"
            name="crud-filter-text"
            textValue={lastNameFilterText}
            setTextValue={setLastNameFilterText}
          />
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="">
          <ItemList
            items={db}
            lastNameFilter={lastNameFilterText}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>

        <div className="">
          <div className="crud-name-inputs-ctn">
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

          <div className="crud-err-text-ctn">{errText}</div>
        </div>
      </div>

      <div className="">
        <div className="crud-action-buttons-ctn">
          <Button id="crud-create-btn" onClick={handleCreate}>
            Create
          </Button>
          <Button id="crud-update-btn" onClick={handleUpdate}>
            Update
          </Button>
          <Button id="crud-delete-btn" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CRUD;

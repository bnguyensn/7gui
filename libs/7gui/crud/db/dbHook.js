import { useState } from 'react';

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export default function useDb() {
  const [db, setDb] = useState({});

  const createItem = (id, content) => {
    const newDb = deepCopy(db);

    newDb[id] = content;

    setDb(newDb);
  };

  const updateItem = createItem;

  const deleteItem = (id) => {
    const newDb = deepCopy(db);

    delete newDb[id];

    setDb(newDb);
  };

  const clearDb = () => {
    setDb({});
  };

  return {
    db,
    createItem,
    updateItem,
    deleteItem,
    clearDb,
  };
}

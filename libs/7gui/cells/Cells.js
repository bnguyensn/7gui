import * as React from 'react';
import Grid from './components/Grid';

const GRID_ROW_COUNT = 100; // Labelled 0 - 99
const GRID_COLUMN_COUNT = 26; // Labelled A - Z

export default function Cells() {
  const [editing, setEditing] = React.useState('');
  const [data, setData] = React.useState({});

  return (
    <Grid
      rowCount={GRID_ROW_COUNT}
      colCount={GRID_COLUMN_COUNT}
      editing={editing}
      setEditing={setEditing}
      data={data}
      setData={setData}
    />
  );
}

import React, { useState } from 'react';
import clsx from 'clsx';

function AxisCell({ label }) {
  return (
    <div
      className="flex justify-center items-center flex-none border-2 border-transparent"
      style={{ width: 50, height: 25 }}
    >
      {label}
    </div>
  );
}

function NormalCell({ cellId, isEditing, setEditing }) {
  const handleDoubleClick = () => {
    setEditing(cellId);
  };

  return (
    <div
      className="flex justify-center items-center flex-none border-2 border-gray-300 border-solid"
      style={{ width: 50, height: 25 }}
      tabIndex={0}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className={clsx(isEditing && 'bg-blue-200')}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

// ⚡
const MemoizedNormalCell = React.memo(NormalCell);

function RowCtn({ children }) {
  return <div className="flex items-center">{children}</div>;
}

export default function Grid({ rowCount, colCount, editing, setEditing }) {
  const gridElsByRows = [];

  // Create the first row (the column label row)

  const colLabelRow = [<AxisCell key="" label="" />];
  for (let colIndex = 65; colIndex < colCount + 65; colIndex++) {
    const label = String.fromCharCode(colIndex);
    colLabelRow.push(<AxisCell key={label} label={label} />);
  }
  gridElsByRows.push(colLabelRow);

  // Create the remaining rows

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row = [<AxisCell key="" label={rowIndex} />];
    for (let colIndex = 65; colIndex < colCount + 65; colIndex++) {
      const cellId = `${rowIndex}${String.fromCharCode(colIndex)}`;

      row.push(
        <MemoizedNormalCell
          key={colIndex}
          cellId={cellId}
          isEditing={editing === cellId}
          setEditing={setEditing}
        />
      );
    }
    gridElsByRows.push(row);
  }

  return (
    <div className="overflow-scroll" style={{ width: 500, height: 500 }}>
      {gridElsByRows.map((row, index) => (
        <RowCtn key={index}>{row.map((column) => column)}</RowCtn>
      ))}
    </div>
  );
}

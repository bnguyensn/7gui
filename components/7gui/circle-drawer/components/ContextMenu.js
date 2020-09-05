import React from 'react';
import clsx from 'clsx';

const ContextMenu = ({ show, position, handleDiameterBtnClick }) => {
  return (
    <div
      className={clsx(
        'absolute flex flex-col w-40 bg-gray-100 border border-solid border-gray-500',
        !show && 'hidden'
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <button
        className="w-100 p-1 text-center cursor-pointer hover:bg-gray-100"
        onClick={handleDiameterBtnClick}
      >
        Adjust diameter
      </button>
    </div>
  );
};

export default ContextMenu;

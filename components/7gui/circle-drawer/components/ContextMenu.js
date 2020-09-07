import React from 'react';
import clsx from 'clsx';

const ContextMenu = ({ show, position, handleDiameterBtnClick }) => {
  return (
    <div
      className={clsx(
        'absolute flex flex-col bg-gray-100 border border-solid border-gray-500',
        !show && 'hidden'
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        className="w-full p-2 text-center cursor-pointer hover:bg-gray-100"
        onClick={handleDiameterBtnClick}
      >
        Adjust diameter
      </div>
    </div>
  );
};

export default ContextMenu;

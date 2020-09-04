import React from 'react';
import clsx from 'clsx';

const ContextMenu = ({ show, position, handleDiameterBtnClick }) => {
  return (
    <div
      className={clsx('circle-drawer-ctx-menu-ctn', !show && 'hidden')}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        className="circle-drawer-ctx-menu-item"
        onClick={handleDiameterBtnClick}
      >
        Adjust diameter
      </div>
    </div>
  );
};

export default ContextMenu;

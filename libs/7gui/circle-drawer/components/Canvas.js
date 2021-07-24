import * as React from 'react';

const getMouseCoords = (e) => {
  const canvasRect = e.target.getBoundingClientRect();

  return {
    mouseX: e.clientX - canvasRect.left,
    mouseY: e.clientY - canvasRect.top,
  };
};

const Canvas = ({ createCircleOnClick, checkHitCircle, showContextMenu }) => {
  const handleClick = (e) => {
    createCircleOnClick(getMouseCoords(e));
  };

  const handleMouseMove = (e) => {
    checkHitCircle(getMouseCoords(e));
  };

  const handleOpenContextMenu = (e) => {
    e.preventDefault();

    showContextMenu(getMouseCoords(e));
  };

  return (
    <canvas
      id="circle-drawer-canvas"
      width={500}
      height={500}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onContextMenu={handleOpenContextMenu}
    />
  );
};

export default Canvas;

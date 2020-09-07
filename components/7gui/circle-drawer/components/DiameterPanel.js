import React from 'react';
import clsx from 'clsx';

const formatCoords = (coord) => coord.toFixed(2);

const DiameterPanel = ({
  show,
  position,
  circle,
  minDiameter,
  maxDiameter,
  sliderValue,
  handleSliderChange,
  handleDoneBtnClick,
}) => {
  const { centerX, centerY } = circle;

  const onSliderChange = (e) => {
    handleSliderChange(e.target.value);
  };

  return (
    <div
      className={clsx(
        'absolute flex flex-col items-center p-2 bg-gray-100 border border-solid border-gray-500',
        !show && 'hidden'
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <p>
        {`Adjust diameter of circle at (${formatCoords(centerX)},${formatCoords(
          centerY
        )})`}
      </p>
      <div>
        <input
          type="range"
          id="timer-slider"
          name="timer-slider"
          min={minDiameter}
          max={maxDiameter}
          step={1}
          value={sliderValue}
          onChange={onSliderChange}
          onInput={onSliderChange}
        />
      </div>
      <button className="btn btn-blue" onClick={handleDoneBtnClick}>
        Done
      </button>
    </div>
  );
};

export default DiameterPanel;

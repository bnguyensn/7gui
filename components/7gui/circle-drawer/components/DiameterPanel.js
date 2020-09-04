import React from 'react';
import clsx from 'clsx';

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
      className={clsx('circle-drawer-diameter-panel-ctn', !show && 'hidden')}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <h6>
        Adjust diameter of circle at ({centerX}, {centerY})
      </h6>
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
      <button onClick={handleDoneBtnClick}>Done</button>
    </div>
  );
};

export default DiameterPanel;

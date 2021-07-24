import * as React from 'react';

export default function TimerSlider({ curTime, maxTime, step, handleUpdate }) {
  return (
    <div className="flex align-center py-2">
      <span className="pr-2">Duration:</span>
      <input
        type="range"
        id="timer-slider"
        name="timer-slider"
        min={0}
        max={maxTime}
        step={step}
        value={curTime}
        onChange={handleUpdate}
        onInput={handleUpdate}
      />
    </div>
  );
}

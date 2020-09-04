import React, { useState, useEffect, useRef } from 'react';

import ProgressBar from './components/ProgressBar';
import ElapsedTimeCounter from './components/ElapsedTimeCounter';
import TimerSlider from './components/TimerSlider';

const FPS = 60;
const TIMER_INTERVAL = 1000 / FPS;

const MAX_SLIDER_TIME = 20 * 1000; // 20s
const SLIDER_STEP = 1000; // 1s

const BAR_WIDTH = 300;
const BAR_HEIGHT = 50;

export default function Timer() {
  const timerRef = useRef(null);
  const timerCbRef = useRef(null);
  const [resetBtn, setResetBtn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [curSliderTime, setCurSliderTime] = useState(MAX_SLIDER_TIME / 2);

  const progress = Math.min(elapsedTime / curSliderTime, 1);

  const timerCb = () => {
    if (progress < 1) {
      setElapsedTime(elapsedTime + TIMER_INTERVAL);
    }
  };

  useEffect(() => {
    timerCbRef.current = timerCb;
  });

  useEffect(() => {
    const tick = () => {
      timerCbRef.current();
    };

    timerRef.current = window.setInterval(tick, TIMER_INTERVAL);

    return () => window.clearInterval(timerRef.current);
  }, [resetBtn]);

  const handleSliderUpdate = (e) => {
    setCurSliderTime(e.target.value);
  };

  const handleResetButtonClick = () => {
    setElapsedTime(0);
    setResetBtn(!resetBtn);
    window.clearInterval(timerRef.current);
  };

  return (
    <div className="w-full flex flex-col">
      <ProgressBar
        progress={progress}
        barWidth={BAR_WIDTH}
        barHeight={BAR_HEIGHT}
      />
      <ElapsedTimeCounter
        elapsedTime={elapsedTime}
        curSliderTime={curSliderTime}
      />
      <TimerSlider
        curTime={curSliderTime}
        maxTime={MAX_SLIDER_TIME}
        step={SLIDER_STEP}
        handleUpdate={handleSliderUpdate}
      />
      <div>
        <button className="btn btn-blue" onClick={handleResetButtonClick}>
          Reset
        </button>
      </div>
    </div>
  );
}

import * as React from 'react';

const formatMs = (f) => (f / 1000).toFixed(1);

export default function ElapsedTimeCounter({ elapsedTime, curSliderTime }) {
  let text = '';

  if (elapsedTime >= curSliderTime) {
    text = `Elapsed time: ${formatMs(curSliderTime)}s | Timer finished`;
  } else {
    text = `Elapsed time: ${formatMs(elapsedTime)}s`;
  }

  return <div className="py-2">{text}</div>;
}

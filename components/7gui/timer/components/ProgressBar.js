import React from 'react';

export default function ProgressBar({ progress, barWidth, barHeight }) {
  const progressBarFillLeftPos = Math.round(progress * barWidth - barWidth);

  return (
    <div
      style={{
        position: 'relative',
        width: barWidth,
        height: barHeight,
        backgroundColor: '#eeeeee',
        borderRadius: 5,
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: progressBarFillLeftPos,
          width: '100%',
          height: '100%',
          backgroundColor: '#43a047',
        }}
      />
    </div>
  );
}

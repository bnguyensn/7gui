const deg2Rad = (deg) => (Math.PI / 180) * deg;

export default function draw(currentState) {
  const canvasEl = document.getElementById('circle-drawer-canvas');

  const ctx = canvasEl.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  // Coloring
  ctx.fillStyle = '#eeeeee';
  ctx.strokeStyle = '#212121';

  Object.values(currentState).forEach((circle) => {
    const { centerX, centerY, radius, isHit } = circle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, deg2Rad(360), false);
    if (isHit) {
      ctx.fill();
    }
    ctx.stroke();
  });
}

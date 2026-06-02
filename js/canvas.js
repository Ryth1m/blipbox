// ============================================================
//  js/canvas.js
//  ► DRAWING ENGINE — handles the canvas, pen, eraser, clear.
//    you probably don't need to edit this unless you want to
//    add new tools or change how drawing feels.
// ============================================================

const canvas = document.getElementById('drawCanvas');
const ctx    = canvas.getContext('2d');

let isDrawing = false;
let currentTool = 'pen';
let lastX = 0;
let lastY = 0;
export let hasDrawn = false;   // used by submit.js to know if a drawing exists


// -- setup: size canvas to its CSS display size ---------------
function initCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue('--canvas-bg').trim() || '#fffdf8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

initCanvas();

// resize: preserve existing drawing
window.addEventListener('resize', () => {
  const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  initCanvas();
  ctx.putImageData(snapshot, 0, 0);
});


// -- helpers --------------------------------------------------
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const src  = e.touches ? e.touches[0] : e;
  return [src.clientX - rect.left, src.clientY - rect.top];
}

function drawStroke(e) {
  if (!isDrawing) return;
  const [x, y]   = getPos(e);
  const size      = document.getElementById('brushSize').value;
  const color     = document.getElementById('colorPicker').value;
  const isEraser  = currentTool === 'eraser';
  const canvasBg  = getComputedStyle(document.documentElement)
    .getPropertyValue('--canvas-bg').trim() || '#fffdf8';

  ctx.lineWidth   = isEraser ? size * 3 : size;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.strokeStyle = isEraser ? canvasBg : color;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  [lastX, lastY] = [x, y];
  hasDrawn = true;
}


// -- event listeners ------------------------------------------
canvas.addEventListener('mousedown',  e => { isDrawing = true; [lastX, lastY] = getPos(e); });
canvas.addEventListener('mousemove',  e => drawStroke(e));
canvas.addEventListener('mouseup',    () => { isDrawing = false; });
canvas.addEventListener('mouseleave', () => { isDrawing = false; });

canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  isDrawing = true;
  [lastX, lastY] = getPos(e);
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  drawStroke(e);
}, { passive: false });

canvas.addEventListener('touchend', () => { isDrawing = false; });


// -- public api (called from HTML buttons) --------------------
window.setTool = function(tool) {
  currentTool = tool;
  document.getElementById('toolPen').classList.toggle('active',    tool === 'pen');
  document.getElementById('toolEraser').classList.toggle('active', tool === 'eraser');
};

window.clearCanvas = function() {
  const canvasBg = getComputedStyle(document.documentElement)
    .getPropertyValue('--canvas-bg').trim() || '#fffdf8';
  ctx.fillStyle = canvasBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  hasDrawn = false;
};

// export canvas data URL for submit.js
export function getCanvasDataURL() {
  return canvas.toDataURL('image/png');
}

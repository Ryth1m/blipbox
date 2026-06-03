// ============================================================
//  js/submit.js
//  ► SUBMIT ENGINE — sends the blip to the netlify function.
//    no tokens in the browser. config from config/socials.js.
// ============================================================

import { hasDrawn, getCanvasDataURL } from './canvas.js';

window.submitBlip = async function () {
  const msg = document.getElementById('msg').value.trim();

  if (!msg) {
    showStatus('error', '✗ write something first!');
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  showStatus('loading', '<div class="spinner"></div> sending your blip...');

  // -- build payload ----------------------------------------
  const payload = { message: msg };

  if (hasDrawn) {
    // strip data:image/png;base64, prefix — function gets raw base64
    payload.drawingBase64 = getCanvasDataURL().split(',')[1];
  }

  // -- post to netlify function at /blip --------------------
  try {
    const res  = await fetch(BLIPBOX_CONFIG.functionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.ok) {
      showStatus('success', "📬 blip sent! i'll see it.");
      document.getElementById('msg').value = '';
      window.clearCanvas();
    } else {
      showStatus('error', `✗ ${data.error || 'something went wrong'}`);
    }

  } catch (e) {
    showStatus('error', '✗ network error — try again?');
  }

  btn.disabled = false;
};

function showStatus(type, html) {
  const el     = document.getElementById('status');
  el.className = `status ${type}`;
  el.innerHTML = html;
}

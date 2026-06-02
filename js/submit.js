// ============================================================
//  js/submit.js
//  ► SUBMIT ENGINE — takes the message + drawing and posts
//    it to github issues. drawings are uploaded to imgbb
//    first so they actually render in the issue.
//    config comes from config/socials.js (BLIPBOX_CONFIG).
// ============================================================

import { hasDrawn, getCanvasDataURL } from './canvas.js';

// -- main submit function (called by the send button) ---------
window.submitBlip = async function () {
  const msg = document.getElementById('msg').value.trim();

  if (!msg) {
    showStatus('error', '✗ write something first!');
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  showStatus('loading', '<div class="spinner"></div> sending your blip...');

  const { owner, repo, token } = BLIPBOX_CONFIG.github;
  const timestamp  = new Date().toUTCString();
  const issueTitle = buildTitle();
  const labels     = hasDrawn ? ['blip', 'has-drawing'] : ['blip'];

  // -- upload drawing to imgbb if one exists ----------------
  let drawingUrl = null;
  if (hasDrawn) {
    showStatus('loading', '<div class="spinner"></div> uploading drawing...');
    drawingUrl = await uploadDrawing(getCanvasDataURL());
    if (!drawingUrl) {
      showStatus('error', '✗ drawing upload failed — try again or clear the canvas and send without it.');
      btn.disabled = false;
      return;
    }
  }

  // -- build issue body -------------------------------------
  const issueBody = buildBody(msg, timestamp, drawingUrl);

  showStatus('loading', '<div class="spinner"></div> sending your blip...');

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization':        `Bearer ${token}`,
          'Content-Type':         'application/json',
          'Accept':               'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ title: issueTitle, body: issueBody, labels }),
      }
    );

    if (res.ok) {
      showStatus('success', "📬 blip sent! i'll see it.");
      document.getElementById('msg').value = '';
      window.clearCanvas();
    } else {
      const err = await res.json();
      showStatus('error', `✗ github said: ${err.message || res.status}`);
    }

  } catch (e) {
    showStatus('error', '✗ network error — try again?');
  }

  btn.disabled = false;
};


// -- upload drawing to imgbb, return public URL ---------------
async function uploadDrawing(dataUrl) {
  try {
    // strip the data:image/png;base64, prefix
    const base64 = dataUrl.split(',')[1];
    const apiKey = BLIPBOX_CONFIG.imgbb.apiKey;

    const form = new FormData();
    form.append('image', base64);

    const res  = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    if (data.success) return data.data.url;
    return null;

  } catch (e) {
    return null;
  }
}


// -- helpers --------------------------------------------------
function buildTitle() {
  return `📬 blip · ${new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })}`;
}

function buildBody(msg, timestamp, drawingUrl) {
  let body = `**Message:**\n\n${msg}\n\n---\n*blipbox · ${timestamp}*`;
  if (drawingUrl) {
    body += `\n\n**Drawing:**\n\n![drawing](${drawingUrl})`;
  }
  return body;
}

function showStatus(type, html) {
  const el     = document.getElementById('status');
  el.className = `status ${type}`;
  el.innerHTML = html;
}

// ============================================================
//  js/submit.js
//  ► SUBMIT ENGINE — takes the message + drawing and posts
//    it to your github repo as an issue. only touches github.
//    config comes from config/socials.js (BLIPBOX_CONFIG).
// ============================================================

import { hasDrawn, getCanvasDataURL } from './canvas.js';

// -- main submit function (called by the send button) ---------
window.submitBlip = async function() {
  const msg = document.getElementById('msg').value.trim();

  if (!msg) {
    showStatus('error', '✗ write something first!');
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  showStatus('loading', '<div class="spinner"></div> sending your blip...');

  // build the github issue body
  const timestamp  = new Date().toUTCString();
  const issueTitle = buildTitle();
  const issueBody  = buildBody(msg, timestamp);
  const labels     = hasDrawn ? ['blip', 'has-drawing'] : ['blip'];

  const { owner, repo, token } = BLIPBOX_CONFIG.github;

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


// -- helpers --------------------------------------------------
function buildTitle() {
  const d = new Date();
  const label = d.toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
  return `📬 blip · ${label}`;
}

function buildBody(msg, timestamp) {
  let body = `**Message:**\n\n${msg}\n\n---\n*blipbox · ${timestamp}*`;

  if (hasDrawn) {
    const dataUrl = getCanvasDataURL();
    body += `\n\n**Drawing:**\n\n![drawing](${dataUrl})`;
  }

  return body;
}

function showStatus(type, html) {
  const el     = document.getElementById('status');
  el.className = `status ${type}`;
  el.innerHTML = html;
}

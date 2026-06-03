// ============================================================
//  worker.js  — Cloudflare Worker (deploy this on Cloudflare)
//
//  WHAT IT DOES:
//  Receives a blip from your page, uploads the drawing to
//  imgbb, then creates a GitHub issue. Your tokens never
//  touch the browser.
//
//  HOW TO DEPLOY:
//  1. Go to dash.cloudflare.com → Workers & Pages → Create
//  2. Click "Create Worker" → paste this entire file → Deploy
//  3. Go to Settings → Variables → add these secret variables:
//       GITHUB_TOKEN   → your fine-grained PAT (Issues: read+write)
//       GITHUB_OWNER   → your github username  (e.g. Ryth1m)
//       GITHUB_REPO    → your repo name        (e.g. blipbox)
//       IMGBB_KEY      → your imgbb API key
//  4. Copy your Worker URL (e.g. blipbox.YOUR-NAME.workers.dev)
//     and paste it into config/socials.js → workerUrl
// ============================================================

export default {
  async fetch(request, env) {

    // -- CORS: allow your github pages domain -----------------
    const corsHeaders = {
      'Access-Control-Allow-Origin':  '*',   // tighten to your domain if you want
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('method not allowed', { status: 405, headers: corsHeaders });
    }

    // -- parse incoming blip ----------------------------------
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid JSON' }, 400, corsHeaders);
    }

    const { message, drawingBase64 } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return json({ error: 'message is required' }, 400, corsHeaders);
    }

    // -- upload drawing to imgbb if provided ------------------
    let drawingUrl = null;
    if (drawingBase64) {
      drawingUrl = await uploadToImgbb(drawingBase64, env.IMGBB_KEY);
      // if upload fails we still send the message, just without drawing
    }

    // -- create github issue ----------------------------------
    const timestamp  = new Date().toUTCString();
    const issueTitle = buildTitle();
    const issueBody  = buildBody(message.trim(), timestamp, drawingUrl);
    const labels     = drawingUrl ? ['blip', 'has-drawing'] : ['blip'];

    const ghRes = await fetch(
      `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization':        `Bearer ${env.GITHUB_TOKEN}`,
          'Content-Type':         'application/json',
          'Accept':               'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent':           'blipbox-worker',
        },
        body: JSON.stringify({ title: issueTitle, body: issueBody, labels }),
      }
    );

    if (!ghRes.ok) {
      const err = await ghRes.json();
      return json({ error: err.message || 'github error' }, 502, corsHeaders);
    }

    return json({ ok: true }, 200, corsHeaders);
  },
};


// -- imgbb upload ---------------------------------------------
async function uploadToImgbb(base64, apiKey) {
  try {
    const form = new FormData();
    form.append('image', base64);

    const res  = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return data.success ? data.data.url : null;
  } catch {
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

function buildBody(message, timestamp, drawingUrl) {
  let body = `**Message:**\n\n${message}\n\n---\n*blipbox · ${timestamp}*`;
  if (drawingUrl) {
    body += `\n\n**Drawing:**\n\n![drawing](${drawingUrl})`;
  }
  return body;
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

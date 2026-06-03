// ============================================================
//  netlify/functions/blip.js
//  ► runs on netlify's servers — your tokens never touch
//    the browser. receives a blip, uploads drawing to imgbb,
//    posts to github issues.
//
//  YOU DON'T NEED TO EDIT THIS FILE.
//  tokens go in netlify → site → environment variables.
// ============================================================

export default async (request, context) => {

  // -- CORS headers -----------------------------------------
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== 'POST') {
    return new Response('method not allowed', { status: 405, headers: cors });
  }

  // -- parse body -------------------------------------------
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid request' }, 400, cors);
  }

  const { message, drawingBase64 } = body;

  if (!message || message.trim() === '') {
    return json({ error: 'message is required' }, 400, cors);
  }

  // -- env vars (set in netlify dashboard) ------------------
  const GITHUB_TOKEN = Netlify.env.get('GITHUB_TOKEN');
  const GITHUB_OWNER = Netlify.env.get('GITHUB_OWNER');
  const GITHUB_REPO  = Netlify.env.get('GITHUB_REPO');
  const IMGBB_KEY    = Netlify.env.get('IMGBB_KEY');

  // -- upload drawing if present ----------------------------
  let drawingUrl = null;
  if (drawingBase64 && IMGBB_KEY) {
    drawingUrl = await uploadToImgbb(drawingBase64, IMGBB_KEY);
  }

  // -- post github issue ------------------------------------
  const timestamp  = new Date().toUTCString();
  const issueTitle = `📬 blip · ${new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })}`;

  let issueBody = `**Message:**\n\n${message.trim()}\n\n---\n*blipbox · ${timestamp}*`;
  if (drawingUrl) issueBody += `\n\n**Drawing:**\n\n![drawing](${drawingUrl})`;

  const labels = drawingUrl ? ['blip', 'has-drawing'] : ['blip'];

  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization':        `Bearer ${GITHUB_TOKEN}`,
          'Content-Type':         'application/json',
          'Accept':               'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent':           'blipbox-netlify',
        },
        body: JSON.stringify({ title: issueTitle, body: issueBody, labels }),
      }
    );

    if (!ghRes.ok) {
      const err = await ghRes.json();
      return json({ error: err.message || 'github error' }, 502, cors);
    }

    return json({ ok: true }, 200, cors);

  } catch (e) {
    return json({ error: 'network error' }, 500, cors);
  }
};

// -- imgbb upload helper --------------------------------------
async function uploadToImgbb(base64, apiKey) {
  try {
    const form = new FormData();
    form.append('image', base64);
    const res  = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST', body: form,
    });
    const data = await res.json();
    return data.success ? data.data.url : null;
  } catch {
    return null;
  }
}

// -- response helper ------------------------------------------
function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

// tell netlify this is an edge function on the /blip path
export const config = { path: '/blip' };

# 📬 blipbox

a personal message + drawing page. submissions go through a
netlify function so your tokens are never in the browser.

---

## file map

```
blipbox/
├── index.html                  ← public page
├── inbox-YOURSLUG.html         ← your private inbox (rename!)
├── netlify.toml                ← netlify config (don't touch)
├── netlify/functions/
│   └── blip.js                 ← server function (don't touch)
├── config/
│   └── socials.js              ★ YOUR INFO — edit this
├── css/
│   └── theme.css               ★ colors, fonts, UI
├── js/
│   ├── canvas.js               → drawing engine
│   └── submit.js               → sends blip to function
└── README.md
```

---

## setup (in order)

### 1 — get your tokens + keys

**github write token** (goes in netlify, never the browser):
- github → settings → developer settings → fine-grained tokens
- new token → repo: blipbox only → Issues: **Read & Write**

**github read token** (goes in socials.js — safe, read-only):
- same place → new token → Issues: **Read only**

**imgbb key** (free image hosting for drawings):
- imgbb.com → sign up → account → API → copy key

---

### 2 — fill in `config/socials.js`

```js
github: {
  owner: 'Ryth1m',
  repo:  'blipbox',
  token: 'YOUR_READ_ONLY_TOKEN',  // read only — safe here
},
inboxSlug: 'pick-something-secret',  // e.g. 'fox-blaze-77'
links: {
  kofi: 'https://ko-fi.com/YOUR_KOFI',
}
```

---

### 3 — rename the inbox file

rename `inbox-YOURSLUG.html` → `inbox-fox-blaze-77.html`
(or whatever your slug is)

---

### 4 — deploy to netlify (drag & drop!)

1. go to **netlify.com** → sign up free
2. click **Add new site** → **Deploy manually**
3. drag your entire `blipbox` folder onto the page
4. wait ~10 seconds → your site is live! 🎉

---

### 5 — add environment variables

in netlify: **site → site configuration → environment variables → add variable**

add these 4:

| key | value |
|---|---|
| `GITHUB_TOKEN` | your write token from step 1 |
| `GITHUB_OWNER` | your github username |
| `GITHUB_REPO`  | `blipbox` |
| `IMGBB_KEY`    | your imgbb key |

then: **Deploys → trigger deploy → deploy site** (so it picks up the new vars)

---

## your URLs

| | URL |
|---|---|
| public page | `https://YOUR-SITE.netlify.app/` |
| your inbox  | `https://YOUR-SITE.netlify.app/inbox-YOURSLUG.html` |

you can also set a custom domain in netlify for free.

---

## what to customise

| want to change | file |
|---|---|
| links, chips, text | `config/socials.js` |
| colors, fonts | `css/theme.css` |
| drawing tools | `js/canvas.js` |
| issue format | `netlify/functions/blip.js` → issueBody |


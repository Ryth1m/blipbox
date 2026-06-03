# 📬 blipbox

a personal page where anyone can message you and draw for you.
submissions go through a Cloudflare Worker so your tokens
are never exposed in the browser.

---

## file map

```
blipbox/
├── index.html               ← public page (what visitors see)
├── inbox-YOURSLUG.html      ← your private inbox (rename this!)
├── worker.js                ← deploy this to Cloudflare Workers
├── config/
│   └── socials.js           ★ your info, worker URL, links
├── css/
│   └── theme.css            ★ colors, fonts, spacing
├── js/
│   ├── canvas.js            → drawing engine
│   └── submit.js            → sends blip to worker
└── README.md
```

---

## full setup (in order)

### step 1 — deploy the Cloudflare Worker

1. go to **dash.cloudflare.com** → sign up free if needed
2. Workers & Pages → **Create** → **Create Worker**
3. click **Edit code**, paste the entire contents of `worker.js`, click **Deploy**
4. copy the worker URL — looks like `https://blipbox.YOUR-NAME.workers.dev`
5. go to your worker → **Settings** → **Variables** → add these as **Secrets**:

   | name | value |
   |---|---|
   | `GITHUB_TOKEN` | your fine-grained PAT (Issues: **Read & Write**) |
   | `GITHUB_OWNER` | your github username e.g. `Ryth1m` |
   | `GITHUB_REPO`  | `blipbox` |
   | `IMGBB_KEY`    | your imgbb API key (imgbb.com → account → API) |

---

### step 2 — get a read-only token for the inbox

the inbox page needs to READ issues. make a second token:
- github → settings → developer settings → fine-grained tokens
- permissions: Issues → **Read only**
- this one is safe to put in socials.js (read-only = no damage if seen)

---

### step 3 — fill in `config/socials.js`

```js
workerUrl:  'https://blipbox.YOUR-NAME.workers.dev',  // from step 1
inboxSlug:  'mango-fox-99',                           // make up something secret

github: {
  owner: 'Ryth1m',
  repo:  'blipbox',
  token: 'YOUR_READ_ONLY_PAT',   // from step 2
},

links: {
  kofi: 'https://ko-fi.com/YOUR_KOFI',
  ...
}
```

---

### step 4 — rename the inbox file

rename `inbox-YOURSLUG.html` to match your slug:
e.g. `inbox-mango-fox-99.html`

the filename is your "password" — don't share it.

---

### step 5 — push to github + enable pages

```
git add .
git commit -m "blipbox"
git push
```

repo → settings → pages → source: main branch → / root → save

---

## your URLs

| page | URL |
|---|---|
| public page | `https://YOU.github.io/blipbox/` |
| your inbox  | `https://YOU.github.io/blipbox/inbox-YOURSLUG.html` |

bookmark the inbox. don't share it.

---

## what can I customise?

| want to change...         | go to                          |
|---------------------------|--------------------------------|
| worker URL, links, chips  | `config/socials.js`            |
| colors / fonts            | `css/theme.css` → COLORS/FONTS |
| blob shapes, dot grid     | `css/theme.css` → BACKGROUND   |
| drawing tool behaviour    | `js/canvas.js`                 |
| issue format / labels     | `worker.js` → buildBody()      |


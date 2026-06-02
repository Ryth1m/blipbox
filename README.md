# 📬 blipbox

a personal page where anyone can message you and draw for you.
only you see the messages — they land in your github issues.

---

## file map

```
blipbox/
├── index.html          ← page structure, imports everything
├── config/
│   └── socials.js      ★ YOUR INFO — edit this first
├── css/
│   └── theme.css       ★ COLORS + FONTS + UI — edit to restyle
├── js/
│   ├── canvas.js       → drawing engine (don't need to touch)
│   └── submit.js       → github issues posting (don't need to touch)
└── README.md           ← you're here
```

---

## setup (5 steps)

### 1. create a github repo
name it `blipbox` (or anything). can be **private** — recommended.

### 2. get a fine-grained token
github → settings → developer settings → fine-grained tokens → generate new token
- repository access: **only this repo**
- permissions: **issues → read & write** — everything else: no access
- copy the token

### 3. fill in `config/socials.js`
open it and fill in:
```js
github: {
  owner: 'your-github-username',
  repo:  'blipbox',
  token: 'github_pat_...',
},
links: {
  kofi: 'https://ko-fi.com/your-kofi',
  ...
}
```

### 4. push to github
```
git init
git add .
git commit -m "blipbox"
git remote add origin https://github.com/YOU/blipbox.git
git push -u origin main
```

### 5. enable github pages
repo → settings → pages → source: **deploy from branch** → main → / (root) → save

your page will be live at `https://YOU.github.io/blipbox`

---

## what can i customise?

| want to change...             | go to                  |
|-------------------------------|------------------------|
| your links, ko-fi, chips      | `config/socials.js`    |
| headline / subtitle text      | `config/socials.js`    |
| colors (accent, bg, etc)      | `css/theme.css` → COLORS section |
| fonts                         | `css/theme.css` → FONTS section  |
| blob shapes / dot grid        | `css/theme.css` → BACKGROUND BLOBS |
| canvas height                 | `css/theme.css` → `.drawing-canvas` height |
| page max width                | `css/theme.css` → `.page` max-width |
| drawing tools behaviour       | `js/canvas.js`         |
| how issues are formatted      | `js/submit.js` → buildBody() |

---

## security note
the github token is visible in the page source. since it only has
**issues write** access, the worst a bad actor can do is spam your
issues (you can just rotate the token). for a personal page this
is totally fine. if you want extra safety, put a cloudflare worker
in front as a proxy.

---

made with blip ✌

# 📬 blipbox

a personal page where anyone can message you and draw for you.
only you see the messages — they land in your github issues,
and you can read them in a private web inbox.

---

## file map

```
blipbox/
├── index.html               ← public page (what visitors see)
├── inbox-YOURSLUG.html      ← YOUR private inbox (rename this!)
├── config/
│   └── socials.js           ★ YOUR INFO — edit this first
├── css/
│   └── theme.css            ★ COLORS + FONTS + UI
├── js/
│   ├── canvas.js            → drawing engine
│   └── submit.js            → uploads drawing + posts to github
└── README.md
```

---

## setup

### 1. get a github token
github → settings → developer settings → fine-grained tokens → generate
- repo: only this repo
- permissions: **Issues → Read & Write**

### 2. get an imgbb API key (free, for drawings)
imgbb.com → sign up → account → API → copy key

### 3. fill in `config/socials.js`
- paste your github token
- paste your imgbb API key
- set your `inboxSlug` to something secret (e.g. `mango-purple-77`)

### 4. rename the inbox file
rename `inbox-YOURSLUG.html` to `inbox-mango-purple-77.html`
(whatever your slug is — this IS the "password")

### 5. push to github + enable pages
repo → settings → pages → main branch → / root

---

## your inbox URL
`https://YOU.github.io/blipbox/inbox-YOURSLUG.html`

bookmark it. don't share it.

---

## what can I customise?

| want to change...         | go to                           |
|---------------------------|---------------------------------|
| links, ko-fi, chips, text | `config/socials.js`             |
| colors / fonts            | `css/theme.css` → COLORS/FONTS  |
| blob shapes, dot grid     | `css/theme.css` → BACKGROUND    |
| drawing tool behaviour    | `js/canvas.js`                  |
| issue format              | `js/submit.js` → buildBody()    |

---

## security note
the github token is visible in page source — that's fine since
it only has Issues Read/Write. the inbox is protected only by
the secret filename (security through obscurity). good enough
for a personal page. rotate the token if anything feels off.

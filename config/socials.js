// ============================================================
//  config/socials.js
//  ► YOUR INFO LIVES HERE — only file you need to edit.
// ============================================================

const BLIPBOX_CONFIG = {

  // -- cloudflare worker URL --------------------------------
  // paste your worker URL here after deploying worker.js
  // looks like: https://blipbox.YOUR-NAME.workers.dev
  workerUrl: 'https://YOUR-WORKER.workers.dev',

  // -- github (used ONLY by the inbox page to READ issues) --
  // this token only needs Issues → Read access (not write)
  // write access lives safely in the worker's secret variables
  github: {
    owner: 'YOUR_GITHUB_USERNAME',
    repo:  'blipbox',
    token: 'YOUR_READ_ONLY_PAT',   // Issues: Read only — safe to expose
  },

  // -- inbox secret slug ------------------------------------
  // rename inbox-YOURSLUG.html to match this
  // e.g. 'mango-fox-99'  →  inbox-mango-fox-99.html
  inboxSlug: 'change-this-to-something-secret',

  // -- your links -------------------------------------------
  links: {
    kofi:    'https://ko-fi.com/YOUR_KOFI',
    youtube: '',   // '' to hide
    roblox:  '',   // '' to hide
    github:  '',   // '' to hide
  },

  // -- chips ------------------------------------------------
  chips: [
    { icon: '🧱', label: 'roblox modeller', link: '' },
    { icon: '🎮', label: 'game dev',        link: '' },
    { icon: '📺', label: 'youtuber',        link: '' },
    { icon: '✍️', label: 'writer',          link: '' },
    { icon: '🤓', label: 'just a creator',  link: '' },
  ],

  // -- page text --------------------------------------------
  text: {
    headline_line1: 'hey! drop',
    headline_line2: 'me a blip.',
    subtitle: `i'm a creator & dev. i build stuff in Roblox, make games,\nwrite stories, and post random things. this page is yours —\nask anything, say hi, or just draw something. 🎨`,
    placeholder: `ask me about anything really...`,
    kofi_label: '☕ support me on ko-fi',
  },

};

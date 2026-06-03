// ============================================================
//  config/socials.js
//  ► YOUR INFO LIVES HERE — the only file you need to edit.
// ============================================================

const BLIPBOX_CONFIG = {

  // -- function URL -----------------------------------------
  // after deploying to netlify this is always just '/blip'
  // (netlify routes it automatically — don't change this)
  functionUrl: '/blip',

  // -- github (READ ONLY — for the inbox page) --------------
  // go to github → settings → developer settings →
  // fine-grained tokens → new token
  // permissions: Issues → Read only
  // this is safe to have here since it can only read, not write
  github: {
    owner: 'Ryth1m',   // e.g. 'Ryth1m'
    repo:  'blipbox',
    token: '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',
  },

  // -- inbox secret slug ------------------------------------
  // your inbox lives at: yoursite.netlify.app/inbox-SLUG.html
  // rename inbox-YOURSLUG.html to match — this is your "password"
  inboxSlug: 'Gaylover16',

  // -- your links -------------------------------------------
  links: {
    kofi:    'https://ko-fi.com/ryth1ms',
    youtube: '',   // '' to hide
    roblox:  '',   // '' to hide
    github:  '',   // '' to hide
  },

  // -- chips ------------------------------------------------
  chips: [
    { icon: '🧱', label: 'roblox modeller', link: '' },
    { icon: '🎮', label: 'game dev',        link: '' },
    { icon: '🔞', label: '19',        link: '' },
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

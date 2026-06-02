// ============================================================
//  config/socials.js
//  ► YOUR INFO LIVES HERE — edit this file to personalise
//    blipbox. nothing else needs to change for basic setup.
// ============================================================

const BLIPBOX_CONFIG = {

  // -- github (for receiving + reading messages) ------------
  github: {
    owner: 'Ryth1m',   // e.g. 'Ryth1m'
    repo:  'blipbox',
    token: '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', // regenerate at github.com → Settings → Developer Settings
                                         // permissions needed: Issues → Read & Write
  },

  // -- imgbb (for drawing uploads so they show in issues) ---
  // free at imgbb.com → Account → API
  imgbb: {
    apiKey: 'ca80da132948cdca0fc24391fc35f26e',
  },

  // -- inbox secret URL slug --------------------------------
  // your inbox will live at: yourusername.github.io/blipbox/inbox-YOURSLUG.html
  // change this to something only you know — no spaces
  inboxSlug: 'sauce',

  // -- your links -------------------------------------------
  links: {
    kofi:    'https://ko-fi.com/ryth1ms',
    youtube: '',   // leave '' to hide
    roblox:  'https://www.roblox.com/users/525456810/profile',   // leave '' to hide
    github:  '',   // leave '' to hide
  },

  // -- chips shown on the public page -----------------------
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
    subtitle: `i'm Gaylover16. i build stuff in Roblox, make games,\nwrite stories, and post random things. this page is yours —\nask anything, say hi, or just draw something. 🎨`,
    placeholder: `ask me about anything really...`,
    kofi_label: '☕ support me on ko-fi',
  },

};

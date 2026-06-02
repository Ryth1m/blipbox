// ============================================================
//  config/socials.js
//  ► YOUR INFO LIVES HERE — edit this file to personalise
//    blipbox. nothing else needs to change for basic setup.
// ============================================================

const BLIPBOX_CONFIG = {

  // -- github (for receiving messages as issues) -------------
  github: {
    owner: 'YOUR_GITHUB_USERNAME',    // e.g. 'Ryth1m'
    repo:  'blipbox',                 // the repo you created
    token: 'YOUR_FINE_GRAINED_PAT',  // github fine-grained token
                                      // needs: Issues → Write only
  },

  // -- your links -------------------------------------------
  links: {
    kofi:     'https://ko-fi.com/YOUR_KOFI',        // support link
    youtube:  'https://youtube.com/@YOUR_CHANNEL',  // or '' to hide
    roblox:   'https://www.roblox.com/users/YOUR_ID/profile', // or '' to hide
    github:   'https://github.com/YOUR_GITHUB_USERNAME',      // or '' to hide
  },

  // -- chips shown on the page ------------------------------
  // each chip: { icon, label, link (optional) }
  // set link: '' to make it non-clickable
  chips: [
    { icon: '🧱', label: 'roblox modeller',  link: '' },
    { icon: '🎮', label: 'game dev',         link: '' },
    { icon: '📺', label: 'youtuber',         link: '' },
    { icon: '✍️', label: 'writer',           link: '' },
    { icon: '🤓', label: 'just a creator',   link: '' },
  ],

  // -- page text --------------------------------------------
  text: {
    headline_line1: 'hey! drop',    // first line of big headline
    headline_line2: 'me a blip.',   // second line
    subtitle: `i'm a creator & dev. i build stuff in Roblox, make games,
write stories, and post minecraft things. this page is yours —
ask anything, say hi, or just draw something weird. 🎨`,
    placeholder: `ask me about my roblox models, say something cool, ask anything really...`,
    kofi_label: '☕ support me on ko-fi',
  },

};

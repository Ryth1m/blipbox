// ============================================================
//  config/socials.js
//  ► YOUR INFO LIVES HERE — edit this file to personalise
//    blipbox. nothing else needs to change for basic setup.
// ============================================================

const BLIPBOX_CONFIG = {

  // -- github (for receiving messages as issues) -------------
  github: {
    owner: 'Ryth1m',    // e.g. 'Ryth1m'
    repo:  'blipbox',                 // the repo you created
    token: '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',  // github fine-grained token
                                      // needs: Issues → Write only
  },

  // -- your links -------------------------------------------
  links: {
    kofi:     'https://ko-fi.com/ryth1ms',        // support link
    youtube:  '',  // or '' to hide
    roblox:   'https://www.roblox.com/users/525456810/profile', // or '' to hide
    github:   'https://github.com/Ryth1m',      // or '' to hide
  },

  // -- chips shown on the page ------------------------------
  // each chip: { icon, label, link (optional) }
  // set link: '' to make it non-clickable
  chips: [
    { icon: '🧱', label: 'roblox modeller',  link: '' },
    { icon: '🎮', label: 'game dev',         link: '' },
    { icon: '📺', label: '19',         link: '' },
    { icon: '✍️', label: 'writer',           link: '' },
    { icon: '🤓', label: 'IT programmer',   link: '' },
  ],

  // -- page text --------------------------------------------
  text: {
    headline_line1: 'hey! drop',    // first line of big headline
    headline_line2: 'me a blip.',   // second line
    subtitle: `i'm Gaylover16. i build stuff in Roblox, make games,
write stories, and post random things. this page is yours - 
ask anything, say hi, or just draw something. `,
    placeholder: `ask me about anything really...`,
    kofi_label: '☕ support me on ko-fi',
  },

};

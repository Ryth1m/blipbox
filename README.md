# 📬 blipbox — setup (3 steps, that's it)

## file map
```
blipbox/
├── index.html            ← the whole page, ready to go
├── config/socials.js     ★ fill in your keys here
├── css/theme.css         → colors/fonts (optional to edit)
└── EMAILJS_TEMPLATE.txt  → copy this into emailjs
```

---

## step 1 — emailjs.com (free)
1. sign up at emailjs.com
2. Add New Service → connect Gmail (or any email)
3. Email Templates → Create New → copy content from `EMAILJS_TEMPLATE.txt`
   - make sure to use exactly: `{{message}}` `{{drawing}}` `{{sent_at}}`
4. Account → copy your **Public Key**
5. paste Service ID, Template ID, Public Key into `config/socials.js`

## step 2 — imgbb.com (free, for drawings)
1. sign up at imgbb.com
2. Account → API → copy your key
3. paste into `config/socials.js`

## step 3 — deploy (drag & drop)
- **Netlify**: drag the blipbox folder onto netlify.com → done
- **GitHub Pages**: push to a repo → enable pages → done
- or just open index.html locally to test first!

---
that's it. when someone sends a blip you get an email. 🎉

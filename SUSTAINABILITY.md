# 🌱 Sustainability: what keeps this hub running

> The full, current version, covering this hub, the AstroLog and the desks together, is a page:
> **[psychedelicsinrecovery.github.io/changelog-astro-public/sustainability](https://psychedelicsinrecovery.github.io/changelog-astro-public/sustainability)**.
> This file lists what applies to **this repository**, so it's here even when you're reading the code.

Nothing here costs money. What it takes is a few things that quietly expire or drift, written down
so none of it depends on anyone's memory.

## 🏠 What this repository is

`psychedelicsinrecovery.github.io` is PIR®'s hub on GitHub (`/`, `/donate/`, `/map/`, the 404) and the
home of the **arrival kit** every PIR® page on GitHub loads: `arrival/arrival.js` + `arrival/arrival.css`
(the kit), `arrival/org.js` + `arrival/org.css` (PIR's own settings and look) and `starfield.js` (the
night sky behind every page). The AstroLog and the desk portals load those files from here by full URL.
The page design itself (`alex.css`, `alex.js`) is served by A.L.E.X.'s public site, `alex-desk-public`.

## 🧰 What needs looking after

| What | Why it matters | What to do |
| --- | --- | --- |
| 🪞 **The hourly README mirror** (`.github/workflows/mirror-profile-readme.yml`) | Copies the organization profile (`psychedelicsinrecovery/.github` → `profile/README.md`) into this repo's `README.md` every hour. In a public repository, GitHub switches off scheduled workflows after 60 days without activity. | If the README stops following the profile, open **Actions → Mirror org profile README** and re-enable or run it. Edit the profile, never this `README.md`. |
| 🧰 **The arrival kit is vendored** | `arrival.js` and `arrival.css` are copies. The canonical copy lives in `drasticstatic/my-template` (`changelog-template/arrival/`), and every org keeps its own copy so one org's change can't break another's. | To upgrade, copy both files from the template unchanged, read the porting notes in its README, and push this repo **before** the AstroLog and the desks. |
| 🚦 **Deploy order** | The AstroLog and the desk portals load the kit from this site. A new `org.js` key they rely on must be live here first. | Push here, wait a minute for Pages, then push the AstroLog, then rebuild the desks. |
| 🎨 **Three stylesheets share one header** | `alex.css` (the design system) and the AstroLog's `astrolog.css` both style `.top nav a`, written for the old row of links. `arrival/org.css` undoes those rules inside the kit's navbar. | If the header looks off after a design-system change, check the "PIR's header" block in `arrival/org.css` first. |
| 🖼️ **Share images** (`social-card.jpg`, and the cards the AstroLog builds for `/donate/` and `/map/`) | Discord, WhatsApp, iMessage, Telegram and LinkedIn keep their own copy of a link's preview. No card carries a count, so none goes stale. | After changing a share image, refresh the cached previews (see `psychedelicsinrecovery/.github` → `SOCIAL-PREVIEWS.md`; for Telegram, send each link to @WebpageBot). |
| 🙏 **The contribution ledger** (`donate/contributors.json`) | It names people. | Add someone only after they've said yes. First name and last initial (no period), in keeping with PIR's anonymity traditions; never an email or an amount. |
| 💜 **The giving link** | `/donate/` links to PIR's own 7th Tradition page (`psychedelicsinrecovery.org/7th-tradition/`), the same page the org's `FUNDING.yml` names. | If PIR changes how it takes donations, update `donate.give` in `arrival/org.js` and `FUNDING.yml` together. |
| 📝 **The giving disclaimer is a placeholder** | PIR can't accept outside contributions under its traditions, but can accept donations; the real wording is being written with the privacy policy, the shop, books and merch. | Replace `donate.disclaimer` in `arrival/org.js` (and drop `placeholder: true`) when the wording is approved. |
| 👛 **Wallet giving, later** | The crypto slot on `/donate/` is empty on purpose. A wallet-connect module (Reown AppKit, with Web3Auth for email sign-in) will fill it. | Its project allowlist must include `https://psychedelicsinrecovery.github.io`, or the button won't load here. Never put a wallet address in `org.js`. |
| 🔗 **Links that leave GitHub** | The nav, the contact and community windows and the map point at psychedelicsinrecovery.org, the service site, CONTACTS.md, Discord and WhatsApp. | If one of those addresses changes, update `arrival/org.js` (one place) and the AstroLog's `src/data/map.ts`. |
| 💬 **Committee channels** | The community window names LitCom's Discord channel (`#🖨lit-com`, from its service page) and keeps labelled placeholders for the others. | When TechCom, PR or the Board publish a channel name, add it to `community.platforms` in `arrival/org.js`. |

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-13.*

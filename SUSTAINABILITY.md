# 🌱 Sustainability: what keeps this hub running

> The full, current version, covering this hub, the AstroLog and the desks together, is a page:
> **[psychedelicsinrecovery.github.io/changelog-astro-public/sustainability](https://psychedelicsinrecovery.github.io/changelog-astro-public/sustainability)**.
> This file lists what applies to **this repository**, so it's here even when you're reading the code.

Nothing here costs money. What it takes is a few things that quietly expire or drift, written down
so none of it depends on anyone's memory.

## 🏠 What this repository is

`psychedelicsinrecovery.github.io` is PIR®'s hub on GitHub (`/`, `/donate/`, `/map/`, the 404) and the
home of the **arrival kit** every PIR® page on GitHub loads: `arrival/arrival.js` + `arrival/arrival.css`
(the kit, 1.4.0, with `give/give.js` and `pledge/pledge.js`), `arrival/org.js` + `arrival/org.css`
(PIR's own settings and look) and `starfield.js` (the night sky behind every page). It also serves the
[gratitude pledge](https://psychedelicsinrecovery.github.io/pledge/) (`/pledge/`). The AstroLog and the desk portals load those files from here by full URL.
The page design itself (`alex.css`, `alex.js`) is served by A.L.E.X.'s public site, `alex-desk-public`.

## 🧰 What needs looking after

| What | Why it matters | What to do |
| --- | --- | --- |
| 🪞 **The hourly README mirror** (`.github/workflows/mirror-profile-readme.yml`) | Copies the organization profile (`psychedelicsinrecovery/.github` → `profile/README.md`) into this repo's `README.md` every hour. In a public repository, GitHub switches off scheduled workflows after 60 days without activity. | If the README stops following the profile, open **Actions → Mirror org profile README** and re-enable or run it. Edit the profile, never this `README.md`. |
| 🧰 **The arrival kit is vendored** | `arrival.js`, `arrival.css`, `give/give.js` and `pledge/pledge.js` are copies of kit 1.4.0, **unchanged**. The canonical copy lives in `drasticstatic/my-template` (`changelog-template/arrival/`), and every org keeps its own copy so one org's change can't break another's. PIR ran a local fork ("1.3.1") until 2026-10-22; what it added (the Foyers groups, the GSR Desk, BoardDesk's front door) is config in `org.js` now, and `concierge.js` and `more-tree.css` are gone. | To upgrade, copy all four from the template unchanged (`cmp` them first: a mismatch is a fork, not a stale copy), read the porting notes in its README, and push this repo **before** the AstroLog and the desks. Change PIR's look in `org.css`, never in the kit files. |
| 🚦 **Deploy order** | The AstroLog and the desk portals load the kit from this site. A new `org.js` key they rely on must be live here first. | Push here, wait a minute for Pages, then push the AstroLog, then rebuild the desks. |
| 🎨 **Three stylesheets share one header** | `alex.css` (the design system) and the AstroLog's `astrolog.css` both style `.top nav a`, written for the old row of links. `arrival/org.css` undoes those rules inside the kit's navbar. | If the header looks off after a design-system change, check the "PIR's header" block in `arrival/org.css` first. |
| 🖼️ **Share images** (`social-card.jpg`, and the cards the AstroLog builds for `/donate/` and `/map/`) | Discord, WhatsApp, iMessage, Telegram and LinkedIn keep their own copy of a link's preview. No card carries a count, so none goes stale. | After changing a share image, refresh the cached previews (see `psychedelicsinrecovery/.github` → `SOCIAL-PREVIEWS.md`; for Telegram, send each link to @WebpageBot). |
| 🙏 **The contribution ledger** (`donate/contributors.json`) | It names people. | Add someone only after they've said yes. First name and last initial (no period), in keeping with PIR's anonymity traditions; never an email or an amount. |
| 💜 **The giving link** | `/donate/` links to PIR's own 7th Tradition page (`psychedelicsinrecovery.org/7th-tradition/`), the same page the org's `FUNDING.yml` names. | If PIR changes how it takes donations, update `donate.give` in `arrival/org.js` and `FUNDING.yml` together. |
| 📝 **The giving disclaimer is a placeholder** | PIR can't accept outside contributions under its traditions, but can accept donations; the real wording is being written with the privacy policy, the shop, books and merch. | Replace `donate.disclaimer` in `arrival/org.js` (and drop `placeholder: true`) when the wording is approved. |
| 👛 **Wallet giving: off** (kit v1.3) | PIR's `/donate/` keeps an empty crypto slot on purpose: `give: { enabled: false }` in `arrival/org.js`, because PIR can't accept outside contributions under its traditions. | If PIR ever switches it on (with the A.L.E.X. session's wording), check the Reown allowlist (below). Never put a wallet address in `org.js`. |
| 🤲 **The gratitude pledge** (kit v1.4, `/pledge/`) | A thank-you signed with a wallet: no money, nothing sent, nothing recorded, no counts. Its wording (`pledge` in `arrival/org.js`) is a first draft. It connects wallets through the shared Reown project (`pledge.reownProjectId`). | Change the words in `org.js` only with the trusted servants' agreement. If Connect shows "isn't switched on", check the allowlist (below). |
| 🧾 **Receipts and taxes** (kit v1.4, on `/donate/`) | States PIR's status in PIR's own published words ("Registered 501(c)(3) Organization, EIN 92-1548474", from the footer of psychedelicsinrecovery.org). It doesn't say gifts are deductible, because PIR's materials don't. | If the main site's footer or the by-laws change, update `donate.tax` in `org.js`. |
| 🔗 **Links that leave GitHub** | The nav, the contact and community windows and the map point at psychedelicsinrecovery.org, the service site, CONTACTS.md, Discord and WhatsApp. | If one of those addresses changes, update `arrival/org.js` (one place) and the AstroLog's `src/data/map.ts`. |
| 💬 **Committee channels** | The community window names LitCom's Discord channel (`#🖨lit-com`, from its service page) and keeps labelled placeholders for the others. | When TechCom, PR or the Board publish a channel name, add it to `community.platforms` in `arrival/org.js`. |

## 🔌 Wallet connect (the Reown project)

The pledge (and giving with crypto, if PIR ever switches it on) connects wallets through **one shared
Reown project: `00b6a1cd528ff580f1fd845ed08b0187`**, made for the O-R-G dApp and held in Christopher W's
Reown account, shared by every org's pages. Its allowlist includes `https://psychedelicsinrecovery.github.io`.
If that project is deleted, suspended or runs past its free-plan limit, wallet connect stops on every
site at once (the page says so calmly; nothing else breaks). *What to do:* PIR can have its own project
with a **one-line `org.js` change**: create a free project at dashboard.reown.com under an account PIR
controls, add `https://psychedelicsinrecovery.github.io` to its allowlist, and set
`pledge.reownProjectId` (and `give.reownProjectId`, if giving is ever switched on) in `arrival/org.js`.

## 🤝 Stewardship and succession

**Today, one person holds most of the keys.** drasticstatic (Christopher W) owns and administers PIR®'s
GitHub organization, holds the personal access tokens that publish PIR's pages (`PUBLIC_REPO_TOKEN` on
each private repository that feeds a public one), and the Reown account above. That's a single point of
failure: if he stepped away, the tokens would expire on schedule and the pages would quietly stop
updating, with nobody else able to renew them. The plan, so these pages outlive any one person (details
and progress on the AstroLog's [sustainability](https://psychedelicsinrecovery.github.io/changelog-astro-public/sustainability)
and [roadmap](https://psychedelicsinrecovery.github.io/changelog-astro-public/roadmap) pages):

1. **At least two owners** of the GitHub organization, from PIR's own trusted servants, with two-factor sign-in.
2. **Org-owned automation instead of personal tokens:** a GitHub App installed on the organization, or an org bot account.
3. **A token register:** every token and secret, what it does, who owns it, its scopes and its expiry date (never the values).
4. **A renewal runbook**, with a reminder a month before each expiry.
5. **Hand-over steps**: adding an owner, transferring repositories and domains, and the Reown project.
6. **Exports and backups** of the repositories, and of anything outside GitHub, on a schedule.

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-22.*

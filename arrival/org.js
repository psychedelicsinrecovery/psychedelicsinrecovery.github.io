/* PIR®'s arrival config, read by arrival.js. Shared by every PIR page that loads the kit: the GitHub
   hub (this site) and the AstroLog (by full URL).

   Every fact here comes from PIR's own materials: the hub and AstroLog, psychedelicsinrecovery.org,
   the public CONTACTS.md in psychedelicsinrecovery/.github, and A.L.E.X.'s portal. People appear by
   first name and last initial, in keeping with PIR's anonymity traditions. Anything not published
   yet is marked as a placeholder rather than guessed. Strings shown in the welcome guide may hold
   simple HTML. */
(function () {
  var ROOT = "https://psychedelicsinrecovery.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var ALEX = ROOT + "/alex-desk-public";
  var SITE = "https://www.psychedelicsinrecovery.org";
  var DISCORD = "https://discord.gg/MyprTq8w95"; // the invite the hub, AstroLog and A.L.E.X. all use
  var CRISIS = SITE + "/crisis-resources/";
  // The night sky's colors, from violet round through cyan and gold to rose. They light the guide's
  // star (eight steps, eight points) and ring the initials avatars.
  var SKY = ["#b48cff", "#8d7cff", "#6fe3ff", "#5ee6c4", "#a6e08a", "#f3c76b", "#ffa77d", "#ff8fb1"];
  var KEY = "pir-arrival";
  var THEME_KEY = "pir-theme"; // A.L.E.X. and the desk portals read this: "dark" or "light"

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {
      return null;
    }
  }

  // The desk portals still use the A.L.E.X. design system's own light/dark key. If someone flipped
  // it there since their last visit here, carry that over before the kit reads its choices.
  (function () {
    var raw = store(KEY);
    var t = store(THEME_KEY);
    if (!raw || (t !== "light" && t !== "dark")) return;
    try {
      var s = JSON.parse(raw);
      if (s && (s.light === "light" || s.light === "dark") && s.light !== t) {
        s.light = t;
        store(KEY, JSON.stringify(s));
      }
    } catch (e) {}
  })();

  // And the other way: a light chosen here reaches the desk portals too.
  window.addEventListener("arrival:change", function (e) {
    var d = e.detail || {};
    if (d.theme === "light" || d.theme === "dark") store(THEME_KEY, d.theme);
  });

  // alex.js (the shared A.L.E.X. design system) brings its own "/" palette. On pages with the kit,
  // the kit's search replaces it: once the kit has handled "/" or Ctrl/⌘ K on the document, the key
  // stops there and never reaches alex.js's listener on window. Registered after DOMContentLoaded so
  // it runs after the kit's own listener.
  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (e) {
      var k = e.key;
      if (e.defaultPrevented && (k === "/" || ((k === "k" || k === "K") && (e.metaKey || e.ctrlKey)))) e.stopPropagation();
    });
  });

  // Copy one of A.L.E.X.'s Discord commands, with the design system's own toast when it's there.
  function copyCommand(cmd) {
    return function () {
      var say = function (msg) {
        var t = document.querySelector(".toast");
        if (!t) return;
        t.textContent = msg;
        t.classList.add("show");
        setTimeout(function () { t.classList.remove("show"); }, 1800);
      };
      try {
        navigator.clipboard.writeText(cmd).then(
          function () { say("Copied " + cmd + ". Paste it in PIR's Discord"); },
          function () { say(cmd); }
        );
      } catch (e) {
        say(cmd);
      }
    };
  }

  // Initials avatar: a small night sky with the person's initials, ringed in two of the sky's colors,
  // and one four-point star.
  function avatarSvg(ini, c1, c2) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>' +
      '<linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
      '<radialGradient id="n" cx=".34" cy=".28" r=".95"><stop offset="0" stop-color="#2b2156"/><stop offset=".6" stop-color="#141028"/><stop offset="1" stop-color="#06050e"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="50" fill="url(#r)"/><circle cx="50" cy="50" r="45.5" fill="url(#n)"/>' +
      '<circle cx="24" cy="30" r="1.3" fill="#f1edfb" opacity=".55"/><circle cx="30" cy="76" r="1" fill="#f1edfb" opacity=".45"/><circle cx="73" cy="73" r="1.2" fill="#f1edfb" opacity=".5"/>' +
      '<path d="M76 13 L79.2 22.8 L89 26 L79.2 29.2 L76 39 L72.8 29.2 L63 26 L72.8 22.8 Z" fill="' + c1 + '"/>' +
      '<path d="M76 20 L77.4 24.6 L82 26 L77.4 27.4 L76 32 L74.6 27.4 L70 26 L74.6 24.6 Z" fill="#fff" opacity=".9"/>' +
      '<text x="50" y="52" dy=".35em" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="' + (ini.length > 1 ? 36 : 44) +
      '" font-weight="700" fill="#f1edfb">' + ini.replace(/[<&]/g, "") + "</text></svg>"
    );
  }

  window.ARRIVAL = {
    org: {
      short: "PIR®",
      name: "Psychedelics In Recovery™",
      motto: "A safe, sacred space to integrate your journey.",
      about:
        "Psychedelics In Recovery™ is a 12-step fellowship of people from all 12-step programs and other paths of recovery, and a 501(&zwnj;c)(3) nonprofit. Our primary purpose is to pursue recovery and help others do the same, as defined by the individual.",
      mark: { src: ROOT + "/favicon.svg" },
      home: {
        label: "psychedelicsinrecovery.org",
        href: SITE,
        text: "PIR's main site: meetings online and in person, the fellowship's history and lineages, safety and ethics, the 2026 convention, ways into service, and crisis resources.",
      },
      welcomeNote: null,
      welcomePlaceholder:
        "A few words of welcome from PIR's founder, Kevin F, belong here. This space is left empty on purpose until he writes them.",
    },

    // The kit keeps its choices under its own key. The light/dark choice made before the kit
    // ("pir-theme", still used by A.L.E.X. and the desk portals) carries over on a first visit.
    storage: { key: KEY, legacy: { light: THEME_KEY } },

    // The ids stay "dark" and "light" because the A.L.E.X. design system (alex.css) is keyed on them.
    modes: [
      { id: "dark", name: "Night sky", note: "Deep indigo, starlight, and violet, cyan and gold. PIR's home look.", swatch: ["#06050e", "#b48cff"], dark: true },
      { id: "light", name: "Daybreak", note: "Lavender morning light with ink-dark text, for bright rooms.", swatch: ["#f7f4fd", "#6b3fd1"], calm: true },
      {
        id: "sky",
        name: "Follow the sky",
        note: "Daybreak from seven in the morning, night sky from seven at night.",
        shows: ["light", "dark"],
        // Daybreak lavender rising into violet, then down into the night sky.
        ink: "linear-gradient(90deg, #efe9fa 0%, #c9b3ff 28%, #8d5cf0 52%, #2b2156 76%, #06050e 100%)",
        follows: function (d) {
          var h = d.getHours();
          return h >= 7 && h < 19 ? "light" : "dark";
        },
      },
    ],
    defaultMode: "dark",

    // Reading mode: one tap for the calmest page (Daybreak, the stars still, more contrast, no
    // cursor effects); another tap goes back to how the visitor had it.
    reading: { light: "light" },

    // "What's new since your last visit": a quiet count of entries, write-ups and ledger changes
    // newer than the visitor's last visit, read from the AstroLog's latest.json.
    news: { sources: [LOG + "/latest.json"] },

    // Motion is the star field behind every page. Drift is the field as it has always been: the stars
    // twinkle, part around your pointer, and leave a little comet dust. Shooting stars adds the odd
    // meteor and a comet tail of the sky's colors that sheds four-point sparkles.
    motions: [
      { id: "still", name: "Still", icon: "pause", note: "The stars hold still, and nothing follows your pointer." },
      { id: "gentle", name: "Drift", icon: "sparkle", note: "Stars twinkle and drift, part around your pointer, and leave a little comet dust." },
      {
        id: "vivid",
        name: "Shooting stars",
        icon: "shooting-star",
        note: "Brighter twinkling, the odd shooting star, and a comet tail behind your pointer that sheds sparkles.",
        trail: { colors: ["#b48cff", "#6fe3ff", "#f3c76b", "#ff8fb1"], life: 620, width: 3.2, alpha: 0.82, sparks: 0.42, sides: 4 },
      },
    ],
    defaultMotion: "gentle",
    stillMotion: "still",

    wedges: SKY,

    // Gravatar only ever for a psychedelicsinrecovery.org role address; personal addresses are refused.
    avatar: { shape: "circle", colors: SKY, roleDomains: ["psychedelicsinrecovery.org"], svg: avatarSvg },

    community: {
      name: "Discord",
      icon: "discord-logo",
      href: DISCORD,
      label: "Join PIR's Discord",
      text: "The fellowship talks in PIR's Discord server. It's also where A.L.E.X., PIR's helper, answers questions from PIR's own published materials, with sources, and opens private helpdesk tickets for LitCom, TechCom, GitHub, PR and the Board.",
      more: [
        "Discord handles help members check who's real before trusting a DM: see <strong>whos-who</strong> and <strong>disclaimer</strong> once you're in.",
        'Need help right now? <a href="' + CRISIS + '">Crisis resources</a> are on the main site, any time.',
      ],
    },

    record: {
      intro: "PIR's AstroLog has two halves, and every finished piece of work becomes a star on its chart.",
      share:
        "Sharing one change? Every entry and every write-up has its own preview card, with a star of its own. Paste its link into Discord, WhatsApp or iMessage and it arrives with its title and summary. The <strong>Copy a link</strong> button under each one does the copying.",
      changelog: {
        name: "The changelog",
        text: "Every confirmed, finished piece of work for PIR, in plain language, newest first: the WordPress sites, A.L.E.X. and the helpdesks, and PIR's GitHub home and brand. A short summary up top, the full story folded underneath.",
        href: LOG + "/changelog",
        label: "Read the changelog",
      },
      library: {
        name: "The library",
        text: "The longer write-ups behind the work, honest about the wrong turns along the way. The changelog says what changed; the library explains how it works.",
        href: LOG + "/library",
        label: "Open the library",
      },
      ledger: {
        name: "The ledger",
        icon: "scroll",
        text: "Every public change to PIR's open repositories on GitHub, in plain words, sorted by kind and grouped by month, day and repository. It gathers itself again every day.",
        href: LOG + "/ledger",
        label: "Open the ledger",
      },
    },

    sites: {
      portal: {
        name: "PIR® on GitHub",
        what: "This is where Psychedelics In Recovery™ works in the open: the websites, A.L.E.X. and the helpdesks, the AstroLog, and the brand files, kept public so anyone can see how it works.",
      },
      astrolog: {
        name: "the PIR® AstroLog",
        what: "The AstroLog is PIR's plain-language changelog and library: every finished piece of work, who did it, and the longer write-ups on how it all works.",
      },
    },

    guide: {
      home: { title: "PIR's main site" },
      light: {
        text: "PIR's pages on GitHub share one look with A.L.E.X. and the helpdesks: a night sky by default, and a daybreak version for bright rooms, or let it follow the sky. Your choice follows you from the hub to the AstroLog and the desks.",
      },
      motion: {
        text: "Behind every page is a field of stars that drifts and parts around your pointer. Choose how much it moves, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work. In keeping with PIR's anonymity traditions, people appear here by first name and last initial, the way PIR's public contacts list names them.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets a small night sky with their initials.",
      },
    },
    guideFinale: "You've lit all eight points of the star. Welcome to PIR®.",

    words: {
      enter: "Come on in",
      cursorNote: "Comet dust behind your pointer, and stars that part as you pass. Switch it off if you'd rather not.",
      pause: "Pause the stars",
      play: "Let the stars move",
      searchPlaceholder: "Search changes, write-ups, desks and pages, or copy a command",
      searchTip: "Anywhere on PIR's GitHub pages, any time: every change, write-up, person, desk and page, including the AstroLog from the hub.",
      nothing: "Nothing matches yet. Try a month, a desk, a name, or the word light.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      // Everything A.L.E.X.'s "/" palette offered on these pages, plus the hub's own links.
      items: [
        { t: "PIR® GitHub hub", k: "page", i: "house", h: ROOT + "/", pin: true, x: "home entry portal github io root orbit" },
        { t: "psychedelicsinrecovery.org", k: "main site", i: "globe", h: SITE, pin: true, x: "website meetings home" },
        { t: "Join PIR's Discord", k: "community", i: "discord-logo", h: DISCORD, pin: true, x: "chat talk community server fellowship" },
        { t: "Need help right now? Crisis resources", k: "help", i: "lifebuoy", h: CRISIS, pin: true, x: "sos emergency hotline lifeline crisis support" },
        { t: "Meetings", k: "main site", i: "users-three", h: SITE + "/meetings/", x: "online in person meeting schedule zoom" },
        { t: "Service site", k: "link", i: "hand-heart", h: "https://service.psychedelicsinrecovery.org", x: "service board committees volunteer" },
        { t: "Get involved in service", k: "main site", i: "hand-heart", h: SITE + "/service/", x: "volunteer help lend a hand" },
        { t: "Contact PIR", k: "main site", i: "chat-circle-text", h: SITE + "/contact/", x: "reach out email contact" },
        { t: "A.L.E.X. home", k: "helper", i: "planet", h: ALEX + "/", x: "alex discord helper ask helpdesk" },
        { t: "How to use A.L.E.X. and the helpdesks", k: "helper", i: "compass", h: ALEX + "/howto.html", x: "howto help tickets" },
        { t: "A.L.E.X. privacy notice", k: "helper", i: "lock-key", h: ALEX + "/privacy.html", x: "privacy data" },
        { t: "A.L.E.X. terms of service", k: "helper", i: "scroll", h: ALEX + "/terms.html", x: "terms tos" },
        { t: "LitCom desk", k: "desk", i: "scroll", h: ROOT + "/litcom-desk-public/", x: "literature committee helpdesk" },
        { t: "TechCom desk", k: "desk", i: "desktop", h: ROOT + "/techcom-desk-public/", x: "tech committee helpdesk website" },
        { t: "GitHubDesk", k: "desk", i: "github-logo", h: ROOT + "/github-desk-public/", x: "github access helpdesk" },
        { t: "PR desk", k: "desk", i: "megaphone", h: ROOT + "/pr-desk-public/", x: "public relations helpdesk" },
        { t: "C.A.T.A.L.Y.S.T.", k: "helper", i: "sparkle", h: ROOT + "/catalyst-desk-public/", x: "catalyst fleet helpers agents chalkboard" },
        { t: "Copy /ask", k: "A.L.E.X. command", i: "copy", run: copyCommand("/ask"), x: "discord command question" },
        { t: "Copy /techcom", k: "A.L.E.X. command", i: "copy", run: copyCommand("/techcom"), x: "discord command ticket tech" },
        { t: "Copy /litcom", k: "A.L.E.X. command", i: "copy", run: copyCommand("/litcom"), x: "discord command ticket literature" },
        { t: "Copy /mod", k: "A.L.E.X. command", i: "copy", run: copyCommand("/mod"), x: "discord command moderation report" },
        { t: "Brand assets", k: "repo", i: "palette", h: "https://github.com/psychedelicsinrecovery/brand-assets", x: "logo logos brand guidelines" },
        { t: "Website archive", k: "repo", i: "archive", h: "https://github.com/psychedelicsinrecovery/wordpress-crawls", x: "snapshots crawls history" },
        { t: "Contacts and structure", k: "doc", i: "address-book", h: "https://github.com/psychedelicsinrecovery/.github/blob/main/CONTACTS.md", x: "trusted servants mailboxes committees domains board" },
        { t: "Privacy policy", k: "doc", i: "shield-check", h: "https://github.com/psychedelicsinrecovery/.github/blob/main/privacy-policy.md", x: "privacy data deletion" },
        { t: "De Vine News dashboard", k: "link", i: "newspaper", h: "https://drasticstatic.github.io/pir-devine-news-public/dashboard", x: "newsletter devine news pipeline" },
        { t: "PIR® on GitHub", k: "link", i: "github-logo", h: "https://github.com/psychedelicsinrecovery", x: "organization repos code source" },
        { t: "RSS feed of the changelog", k: "feed", i: "rss-simple", h: LOG + "/rss.xml", x: "rss subscribe feed reader" },
        { t: "The ledger: every public change", k: "page", i: "scroll", h: LOG + "/ledger", pin: true, x: "commits history github activity record public repositories" },
      ],
    },
  };
})();

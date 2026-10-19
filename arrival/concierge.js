/* PIR®'s concierge layer for the arrival kit (hub, AstroLog and the desk portals).
   Loaded after arrival.js; tailors the kit's rendered nav without editing the shared kit file.

   What it does, on every page that loads it:
   1. Section dividers inside the two kinds of desks lists:
      - the Helpdesks dropdown (desk portals): "Committees" above LitCom/TechCom/PR/GSR,
        "Infrastructure desks" above GitHubDesk/Board/Web3;
      - the Foyers dropdown (AstroLog/hub changelog lists): "Committees" at the top,
        "Infrastructure" above WordPress.
   2. The Foyers rename: any nav label reading "Committees" becomes "Foyers" at runtime,
      until the baked configs catch up.
   3. Foyer lists are reordered into the engagement order:
      GSR, PR, TechCom, LitCom, Newspaper, Pubs, Book, BOD, Intergroup, WP, GitHub, A.L.E.X.
   4. The GSR Desk row, injected into any helpdesks list that lacks it (desk portals carry
      their own nav copies; this keeps them current until each page's config is baked).
   5. BoardDesk links pointed at the real front door (board-desk-public) instead of the README repo.
   6. Any [data-arr-desks] button opens the Helpdesks dropdown (or the Menu when the bar is folded). */
(function () {
  "use strict";
  var HUB = "https://psychedelicsinrecovery.github.io";
  var DESK_SEPS = [
    { label: "Committees", icon: "users-three", before: "litcom-desk-public" },
    { label: "Infrastructure desks", icon: "wrench", before: "github-desk-public" },
  ];
  var FOYER_ORDER = [
    "changelog/gsr-com/", "changelog/pr-com/", "changelog/tech-com/", "changelog/lit-com/",
    "changelog/newspaper-com/", "changelog/publications-com/", "changelog/book-com/",
    "changelog/bod/", "changelog/intergroup/", "changelog/wordpress/",
    "changelog/brand-assets/", "changelog/alex-desk/",
  ];
  var FOYER_SEPS = [
    { label: "Committees", icon: "users-three", before: "changelog/gsr-com/" },
    { label: "Infrastructure", icon: "wrench", before: "changelog/wordpress/" },
  ];
  var GSR = {
    slug: "gsr-desk-public",
    label: "GSR Desk",
    icon: "users-three",
    href: HUB + "/gsr-desk-public/",
    note: "Group reports, service positions, the fellowship's record",
    after: "pr-desk-public",
  };

  function row(list, slug) {
    var links = list.querySelectorAll('a[href*="/' + slug + '"]');
    return links.length ? links[0].closest("li") : null;
  }

  function sepRow(label, icon) {
    var li = document.createElement("li");
    li.className = "arr-nav-sep";
    li.setAttribute("role", "presentation");
    li.innerHTML =
      '<span class="arr-nav-sep-l"><i class="ph ph-' + icon + '" aria-hidden="true"></i>' + label + "</span>";
    return li;
  }

  function gsrRow() {
    var li = document.createElement("li");
    li.innerHTML =
      '<a class="arr-nav-row" href="' + GSR.href + '">' +
      '<i class="ph ph-' + GSR.icon + '" aria-hidden="true"></i>' +
      '<span class="arr-nav-text"><span class="arr-nav-label">' + GSR.label + "</span>" +
      '<span class="arr-nav-note">' + GSR.note + "</span></span></a>";
    return li;
  }

  function sortFoyer(list) {
    var rows = [].slice.call(list.children).filter(function (li) {
      return li.matches && li.matches("li") && li.querySelector('a[href*="changelog/"]');
    });
    if (rows.length < 3) return;
    var rank = function (li) {
      var h = li.querySelector("a").getAttribute("href") || "";
      for (var i = 0; i < FOYER_ORDER.length; i++) if (h.indexOf(FOYER_ORDER[i]) !== -1) return i;
      return 99;
    };
    rows
      .slice()
      .sort(function (a, b) { return rank(a) - rank(b); })
      .forEach(function (li) { list.appendChild(li); });
  }

  function dress(list) {
    if (list.getAttribute("data-arr-concierge") === "on") return;
    var isDesks = !!row(list, "litcom-desk-public");
    var isFoyer = !!row(list, "changelog/gsr-com");
    if (!isDesks && !isFoyer) return;
    list.setAttribute("data-arr-concierge", "on");
    // BoardDesk's front door (the README repo stays for proposals; the desk is the way in).
    list.querySelectorAll('a[href*="board-of-directors-public"]').forEach(function (a) {
      a.setAttribute("href", HUB + "/board-desk-public/");
    });
    if (isFoyer) {
      sortFoyer(list);
      FOYER_SEPS.forEach(function (s) {
        var target = row(list, s.before);
        if (target) list.insertBefore(sepRow(s.label, s.icon), target);
      });
      return;
    }
    if (!row(list, GSR.slug)) {
      var anchor = row(list, GSR.after) || row(list, "techcom-desk-public") || row(list, "litcom-desk-public");
      if (anchor && anchor.nextSibling) list.insertBefore(gsrRow(), anchor.nextSibling);
      else if (anchor) list.appendChild(gsrRow());
    }
    DESK_SEPS.forEach(function (s) {
      if (list.querySelector(".arr-nav-sep-l")) return;
      var target = row(list, s.before) || row(list, "board-desk-public");
      if (target) list.insertBefore(sepRow(s.label, s.icon), target);
    });
  }

  function sweep() {
    document.querySelectorAll(".arr-nav-rows").forEach(dress);
    renameFoyers();
  }

  // The Foyers rename: any rendered label that reads exactly "Committees" becomes "Foyers",
  // in the navbar, its dropdown, and the Menu panel, until the baked configs catch up.
  function renameFoyers() {
    var scopes = document.querySelectorAll("arrival-nav, [data-arr-menu], .arr-dialog, dialog");
    scopes.forEach(function (scope) {
      scope.querySelectorAll("*").forEach(function (el) {
        if (el.children.length !== 0) return;
        if ((el.textContent || "").trim() === "Committees") el.textContent = "Foyers";
      });
    });
  }

  function fireDesks() {
    var toggles = document.querySelectorAll("arrival-nav [data-arr-nav-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      var panel = document.getElementById(toggles[i].getAttribute("aria-controls") || "");
      if (panel && (panel.querySelector('a[href*="litcom-desk-public"]') || panel.querySelector('a[href*="changelog/gsr-com"]'))) {
        if (toggles[i].getAttribute("aria-expanded") !== "true") toggles[i].click();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    // Bar folded into the Menu: open that instead.
    var menu = document.querySelector("[data-arr-menu]");
    if (menu) {
      if (menu.getAttribute("aria-expanded") !== "true") menu.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-arr-desks]") : null;
    if (t) {
      e.preventDefault();
      fireDesks();
    }
  });

  function start() {
    sweep();
    var tries = 0;
    var timer = setInterval(function () {
      sweep();
      if (++tries > 30) clearInterval(timer);
    }, 120);
    setTimeout(function () {
      clearInterval(timer);
    }, 4000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

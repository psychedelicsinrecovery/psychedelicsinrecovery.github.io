/* PIR®'s concierge layer for the arrival kit (hub, AstroLog and the desk portals).
   Loaded after arrival.js; tailors the kit's rendered nav without editing the shared kit file.

   What it does, on every page that loads it:
   1. Section dividers inside the Helpdesks dropdown (and the Menu's desks section):
      "Committees" above LitCom/TechCom/PR/GSR, "Infrastructure desks" above GitHubDesk/Board/Web3.
   2. The GSR Desk row, injected into any desks list that lacks it (desk portals carry their own
      nav copies; this keeps them current until each page's config is baked).
   3. BoardDesk links pointed at the real front door (board-desk-public) instead of the README repo.
   4. Any [data-arr-desks] button opens the Helpdesks dropdown (or the Menu when the bar is folded). */
(function () {
  "use strict";
  var HUB = "https://psychedelicsinrecovery.github.io";
  var SEPS = [
    { label: "Committees", icon: "users-three", before: "litcom-desk-public" },
    { label: "Infrastructure desks", icon: "wrench", before: "github-desk-public" },
  ];
  var GSR = {
    slug: "gsr-desk-public",
    label: "GSR Desk",
    icon: "users-three",
    href: HUB + "/gsr-desk-public/",
    note: "Group reports, service positions, the fellowship's record",
    after: "pr-desk-public",
  };

  function row(slug) {
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

  function dress(list) {
    if (list.getAttribute("data-arr-concierge") === "on") return;
    // A desks list is any row list that carries the LitCom link.
    if (!row("litcom-desk-public")) return;
    list.setAttribute("data-arr-concierge", "on");
    // BoardDesk's front door (the README repo stays for proposals; the desk is the way in).
    list.querySelectorAll('a[href*="board-of-directors-public"]').forEach(function (a) {
      a.setAttribute("href", HUB + "/board-desk-public/");
    });
    if (!row(GSR.slug)) {
      var anchor = row(GSR.after) || row("techcom-desk-public") || row("litcom-desk-public");
      if (anchor && anchor.nextSibling) list.insertBefore(gsrRow(), anchor.nextSibling);
      else if (anchor) list.appendChild(gsrRow());
    }
    SEPS.forEach(function (s) {
      if (list.querySelector('.arr-nav-sep-l')) return;
      var target = row(s.before) || row("board-desk-public");
      if (target) list.insertBefore(sepRow(s.label, s.icon), target);
    });
  }

  function sweep() {
    document.querySelectorAll(".arr-nav-rows").forEach(dress);
  }

  function fireDesks() {
    var toggles = document.querySelectorAll("arrival-nav [data-arr-nav-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      var panel = document.getElementById(toggles[i].getAttribute("aria-controls") || "");
      if (panel && panel.querySelector('a[href*="litcom-desk-public"]')) {
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

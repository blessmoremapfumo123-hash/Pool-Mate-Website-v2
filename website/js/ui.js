(function (global) {
  var LOGO =
    '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="currentColor"/><path d="M10 26c6-1 8-8 10-14" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round"/><path d="M16 28c6-1 9-8 11-14" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" opacity="0.7"/><circle cx="20" cy="12" r="2.1" fill="white"/><circle cx="27" cy="14" r="2.1" fill="white" opacity="0.7"/></svg>';

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function toast(msg) {
    var el = $("#pm-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "pm-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.style.display = "none";
    }, 2400);
  }

  function cloudPill() {
    var cloud = PM.isCloud();
    return (
      '<span class="cloud-pill' +
      (cloud ? "" : " local") +
      '" title="Database mode">' +
      (cloud ? "Firebase · live" : "Local database") +
      "</span>"
    );
  }

  function header(opts) {
    opts = opts || {};
    var user = PM.currentUser();
    var extra = user
      ? '<a class="btn btn-sm" href="' +
        (user.role === "driver" ? "drive.html" : "dashboard.html") +
        '">Open app</a>'
      : '<a class="btn btn-sm" href="login.html">Get started</a>';
    return (
      '<header class="site-header"><div class="wrap bar">' +
      '<a class="logo" href="index.html" style="color:var(--brand)">' +
      LOGO +
      '<span style="color:var(--ink)">PoolMate</span></a>' +
      '<nav class="nav">' +
      '<a href="index.html#services">Services</a>' +
      '<a href="index.html#how">How it works</a>' +
      '<a href="database.html">Database</a>' +
      "</nav>" +
      '<div class="header-actions">' +
      cloudPill() +
      extra +
      '<button class="menu-btn" type="button" data-menu aria-label="Menu">☰</button>' +
      "</div></div>" +
      '<div class="mobile-nav" data-mobile>' +
      '<a href="index.html#services">Services</a>' +
      '<a href="index.html#how">How it works</a>' +
      '<a href="database.html">Database</a>' +
      '<a href="login.html">Log in</a>' +
      "</div></header>"
    );
  }

  function footer() {
    return (
      '<footer class="site-footer"><div class="wrap grid">' +
      '<div><a class="logo" href="index.html" style="color:var(--brand-fg)">' +
      LOGO +
      "<span>PoolMate</span></a>" +
      '<p style="margin-top:1rem;max-width:22rem">Corridor pooling for Lusaka — rides, cargo, food and parcels. Built for daily travel, paid the way you already pay.</p></div>' +
      "<div><p style=\"font-family:var(--font-display);font-weight:600;color:var(--brand-fg)\">Product</p><ul>" +
      '<li><a href="index.html#services">Services</a></li>' +
      '<li><a href="index.html#how">How it works</a></li>' +
      '<li><a href="login.html">Log in</a></li>' +
      '<li><a href="database.html">Drivers & passengers</a></li>' +
      "</ul></div>" +
      "<div><p style=\"font-family:var(--font-display);font-weight:600;color:var(--brand-fg)\">Safety & pay</p><ul>" +
      "<li>Verified drivers</li><li>Live route sharing</li><li>Airtel Money · MTN · cash</li><li>24/7 support</li>" +
      "</ul></div></div>" +
      '<div class="foot-bar"><div class="wrap"><p>© 2026 PoolMate. Lusaka, Zambia.</p><p>Share the stretch. Keep the change.</p></div></div></footer>'
    );
  }

  function bindChrome() {
    var btn = $("[data-menu]");
    var panel = $("[data-mobile]");
    if (btn && panel) {
      btn.addEventListener("click", function () {
        panel.classList.toggle("open");
      });
    }
  }

  function requireAuth(opts) {
    opts = opts || {};
    return PM.boot().then(function () {
      var user = PM.currentUser();
      if (!user) {
        location.href = "login.html";
        return null;
      }
      if (opts.needRole && !user.role) {
        location.href = "role.html";
        return null;
      }
      return user;
    });
  }

  function afterLogin(user) {
    if (!user.role) location.href = "role.html";
    else if (user.role === "driver") location.href = "drive.html";
    else location.href = "dashboard.html";
  }

  function appNav(active) {
    var user = PM.currentUser() || {};
    var items = [
      { href: "dashboard.html", id: "book", label: "Book" },
      { href: "activity.html", id: "activity", label: "Activity" },
      { href: "database.html", id: "db", label: "People" },
      { href: "drive.html", id: "drive", label: "Drive" },
    ];
    function links(cls) {
      return items
        .map(function (it) {
          return (
            '<a class="' +
            (it.id === active ? "on" : "") +
            '" href="' +
            it.href +
            '">' +
            it.label +
            "</a>"
          );
        })
        .join("");
    }
    return {
      sidebar:
        '<aside class="sidebar"><div style="height:4rem;display:flex;align-items:center;padding:0 1rem">' +
        '<a class="logo" href="index.html" style="color:var(--brand)">' +
        LOGO +
        '<span style="color:var(--ink)">PoolMate</span></a></div>' +
        "<nav>" +
        links() +
        "</nav>" +
        '<p class="muted" style="padding:0 1.25rem 1.25rem;font-size:0.75rem">Lusaka · live corridors</p></aside>',
      top:
        '<header class="app-top"><a class="logo" href="index.html" style="color:var(--brand)">' +
        LOGO +
        '<span style="color:var(--ink)">PoolMate</span></a>' +
        '<div style="display:flex;align-items:center;gap:0.6rem">' +
        cloudPill() +
        '<span class="muted" style="font-size:0.875rem">' +
        (user.name || "Account") +
        "</span>" +
        '<button class="btn btn-sm btn-outline" type="button" data-logout>Log out</button></div></header>',
      bottom: '<nav class="bottom-nav">' + links() + "</nav>",
    };
  }

  function bindLogout() {
    $all("[data-logout]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        PM.signOut().then(function () {
          location.href = "index.html";
        });
      });
    });
  }

  global.PMUI = {
    $,
    $all,
    toast,
    header,
    footer,
    bindChrome,
    requireAuth,
    afterLogin,
    appNav,
    bindLogout,
    logo: LOGO,
    cloudPill,
  };
})(window);

/* =========================================================
   Portfolio scripts - Vaishnavi K
   1 Mobile menu | 2 Navbar scroll + active link | 3 Scroll reveal
   4 Back to top | 5 Role typing | 6 Contact form | 7 Misc
   ========================================================= */
(function () {
  "use strict";

  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var navLinks = document.querySelectorAll(".nav-link");
  var toTop = document.getElementById("toTop");

  /* ---------- 1. MOBILE MENU ---------- */
  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }
  navToggle.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("open"));
  });
  // Close menu after choosing a link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  // Close menu with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  /* ---------- 2. NAVBAR STYLE + ACTIVE LINK + 4. BACK TO TOP ---------- */
  var sections = document.querySelectorAll("main section[id]");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    navbar.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 500);

    // Highlight the link of the section currently in view
    var current = "home";
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 140) { current = sec.id; }
    });
    navLinks.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", active);
      if (active) { link.setAttribute("aria-current", "page"); }
      else { link.removeAttribute("aria-current"); }
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 3. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + "ms"; // small stagger
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 5. ROLE TYPING EFFECT ---------- */
  // Edit this list to change the rotating role text.
  var roles = ["Full-Stack Web Developer", "Python & Java Developer", "AI Security Enthusiast"];
  var typedEl = document.getElementById("typed");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typedEl && !reduceMotion) {
    var r = 0, c = 0, deleting = false;
    (function tick() {
      var word = roles[r];
      c += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, c);
      var delay = deleting ? 40 : 85;
      if (!deleting && c === word.length) { deleting = true; delay = 1600; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- 6. CONTACT FORM ---------- */
  // var form = document.getElementById("contactForm");
  // var statusEl = document.getElementById("formStatus");
  // var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // function setError(input, msg) {
  //   var field = input.closest(".field");
  //   document.getElementById(input.id + "Err").textContent = msg;
  //   field.classList.toggle("invalid", !!msg);
  //   input.setAttribute("aria-invalid", msg ? "true" : "false");
  // }

  // function validate(input) {
  //   var v = input.value.trim();
  //   var msg = "";
  //   if (!v) { msg = "This field is required."; }
  //   else if (input.id === "name" && v.length < 2) { msg = "Please enter at least 2 characters."; }
  //   else if (input.id === "email" && !emailRe.test(v)) { msg = "Please enter a valid email address."; }
  //   else if (input.id === "subject" && v.length < 3) { msg = "Subject is too short."; }
  //   else if (input.id === "message" && v.length < 10) { msg = "Message should be at least 10 characters."; }
  //   setError(input, msg);
  //   return !msg;
  // }

  // var inputs = form.querySelectorAll("input, textarea");
  // inputs.forEach(function (input) {
  //   input.addEventListener("blur", function () { validate(input); });
  //   input.addEventListener("input", function () {
  //     if (input.closest(".field").classList.contains("invalid")) { validate(input); }
  //   });
  // });

  // form.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   statusEl.style.color = "";
  //   var ok = true;
  //   var firstBad = null;
  //   inputs.forEach(function (input) {
  //     if (!validate(input)) { ok = false; if (!firstBad) { firstBad = input; } }
  //   });
  //   if (!ok) {
  //     statusEl.textContent = "";
  //     firstBad.focus();
  //     return;
  //   }

  //   /* A static page cannot send email on its own.
  //      Option A (current): open the visitor's email app with the message pre-filled.
  //      Option B: connect a form service such as Formspree or Netlify Forms. */
  //   var to = "vaishnavikannathasan24@gmail.com";
  //   var subject = encodeURIComponent(form.subject.value.trim());
  //   var body = encodeURIComponent(
  //     "Name: " + form.name.value.trim() + "\n" +
  //     "Email: " + form.email.value.trim() + "\n\n" +
  //     form.message.value.trim()
  //   );
  //   window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
  //   statusEl.textContent = "Opening your email app... if nothing opens, please email me directly.";
  //   form.reset();
  //   inputs.forEach(function (input) { setError(input, ""); });
  // });


/* ---------- 6. CONTACT FORM ---------- */

var form = document.getElementById("contactForm");
var statusEl = document.getElementById("formStatus");

var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(input, msg) {
  var field = input.closest(".field");

  document.getElementById(input.id + "Err").textContent = msg;

  field.classList.toggle("invalid", !!msg);

  input.setAttribute("aria-invalid", msg ? "true" : "false");
}

function validate(input) {
  var v = input.value.trim();
  var msg = "";

  if (!v) {
    msg = "This field is required.";
  }
  else if (input.id === "name" && v.length < 2) {
    msg = "Please enter at least 2 characters.";
  }
  else if (input.id === "email" && !emailRe.test(v)) {
    msg = "Please enter a valid email address.";
  }
  else if (input.id === "subject" && v.length < 3) {
    msg = "Subject is too short.";
  }
  else if (input.id === "message" && v.length < 10) {
    msg = "Message should be at least 10 characters.";
  }

  setError(input, msg);

  return !msg;
}

var inputs = form.querySelectorAll("input, textarea");

inputs.forEach(function (input) {

  input.addEventListener("blur", function () {
    validate(input);
  });

  input.addEventListener("input", function () {
    if (input.closest(".field").classList.contains("invalid")) {
      validate(input);
    }
  });

});

form.addEventListener("submit", async function (e) {

  e.preventDefault();

  statusEl.textContent = "";

  var ok = true;
  var firstBad = null;

  inputs.forEach(function (input) {

    if (!validate(input)) {
      ok = false;

      if (!firstBad) {
        firstBad = input;
      }
    }

  });

  if (!ok) {
    firstBad.focus();
    return;
  }

  var submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {

    var response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {

      statusEl.style.color = "green";

      statusEl.textContent =
        "Thank you! Your message has been sent successfully.";

      form.reset();

      inputs.forEach(function (input) {
        setError(input, "");
      });

    } else {

      statusEl.style.color = "red";

      statusEl.textContent =
        "Unable to send your message. Please try again.";

    }

  } catch (error) {

    statusEl.style.color = "red";

    statusEl.textContent =
      "Network error. Please check your internet connection.";

  }

  submitBtn.disabled = false;

  submitBtn.innerHTML =
    'Send Message <i class="fa-solid fa-paper-plane"></i>';

});


  /* ---------- 7. MISC ---------- */
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // Show a placeholder when profile.jpg is missing
  var img = document.getElementById("profileImg");
  var ph = document.getElementById("photoPlaceholder");
  function showPlaceholder() { img.style.display = "none"; ph.hidden = false; }
  img.addEventListener("error", showPlaceholder);
  if (img.complete && img.naturalWidth === 0) { showPlaceholder(); }

  // Links still containing "#" placeholders: don't jump to top, tell the visitor
  document.querySelectorAll('a[data-placeholder="true"], #githubLink').forEach(function (a) {
    if (a.getAttribute("href") === "#") {
      a.classList.add("disabled");
      a.setAttribute("aria-disabled", "true");
      a.title = "[Add URL] - edit index.html to add this link";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });
})();
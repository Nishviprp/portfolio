// ============================================================
// PRELOADER
// ============================================================
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  setTimeout(() => pre.classList.add("done"), 250);
});

// ============================================================
// TYPED ROLE ROTATOR
// ============================================================
(function () {
  const roles = ["Data Engineer", "AI Developer", "Cloud Enthusiast", "LLM Builder"];
  const el = document.getElementById("typedRole");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
})();

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll(".reveal-up");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ============================================================
// NAVBAR SCROLL STATE + ACTIVE LINK
// ============================================================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = Array.from(navLinks)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
const backToTop = document.getElementById("backToTop");

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  backToTop.classList.toggle("show", window.scrollY > 500);

  let current = sections[0];
  const scrollPos = window.scrollY + 140;
  sections.forEach((sec) => {
    if (sec.offsetTop <= scrollPos) current = sec;
  });
  navLinks.forEach((a) => {
    const target = document.querySelector(a.getAttribute("href"));
    a.classList.toggle("active", target === current);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});
navLinks.forEach((a) =>
  a.addEventListener("click", () => navMenu.classList.remove("open"))
);

// ============================================================
// FOOTER YEAR
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();

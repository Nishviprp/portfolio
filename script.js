// ============================================================
// INTRO SEQUENCE: avatar "speaks" the introduction, then reveals site
// ============================================================
(function () {
  const lines = [
    "Hey! I'm Nishvi's portfolio assistant 👋",
    "She's a Data Engineer & AI Developer based in NYC.",
    "She builds ETL pipelines, cloud systems, and LLM-powered apps.",
    "Let me show you what she's been working on...",
  ];

  const speechText = document.getElementById("speechText");
  const soundBars = document.getElementById("soundBars");
  const mouthShape = document.getElementById("mouthShape");
  const eyes = document.getElementById("eyes");
  const blink = document.getElementById("blink");
  const overlay = document.getElementById("intro-overlay");
  const site = document.getElementById("site");
  const skipBtn = document.getElementById("skipIntro");

  const MOUTH_TALK = "M104 154c6 10 24 10 32 0c-1 7-8 12-16 12s-15-5-16-12z";
  const MOUTH_REST = "M105 156c6 5 24 5 30 0";

  let talkInterval = null;
  let blinkInterval = null;
  let finished = false;

  function startTalking() {
    soundBars.classList.add("active");
    let open = false;
    talkInterval = setInterval(() => {
      mouthShape.setAttribute("d", open ? MOUTH_REST : MOUTH_TALK);
      mouthShape.setAttribute("fill-opacity", open ? "0" : "1");
      open = !open;
    }, 140);
  }

  function stopTalking() {
    soundBars.classList.remove("active");
    clearInterval(talkInterval);
    mouthShape.setAttribute("d", MOUTH_REST);
    mouthShape.setAttribute("fill-opacity", "0");
  }

  function startBlinking() {
    blinkInterval = setInterval(() => {
      eyes.style.opacity = "0";
      blink.style.opacity = "1";
      setTimeout(() => {
        eyes.style.opacity = "1";
        blink.style.opacity = "0";
      }, 140);
    }, 2600 + Math.random() * 1500);
  }

  function typeLine(text, onDone) {
    speechText.innerHTML = "";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    let i = 0;
    startTalking();
    const typer = setInterval(() => {
      speechText.textContent = text.slice(0, i + 1);
      speechText.appendChild(cursor);
      i++;
      if (i >= text.length) {
        clearInterval(typer);
        stopTalking();
        setTimeout(onDone, 850);
      }
    }, 28);
  }

  function playSequence(index) {
    if (finished) return;
    if (index >= lines.length) {
      revealSite();
      return;
    }
    typeLine(lines[index], () => playSequence(index + 1));
  }

  function revealSite() {
    if (finished) return;
    finished = true;
    clearInterval(talkInterval);
    clearInterval(blinkInterval);
    overlay.classList.add("hide");
    site.classList.remove("site-hidden");
    requestAnimationFrame(() => {
      site.classList.add("site-visible");
    });
    setTimeout(() => {
      overlay.style.display = "none";
    }, 750);
  }

  // Failsafe: if anything goes wrong, never leave the site permanently hidden
  setTimeout(() => {
    if (!finished) revealSite();
  }, 15000);

  skipBtn.addEventListener("click", revealSite);

  // Kick things off after a short beat so the avatar appears first
  startBlinking();
  setTimeout(() => playSequence(0), 500);
})();

// ============================================================
// MISC: footer year, nav active state on scroll
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav-links a");
const sections = Array.from(navLinks)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function highlightNav() {
  let current = sections[0];
  const scrollPos = window.scrollY + 120;
  sections.forEach((sec) => {
    if (sec.offsetTop <= scrollPos) current = sec;
  });
  navLinks.forEach((a) => {
    const target = document.querySelector(a.getAttribute("href"));
    a.style.color = target === current ? "var(--text-hi)" : "";
  });
}
window.addEventListener("scroll", highlightNav, { passive: true });
highlightNav();

document.getElementById("year").textContent = new Date().getFullYear();

const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";

  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Local storage may be unavailable in some browsing contexts.
  }
}

const savedTheme = (() => {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
})();

setTheme(savedTheme || "dark");

toggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

const revealElements = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const cursor = document.querySelector(".cursor-dot");

if (window.matchMedia("(pointer: fine)").matches && cursor) {
  document.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("a, button, .project-card, .skill-card, .timeline-item, .cert-card").forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("active"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
} else if (cursor) {
  cursor.style.display = "none";
}

const navToggle = document.querySelector("[data-nav-toggle]");
const navigation = document.querySelector("[data-nav]");

const closeNavigation = () => {
  if (
    !(navToggle instanceof HTMLButtonElement) ||
    !(navigation instanceof HTMLElement)
  )
    return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.querySelector(".sr-only").textContent = "Open navigation";
  navigation.classList.remove("is-open");
};

if (
  navToggle instanceof HTMLButtonElement &&
  navigation instanceof HTMLElement
) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.querySelector(".sr-only").textContent = isOpen
      ? "Open navigation"
      : "Close navigation";
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeNavigation));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.1 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section) => section instanceof HTMLElement);

if ("IntersectionObserver" in window && trackedSections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: [0, 0.25, 0.6] },
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
}

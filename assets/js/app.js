// Readify shared helpers.

const navToggleButton = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

// Toggle the mobile navigation menu.
if (navToggleButton && navMenu) {
  navToggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });
}

// Close the menu when a link is clicked (mobile friendly).
if (navMenu) {
  navMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navMenu.classList.remove("is-open");
    }
  });
}

// Register service worker for offline support.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {
      // Keep it simple: fail silently if service worker can't register.
    });
  });
}

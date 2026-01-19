// Shared Readify helper utilities.

/**
 * Toggle the mobile navigation menu.
 * @param {string} toggleId - The checkbox ID controlling the nav.
 */
const toggleMobileMenu = (toggleId = "nav-toggle") => {
  const toggle = document.getElementById(toggleId);
  if (!toggle) {
    return;
  }

  toggle.checked = !toggle.checked;
};

/**
 * Save data to localStorage as JSON.
 * @param {string} key - Storage key.
 * @param {unknown} value - Data to persist.
 */
const saveToStorage = (key, value) => {
  if (!key) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Load data from localStorage.
 * @param {string} key - Storage key.
 * @param {unknown} fallback - Default value when key is missing.
 * @returns {unknown} Parsed value or fallback.
 */
const loadFromStorage = (key, fallback = null) => {
  if (!key) {
    return fallback;
  }

  const stored = window.localStorage.getItem(key);
  if (!stored) {
    return fallback;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    return fallback;
  }
};

// Optional: close the menu when a nav link is clicked on mobile.
const bindMobileNavClose = (navSelector = ".site-nav", toggleId = "nav-toggle") => {
  const nav = document.querySelector(navSelector);
  if (!nav) {
    return;
  }

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      const toggle = document.getElementById(toggleId);
      if (toggle) {
        toggle.checked = false;
      }
    }
  });
};

// Example binding for projects that want the behavior immediately.
bindMobileNavClose();

// Register the Readify service worker for offline-ready pages.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((error) => {
      console.warn("Service worker registration failed", error);
    });
  });
}

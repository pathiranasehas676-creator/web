// Feedback page interactions.

const FEEDBACK_STORAGE_KEY = "readify-feedback";

const feedbackForm = document.querySelector("[data-feedback-form]");
const successMessage = document.querySelector("[data-success-message]");

const validators = {
  name: (value) => {
    if (!value.trim()) {
      return "Please enter your name.";
    }
    if (value.trim().length < 2) {
      return "Name should be at least 2 characters.";
    }
    return "";
  },
  email: (value) => {
    if (!value.trim()) {
      return "Please enter your email address.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) {
      return "Enter a valid email address.";
    }
    return "";
  },
  message: (value) => {
    if (!value.trim()) {
      return "Please share a quick message.";
    }
    if (value.trim().length < 10) {
      return "Message should be at least 10 characters.";
    }
    return "";
  },
};

const setFieldError = (fieldName, message) => {
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (error) {
    error.textContent = message;
  }
};

const clearFieldErrors = () => {
  Object.keys(validators).forEach((field) => setFieldError(field, ""));
};

const validateForm = (formData) => {
  let isValid = true;
  Object.entries(validators).forEach(([field, validate]) => {
    const message = validate(formData.get(field) || "");
    setFieldError(field, message);
    if (message) {
      isValid = false;
    }
  });
  return isValid;
};

const showSuccessMessage = () => {
  if (!successMessage) {
    return;
  }
  successMessage.classList.add("is-visible");
  window.setTimeout(() => {
    successMessage.classList.remove("is-visible");
  }, 4000);
};

const saveFeedbackEntry = (entry) => {
  const existing = loadFromStorage(FEEDBACK_STORAGE_KEY, []);
  const updated = Array.isArray(existing) ? [...existing, entry] : [entry];
  saveToStorage(FEEDBACK_STORAGE_KEY, updated);
};

if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    clearFieldErrors();

    if (!validateForm(formData)) {
      return;
    }

    const entry = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      message: formData.get("message").trim(),
      submittedAt: new Date().toISOString(),
    };

    saveFeedbackEntry(entry);
    feedbackForm.reset();
    showSuccessMessage();
  });
}

const accordion = document.querySelector("[data-accordion]");

if (accordion) {
  accordion.addEventListener("click", (event) => {
    const trigger = event.target.closest(".accordion-trigger");
    if (!trigger) {
      return;
    }

    const item = trigger.closest(".accordion-item");
    if (!item) {
      return;
    }

    const isOpen = item.classList.contains("is-open");
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((accordionItem) => {
      accordionItem.classList.remove("is-open");
      const button = accordionItem.querySelector(".accordion-trigger");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
}

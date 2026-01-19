// Feedback page script.

const feedbackForm = document.querySelector("[data-feedback-form]");
const successMessage = document.querySelector("[data-feedback-success]");
const accordionItems = document.querySelectorAll("[data-accordion-item]");

const STORAGE_KEY = "readify-feedback";

const showError = (element, message) => {
  if (element) {
    element.textContent = message;
  }
};

const validateForm = (data) => {
  let valid = true;

  if (!data.name.trim()) {
    showError(document.querySelector("[data-error-name]"), "Name is required.");
    valid = false;
  }

  if (!data.email.trim()) {
    showError(document.querySelector("[data-error-email]"), "Email is required.");
    valid = false;
  }

  if (!data.message.trim()) {
    showError(document.querySelector("[data-error-message]"), "Message is required.");
    valid = false;
  }

  return valid;
};

const clearErrors = () => {
  showError(document.querySelector("[data-error-name]"), "");
  showError(document.querySelector("[data-error-email]"), "");
  showError(document.querySelector("[data-error-message]"), "");
};

const saveFeedback = (entry) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const list = stored ? JSON.parse(stored) : [];
  list.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const formData = new FormData(feedbackForm);
    const entry = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || "",
    };

    if (!validateForm(entry)) {
      return;
    }

    saveFeedback(entry);
    feedbackForm.reset();

    if (successMessage) {
      successMessage.textContent = "Thanks! Your feedback has been saved.";
    }
  });
}

accordionItems.forEach((item) => {
  const button = item.querySelector("[data-accordion-button]");
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    item.classList.toggle("is-open");
  });
});

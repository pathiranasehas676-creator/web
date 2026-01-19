const form = document.querySelector("[data-progress-form]");
const resetButton = document.querySelector("[data-reset-progress]");
const progressMessage = document.querySelector("[data-progress-message]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressPercent = document.querySelector("[data-progress-percent]");
const progressFinish = document.querySelector("[data-progress-finish]");

const STORAGE_KEY = "readify-progress";

const formatDate = (date) =>
  date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const calculateProgress = ({ totalPages, pagesRead, speed }) => {
  const safeTotal = Math.max(totalPages, 1);
  const safeRead = Math.min(Math.max(pagesRead, 0), safeTotal);
  const safeSpeed = Math.max(speed, 0);

  const percent = Math.round((safeRead / safeTotal) * 100);
  const remaining = Math.max(safeTotal - safeRead, 0);

  let finishText = "—";
  if (remaining === 0) {
    finishText = "Finished today";
  } else if (safeSpeed > 0) {
    const daysRemaining = Math.ceil(remaining / safeSpeed);
    const finishDate = new Date();
    finishDate.setDate(finishDate.getDate() + daysRemaining);
    finishText = `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} (${formatDate(
      finishDate
    )})`;
  } else {
    finishText = "Add a reading speed to estimate";
  }

  return { percent, finishText };
};

const updateUI = (data) => {
  if (!progressBar || !progressPercent || !progressFinish || !progressMessage) {
    return;
  }

  const { percent, finishText } = calculateProgress(data);
  progressBar.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;
  progressFinish.textContent = finishText;

  progressMessage.textContent =
    percent === 100
      ? "Congrats! You have completed this book."
      : "Keep going—every page gets you closer.";
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (!form) {
    return;
  }

  const formData = new FormData(form);
  const totalPages = Number(formData.get("totalPages"));
  const pagesRead = Number(formData.get("pagesRead"));
  const speed = Number(formData.get("speed"));

  const data = { totalPages, pagesRead, speed };
  saveToStorage(STORAGE_KEY, data);
  updateUI(data);
};

const populateForm = (data) => {
  if (!form || !data) {
    return;
  }

  form.totalPages.value = data.totalPages ?? "";
  form.pagesRead.value = data.pagesRead ?? "";
  form.speed.value = data.speed ?? "";
};

const resetProgress = () => {
  if (!form) {
    return;
  }

  form.reset();
  saveToStorage(STORAGE_KEY, { totalPages: 0, pagesRead: 0, speed: 0 });
  updateUI({ totalPages: 1, pagesRead: 0, speed: 0 });
  progressMessage.textContent = "Enter your details to see your progress.";
};

form?.addEventListener("submit", handleSubmit);
resetButton?.addEventListener("click", resetProgress);

const stored = loadFromStorage(STORAGE_KEY, null);
if (stored) {
  populateForm(stored);
  updateUI(stored);
}

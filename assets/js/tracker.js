// Progress Tracker page script.

const trackerForm = document.querySelector("[data-tracker-form]");
const progressFill = document.querySelector("[data-progress-fill]");
const progressPercent = document.querySelector("[data-progress-percent]");
const progressDays = document.querySelector("[data-progress-days]");

const STORAGE_KEY = "readify-progress";

const updateProgress = (data) => {
  const total = Number(data.totalPages);
  const read = Number(data.pagesRead);
  const speed = Number(data.speed);

  if (total <= 0 || speed <= 0 || read < 0) {
    return;
  }

  const percent = Math.min((read / total) * 100, 100);
  const remaining = Math.max(total - read, 0);
  const daysLeft = Math.ceil(remaining / speed);

  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }

  if (progressPercent) {
    progressPercent.textContent = `${percent.toFixed(0)}%`;
  }

  if (progressDays) {
    progressDays.textContent = `${daysLeft} day(s)`;
  }
};

const saveProgress = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadProgress = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    return null;
  }
};

if (trackerForm) {
  trackerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(trackerForm);
    const data = {
      totalPages: formData.get("totalPages"),
      pagesRead: formData.get("pagesRead"),
      speed: formData.get("speed"),
    };

    updateProgress(data);
    saveProgress(data);
  });
}

const savedProgress = loadProgress();
if (savedProgress) {
  if (trackerForm) {
    trackerForm.totalPages.value = savedProgress.totalPages;
    trackerForm.pagesRead.value = savedProgress.pagesRead;
    trackerForm.speed.value = savedProgress.speed;
  }
  updateProgress(savedProgress);
}

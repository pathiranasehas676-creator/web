const soundToggle = document.querySelector("[data-sound-toggle]");
const focusToggle = document.querySelector("[data-focus-toggle]");
const focusStatus = document.querySelector("[data-focus-status]");
const completeForm = document.querySelector("[data-complete-form]");
const completedList = document.querySelector("[data-completed-list]");
const clearCompletedButton = document.querySelector("[data-clear-completed]");

const STORAGE_KEY = "readify-completed-books";

let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

const startSound = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 220;
    gainNode.gain.value = 0.04;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  isPlaying = true;
  if (soundToggle) {
    soundToggle.textContent = "Pause Sounds";
  }
};

const stopSound = () => {
  if (audioContext && audioContext.state === "running") {
    audioContext.suspend();
  }

  isPlaying = false;
  if (soundToggle) {
    soundToggle.textContent = "Play Sounds";
  }
};

const toggleSound = () => {
  if (isPlaying) {
    stopSound();
  } else {
    startSound();
  }
};

const updateFocusState = (enabled) => {
  document.body.classList.toggle("focus-mode", enabled);
  if (focusStatus) {
    focusStatus.textContent = enabled ? "On" : "Off";
  }
  if (focusToggle) {
    focusToggle.textContent = enabled ? "Exit Focus Mode" : "Enter Focus Mode";
  }
};

const renderCompleted = (list) => {
  if (!completedList) {
    return;
  }

  completedList.innerHTML = "";
  if (!list.length) {
    completedList.innerHTML = "<li class=\"muted\">No completed books yet.</li>";
    return;
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.className = "reading-list-item";
    li.innerHTML = `
      <span>${item.title}</span>
      <span class="muted">${item.author || ""}</span>
    `;
    completedList.appendChild(li);
  });
};

const saveCompleted = (list) => {
  saveToStorage(STORAGE_KEY, list);
  renderCompleted(list);
};

const handleComplete = (event) => {
  event.preventDefault();
  if (!completeForm) {
    return;
  }

  const formData = new FormData(completeForm);
  const title = String(formData.get("title") || "").trim();
  const author = String(formData.get("author") || "").trim();

  if (!title) {
    return;
  }

  const list = loadFromStorage(STORAGE_KEY, []);
  list.unshift({ title, author });
  saveCompleted(list);
  completeForm.reset();
};

const clearCompleted = () => {
  saveCompleted([]);
};

soundToggle?.addEventListener("click", toggleSound);
focusToggle?.addEventListener("click", () => {
  const enabled = !document.body.classList.contains("focus-mode");
  updateFocusState(enabled);
});
completeForm?.addEventListener("submit", handleComplete);
clearCompletedButton?.addEventListener("click", clearCompleted);

renderCompleted(loadFromStorage(STORAGE_KEY, []));
updateFocusState(false);

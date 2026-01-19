// Reading Flow page script.

const audioButton = document.querySelector("[data-audio-toggle]");
const focusButton = document.querySelector("[data-focus-toggle]");
const completedForm = document.querySelector("[data-completed-form]");
const completedList = document.querySelector("[data-completed-list]");

let audioContext = null;
let oscillator = null;
let isPlaying = false;

const STORAGE_KEY = "readify-completed";

const toggleAudio = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (!isPlaying) {
    oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 220;
    oscillator.connect(audioContext.destination);
    oscillator.start();
    isPlaying = true;
    if (audioButton) {
      audioButton.textContent = "Pause Cozy Sound";
    }
  } else {
    oscillator.stop();
    oscillator.disconnect();
    isPlaying = false;
    if (audioButton) {
      audioButton.textContent = "Play Cozy Sound";
    }
  }
};

const toggleFocusMode = () => {
  document.body.classList.toggle("focus-mode");
};

const saveCompleted = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const loadCompleted = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
};

const renderCompleted = (list) => {
  if (!completedList) {
    return;
  }

  completedList.innerHTML = "";
  list.forEach((title) => {
    const item = document.createElement("li");
    item.textContent = title;
    completedList.appendChild(item);
  });
};

if (audioButton) {
  audioButton.addEventListener("click", toggleAudio);
}

if (focusButton) {
  focusButton.addEventListener("click", toggleFocusMode);
}

if (completedForm) {
  completedForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = completedForm.querySelector("input[name='title']");
    const value = input ? input.value.trim() : "";

    if (!value) {
      return;
    }

    const list = loadCompleted();
    list.push(value);
    saveCompleted(list);
    renderCompleted(list);

    if (input) {
      input.value = "";
    }
  });
}

renderCompleted(loadCompleted());

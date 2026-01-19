const books = [
  {
    title: "Aurora Station",
    author: "Kira Sol",
    genre: "Science Fiction",
    length: "long",
  },
  {
    title: "Lavender Fog",
    author: "Mina Park",
    genre: "Romance",
    length: "medium",
  },
  {
    title: "The Hidden Orchard",
    author: "Rowan Pike",
    genre: "Mystery",
    length: "short",
  },
  {
    title: "Salt & Paper",
    author: "Imani Cole",
    genre: "Contemporary",
    length: "short",
  },
  {
    title: "Hollow Atlas",
    author: "Ezra Lennox",
    genre: "Fantasy",
    length: "long",
  },
  {
    title: "Brightway",
    author: "Avery Sun",
    genre: "Nonfiction",
    length: "medium",
  },
  {
    title: "Night Harbor",
    author: "Salma Noor",
    genre: "Thriller",
    length: "medium",
  },
  {
    title: "Driftwood Diaries",
    author: "Owen Kale",
    genre: "Adventure",
    length: "long",
  },
  {
    title: "Quiet Seasons",
    author: "Luca Reed",
    genre: "Literary",
    length: "short",
  },
];

const elements = {
  form: document.querySelector("[data-recommender-form]"),
  genreSelect: document.querySelector("[data-genre-select]"),
  lengthSelect: document.querySelector("[data-length-select]"),
  recommendationCard: document.querySelector("[data-recommendation-card]"),
  recommendationGenre: document.querySelector("[data-recommendation-genre]"),
  recommendationTitle: document.querySelector("[data-recommendation-title]"),
  recommendationAuthor: document.querySelector("[data-recommendation-author]"),
  recommendationLength: document.querySelector("[data-recommendation-length]"),
  saveButton: document.querySelector("[data-save-recommendation]"),
  pickAgainButton: document.querySelector("[data-pick-again]"),
  list: document.querySelector("[data-reading-list]"),
  clearListButton: document.querySelector("[data-clear-list]"),
};

const STORAGE_KEY = "readify-reading-list";

const renderGenres = () => {
  if (!elements.genreSelect) {
    return;
  }

  const genres = [...new Set(books.map((book) => book.genre))].sort();
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    elements.genreSelect.appendChild(option);
  });
};

const pickRandomBook = (genre, length) => {
  const filtered = books.filter((book) => {
    const matchesGenre = !genre || book.genre === genre;
    const matchesLength = !length || book.length === length;
    return matchesGenre && matchesLength;
  });

  if (!filtered.length) {
    return null;
  }

  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
};

const animateRecommendation = () => {
  if (!elements.recommendationCard) {
    return;
  }

  elements.recommendationCard.classList.remove("animate");
  void elements.recommendationCard.offsetWidth;
  elements.recommendationCard.classList.add("animate");
};

const updateRecommendation = (book) => {
  if (
    !elements.recommendationGenre ||
    !elements.recommendationTitle ||
    !elements.recommendationAuthor ||
    !elements.recommendationLength ||
    !elements.saveButton
  ) {
    return;
  }

  if (!book) {
    elements.recommendationGenre.textContent = "No match";
    elements.recommendationTitle.textContent = "Try different filters";
    elements.recommendationAuthor.textContent = "No books fit those selections.";
    elements.recommendationLength.textContent = "";
    elements.saveButton.disabled = true;
    return;
  }

  elements.recommendationGenre.textContent = book.genre;
  elements.recommendationTitle.textContent = book.title;
  elements.recommendationAuthor.textContent = `by ${book.author}`;
  elements.recommendationLength.textContent = `Length: ${book.length}`;
  elements.saveButton.disabled = false;
  elements.saveButton.dataset.bookTitle = book.title;
};

const getReadingList = () => loadFromStorage(STORAGE_KEY, []);

const saveReadingList = (list) => {
  saveToStorage(STORAGE_KEY, list);
  renderReadingList(list);
};

const renderReadingList = (list) => {
  if (!elements.list) {
    return;
  }

  elements.list.innerHTML = "";
  if (!list.length) {
    elements.list.innerHTML = "<li class=\"muted\">No saved books yet.</li>";
    return;
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.className = "reading-list-item";
    li.innerHTML = `
      <span>${item.title}</span>
      <span class="muted">${item.author}</span>
    `;
    elements.list.appendChild(li);
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const genre = elements.genreSelect?.value || "";
  const length = elements.lengthSelect?.value || "";
  const book = pickRandomBook(genre, length);
  updateRecommendation(book);
  animateRecommendation();
};

const handlePickAgain = () => {
  const genre = elements.genreSelect?.value || "";
  const length = elements.lengthSelect?.value || "";
  const book = pickRandomBook(genre, length);
  updateRecommendation(book);
  animateRecommendation();
};

const handleSave = () => {
  if (!elements.saveButton) {
    return;
  }

  const title = elements.saveButton.dataset.bookTitle;
  const selected = books.find((book) => book.title === title);
  if (!selected) {
    return;
  }

  const list = getReadingList();
  const exists = list.some((item) => item.title === selected.title);
  if (!exists) {
    list.push({ title: selected.title, author: selected.author });
    saveReadingList(list);
  }
};

const handleClearList = () => {
  saveReadingList([]);
};

renderGenres();
renderReadingList(getReadingList());

elements.form?.addEventListener("submit", handleSubmit);
elements.pickAgainButton?.addEventListener("click", handlePickAgain);
elements.saveButton?.addEventListener("click", handleSave);
elements.clearListButton?.addEventListener("click", handleClearList);

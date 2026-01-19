const books = [
  {
    title: "The Midnight Archive",
    author: "Elena Marrow",
    genre: "Fantasy",
    cover:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80",
    synopsis:
      "A librarian discovers a hidden archive where books rewrite themselves, sending her on a quest through living stories.",
    sequels: ["Echoes of Ink", "The Atlas of Lanterns"],
    ratings: { Plot: 4.7, Characters: 4.6, Worldbuilding: 4.9, Pacing: 4.4 },
  },
  {
    title: "Coastal Letters",
    author: "Jamal Reid",
    genre: "Contemporary",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80",
    synopsis:
      "Two writers trade letters across a seaside town, uncovering family secrets and new beginnings.",
    sequels: ["Waves Between Us"],
    ratings: { Plot: 4.2, Characters: 4.5, Atmosphere: 4.8, Pacing: 4.1 },
  },
  {
    title: "Signals in the Snow",
    author: "Priya Kapoor",
    genre: "Mystery",
    cover:
      "https://images.unsplash.com/photo-1455885666463-1c5b6ed6d17c?auto=format&fit=crop&w=500&q=80",
    synopsis:
      "A radio host follows a strange broadcast that only appears during blizzards, leading to a decades-old case.",
    sequels: ["The Silent Frequency", "Cold Wire"],
    ratings: { Plot: 4.6, Characters: 4.3, Suspense: 4.8, Pacing: 4.5 },
  },
  {
    title: "The Paper Garden",
    author: "Lina Torres",
    genre: "Romance",
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80",
    synopsis:
      "A florist and a bookbinder rebuild a greenhouse bookstore, finding love and healing among paper petals.",
    sequels: ["Sunlit Stacks"],
    ratings: { Plot: 4.1, Characters: 4.4, Chemistry: 4.7, Pacing: 4.2 },
  },
  {
    title: "Quantum Tides",
    author: "Marcus Vale",
    genre: "Science Fiction",
    cover:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=500&q=80",
    synopsis:
      "A marine physicist manipulates time-laced currents and races to stop a future collapse.",
    sequels: ["Currents of Tomorrow", "Eventide Protocol"],
    ratings: { Plot: 4.5, Characters: 4.2, Science: 4.8, Pacing: 4.4 },
  },
  {
    title: "The Quiet Ladder",
    author: "Nora Whitman",
    genre: "Nonfiction",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80",
    synopsis:
      "A reflective guide to building habits for lifelong learning, told through essays and reader stories.",
    sequels: ["Daily Rungs"],
    ratings: { Insight: 4.7, Structure: 4.3, Practicality: 4.6, Pacing: 4.0 },
  },
];

const elements = {
  grid: document.querySelector("[data-book-grid]"),
  titleInput: document.querySelector("[data-filter-title]"),
  authorInput: document.querySelector("[data-filter-author]"),
  genreSelect: document.querySelector("[data-filter-genre]"),
  clearButton: document.querySelector("[data-clear-filters]"),
  featuredButton: document.querySelector("[data-featured]"),
  modal: document.querySelector("[data-book-modal]"),
  modalCover: document.querySelector("[data-modal-cover]"),
  modalTitle: document.querySelector("[data-modal-title]"),
  modalAuthor: document.querySelector("[data-modal-author]"),
  modalGenre: document.querySelector("[data-modal-genre]"),
  modalSynopsis: document.querySelector("[data-modal-synopsis]"),
  modalSequels: document.querySelector("[data-modal-sequels]"),
  modalRatings: document.querySelector("[data-modal-ratings]"),
};

const normalize = (value) => value.toLowerCase().trim();

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

const buildCard = (book) => {
  const card = document.createElement("article");
  card.className = "card book-card";
  card.innerHTML = `
    <img class="book-cover" src="${book.cover}" alt="${book.title} cover" />
    <div class="book-meta">
      <div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <span class="badge">${book.genre}</span>
    </div>
  `;
  card.addEventListener("click", () => openModal(book));
  return card;
};

const renderBooks = (filteredBooks) => {
  if (!elements.grid) {
    return;
  }

  elements.grid.innerHTML = "";
  if (!filteredBooks.length) {
    elements.grid.innerHTML = "<p>No books match your filters.</p>";
    return;
  }

  filteredBooks.forEach((book) => {
    elements.grid.appendChild(buildCard(book));
  });
};

const applyFilters = () => {
  const titleValue = normalize(elements.titleInput?.value || "");
  const authorValue = normalize(elements.authorInput?.value || "");
  const genreValue = elements.genreSelect?.value || "";

  const filtered = books.filter((book) => {
    const matchesTitle = normalize(book.title).includes(titleValue);
    const matchesAuthor = normalize(book.author).includes(authorValue);
    const matchesGenre = !genreValue || book.genre === genreValue;
    return matchesTitle && matchesAuthor && matchesGenre;
  });

  renderBooks(filtered);
};

const openModal = (book) => {
  if (
    !elements.modal ||
    !elements.modalCover ||
    !elements.modalTitle ||
    !elements.modalAuthor ||
    !elements.modalGenre ||
    !elements.modalSynopsis ||
    !elements.modalSequels ||
    !elements.modalRatings
  ) {
    return;
  }

  elements.modalCover.src = book.cover;
  elements.modalCover.alt = `${book.title} cover`;
  elements.modalTitle.textContent = book.title;
  elements.modalAuthor.textContent = book.author;
  elements.modalGenre.textContent = book.genre;
  elements.modalSynopsis.textContent = book.synopsis;

  elements.modalSequels.innerHTML = "";
  book.sequels.forEach((sequel) => {
    const item = document.createElement("li");
    item.textContent = sequel;
    elements.modalSequels.appendChild(item);
  });

  elements.modalRatings.innerHTML = "";
  Object.entries(book.ratings).forEach(([category, score]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>${score.toFixed(1)}</td>
    `;
    elements.modalRatings.appendChild(row);
  });

  elements.modal.classList.add("is-visible");
  elements.modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  if (!elements.modal) {
    return;
  }

  elements.modal.classList.remove("is-visible");
  elements.modal.setAttribute("aria-hidden", "true");
};

const bindModalEvents = () => {
  if (!elements.modal) {
    return;
  }

  elements.modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
};

const bindFilters = () => {
  elements.titleInput?.addEventListener("input", applyFilters);
  elements.authorInput?.addEventListener("input", applyFilters);
  elements.genreSelect?.addEventListener("change", applyFilters);

  elements.clearButton?.addEventListener("click", () => {
    if (elements.titleInput) {
      elements.titleInput.value = "";
    }
    if (elements.authorInput) {
      elements.authorInput.value = "";
    }
    if (elements.genreSelect) {
      elements.genreSelect.value = "";
    }
    applyFilters();
  });

  elements.featuredButton?.addEventListener("click", () => {
    renderBooks(books.slice(0, 3));
  });
};

renderGenres();
renderBooks(books);
bindFilters();
bindModalEvents();

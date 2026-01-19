// Book Explorer page script.

const books = [
  {
    title: "The Quiet Library",
    author: "Ella Parker",
    genre: "Fiction",
    image: "https://via.placeholder.com/240x320?text=Book+Cover",
    synopsis: "A calm story about rediscovering yourself through books.",
    sequels: ["The Hidden Shelf", "The Midnight Chapter"],
    ratings: [
      { label: "Story", score: "4/5" },
      { label: "Characters", score: "4/5" },
      { label: "Pace", score: "3/5" },
    ],
  },
  {
    title: "Stars Beyond",
    author: "Milo Trent",
    genre: "Sci-Fi",
    image: "https://via.placeholder.com/240x320?text=Book+Cover",
    synopsis: "A crew explores new galaxies and discovers ancient secrets.",
    sequels: ["Echoes of Orion"],
    ratings: [
      { label: "Story", score: "5/5" },
      { label: "Characters", score: "4/5" },
      { label: "Pace", score: "4/5" },
    ],
  },
  {
    title: "Garden Letters",
    author: "Sasha Green",
    genre: "Romance",
    image: "https://via.placeholder.com/240x320?text=Book+Cover",
    synopsis: "Two friends exchange letters and slowly fall in love.",
    sequels: ["Bloom Again"],
    ratings: [
      { label: "Story", score: "4/5" },
      { label: "Characters", score: "5/5" },
      { label: "Pace", score: "4/5" },
    ],
  },
  {
    title: "Mindful Steps",
    author: "Ravi Patel",
    genre: "Non-Fiction",
    image: "https://via.placeholder.com/240x320?text=Book+Cover",
    synopsis: "Practical tips for building calm, focused habits.",
    sequels: ["Mindful Mornings"],
    ratings: [
      { label: "Story", score: "3/5" },
      { label: "Characters", score: "3/5" },
      { label: "Pace", score: "5/5" },
    ],
  },
];

const bookGrid = document.querySelector("[data-book-grid]");
const searchInput = document.querySelector("[data-search]");
const genreSelect = document.querySelector("[data-genre]");

const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalAuthor = document.querySelector("[data-modal-author]");
const modalSynopsis = document.querySelector("[data-modal-synopsis]");
const modalSequels = document.querySelector("[data-modal-sequels]");
const modalRatings = document.querySelector("[data-modal-ratings]");
const modalClose = document.querySelector("[data-modal-close]");

const renderBooks = (items) => {
  if (!bookGrid) {
    return;
  }

  bookGrid.innerHTML = "";

  items.forEach((book) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card book-card";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title} cover" />
      <h3>${book.title}</h3>
      <p class="helper-text">${book.author}</p>
      <span class="badge">${book.genre}</span>
    `;

    card.addEventListener("click", () => openModal(book));
    bookGrid.appendChild(card);
  });
};

const openModal = (book) => {
  if (!modal) {
    return;
  }

  modalTitle.textContent = book.title;
  modalAuthor.textContent = book.author;
  modalSynopsis.textContent = book.synopsis;

  modalSequels.innerHTML = "";
  book.sequels.forEach((sequel) => {
    const item = document.createElement("li");
    item.textContent = sequel;
    modalSequels.appendChild(item);
  });

  modalRatings.innerHTML = "";
  book.ratings.forEach((rating) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${rating.label}</td><td>${rating.score}</td>`;
    modalRatings.appendChild(row);
  });

  modal.classList.add("is-open");
};

const closeModal = () => {
  if (modal) {
    modal.classList.remove("is-open");
  }
};

const filterBooks = () => {
  const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
  const genreValue = genreSelect ? genreSelect.value : "All";

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue);
    const matchesGenre = genreValue === "All" || book.genre === genreValue;
    return matchesSearch && matchesGenre;
  });

  renderBooks(filtered);
};

if (searchInput) {
  searchInput.addEventListener("input", filterBooks);
}

if (genreSelect) {
  genreSelect.addEventListener("change", filterBooks);
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

renderBooks(books);

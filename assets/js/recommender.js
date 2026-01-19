// Random Recommender page script.

const recommendations = [
  { title: "Sky Maps", author: "June Ellis", genre: "Fiction", length: "Short" },
  { title: "Deep Space Lab", author: "Theo Fox", genre: "Sci-Fi", length: "Long" },
  { title: "Soft Mornings", author: "Lia Reed", genre: "Romance", length: "Medium" },
  { title: "Daily Focus", author: "Marin Lee", genre: "Non-Fiction", length: "Short" },
  { title: "Mystery at Willow", author: "Chris Lane", genre: "Mystery", length: "Medium" },
];

const genreSelect = document.querySelector("[data-rec-genre]");
const lengthSelect = document.querySelector("[data-rec-length]");
const pickButton = document.querySelector("[data-pick-button]");
const resultTitle = document.querySelector("[data-rec-title]");
const resultAuthor = document.querySelector("[data-rec-author]");
const listElement = document.querySelector("[data-reading-list]");

const STORAGE_KEY = "readify-reading-list";

const saveReadingList = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const loadReadingList = () => {
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

const renderReadingList = (list) => {
  if (!listElement) {
    return;
  }

  listElement.innerHTML = "";
  list.forEach((book) => {
    const item = document.createElement("li");
    item.textContent = `${book.title} by ${book.author}`;
    listElement.appendChild(item);
  });
};

const pickRecommendation = () => {
  const genre = genreSelect ? genreSelect.value : "All";
  const length = lengthSelect ? lengthSelect.value : "All";

  const filtered = recommendations.filter((book) => {
    const matchesGenre = genre === "All" || book.genre === genre;
    const matchesLength = length === "All" || book.length === length;
    return matchesGenre && matchesLength;
  });

  if (filtered.length === 0) {
    if (resultTitle) {
      resultTitle.textContent = "No match found";
    }
    if (resultAuthor) {
      resultAuthor.textContent = "Try another filter.";
    }
    return;
  }

  const randomBook = filtered[Math.floor(Math.random() * filtered.length)];

  if (resultTitle) {
    resultTitle.textContent = randomBook.title;
  }
  if (resultAuthor) {
    resultAuthor.textContent = `by ${randomBook.author}`;
  }

  const readingList = loadReadingList();
  readingList.push(randomBook);
  saveReadingList(readingList);
  renderReadingList(readingList);
};

if (pickButton) {
  pickButton.addEventListener("click", pickRecommendation);
}

renderReadingList(loadReadingList());

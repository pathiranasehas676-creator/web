// Home page interactions for Readify.

const quotes = [
  {
    text: "A reader lives a thousand lives before he dies.",
    author: "George R.R. Martin",
  },
  {
    text: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
  },
  {
    text: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison",
  },
  {
    text: "Today a reader, tomorrow a leader.",
    author: "Margaret Fuller",
  },
];

const authors = [
  "Jane Austen",
  "James Baldwin",
  "Toni Morrison",
  "Haruki Murakami",
  "Chimamanda Ngozi Adichie",
  "Gabriel García Márquez",
  "Ursula K. Le Guin",
  "Zadie Smith",
  "Octavia E. Butler",
  "Kazuo Ishiguro",
];

const getQuoteElements = () => ({
  quote: document.querySelector("[data-quote-text]"),
  author: document.querySelector("[data-quote-author]"),
});

const renderQuote = (index) => {
  const { quote, author } = getQuoteElements();
  const selected = quotes[index % quotes.length];

  if (quote) {
    quote.textContent = selected.text;
  }

  if (author) {
    author.textContent = selected.author;
  }
};

const startQuoteRotation = () => {
  if (!quotes.length) {
    return;
  }

  let currentIndex = 0;
  renderQuote(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % quotes.length;
    renderQuote(currentIndex);
  }, 5000);
};

const renderAuthorOfTheDay = () => {
  const authorSlot = document.querySelector("[data-author-of-day]");
  if (!authorSlot || !authors.length) {
    return;
  }

  const today = new Date();
  const dayIndex = today.getFullYear() + today.getMonth() + today.getDate();
  const selected = authors[dayIndex % authors.length];
  authorSlot.textContent = selected;
};

const bindNewsletterForm = () => {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) {
    return;
  }

  const input = form.querySelector("input[type='email']");
  const status = form.querySelector("[data-newsletter-status]");
  const storedEmail = loadFromStorage("readify-newsletter-email", "");

  if (input && storedEmail) {
    input.value = storedEmail;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input) {
      return;
    }

    const value = input.value.trim();
    if (!value) {
      return;
    }

    saveToStorage("readify-newsletter-email", value);

    if (status) {
      status.textContent = "Thanks for joining! We saved your email.";
    }

    form.reset();
  });
};

startQuoteRotation();
renderAuthorOfTheDay();
bindNewsletterForm();

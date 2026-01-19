// Home page features for Readify.

// 1) Auto-rotating book quotes.
const quotes = [
  { text: "A room without books is like a body without a soul.", author: "Cicero" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "Reading is to the mind what exercise is to the body.", author: "Joseph Addison" },
];

const quoteText = document.querySelector("[data-quote-text]");
const quoteAuthor = document.querySelector("[data-quote-author]");
let quoteIndex = 0;

const showQuote = () => {
  const quote = quotes[quoteIndex];
  if (quoteText && quoteAuthor) {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
};

showQuote();
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  showQuote();
}, 5000);

// 2) Author of the Day.
const authors = ["Jane Austen", "James Baldwin", "Toni Morrison", "Haruki Murakami"];
const authorOfDay = document.querySelector("[data-author-of-day]");
const authorIndex = new Date().getDate() % authors.length;

if (authorOfDay) {
  authorOfDay.textContent = authors[authorIndex];
}

// 3) Newsletter subscription.
const newsletterForm = document.querySelector("[data-newsletter-form]");
const newsletterMessage = document.querySelector("[data-newsletter-message]");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector("input[name='email']");
    const emailValue = emailInput ? emailInput.value.trim() : "";

    if (!emailValue) {
      if (newsletterMessage) {
        newsletterMessage.textContent = "Please enter a valid email.";
      }
      return;
    }

    localStorage.setItem("readify-newsletter", emailValue);

    if (newsletterMessage) {
      newsletterMessage.textContent = "Thanks for subscribing!";
    }

    if (emailInput) {
      emailInput.value = "";
    }
  });
}

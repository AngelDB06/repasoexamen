/**
 * Represents a book.
 */
class Book {
  /**
   * Create a book.
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} genre - The genre of the book.
   */
  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = false;
    this.readDate = null;
  }
}

/**
 * Represents a list of books.
 */
class BookList {
  constructor() {
    /** @type {Book[]} */
    this.books = [];
    /** @type {Book|null} */
    this.currentBook = null;
    /** @type {Book|null} */
    this.nextBook = null;
    /** @type {Book|null} */
    this.lastBook = null;
  }

  /**
   * Add a book to the list.
   * @param {Book} book
   */
  add(book) {
    this.books.push(book);
    if (!this.currentBook) this.currentBook = book;
    this.updateNextBook();
  }

  /**
   * Finish the current book and move to the next.
   */
  finishCurrentBook() {
    if (!this.currentBook) return;
    this.currentBook.read = true;
    this.currentBook.readDate = new Date();
    this.lastBook = this.currentBook;
    this.currentBook = this.nextBook;
    this.updateNextBook();
  }

  /**
   * Updates the next book to read.
   */
  updateNextBook() {
    this.nextBook = this.books.find(b => !b.read && b !== this.currentBook) || null;
  }

  /**
   * Returns reading statistics.
   * @returns {{read: number, unread: number}}
   */
  get stats() {
    return {
      read: this.books.filter(b => b.read).length,
      unread: this.books.filter(b => !b.read).length
    };
  }
}

if (typeof document !== "undefined") {

  /** @type {BookList} */
  const myList = new BookList();

  document.getElementById('addBookBtn').addEventListener('click', addBook);

  /**
   * Adds a new book from the form inputs.
   */
  function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    if (!title || !author || !genre) return alert('Fill all fields');

    const book = new Book(title, author, genre);
    myList.add(book);
    render();
  }

  /**
   * Renders the book list and statistics to the DOM.
   */
  function render() {
    const list = document.getElementById('list');
    list.innerHTML = '';

    myList.books.forEach((b, i) => {
      list.innerHTML += `
      <div class="book-item">
        <div>
          <strong>${b.title}</strong><br>
          <small>${b.author} — ${b.genre}</small>
        </div>
        <div>
          ${b.read ? 'Read on ' + b.readDate.toDateString() : '<button onclick="finish(' + i + ')">Finish</button>'}
        </div>
      </div>`;
    });

    const stats = document.getElementById('stats');
    stats.innerText = `Books Read: ${myList.stats.read} / ${myList.books.length}`;
  }

  /**
   * Marks a book as finished by index.
   * @param {number} i - Index of the book to finish.
   */
  window.finish = function (i) {
    if (myList.books[i] === myList.currentBook) {
      myList.finishCurrentBook();
      render();
    } else {
      alert('You can only finish the current book!');
    }
  };
}

// Export classes for testing
module.exports = { Book, BookList };

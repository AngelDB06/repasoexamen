class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.read = false;
        this.readDate = null;
    }
}

class BookList {
    constructor() {
        this.books = [];
        this.currentBook = null;
        this.nextBook = null;
        this.lastBook = null;
    }

    add(book) {
        this.books.push(book);
        if (!this.currentBook) this.currentBook = book;
        this.updateNextBook();
    }

    finishCurrentBook() {
        if (!this.currentBook) return;
        this.currentBook.read = true;
        this.currentBook.readDate = new Date();
        this.lastBook = this.currentBook;
        this.currentBook = this.nextBook;
        this.updateNextBook();
    }

    updateNextBook() {
        this.nextBook = this.books.find(b => !b.read && b !== this.currentBook) || null;
    }

    get stats() {
        return {
            read: this.books.filter(b => b.read).length,
            unread: this.books.filter(b => !b.read).length
        };
    }
}

const myList = new BookList();

document.getElementById('addBookBtn').addEventListener('click', addBook);

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    if (!title || !author || !genre) return alert('Fill all fields');

    const book = new Book(title, author, genre);
    myList.add(book);
    render();
}

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

function finish(i) {
    if (myList.books[i] === myList.currentBook) {
        myList.finishCurrentBook();
        render();
    } else {
        alert('You can only finish the current book!');
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Book, BookList };
}

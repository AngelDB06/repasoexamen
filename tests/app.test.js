const { Book, BookList } = require('../src/app'); // Ajusta según cómo exportes las clases

// Mock para Node.js si usamos fecha
global.Date = class extends Date {
    constructor() { super(); this.fixed = true; }
    toDateString() { return "Mon Nov 25 2025"; }
};

test('Book instance should have correct properties', () => {
    const book = new Book('1984', 'Orwell', 'Dystopia');
    expect(book.title).toBe('1984');
    expect(book.author).toBe('Orwell');
    expect(book.genre).toBe('Dystopia');
    expect(book.read).toBe(false);
    expect(book.readDate).toBeNull();
});

test('BookList should add a book correctly', () => {
    const list = new BookList();
    const book = new Book('1984', 'Orwell', 'Dystopia');
    list.add(book);
    expect(list.books.length).toBe(1);
    expect(list.currentBook).toBe(book);
});

test('BookList should finish the current book', () => {
    const list = new BookList();
    const book1 = new Book('1984', 'Orwell', 'Dystopia');
    const book2 = new Book('Brave New World', 'Huxley', 'Sci-Fi');
    list.add(book1);
    list.add(book2);

    list.finishCurrentBook();

    expect(book1.read).toBe(true);
    expect(book1.readDate.toDateString()).toBe("Mon Nov 25 2025");
    expect(list.currentBook).toBe(book2);
    expect(list.lastBook).toBe(book1);
});

test('BookList stats should return correct counts', () => {
    const list = new BookList();
    const book1 = new Book('1984', 'Orwell', 'Dystopia');
    const book2 = new Book('Brave New World', 'Huxley', 'Sci-Fi');
    list.add(book1);
    list.add(book2);

    list.finishCurrentBook();

    const stats = list.stats;
    expect(stats.read).toBe(1);
    expect(stats.unread).toBe(1);
});

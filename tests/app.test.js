const { Book, BookList } = require('../src/app');

test('add book', () => {
  const list = new BookList();
  const book = new Book("A", "B", "C");

  list.add(book);

  expect(list.books.length).toBe(1);
  expect(list.currentBook.title).toBe("A");
});

test('finish current book', () => {
  const list = new BookList();
  const b1 = new Book("A", "B", "C");
  const b2 = new Book("D", "E", "F");

  list.add(b1);
  list.add(b2);

  list.finishCurrentBook();

  expect(b1.read).toBe(true);
  expect(list.currentBook).toBe(b2);
});

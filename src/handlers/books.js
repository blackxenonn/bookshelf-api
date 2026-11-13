
const { nanoid } = require('nanoid');
const books = require('../books');

// POST /books
const addBookHandler = (request, response) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.body || {};

  if (!name) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return response.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};


const getBookByIdHandler = (request, response) => {
  const { bookId } = request.params;

  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return response.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  return response.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
};

const updateBookHandler = (request, response) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.body || {};

  if (!name) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return response.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  return response.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteBookHandler = (request, response) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return response.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(bookIndex, 1);

  return response.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

// GET /books
const getAllBooksHandler = (request, response) => {
  const { name, reading, finished } = request.query;

  let result = [...books];

  // Filter berdasarkan nama buku
  if (name) {
    result = result.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter berdasarkan status membaca
  if (reading !== undefined) {
    result = result.filter(
      (book) => book.reading === (reading === '1')
    );
  }

  // Filter berdasarkan status selesai dibaca
  if (finished !== undefined) {
    result = result.filter(
      (book) => book.finished === (finished === '1')
    );
  }

  // Ambil hanya properti yang diwajibkan untuk daftar buku
  const formattedBooks = result.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return response.status(200).json({
    status: 'success',
    data: {
      books: formattedBooks,
    },
  });
};


module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};

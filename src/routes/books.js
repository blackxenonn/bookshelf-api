
const express = require('express');

const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} = require('../handlers/books');

const router = express.Router();

// Menambahkan buku
router.post('/', addBookHandler);

// Menampilkan seluruh buku
router.get('/', getAllBooksHandler);

// Menampilkan buku berdasarkan ID
router.get('/:bookId', getBookByIdHandler);

// Memperbarui buku berdasarkan ID
router.put('/:bookId', updateBookHandler);

// Menghapus buku berdasarkan ID
router.delete('/:bookId', deleteBookHandler);

module.exports = router;

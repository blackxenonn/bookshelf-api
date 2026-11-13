const express = require('express');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 9000;

// Middleware untuk membaca request body JSON
app.use(express.json());

//Menghubungkan route books
app.use('/books', booksRouter);

// Endpoint utama untuk pemeriksaan server
app.get('/', (request, response) => {
  response.status(200).json({
    status: 'success',
    message: 'Bookshelf API berhasil dijalankan!',
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Bookshelf API berjalan pada http://localhost:${PORT}`);
});

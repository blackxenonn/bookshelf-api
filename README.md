# Bookshelf API

RESTful API sederhana untuk mengelola koleksi buku. Proyek ini dibuat
menggunakan **Node.js** dan **Express.js** sebagai latihan membangun
REST API.

## Fitur

-   Menambahkan buku.
-   Menampilkan seluruh buku.
-   Menampilkan detail buku berdasarkan ID.
-   Memperbarui data buku.
-   Menghapus buku.
-   Mencari buku berdasarkan nama.
-   Memfilter buku berdasarkan status sedang dibaca (`reading`) dan
    selesai dibaca (`finished`).

## Teknologi

-   Node.js
-   Express.js
-   nanoid
-   ESLint

## Persyaratan

Pastikan perangkat sudah memiliki:

-   Node.js
-   npm

## Instalasi dan Menjalankan Proyek

1.  Clone repository:

    ``` bash
    git clone https://github.com/USERNAME/bookshelf-api.git
    ```

    Ganti `USERNAME` dengan username GitHub pemilik repository.

2.  Masuk ke folder proyek:

    ``` bash
    cd bookshelf-api
    ```

3.  Instal dependency:

    ``` bash
    npm install
    ```

4.  Jalankan server:

    ``` bash
    npm run start
    ```

Server berjalan pada:

``` text
http://localhost:9000
```

## Daftar Endpoint

Semua endpoint menggunakan base URL:

``` text
http://localhost:9000
```

  Method     Endpoint            Keterangan
  ---------- ------------------- --------------------------
  `POST`     `/books`            Menambahkan buku
  `GET`      `/books`            Menampilkan seluruh buku
  `GET`      `/books/{bookId}`   Menampilkan detail buku
  `PUT`      `/books/{bookId}`   Memperbarui buku
  `DELETE`   `/books/{bookId}`   Menghapus buku

### 1. Menambahkan Buku

**POST** `/books`

Contoh request body:

``` json
{
  "name": "Buku Catatan",
  "year": 2023,
  "author": "Nama Penulis",
  "summary": "Deskripsi singkat buku.",
  "publisher": "Penerbit",
  "pageCount": 200,
  "readPage": 50,
  "reading": false
}
```

Ganti nilai `readPage` dengan angka, misalnya `50`.

Server akan membuat `id`, `finished`, `insertedAt`, dan `updatedAt`
secara otomatis.

### 2. Menampilkan Seluruh Buku

**GET** `/books`

Contoh response:

``` json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "contohIdBuku",
        "name": "Buku Catatan",
        "publisher": "Penerbit"
      }
    ]
  }
}
```

### 3. Menampilkan Detail Buku

**GET** `/books/{bookId}`

Ganti `{bookId}` dengan ID buku yang ingin ditampilkan.

### 4. Memperbarui Buku

**PUT** `/books/{bookId}`

Gunakan body dengan field yang sama seperti saat menambahkan buku.

### 5. Menghapus Buku

**DELETE** `/books/{bookId}`

Ganti `{bookId}` dengan ID buku yang ingin dihapus.

## Parameter Pencarian dan Filter

Endpoint `GET /books` mendukung parameter query berikut:

  -----------------------------------------------------------------------
  Parameter               Nilai                   Fungsi
  ----------------------- ----------------------- -----------------------
  `name`                  Teks                    Mencari buku
                                                  berdasarkan nama (tidak
                                                  membedakan huruf
                                                  besar/kecil)

  `reading`               `0` atau `1`            Memfilter buku yang
                                                  tidak sedang dibaca
                                                  atau sedang dibaca

  `finished`              `0` atau `1`            Memfilter buku yang
                                                  belum selesai atau
                                                  sudah selesai dibaca
  -----------------------------------------------------------------------

Contoh penggunaan:

``` text
GET /books?name=catatan
GET /books?reading=1
GET /books?finished=0
GET /books?name=buku&reading=1&finished=0
```

Parameter dapat digunakan secara bersamaan.

## Menjalankan Pemeriksaan ESLint

Untuk memeriksa kode menggunakan ESLint:

``` bash
npx eslint .
```

## Struktur Proyek

``` text
bookshelf-api/
├── src/
│   ├── handlers/
│   │   └── books.js
│   ├── routes/
│   │   └── books.js
│   ├── books.js
│   └── server.js
├── .eslintrc.json
├── .gitignore
├── package.json
└── package-lock.json
```

## Pengujian API

Pengujian endpoint dapat dilakukan menggunakan Postman. Proyek ini telah
diuji menggunakan Postman Collection dan Environment yang disediakan
pada materi Dicoding.

## Catatan

-   Data buku disimpan pada array di memori aplikasi. Data akan kembali
    kosong ketika server dihentikan atau dimulai ulang.
-   Folder `node_modules` tidak perlu diunggah ke repository. Dependency
    dapat dipasang kembali dengan menjalankan `npm install`.

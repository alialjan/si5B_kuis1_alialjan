// Impor express
const express = require("express");
const app = express();

// Pasang middleware express.json() untuk membaca body JSON
app.use(express.json());

// Array data awal pupuk (Topik 33: Toko Tani - Pupuk)
let fertilizers = [
  {
    id: 1,
    namaPupuk: "Pupuk Kompos Super",
    jenis: "organik",
    beratKg: 25,
    harga: 60000,
    stok: 40,
  },
  {
    id: 2,
    namaPupuk: "Pupuk Urea Granul",
    jenis: "anorganik",
    beratKg: 50,
    harga: 125000,
    stok: 25,
  },
  {
    id: 3,
    namaPupuk: "Pupuk Kandang Sapi",
    jenis: "organik",
    beratKg: 20,
    harga: 35000,
    stok: 50,
  },
  {
    id: 4,
    namaPupuk: "Pupuk NPK Mutiara",
    jenis: "anorganik",
    beratKg: 1,
    harga: 18000,
    stok: 100,
  },
];

// Variabel id berikutnya
let nextId = 5;

// GET /
// Menampilkan informasi API, data mahasiswa, dan daftar endpoint
app.get("/", (req, res) => {
  res.json({
    nama: "Kgs. Muhammad Alialjan Nama",
    nim: "2428240140",
    kelas: "SI5B",
    topik: "Topik 33 — Toko Tani: Pupuk",
    resource: "/fertilizers",
    endpoints: [
      {
        method: "GET",
        endpoint: "/fertilizers",
        fungsi: "Ambil semua data pupuk",
      },
      {
        method: "GET",
        endpoint: "/fertilizers/:id",
        fungsi: "Ambil satu data pupuk berdasarkan ID",
      },
      {
        method: "GET",
        endpoint: "/fertilizers?jenis=organik",
        fungsi: "Filter pupuk berdasarkan jenis (organik / anorganik)",
      },
      {
        method: "POST",
        endpoint: "/fertilizers",
        fungsi: "Tambah data pupuk baru",
      },
      {
        method: "PUT",
        endpoint: "/fertilizers/:id",
        fungsi: "Ubah seluruh data pupuk berdasarkan ID",
      },
      {
        method: "DELETE",
        endpoint: "/fertilizers/:id",
        fungsi: "Hapus data pupuk berdasarkan ID",
      },
    ],
  });
});

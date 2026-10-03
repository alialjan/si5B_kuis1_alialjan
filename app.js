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

// GET /fertilizers
// GET /fertilizers?jenis=organik
// Mengambil semua data pupuk atau filter berdasarkan query parameter jenis
app.get("/fertilizers", (req, res) => {
  const { jenis } = req.query;

  // Jika ada query filter jenis
  if (jenis) {
    const hasilFilter = fertilizers.filter(
      (item) => item.jenis.toLowerCase() === jenis.toLowerCase()
    );
    return res.status(200).json(hasilFilter);
  }

  // Jika tanpa filter, kembalikan semua data
  res.status(200).json(fertilizers);
});

// GET /fertilizers/:id
// Mengambil satu data pupuk berdasarkan ID
app.get("/fertilizers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pupuk = fertilizers.find((item) => item.id === id);

  // Jika data tidak ditemukan
  if (!pupuk) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  // Jika ditemukan, kirim objek data langsung
  res.status(200).json(pupuk);
});

// POST /fertilizers
// Body: { "namaPupuk": "Pupuk Kompos Super", "jenis": "organik", "beratKg": 25, "harga": 60000, "stok": 40 }
// Menambahkan data pupuk baru
app.post("/fertilizers", (req, res) => {
  const { namaPupuk, jenis, beratKg, harga, stok } = req.body;

  // Validasi: field wajib tidak boleh kosong
  if (
    !namaPupuk ||
    !jenis ||
    beratKg === undefined ||
    beratKg === null ||
    harga === undefined ||
    harga === null
  ) {
    return res.status(400).json({
      status: "error",
      message: "namaPupuk, jenis, beratKg, dan harga wajib diisi",
      data: null,
    });
  }

  // Validasi: jenis harus bernilai 'organik' atau 'anorganik'
  if (jenis !== "organik" && jenis !== "anorganik") {
    return res.status(400).json({
      status: "error",
      message: "jenis harus bernilai 'organik' atau 'anorganik'",
      data: null,
    });
  }

  // Validasi: tipe data angka
  if (typeof beratKg !== "number" || typeof harga !== "number" || isNaN(beratKg) || isNaN(harga)) {
    return res.status(400).json({
      status: "error",
      message: "beratKg dan harga harus berupa angka",
      data: null,
    });
  }

  // Buat data baru dengan id otomatis
  const baru = {
    id: nextId++,
    namaPupuk: typeof namaPupuk === "string" ? namaPupuk.trim() : namaPupuk,
    jenis,
    beratKg,
    harga,
    stok: stok !== undefined ? Number(stok) : 0,
  };

  fertilizers.push(baru);

  // Response berhasil ditambahkan (201)
  res.status(201).json({
    status: "success",
    message: "Data berhasil ditambahkan",
    data: baru,
  });
});

// PUT /fertilizers/:id
// Body: { "namaPupuk": "Pupuk Kompos Super", "jenis": "organik", "beratKg": 25, "harga": 60000, "stok": 40 }
// Mengubah seluruh data pupuk berdasarkan ID
app.put("/fertilizers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = fertilizers.findIndex((item) => item.id === id);

  // Jika data tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const { namaPupuk, jenis, beratKg, harga, stok } = req.body;

  // Validasi: field wajib tidak boleh kosong
  if (
    !namaPupuk ||
    !jenis ||
    beratKg === undefined ||
    beratKg === null ||
    harga === undefined ||
    harga === null
  ) {
    return res.status(400).json({
      status: "error",
      message: "namaPupuk, jenis, beratKg, dan harga wajib diisi",
      data: null,
    });
  }

  // Validasi: jenis harus bernilai 'organik' atau 'anorganik'
  if (jenis !== "organik" && jenis !== "anorganik") {
    return res.status(400).json({
      status: "error",
      message: "jenis harus bernilai 'organik' atau 'anorganik'",
      data: null,
    });
  }

  // Validasi: tipe data angka
  if (typeof beratKg !== "number" || typeof harga !== "number" || isNaN(beratKg) || isNaN(harga)) {
    return res.status(400).json({
      status: "error",
      message: "beratKg dan harga harus berupa angka",
      data: null,
    });
  }

  // Penggantian penuh data dengan mempertahankan id
  fertilizers[index] = {
    id,
    namaPupuk: typeof namaPupuk === "string" ? namaPupuk.trim() : namaPupuk,
    jenis,
    beratKg,
    harga,
    stok: stok !== undefined ? Number(stok) : 0,
  };

  // Response berhasil diubah (200)
  res.status(200).json({
    status: "success",
    message: "Data berhasil diubah",
    data: fertilizers[index],
  });
});

// DELETE /fertilizers/:id
// Menghapus data pupuk berdasarkan ID
app.delete("/fertilizers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = fertilizers.findIndex((item) => item.id === id);

  // Jika data tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  // Hapus data dari array
  fertilizers.splice(index, 1);

  // Response berhasil dihapus (200)
  res.status(200).json({
    status: "success",
    message: `Data pupuk dengan id ${id} berhasil dihapus`,
    data: null,
  });
});

// Middleware catch-all 404 untuk route yang tidak terdaftar
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
});

// Menjalankan server di port lokal dan export app untuk Vercel
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server berjalan di http://localhost:${PORT}`)
  );
}

module.exports = app;





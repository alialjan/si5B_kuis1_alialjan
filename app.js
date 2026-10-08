require("dotenv").config();
const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const fertilizerRoutes = require("./Routes/fertilizerRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    nama: "Kgs. Muhammad Alialjan Nama",
    nim: "2428240140",
    kelas: "SI5B",
    topik: "Topik 33 — Toko Tani: Pupuk",
    resource: "/fertilizers",
    endpoints: [
      { method: "GET", endpoint: "/fertilizers", fungsi: "Ambil semua data pupuk" },
      { method: "GET", endpoint: "/fertilizers/:id", fungsi: "Ambil satu data pupuk berdasarkan ID" },
      { method: "GET", endpoint: "/fertilizers?jenis=organik", fungsi: "Filter pupuk berdasarkan jenis (organik / anorganik)" },
      { method: "POST", endpoint: "/fertilizers", fungsi: "Tambah data pupuk baru" },
      { method: "PUT", endpoint: "/fertilizers/:id", fungsi: "Ubah seluruh data pupuk berdasarkan ID" },
      { method: "DELETE", endpoint: "/fertilizers/:id", fungsi: "Hapus data pupuk berdasarkan ID" },
    ],
  });
});

app.use("/fertilizers", fertilizerRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}
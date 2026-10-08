const Fertilizer = require("../models/fertilizerModel");

const tidakDitemukan = (res, id) =>
  res.status(404).json({ status: "error", message: `Data dengan id ${id} tidak ditemukan`, data: null });

const validasi = ({ namaPupuk, jenis, beratKg, harga }) => {
  if (!namaPupuk || !jenis || beratKg === undefined || beratKg === null || harga === undefined || harga === null)
    return "namaPupuk, jenis, beratKg, dan harga wajib diisi";
  if (jenis !== "organik" && jenis !== "anorganik")
    return "jenis harus bernilai 'organik' atau 'anorganik'";
  if (typeof beratKg !== "number" || typeof harga !== "number" || isNaN(beratKg) || isNaN(harga))
    return "beratKg dan harga harus berupa angka";
  return null;
};

const getAllFertilizers = (req, res) => res.status(200).json(Fertilizer.getAll(req.query.jenis));

const getFertilizerById = (req, res) => {
  const id = parseInt(req.params.id);
  const pupuk = Fertilizer.getById(id);
  if (!pupuk) return tidakDitemukan(res, id);
  res.status(200).json(pupuk);
};

const createFertilizer = (req, res) => {
  const body = req.body || {};
  const pesan = validasi(body);
  if (pesan) return res.status(400).json({ status: "error", message: pesan, data: null });
  res.status(201).json({ status: "success", message: "Data berhasil ditambahkan", data: Fertilizer.create(body) });
};

const updateFertilizer = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Fertilizer.getById(id)) return tidakDitemukan(res, id);
  const body = req.body || {};
  const pesan = validasi(body);
  if (pesan) return res.status(400).json({ status: "error", message: pesan, data: null });
  res.status(200).json({ status: "success", message: "Data berhasil diubah", data: Fertilizer.update(id, body) });
};

const deleteFertilizer = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Fertilizer.remove(id)) return tidakDitemukan(res, id);
  res.status(200).json({ status: "success", message: `Data pupuk dengan id ${id} berhasil dihapus`, data: null });
};

module.exports = { getAllFertilizers, getFertilizerById, createFertilizer, updateFertilizer, deleteFertilizer };
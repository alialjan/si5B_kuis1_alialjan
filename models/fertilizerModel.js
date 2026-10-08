let fertilizers = [
  { id: 1, namaPupuk: "Pupuk Kompos Super", jenis: "organik", beratKg: 25, harga: 60000, stok: 40 },
  { id: 2, namaPupuk: "Pupuk Urea Granul", jenis: "anorganik", beratKg: 50, harga: 125000, stok: 25 },
  { id: 3, namaPupuk: "Pupuk Kandang Sapi", jenis: "organik", beratKg: 20, harga: 35000, stok: 50 },
  { id: 4, namaPupuk: "Pupuk NPK Mutiara", jenis: "anorganik", beratKg: 1, harga: 18000, stok: 100 },
];
let nextId = 5;

const getAll = (jenis) =>
  jenis ? fertilizers.filter((i) => i.jenis.toLowerCase() === jenis.toLowerCase()) : fertilizers;

const getById = (id) => fertilizers.find((i) => i.id === id);

const create = ({ namaPupuk, jenis, beratKg, harga, stok }) => {
  const baru = {
    id: nextId++,
    namaPupuk: typeof namaPupuk === "string" ? namaPupuk.trim() : namaPupuk,
    jenis, beratKg, harga,
    stok: stok !== undefined ? Number(stok) : 0,
  };
  fertilizers.push(baru);
  return baru;
};

const update = (id, { namaPupuk, jenis, beratKg, harga, stok }) => {
  const index = fertilizers.findIndex((i) => i.id === id);
  if (index === -1) return null;
  fertilizers[index] = {
    id,
    namaPupuk: typeof namaPupuk === "string" ? namaPupuk.trim() : namaPupuk,
    jenis, beratKg, harga,
    stok: stok !== undefined ? Number(stok) : 0,
  };
  return fertilizers[index];
};

const remove = (id) => {
  const index = fertilizers.findIndex((i) => i.id === id);
  if (index === -1) return false;
  fertilizers.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
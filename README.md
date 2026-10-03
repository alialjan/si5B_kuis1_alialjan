# Tugas 1 — RESTful API Murni dengan Express.js

## Informasi Mahasiswa
- **Nama**: Kgs. Muhammad Alialjan Nama
- **NIM**: 2428240140
- **Kelas**: SI5B
- **Nomor Topik**: Topik 33
- **Topik**: Toko Tani
- **Resource**: Pupuk (`/fertilizers`)
- **Parameter Filter**: `jenis` (`GET /fertilizers?jenis=organik`)

---

## Tautan Deploy & Repository
- **Deploy Vercel**: [https://tugas1-restful-2428240140.vercel.app](https://tugas1-restful-2428240140.vercel.app)
- **Repository GitHub**: [https://github.com/alialjan/tugas1-restful-2428240140](https://github.com/alialjan/tugas1-restful-2428240140)

---

## Cara Menjalankan Secara Lokal

1. **Clone repository**:
   ```bash
   git clone https://github.com/alialjan/tugas1-restful-2428240140.git
   cd tugas1-restful-2428240140
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server**:
   - Mode Development (dengan nodemon):
     ```bash
     npm run dev
     ```
   - Mode Standar:
     ```bash
     npm start
     ```

4. **Akses server**:
   Server berjalan di `http://localhost:3000`.

---

## Struktur Data Resource Pupuk

| Field | Tipe | Wajib | Keterangan / Nilai |
| --- | --- | --- | --- |
| `id` | `number` | Otomatis | Dibuat otomatis oleh server |
| `namaPupuk` | `string` | Ya (*) | Nama produk pupuk |
| `jenis` | `string` | Ya (*) | `"organik"` atau `"anorganik"` |
| `beratKg` | `number` | Ya (*) | Berat kemasan dalam satuan kilogram |
| `harga` | `number` | Ya (*) | Harga per kemasan |
| `stok` | `number` | Tidak | Jumlah stok tersedia (default: `0`) |

---

## Daftar Endpoint RESTful API

| No | Method | Endpoint | Fungsi | Status Sukses | Status Gagal |
| --- | --- | --- | --- | --- | --- |
| 1 | `GET` | `/` | Menampilkan informasi API dan daftar endpoint | `200 OK` | — |
| 2 | `GET` | `/fertilizers` | Mengambil seluruh data pupuk | `200 OK` | — |
| 3 | `GET` | `/fertilizers/:id` | Mengambil satu data pupuk berdasarkan ID | `200 OK` | `404 Not Found` |
| 4 | `GET` | `/fertilizers?jenis=organik` | Filter data pupuk berdasarkan jenis (`organik` / `anorganik`) | `200 OK` | — |
| 5 | `POST` | `/fertilizers` | Menambahkan data pupuk baru | `201 Created` | `400 Bad Request` |
| 6 | `PUT` | `/fertilizers/:id` | Mengubah seluruh data pupuk berdasarkan ID | `200 OK` | `400 Bad Request` / `404 Not Found` |
| 7 | `DELETE` | `/fertilizers/:id` | Menghapus data pupuk berdasarkan ID | `200 OK` | `404 Not Found` |
| 8 | `ALL` | `*` (Route tak dikenal) | Middleware penanganan 404 (catch-all) | — | `404 Not Found` |

---

## Contoh Format Request & Response

### 1. GET /fertilizers (Ambil Semua Data)
- **Response** (`200 OK`):
  ```json
  [
    {
      "id": 1,
      "namaPupuk": "Pupuk Kompos Super",
      "jenis": "organik",
      "beratKg": 25,
      "harga": 60000,
      "stok": 40
    }
  ]
  ```

### 2. GET /fertilizers/:id (Ambil Satu Data)
- **Response Sukses** (`200 OK`):
  ```json
  {
    "id": 1,
    "namaPupuk": "Pupuk Kompos Super",
    "jenis": "organik",
    "beratKg": 25,
    "harga": 60000,
    "stok": 40
  }
  ```
- **Response Gagal** (`404 Not Found`):
  ```json
  {
    "status": "error",
    "message": "Data dengan id 99 tidak ditemukan",
    "data": null
  }
  ```

### 3. GET /fertilizers?jenis=organik (Filter Data)
- **Response** (`200 OK`):
  ```json
  [
    {
      "id": 1,
      "namaPupuk": "Pupuk Kompos Super",
      "jenis": "organik",
      "beratKg": 25,
      "harga": 60000,
      "stok": 40
    },
    {
      "id": 3,
      "namaPupuk": "Pupuk Kandang Sapi",
      "jenis": "organik",
      "beratKg": 20,
      "harga": 35000,
      "stok": 50
    }
  ]
  ```

### 4. POST /fertilizers (Tambah Data Baru)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "namaPupuk": "Pupuk NPK Booster",
    "jenis": "anorganik",
    "beratKg": 5,
    "harga": 45000,
    "stok": 30
  }
  ```
- **Response Sukses** (`201 Created`):
  ```json
  {
    "status": "success",
    "message": "Data berhasil ditambahkan",
    "data": {
      "id": 5,
      "namaPupuk": "Pupuk NPK Booster",
      "jenis": "anorganik",
      "beratKg": 5,
      "harga": 45000,
      "stok": 30
    }
  }
  ```
- **Response Gagal Validasi** (`400 Bad Request`):
  ```json
  {
    "status": "error",
    "message": "namaPupuk, jenis, beratKg, dan harga wajib diisi",
    "data": null
  }
  ```

### 5. PUT /fertilizers/:id (Ubah Seluruh Data)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "namaPupuk": "Pupuk Kompos Premium",
    "jenis": "organik",
    "beratKg": 30,
    "harga": 70000,
    "stok": 45
  }
  ```
- **Response Sukses** (`200 OK`):
  ```json
  {
    "status": "success",
    "message": "Data berhasil diubah",
    "data": {
      "id": 1,
      "namaPupuk": "Pupuk Kompos Premium",
      "jenis": "organik",
      "beratKg": 30,
      "harga": 70000,
      "stok": 45
    }
  }
  ```
- **Response Gagal (ID Tidak Ada)** (`404 Not Found`):
  ```json
  {
    "status": "error",
    "message": "Data dengan id 99 tidak ditemukan",
    "data": null
  }
  ```

### 6. DELETE /fertilizers/:id (Hapus Data)
- **Response Sukses** (`200 OK`):
  ```json
  {
    "status": "success",
    "message": "Data pupuk dengan id 1 berhasil dihapus",
    "data": null
  }
  ```
- **Response Gagal (ID Tidak Ada)** (`404 Not Found`):
  ```json
  {
    "status": "error",
    "message": "Data dengan id 99 tidak ditemukan",
    "data": null
  }
  ```

### 7. Endpoint Tak Dikenal (Catch-all 404)
- **Response** (`404 Not Found`):
  ```json
  {
    "status": "error",
    "message": "Endpoint tidak ditemukan",
    "data": null
  }
  ```

const notFound = (req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan", data: null });
};

const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed" || (err instanceof SyntaxError && err.status === 400)) {
    return res.status(400).json({ status: "error", message: "Format JSON tidak valid", data: null });
  }
  console.error(err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.status ? err.message : "Terjadi kesalahan pada server",
    data: null,
  });
};

module.exports = { notFound, errorHandler };
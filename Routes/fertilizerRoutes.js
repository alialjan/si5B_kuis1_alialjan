const express = require("express");
const router = express.Router();
const controller = require("../controllers/fertilizerController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get("/", controller.getAllFertilizers);
router.get("/:id", controller.getFertilizerById);
router.post("/", cekApiKey, controller.createFertilizer);
router.put("/:id", cekApiKey, controller.updateFertilizer);
router.delete("/:id", cekApiKey, controller.deleteFertilizer);

module.exports = router;
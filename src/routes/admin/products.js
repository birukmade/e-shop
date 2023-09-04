const express = require("express");
const multer = require("multer");

const { handleErrors } = require("./middlewares");
const producsRepo = require("../../../repository/products");
const productForm = require("../../../views/admin/products/new");
const { validateTitle, validatePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});
router.get("/admin/products/new", (req, res) => {
  res.send(productForm({}));
});
router.post(
  "/admin/products/new",
  upload.single("image"),
  validateTitle,
  validatePrice,
  handleErrors(productForm),
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await producsRepo.create({ title, price, image });
    res.send("product created");
  }
);

module.exports = router;

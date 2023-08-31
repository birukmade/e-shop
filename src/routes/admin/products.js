const express = require("express");
const producsRepo = require("../../../repository/products");
const productForm = require("../../../views/admin/products/new");

const router = express.Router();

router.get("/admin/products", (req, res) => {});
router.get("/admin/products/new", (req, res) => {
  res.send(productForm({}));
});

module.exports = router;

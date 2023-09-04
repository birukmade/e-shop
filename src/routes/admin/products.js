const express = require("express");
const { validationResult } = require("express-validator");
const producsRepo = require("../../../repository/products");
const productForm = require("../../../views/admin/products/new");
const { validateTitle, validatePrice } = require("./validators");

const router = express.Router();

router.get("/admin/products", (req, res) => {});
router.get("/admin/products/new", (req, res) => {
  res.send(productForm({}));
});
router.post("/admin/products/new", validateTitle, validatePrice, (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  res.send("product created");
});

module.exports = router;

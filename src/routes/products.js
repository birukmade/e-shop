const express = require("express");
const productsRepo = require("../../repository/products");
const productsPage = require("../../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsPage({ products }));
});

module.exports = router;

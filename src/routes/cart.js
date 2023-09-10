const express = require("express");
const cartRepo = require("../../repository/cart");
const productsRepo = require("../../repository/products");
const showCartItems = require("../../views/cart/show");

const router = express.Router();

router.post("/cart/products", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartRepo.update(cart.id, { items: cart.items });
  res.send("added to cart");
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartRepo.getOne(req.session.cartId);

  for (item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(showCartItems({ items: cart.items }));
});

module.exports = router;

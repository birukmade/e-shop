const express = require("express");
const cartRepo = require("../../repository/cart");

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

module.exports = router;

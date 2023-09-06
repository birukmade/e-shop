const express = require("express");
const multer = require("multer");

const { handleErrors, requireAuth } = require("./middlewares");
const producsRepo = require("../../../repository/products");
const productForm = require("../../../views/admin/products/new");
const editProductForm = require("../../../views/admin/products/edit");
const productsList = require("../../../views/admin/products/index");
const { validateTitle, validatePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await producsRepo.getAll();
  res.send(productsList({ products }));
});
router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productForm({}));
});
router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  validateTitle,
  validatePrice,
  handleErrors(productForm),
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await producsRepo.create({ title, price, image });
    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const product = await producsRepo.getOne(req.params.id);

  if (!product) {
    return res.send("product not found");
  }

  res.send(editProductForm({ product }));
});

router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  validateTitle,
  validatePrice,
  handleErrors(editProductForm, async (req) => {
    const product = await producsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;
    if (req.image) {
      changes.image = req.image;
    }
    try {
      await producsRepo.update(req.params.id, changes);
    } catch (err) {
      res.send("could not find product");
    }

    res.redirect("/admin/products");
  }
);

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await producsRepo.delete(req.params.id);

  res.redirect("/admin/products");
});

module.exports = router;

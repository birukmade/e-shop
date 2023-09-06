const express = require("express");

const usersRepo = require("../../../repository/users");
const { handleErrors } = require("./middlewares");
const signupForm = require("../../../views/admin/auth/signup");
const signinForm = require("../../../views/admin/auth/signin");
const {
  validateEmail,
  validatePassowrd,
  validateConfirmPassword,
  validateEamilisRegistered,
  validatePasswordForEmail,
} = require("./validators");

const router = express.Router();
router.get("/signup", (req, res) => {
  res.send(signupForm({ req }));
});

router.post(
  "/signup",
  validateEmail,
  validatePassowrd,
  validateConfirmPassword,
  handleErrors(signupForm),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    return res.redirect("/admin/products");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  res.send("you are signed out");
});

router.get("/signin", (req, res) => {
  res.send(signinForm({}));
});

router.post(
  "/signin",
  validateEamilisRegistered,
  validatePasswordForEmail,
  handleErrors(signinForm),
  async (req, res) => {
    const { email } = req.body;
    const userFound = await usersRepo.getOneBy({ email });

    req.session.userId = userFound.id;
    return res.redirect("/admin/products");
  }
);

module.exports = router;

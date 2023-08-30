const express = require("express");
const { validationResult, body } = require("express-validator");
const usersRepo = require("../../../repository/users");
const signupForm = require("../../../views/admin/auth/signup");
const signinForm = require("../../../views/admin/auth/signin");
const {
  validateEmail,
  validatePassowrd,
  validateConfirmPassword,
  validateEamilisRegistered,
  validatePasswordForEmail,
} = require("./validators");
const { error } = require("console");

const router = express.Router();
router.get("/signup", (req, res) => {
  res.send(signupForm({ req }));
});

router.post(
  "/signup",
  validateEmail,
  validatePassowrd,
  validateConfirmPassword,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(signupForm({ req, errors }));
    }
    const { email, password, confirmPassword } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    return res.send("Account created");
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(signinForm({ errors }));
    }
    const { email } = req.body;
    const userFound = await usersRepo.getOneBy({ email });

    req.session.userId = userFound.id;
    return res.send("you have signed in.");
  }
);

module.exports = router;

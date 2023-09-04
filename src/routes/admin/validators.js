const usersRepo = require("../../../repository/users");
const { body } = require("express-validator");

module.exports = {
  validateEmail: body("email")
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const userExists = await usersRepo.getOneBy({ email });
      if (userExists) {
        throw new Error("email already exists");
      }
    }),
  validatePassowrd: body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("must be between 4 and 20 characters"),
  validateConfirmPassword: body("confirmPassword")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("must be between 4 and 20 characters")
    .custom((confirmPassword, { req }) => {
      if (req.body.password !== confirmPassword) {
        throw new Error("passwords must match");
      }
    }),

  validateEamilisRegistered: body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("email not valid")
    .custom(async (email) => {
      const userFound = await usersRepo.getOneBy({ email });
      if (!userFound) {
        throw new Error("email does not exist");
      }
    }),
  validatePasswordForEmail: body("password")
    .trim()
    .custom(async (password, { req }) => {
      const userExists = await usersRepo.getOneBy({ email: req.body.email });
      if (!userExists) {
        throw new Error("invalid password");
      }

      const passwordIsValid = await usersRepo.comparePasswords(
        userExists.password,
        password
      );
      if (!passwordIsValid) {
        throw new Error("incorrect password");
      }
    }),
  validateTitle: body("title")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("must be between 3 and 20 characters"),
  validatePrice: body("price").trim().toFloat().isFloat({ min: 0.1 }),
};

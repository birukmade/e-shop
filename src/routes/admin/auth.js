const express = require("express");
const usersRepo = require("../../../repository/users");

const router = express.Router();
router.get("/signup", (req, res) => {
  res.send(`
    <div>
      <form method="post">
          <input type="" name="email" placeholder="email" /> 
          <input type="password" name="password" placeholder="password" /> 
          <input type="password" name="confirmPassword" placeholder="confirm passowrd" /> 
          <button type="submit">Sign Up</button>
      </form>
    </div>
    `);
});

router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const userExists = await usersRepo.getOneBy({ email });
  if (userExists) {
    return res.send("user with the given email already exists.");
  }

  if (password !== confirmPassword) {
    return res.send("passwords must match");
  }

  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id;
  return res.send("Account created");
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.send("you are signed out");
});

router.get("/signin", (req, res) => {
  res.send(`
      <div>
        <form method="post">
            <input type="" name="email" placeholder="email" /> 
            <input type="password" name="password" placeholder="password" /> 
            <button type="submit">Sign in</button>
        </form>
      </div>
      `);
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const userFound = await usersRepo.getOneBy({ email });
  if (!userFound) {
    return res.send("email is not recognized.");
  }

  const passwordIsValid = await usersRepo.comparePasswords(
    userFound.password,
    password
  );

  if (!passwordIsValid) {
    return res.send("incorrect password.");
  }

  req.session.userId = userFound.id;
  return res.send("you have signed in.");
});

module.exports = router;

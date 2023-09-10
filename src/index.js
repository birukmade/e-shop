const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductsRoute = require("./routes/admin/products");
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["supersecretkey"] }));

app.use(authRouter);
app.use(adminProductsRoute);
app.use(productsRoute);
app.use(cartRoute);

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

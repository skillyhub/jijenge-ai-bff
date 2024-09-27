require("dotenv").config();
const express = require("express");
const app = express();

// middlewares
app.use(express.json());

// app routes
app.use("/bff/products", require("./routes/product.routes"));

// port number
const PORT = process.env.PORT || 3333;

// lch
app.listen(PORT, () => {
  console.log("BFF listening on port " + PORT);
});

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// ------- middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors("*"));

// ------- routes
const productRoutes = require("./routes/product.routes");
const criteriaRoutes = require("./routes/criteria.routes");
const transactionRoutes = require("./routes/transaction.routes");
const suggestionRoutes = require("./routes/suggestion.routes");
const financeRoutes = require("./routes/finance.routes");

// ------- app routes
app.use("/bff/products", productRoutes);
app.use("/bff/criterias", criteriaRoutes);
app.use("/bff/transactions", transactionRoutes);
app.use("/bff/suggestions", suggestionRoutes);
app.use("/bff/finances", financeRoutes);

// ------- port number
const PORT = process.env.PORT || 3333;

// ------ server listening
app.listen(PORT, () => {
  console.log("BFF listening on port " + PORT);
});

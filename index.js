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
const criteriaRoutes = require("./routes/criteria.routes");
const transactionRoutes = require("./routes/transaction.routes");
const recommendationRoutes = require("./routes/recommendation.routes");

// ------- app routes
app.use("/bff/criterias", criteriaRoutes);
app.use("/bff/transactions", transactionRoutes);
app.use("/bff/recommendations", recommendationRoutes);

// ------- port number
const PORT = process.env.PORT || 3333;

// ------ server listening
app.listen(PORT, () => {
  console.log("BFF listening on port " + PORT);
});

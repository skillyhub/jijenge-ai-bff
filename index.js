require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// ------- middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors("*"));

// ------- routes
const criteriaRoutes = require("./routes/criteria.routes");
const transactionRoutes = require("./routes/transaction.routes");

// ------- app routes
app.use("/criterias", criteriaRoutes);
app.use("/transactions", transactionRoutes);

// ------- port number
const PORT = process.env.PORT || 9000;

// ------ server listening
app.listen(PORT, async () => {
  // connect to the db
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("BFF listening on port " + PORT);
});

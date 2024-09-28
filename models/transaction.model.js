const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  phoneNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  amount: { type: Number, default: 0 },
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
});

module.exports = model("Transaction", transactionSchema);

const { Schema, model } = require("mongoose");

const criteriaSchema = new Schema({
  service: { type: String, required: true },
  numberOfTransactions: { type: Number, required: true },
  minimumMonthlyAmount: { type: Number, required: true },
});

module.exports = model("Criteria", criteriaSchema);

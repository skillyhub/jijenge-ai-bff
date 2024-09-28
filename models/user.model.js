const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  business: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() },
});

module.exports = model("User", userSchema);

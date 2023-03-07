const mongoose = require("mongoose");

const adminAddSchema = mongoose.Schema({
  Company_name: String,
  Position: String,
  Location: String,
  Contract: String,
});

const AdminAddModal = mongoose.model("AdminPost", adminAddSchema);

module.exports = { AdminAddModal };

const mongoose = require("mongoose");

const userRegisterSchema = mongoose.Schema({
  email: String,
  password: String,
  admin: Boolean,
  name:String
});

const UserRegisterModal = mongoose.model("registerdb", userRegisterSchema);

module.exports = { UserRegisterModal };

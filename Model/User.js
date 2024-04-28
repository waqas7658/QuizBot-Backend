const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
    unique: [true, "User name already used"],
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Email already exist"],
  },
  password: {
    type: String,
    require: true,
  },
  confirm_password: {
    type: String,
    require: true,
  },

});
module.exports = mongoose.model("User", userSchema);

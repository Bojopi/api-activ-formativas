const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = Schema({
  username: { type: String, required: true },
  name: { type: String },
  lastname: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const { __v, password, ...data } = this.toObject();
  return data;
};

module.exports = model("User", UserSchema);

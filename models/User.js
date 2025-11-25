const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash password
userSchema.pre("save", async function () {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export User model
module.exports = mongoose.model("User", userSchema);

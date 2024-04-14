const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    resetCode: { type: String },
    resetCodeExpIn: { type: Date },
  },
  { timestamps: true }
);

// export {UserSchema}

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true, enum: ["client", "freelancer"] },
    isEmailVerified: { type: Boolean, default: false },
    resetCode: { type: String },
    resetCodeExpIn: { type: Date },
    gender: { type: String, enum: ["male", "female"] },
    bio: { type: String },
    skills: { type: Array },
    photo: { type: String },
    country: { type: String },
    state: { type: String },
    zip: { type: String },
    phone: { type: String },
    hourRate: { type: Number },
    companyLogo: { type: String },
    companyName: { type: String },
    companyDesc: { type: String },
    companyInterests: { type: Array },
    companyLinks: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

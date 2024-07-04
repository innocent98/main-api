const mongoose = require("mongoose");
const { prohibitedPhrases } = require("../utils/prohibitedPhrases");

const WorkSchema = new mongoose.Schema({
  img: { type: String, required: true },
  projName: { type: String, required: true },
  projDesc: { type: String, required: true },
});

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
    bio: {
      type: String,
      validate: {
        validator: function (v) {
          return !prohibitedPhrases.some((pattern) => pattern.test(v));
        },
        message: (props) => `Bio contains prohibited content: ${props.value}`,
      },
    },
    skills: { type: Array },
    photo: { type: String },
    country: { type: String },
    state: { type: String },
    zip: { type: String },
    phone: { type: String },
    hourRate: { type: Number },
    myWorks: { type: [WorkSchema], default: [] },
    companyLogo: { type: String },
    companyName: { type: String },
    companyDesc: { type: String },
    companyInterests: { type: [String] },
    companyLinks: { type: [String] },
    availableBalance: { type: Number },
    cryptoBalance: { type: Number },
    walletAddress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

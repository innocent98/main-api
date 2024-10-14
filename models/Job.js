const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobPoster: { type: String },
    jobCategory: { type: String, required: true },
    serviceType: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobDesc: { type: String, required: true },
    requiredSkills: { type: String, required: true },
    noToHire: { type: Number, required: true },
    budget: { type: Number, required: true },
    country: { type: String, required: true },
    startDate: { type: Date, required: true },
    duration: { type: String, required: true },
    applicants: { type: Array },
    jobStatus: { type: String, enum: ["open", "closed"], default: "open" },
    status: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

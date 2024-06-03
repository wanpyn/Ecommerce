const mongoose = require("mongoose");

const discountCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "amount"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageLimit: {
      type: Number,
      default: null,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

discountCodeSchema.methods.isExpired = function () {
  return new Date() > this.expiryDate;
};

discountCodeSchema.methods.canBeUsed = function () {
  return (
    this.isActive &&
    !this.isExpired() &&
    (this.usageLimit === null || this.usageCount < this.usageLimit)
  );
};

module.exports = mongoose.model("DiscountCode", discountCodeSchema);

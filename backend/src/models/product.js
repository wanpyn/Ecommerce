const mongoose = require("../configuration/dbConfig");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    manufacturingPrice: {
      type: Number,
      required: true,
      min: 1,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 1,
    },
    discountingPrice: {
      type: Number,
      required: true,
      min: 1,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    availableStock: {
      type: Number,
      min: 1,
      default: 1,
    },
    image: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    ratings: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

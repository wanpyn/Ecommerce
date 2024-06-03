const mongoose = require("mongoose");
const { Schema } = mongoose;

const salesSchema = new Schema(
  {
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productIDs: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantitySold: {
          type: Number,
          required: true,
        },
        manufacturingPrice: {
          type: Number,
          required: true,
        },
        sellingPrice: {
          type: Number,
          required: true,
        },
        discountingPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    discountCode: {
      type: String,
    },
    discountAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;

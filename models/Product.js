const mongoose = require("mongoose");
require("./Comment");
require("./Brand");
require("./Category");

// const productSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: mongoose.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     brand: {
//       type: mongoose.Types.ObjectId,
//       ref: "Brand",
//       required: false,
//     },
//     code: {
//       type: Number,
//       required: false,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     size: {
//       type: Array,
//       required: false,
//     },
//     color: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     purchaseDate: {
//       type: String,
//       required: false,
//     },
//     receiveDate: {
//       type: String,
//       required: false,
//     },
//     registerDate: {
//       type: String,
//       required: false,
//     },
//     endInventoryDate: {
//       type: String,
//       required: false,
//     },
//     isOnSale: {
//       type: Boolean,
//       required: true,
//     },
//     discount: {
//       type: Number,
//       default: 0,
//     },
//     comments: {
//       type: [
//         {
//           type: mongoose.Types.ObjectId,
//           ref: "Comment",
//         },
//       ],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: false,
    },
    variants: [
      {
        color: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: Array,
          required: false,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    isOnSale: {
      type: Boolean,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    purchaseDate: {
      type: String,
      required: false,
    },
    receiveDate: {
      type: String,
      required: false,
    },
    comments: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index on the title field  
// productSchema.index({ title: 'text' }); 

const productModel =
  mongoose.models?.Product || mongoose.model("Product", productSchema);

export default productModel;

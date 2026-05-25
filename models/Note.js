

// const mongoose = require("mongoose");

// const noteSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     title: {
//       type: String,
//       required: true,
//     },

//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Note", noteSchema);



const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      default: null,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Note", noteSchema)
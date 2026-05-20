// const express = require("express");

// const router = express.Router();

// const {
//     createNote,
//     getNotes,
//     updateNote,
//     deleteNote,
// } = require("../controllers/noteController");


// router.post("/", createNote);

// router.get("/", getNotes);

// router.put("/:id", updateNote);

// router.delete("/:id", deleteNote);

// module.exports = router;



const express = require("express");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
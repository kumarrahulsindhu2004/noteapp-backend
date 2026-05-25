const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createSection,
  getSections,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

router.post("/", protect, createSection);
router.get("/", protect, getSections);
router.put("/:id", protect, updateSection);
router.delete("/:id", protect, deleteSection);

module.exports = router;
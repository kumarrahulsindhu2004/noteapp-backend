const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getAllUsers,
  getUserNotes,
  deleteUser,
  deleteNote,
  getStats,
} = require("../controllers/adminController");

router.use(protect, adminOnly); // sab routes protected

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/users/:id/notes", getUserNotes);
router.delete("/users/:id", deleteUser);
router.delete("/notes/:id", deleteNote);

module.exports = router;
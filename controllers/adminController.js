const User = require("../models/User");
const Note = require("../models/Note");

// Get all users with their note count
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });

    const usersWithCount = await Promise.all(
      users.map(async (user) => {
        const noteCount = await Note.countDocuments({ user: user._id });
        return { ...user.toObject(), noteCount };
      })
    );

    res.json(usersWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user's all notes
exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user and all their notes
exports.deleteUser = async (req, res) => {
  try {
    await Note.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User and all their notes deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific note (admin)
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard stats
exports.getStats = async (req, res) => {
  try {
    // const totalUsers = await User.countDocuments({ role: "user" });
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
    const totalNotes = await Note.countDocuments();
    // const recentUsers = await User.find({ role: "user" })
    const recentUsers = await User.find({ role: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ totalUsers, totalNotes, recentUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
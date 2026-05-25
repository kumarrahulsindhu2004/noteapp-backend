const Section = require("../models/Section");

exports.createSection = async (req, res) => {
  try {
    const section = await Section.create({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description || "",
    });
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const sections = await Section.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    await Section.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
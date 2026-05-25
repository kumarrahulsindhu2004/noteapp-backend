// const Note = require("../models/Note");


// // Create Note
// exports.createNote = async (req, res) => {
//     try {
//         const note = await Note.create(req.body);

//         res.status(201).json(note);

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };



// // Get Notes
// exports.getNotes = async (req, res) => {
//     try {
//         const notes = await Note.find({
//             userId: req.query.userId,
//         }).sort({ createdAt: -1 });

//         res.json(notes);

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };


// // Update Note
// exports.updateNote = async (req, res) => {
//     try {
//         const note = await Note.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );

//         res.json(note);

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };


// // Delete Note
// exports.deleteNote = async (req, res) => {
//     try {
//         await Note.findByIdAndDelete(req.params.id);

//         res.json({
//             message: "Note deleted",
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };











const Note = require("../models/Note");


// Create Note
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      section: req.body.sectionId || null,  // optional
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Notes
exports.getNotes = async (req, res) => {
  try {
    const filter = { user: req.user._id };

    // ?section=id  => section ki notes
    // ?standalone=true => sirf standalone notes (no section)
    if (req.query.section) {
      filter.section = req.query.section;
    } else if (req.query.standalone === "true") {
      filter.section = null;
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );

    res.json(note);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      message: "Note deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
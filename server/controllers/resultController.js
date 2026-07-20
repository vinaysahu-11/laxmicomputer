const Result = require('../models/Result');

// @desc    Get all results
// @route   GET /api/results
// @access  Public
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find({ status: 'active' }).sort({ percentage: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving results list', error: error.message });
  }
};

// @desc    Create result
// @route   POST /api/results
// @access  Private (Admin Only)
exports.createResult = async (req, res) => {
  try {
    const { studentName, courseName, examName, percentage, grade, status } = req.body;
    if (!studentName || !courseName || !examName || percentage === undefined || !grade) {
      return res.status(400).json({ message: 'Required fields: studentName, courseName, examName, percentage, grade' });
    }

    const result = await Result.create({
      studentName,
      courseName,
      examName,
      percentage: Number(percentage),
      grade,
      status: status || 'active'
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating result', error: error.message });
  }
};

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private (Admin Only)
exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    if (req.body.studentName) result.studentName = req.body.studentName;
    if (req.body.courseName) result.courseName = req.body.courseName;
    if (req.body.examName) result.examName = req.body.examName;
    if (req.body.percentage !== undefined) result.percentage = Number(req.body.percentage);
    if (req.body.grade) result.grade = req.body.grade;
    if (req.body.status) result.status = req.body.status;

    const updatedResult = await result.save();
    res.json(updatedResult);
  } catch (error) {
    res.status(500).json({ message: 'Error updating result', error: error.message });
  }
};

// @desc    Delete result
// @route   DELETE /api/results/:id
// @access  Private (Admin Only)
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    await Result.deleteOne({ _id: req.params.id });
    res.json({ message: 'Result removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing result', error: error.message });
  }
};

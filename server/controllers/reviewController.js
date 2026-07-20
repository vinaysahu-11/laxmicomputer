const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getAllReviews = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'Approved' };
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reviews list', error: error.message });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private (Admin Only)
exports.createReview = async (req, res) => {
  try {
    const { studentName, reviewText, rating, courseName, studentPhoto, status, videoUrl } = req.body;
    if (!studentName || !reviewText || !rating || !courseName) {
      return res.status(400).json({ message: 'Required fields: studentName, reviewText, rating, courseName' });
    }

    const review = await Review.create({
      studentName,
      reviewText,
      rating: Number(rating),
      courseName,
      studentPhoto: studentPhoto || '',
      videoUrl: videoUrl || '',
      status: status || 'Pending'
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (Admin/User Only)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (req.body.studentName) review.studentName = req.body.studentName;
    if (req.body.reviewText) review.reviewText = req.body.reviewText;
    if (req.body.rating !== undefined) review.rating = Number(req.body.rating);
    if (req.body.courseName) review.courseName = req.body.courseName;
    if (req.body.studentPhoto !== undefined) review.studentPhoto = req.body.studentPhoto;
    if (req.body.videoUrl !== undefined) review.videoUrl = req.body.videoUrl;
    if (req.body.status) review.status = req.body.status;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin Only)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await Review.deleteOne({ _id: req.params.id });
    res.json({ message: 'Review removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing review', error: error.message });
  }
};

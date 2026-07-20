const Course = require('../models/Course');
const Student = require('../models/Student');
const Admission = require('../models/Admission');
const Attendance = require('../models/Attendance');

// @desc    Get all courses with pagination, search, and filters
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const { search, category, mode, featured, limit = 10, page = 1 } = req.query;
    const query = { status: 'active' };

    // Search query on title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'All' && category !== 'All Courses') {
      query.category = { $regex: new RegExp('^' + category + '$', 'i') };
    }

    // Mode filter
    if (mode && mode !== 'All') {
      query.mode = mode.toLowerCase();
    }

    // Featured filter
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Pagination calculations
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalCourses = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      courses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCourses / limitNum),
        totalCourses
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses index', error: error.message });
  }
};

// @desc    Get featured courses list
// @route   GET /api/courses/featured
// @access  Public
exports.getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ featured: true, status: 'active' }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving featured courses list', error: error.message });
  }
};

// @desc    Get single course by ID or Slug
// @route   GET /api/courses/:idOrSlug
// @access  Public
exports.getSingleCourse = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let course;

    // Check if ID is a valid MongoDB ObjectID
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(idOrSlug);
    } else {
      course = await Course.findOne({ slug: idOrSlug.toLowerCase() });
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course details', error: error.message });
  }
};

// @desc    Create a new course profile
// @route   POST /api/courses
// @access  Private (Admin Only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, mode, price, duration, instructor, featured, status } = req.body;

    if (!title || !description || !category || !mode || price === undefined || !duration) {
      return res.status(400).json({ message: 'Required fields: title, description, category, mode, price, duration' });
    }

    // Check if course already exists with this title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const courseExists = await Course.findOne({ slug });
    if (courseExists) {
      return res.status(400).json({ message: 'Course already exists with this title' });
    }

    // Set thumbnail URL if file uploaded, else check body string
    let thumbnail = '';
    if (req.file) {
      thumbnail = `/uploads/courses/${req.file.filename}`;
    } else if (req.body.thumbnail) {
      thumbnail = req.body.thumbnail;
    }

    const course = await Course.create({
      title,
      description,
      category,
      mode: mode.toLowerCase(),
      price: Number(price),
      duration,
      thumbnail,
      instructor: instructor || '',
      featured: featured === 'true' || featured === true,
      status: status || 'active'
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// @desc    Update course details
// @route   PUT /api/courses/:id
// @access  Private (Admin Only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update simple fields
    if (req.body.title) course.title = req.body.title;
    if (req.body.description) course.description = req.body.description;
    if (req.body.category) course.category = req.body.category;
    if (req.body.mode) course.mode = req.body.mode.toLowerCase();
    if (req.body.price !== undefined) course.price = Number(req.body.price);
    if (req.body.duration) course.duration = req.body.duration;
    if (req.body.instructor !== undefined) course.instructor = req.body.instructor;
    if (req.body.featured !== undefined) course.featured = req.body.featured === 'true' || req.body.featured === true;
    if (req.body.status) course.status = req.body.status;

    // Handle thumbnail replacement if new file uploaded
    if (req.file) {
      course.thumbnail = `/uploads/courses/${req.file.filename}`;
    } else if (req.body.thumbnail !== undefined) {
      course.thumbnail = req.body.thumbnail;
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course details', error: error.message });
  }
};

// @desc    Remove course profile from database
// @route   DELETE /api/courses/:id
// @access  Private (Admin Only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Capture course title
    const courseTitle = course.title;

    // Unassign this course name from students, admissions, and attendance
    await Student.updateMany({ course: courseTitle }, { course: 'Unassigned Course' });
    await Admission.updateMany({ course: courseTitle }, { course: 'Unassigned Course' });
    await Attendance.updateMany({ course: courseTitle }, { course: 'Unassigned Course' });

    await Course.deleteOne({ _id: req.params.id });
    res.json({ message: 'Course profile removed successfully, linked student/admission/attendance associations unassigned.' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing course profile', error: error.message });
  }
};

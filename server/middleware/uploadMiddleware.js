const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subfolder = 'general';
    if (req.baseUrl && req.baseUrl.includes('courses')) {
      subfolder = 'courses';
    } else if (req.baseUrl && (req.baseUrl.includes('gallery') || req.baseUrl.includes('albums'))) {
      subfolder = 'gallery';
    } else if (req.baseUrl && req.baseUrl.includes('teachers')) {
      subfolder = 'teachers';
    } else if (req.baseUrl && req.baseUrl.includes('students')) {
      subfolder = 'students';
    }
    
    const uploadPath = path.join(__dirname, `../uploads/${subfolder}`);
    // Create folders dynamically if not present
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

module.exports = upload;

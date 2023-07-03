const express = require('express');
const multer = require('multer');
const submissionController = require('../controllers/submissionController');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create a new submission
router.post('/submit', upload.single('resume'), submissionController.createSubmission);

// Get all submissions
router.get('/submissions', submissionController.getAllSubmissions);

// Delete a submission
router.delete('/submissions/:id', submissionController.deleteSubmission);

module.exports = router;

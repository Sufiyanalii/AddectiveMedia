const { Submission } = require('../models/submission');
const { Sequelize, DataTypes } = require('sequelize');

// Create a new submission
exports.createSubmission = async (req, res) => {
  try {
    // Extract form data from the request body
    const { name, dob, country } = req.body;
    const resume = req.file;

    // Create a new submission
    const submission = await Submission.create({
      name,
      dob,
      country,
      resumePath: resume.path
    });
   
    res.status(201).json({ message: 'Submission created successfully.' });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'An error occurred while saving the submission.' });
  }
};

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({attributes: ['id','name']});
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error retrieving submissions:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the submissions.' });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;

    const deletedSubmission = await Submission.destroy({ where: { id: submissionId } });

    if (deletedSubmission === 0) {
      res.status(404).json({ error: 'Submission not found.' });
    } else {
      res.status(200).json({ message: 'Submission deleted successfully.' });
    }
  } catch (err) {
    console.error('Error deleting submission:', err);
    res.status(500).json({ error: 'An error occurred while deleting the submission.' });
  }
};

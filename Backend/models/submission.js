const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
  name: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE
  },
  country: {
    type: DataTypes.STRING
  },
  resumePath: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Submission;

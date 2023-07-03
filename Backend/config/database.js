const { Sequelize } = require('sequelize');
const dotenv=require('dotenv');

dotenv.config();

const database=process.env.DB;
const username=process.env.USER;
const password=process.env.PASS;


// Create a Sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql',
    port:'3306'
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

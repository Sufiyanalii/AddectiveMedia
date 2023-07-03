const express = require('express');
const path = require('path');
const cors=require('cors');
const routes = require('./routes');
const dotenv=require('dotenv');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the "public" directory
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
//app.use('/uploads', express.static('uploads'));

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

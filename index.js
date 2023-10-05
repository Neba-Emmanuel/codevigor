const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Books = require('./routes/books');
const Users = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/',Books);
app.use('/user',Users);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const db = require('./db'); // Importer la connexion à la base de données
const employeesRouter = require('./routes/employees');
const postsRouter = require('./routes/posts');
const palettesRouter = require('./routes/palettes');

app.use(express.json());
app.use('/employees', employeesRouter);
app.use('/posts', postsRouter);
app.use('/palettes', palettesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

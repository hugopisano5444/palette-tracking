const express = require('express');
const app = express();
const port = 3000;
const db = require('./db'); // Importer la connexion à la base de données
const palettesRouter = require('./routes/palettes'); // Importer les routes

app.use(express.json());
app.use('/palettes', palettesRouter); // Utiliser les routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

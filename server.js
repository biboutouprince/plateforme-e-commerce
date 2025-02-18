const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur HTTP !');
});

app.get('/info', (req, res) => {
    res.json({ message: 'Ceci est une route d\'information.' });
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});


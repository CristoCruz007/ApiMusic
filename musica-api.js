// musica-api.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/track/:id', (req, res) => {
    const trackId = req.params.id;
    
    // Aquí simulas la base de datos
    // En un proyecto real, buscarías este ID en tu DB
    res.json({
        id: trackId,
        title: "Intro",
        artist: { name: "Peso Pluma" },
        album: { cover_big: "URL_DE_LA_IMAGEN" },
        soundcloud_url: "https://soundcloud.com/pesopluma/intro" // <--- Clave para la Opción A
    });
});

app.listen(3001, () => {
    console.log("Servidor musica-api corriendo en el puerto 3001");
});
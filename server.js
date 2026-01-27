import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

// URLs oficiales de Deezer
const DEEZER_ARTISTS = "https://api.deezer.com/chart/0/artists";
const DEEZER_TRACKS = "https://api.deezer.com/chart/0/tracks";

app.get('/api/top-artists', async (req, res) => {
    try {
        const response = await axios.get(DEEZER_ARTISTS);
        
        // Deezer ya devuelve un objeto que tiene una propiedad .data (un array)
        // Lo enviamos para que tu React reciba exactamente lo que espera
        res.json({
            data: response.data.data 
        });

        console.log("✅ Artistas de Deezer enviados con éxito");
    } catch (error) {
        console.error("❌ Error con Deezer:", error.message);
        res.status(500).json({ data: [], error: "No se pudo conectar con Deezer" });
    }
});
// 1. GÉNEROS
app.get('/api/genres', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/genre');
        res.json({ data: response.data.data });
    } catch (error) {
        res.status(500).json({ data: [], error: error.message });
    }
});
app.get('/api/genres/:id/artists', async (req, res) => {
    try {
        const {id} = req.params;
        const response = await axios.get(`https://api.deezer.com/genre/${id}/artists`);
        res.json({ data: response.data.data });
    } catch (error) {
        res.status(500).json({ data: [], error: error.message });
    }
});

// 2. DETALLE DE UNA CANCIÓN (TRACK)
app.get('/api/track/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.deezer.com/track/${id}`);
        res.json(response.data); // Aquí enviamos el objeto directo del track
    } catch (error) {
        res.status(500).json({ error: "No se encontró el track" });
    }
});

// 3. DETALLE DE UN ARTISTA (POR ID)
app.get('/api/artista/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.deezer.com/artist/${id}`);
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ error: "Artista no encontrado" });
    }
});
app.get('/api/artistas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Llamamos al /top de Deezer para traer la lista de canciones
        const response = await axios.get(`https://api.deezer.com/artist/${id}/top?limit=20`);
        
        // Enviamos { data: [array_de_canciones] } para que tu React lo reciba bien
        res.json({ data: response.data.data }); 
        
        console.log(`✅ Enviadas canciones del artista ID: ${id}`);
    } catch (error) {
        console.error("❌ Error obteniendo canciones:", error.message);
        res.status(500).json({ data: [], error: "No se pudieron cargar las canciones" });
    }
});
app.get('/api/new-music', async (req, res) => {
    try {
        const response = await axios.get(DEEZER_TRACKS);
        res.json({
            data: response.data.data
        });
    } catch (error) {
        res.status(500).json({ data: [] });
    }
});

app.listen(3001, '0.0.0.0', () => {
    console.log("🚀 Servidor Deezer activo en http://192.168.1.73:3001/api/top-artists");
});
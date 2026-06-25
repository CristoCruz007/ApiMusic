import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ResultadoBusqueda() {
    // Obtenemos el término de búsqueda desde la URL definida en App.js
    const { termino } = useParams(); 
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Función para crear slugs limpios para las URLs (igual que en tu Inicio.js)
    const crearSlug = (texto) => {
        if (!texto) return "track";
        return texto.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    };

    useEffect(() => {
        const fetchBusqueda = async () => {
            setCargando(true);
            setError("");
            try {
                // Llamada a tu API personalizada en Node.js
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search?q=${termino}`);
                setResultados(response.data.data);
            } catch (err) {
                console.error("Error en la búsqueda:", err);
                setError("No se pudo conectar con el servidor.");
            } finally {
                setCargando(false);
            }
        };

        if (termino) {
            fetchBusqueda();
        }
    }, [termino]);

    if (cargando) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <h5 className="mt-3">Buscando "{termino}"...</h5>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">🔍 Resultados para: <span className="text-success">"{termino}"</span></h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-3">
                {resultados.length > 0 ? (
                    resultados.map((track) => (
                        <div key={track.id} className="col-6 col-md-4 col-lg-2">
                            {/* Redirige a la página de Menu donde se encuentra el reproductor */}
                            <Link 
                                className="musica-link text-decoration-none" 
                                to={`/menu/${track.id}/${crearSlug(track.title_short)}`}
                            >
                                <div className="card h-100 text-center shadow-sm artist-card border-0">
                                    <img
                                        src={track.album.cover_big}
                                        className="card-img-top p-2 rounded-3"
                                        alt={track.title_short}
                                    />
                                    <div className="card-body p-2">
                                        <p className="card-title fw-bold text-truncate mb-0" style={{ fontSize: '0.9rem', color: '#212529' }}>
                                            {track.title_short}
                                        </p>
                                        <p className="text-muted text-truncate mb-0" style={{ fontSize: '0.8rem' }}>
                                            {track.artist.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center mt-5">
                        <p className="lead text-muted">No se encontraron canciones para tu búsqueda.</p>
                        <Link to="/" className="btn btn-outline-success">Volver al Inicio</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
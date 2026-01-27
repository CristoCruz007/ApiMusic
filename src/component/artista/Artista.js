import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importamos Link

export default function Artista() {
  const { name, id } = useParams();
  const [artista, setArtista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataArtista();
  }, [id]);

  const fetchDataArtista = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.1.73:3001/api/artistas/${id}`);
      
      // LOG IMPORTANTE: Revisa la consola de tu PC (F12) para ver cómo llega la data
      console.log("Datos del artista:", response.data);
      
      // Si Deezer manda la lista en .data, lo dejamos así:
      setArtista(response.data.data || []); 
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener canciones:", error);
      setLoading(false);
    }
  };
  const crearSlug = (texto) => {
    if (!texto) return "track";
    return texto.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };
  if (loading) return <div className="text-center mt-5 text-white">Cargando canciones...</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-white text-capitalize">Top Canciones: {name}</h1>
      
      <div className="list-group">
        {artista && artista.length > 0 ? (
          artista.map((datos) => (
            /* Agregamos Link para que al tocar la canción vayas al reproductor */
            <Link 
              to={`/menu/${datos.id}/${crearSlug(datos.title_short)}`}
              key={datos.id} 
              className="text-decoration-none"
            >
              <div 
                className="list-group-item list-group-item-action d-flex align-items-center bg-dark text-white border-secondary mb-2"
                style={{ borderRadius: '10px', transition: '0.3s' }}
              >
                <img 
                  src={datos.album?.cover_small || 'https://via.placeholder.com/50'} 
                  alt={datos.title} 
                  className="rounded me-3" 
                  style={{ width: '55px', height: '55px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <strong className="d-block">{datos.title}</strong>
                  <small className="text-secondary">{datos.album?.title || "Single"}</small>
                </div>
                <div className="text-secondary small">
                   {Math.floor(datos.duration / 60)}:{(datos.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="alert alert-warning">No se encontraron canciones para este artista.</div>
        )}
      </div>
    </div>
  );
}
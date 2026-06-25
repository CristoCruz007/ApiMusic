import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiGeneroId = "http://192.168.1.71:3001/api/genres";

export default function GeneroId() {
  // Extraemos ambos parámetros correctamente
  const { id, name } = useParams();
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistas();
    // eslint-disable-next-line
  }, [id]);

  const fetchArtistas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiGeneroId}/${id}/artists`);
      console.log("Datos de la API:", response.data);
      
      // Verificamos que response.data.data exista
      if (response.data && response.data.data) {
        setArtistas(response.data.data);
      } else {
        setArtistas([]);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-5">Cargando artistas...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Artistas de {name}</h2>
      <h1>{id}</h1>
      <div className="row g-3">
        {artistas && artistas.length > 0 ? (
          artistas.map((artista) => (
            <div key={artista.id} className="col-6 col-md-3 col-lg-2">
              {/* Usamos encodeURIComponent por si el nombre tiene espacios o símbolos */}
              <Link to={`/artista/${encodeURIComponent(artista.name)}/${artista.id}`} className="text-decoration-none">
                <div className="card text-center shadow-sm bg-dark border-secondary h-100">
                  <img
                    src={artista.picture_medium || "https://via.placeholder.com/150"}
                    className="card-img-top rounded-circle p-3"
                    alt={artista.name}
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title text-white">{artista.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-white">No se encontraron artistas para este género.</div>
        )}
      </div>
    </div>
  );
}
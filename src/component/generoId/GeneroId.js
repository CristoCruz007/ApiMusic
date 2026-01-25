import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiGeneroId = "http://192.168.1.73:3001/api/genres";

export default function GeneroId() {
  const { id } = useParams();
  const [artistas, setArtistas] = useState([]);
  const {name} = useParams();
  useEffect(() => {
    fetchArtistas();
  }, [id]);

  const fetchArtistas = async () => {
    try {
      const response = await axios.get(`${apiGeneroId}/${id}/artists`);
      setArtistas(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Artistas del {name}</h2>

      <div className="row g-3">
        {artistas.map((artista) => (
          <div key={artista.id} className="col-6 col-md-3 col-lg-2">
            <Link to={`/artista/${artista.name}/${artista.id}`}>
                 <div className="card text-center shadow-sm">
              <img
                src={artista.picture_medium}
                className="card-img-top rounded-circle p-3"
                alt={artista.name}
              />
              <div className="card-body p-2">
                <h6 className="card-title">{artista.name}</h6>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./imgen.css";

const apiTopArtistas = `${process.env.REACT_APP_API_URL}/api/top-artists`;
const apiTopMusica = `${process.env.REACT_APP_API_URL}/api/new-music`;
export default function Inicio() {
  const [musicaApi, setMusicaApi] = useState([]);
  const [musicaTop, setMusicaTop] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
    fechDataTopMusica();
  }, []);

  const crearSlug = (texto) => {
    if (!texto) return "track";
    return texto.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(apiTopArtistas);
      setMusicaApi(response.data.data);
    } catch (err) {
      setError("Error al cargar Top Artistas");
      console.error(err);
    }
  };

  const fechDataTopMusica = async () => {
    try {
      const response = await axios.get(apiTopMusica);
      setMusicaTop(response.data.data);
    } catch (error) {
      setError("Error al cargar TOP Musica");
    }
  };

  return (
    <div className="container mt-4">
      {error && <p className="text-danger">{error}</p>}

      <h3 className="mb-4"style={{color: "black"}} >🔥 Top Musica</h3>

      {/* --- CAROUSEL --- */}
      <div id="carouselExampleControls" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {musicaTop.map((mt, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={mt.id}>
              {/* CORRECCIÓN: El Link debe envolver el contenido interno del item */}
              <Link className="musica-link text-decoration-none" to={`/menu/${mt.id}/${crearSlug(mt.title_short)}`}>
                <img
                  src={mt.album.cover_xl}
                  className="d-block w-100"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  alt={mt.title_short}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5
                    style={{
                      color: 'white',
                      fontWeight: '800',
                      fontSize: '1.5rem', // Corregido: sin espacio entre número y rem
                      textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {mt.title_short}
                  </h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* --- GRID DE MUSICA --- */}
      <div className="row g-3 mb-5">
        {musicaTop.map((mtop) => (
          <div key={mtop.id} className="col-6 col-md-4 col-lg-2">
            <Link className="musica-link text-decoration-none" to={`/menu/${mtop.id}/${crearSlug(mtop.title_short)}`}>
              <div className="card h-100 text-center shadow-sm artist-card">
                <img
                  src={mtop.album.cover_big}
                  className="card-img-top p-2"
                  alt={mtop.title_short}
                />
                <div className="card-body p-2">
                  <p className="card-title fw-semibold text-truncate mb-0" style={{ fontSize: '0.9rem' }}>
                    {mtop.title_short}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* --- TOP ARTISTAS --- */}
      <h3 className="mb-4"style={{color: "black"}} >⭐ Top Artistas</h3>
      <div className="row g-3">
        {musicaApi.map((top) => (
          <div key={top.id} className="col-6 col-md-4 col-lg-2">
            <div className="card h-100 text-center shadow-sm artist-card">
              <Link
                to={`/artista/${encodeURIComponent(top.name)}/${top.id}`}
              >
                <img
                src={top.picture_medium}
                className="rounded-circle mx-auto mt-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                alt={top.name}
              />
              </Link>
              <div className="card-body p-2">
                <h6 className="card-title text-truncate">{top.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react"; // IMPORTACIÓN QUE FALTABA
import { useParams } from "react-router-dom";      // IMPORTACIÓN QUE FALTABA
import axios from "axios";                         // IMPORTACIÓN QUE FALTABA
import "./Menu.css"; 

// Definimos la constante de la API que marcaba error
const apiDetalle = "http://192.168.1.73:3001/api/track";

export default function Menu({ onPlay }) {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const fetchDataDetalle = async () => {
      try {
        const response = await axios.get(`${apiDetalle}/${id}`);
        setDetalle(response.data);
      } catch (error) {
        console.error("Error cargando detalle:", error);
      }
    };
    fetchDataDetalle();
  }, [id]);

  const activarMusica = () => {
    if (detalle && onPlay) {
      const artistUrl = cleanArtist(detalle.artist?.name);
      const titleUrl = cleanTitle(detalle.title);
      // Construimos la URL para SoundCloud
      const scUrlManual = `https://soundcloud.com/${artistUrl}/${titleUrl}`;
      
      onPlay(scUrlManual); 
    }
  };

  const cleanArtist = (t) => t ? t.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '').trim() : "";
  const cleanTitle = (t) => t ? t.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-local0-9\s-]/g, "").trim().replace(/\s+/g, '-').replace(/-+/g, '-') : "";

  if (!detalle) return <div className="loading">Cargando canción...</div>;

  return (
    <div className="menu-container">
      <div className="glass-card">
        <div className="album-wrapper">
          <img src={detalle.album?.cover_big} alt={detalle.title} className="album-cover" />
        </div>
        <div className="info-section text-center mt-3">
          <h1 className="song-title text-white">{detalle.title}</h1>
          <h4 className="artist-name text-secondary">{detalle.artist?.name}</h4>
          
          {/* Este botón ahora tiene la acción para Chrome */}
          <button className="btn-reproducir-cel" onClick={activarMusica}>
             REPRODUCIR AHORA
          </button>
        </div>
      </div>
    </div>
  );
}
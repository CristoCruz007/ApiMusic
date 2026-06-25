import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { artistMappings, songMappings } from "../../utils/musicMappings";
import "./Menu.css";


const apiDetalle = `${process.env.REACT_APP_API_URL}/api/track`;

export default function Menu({ onPlay }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Guardamos el ID inicial de la URL en el estado
  const [idActual, setIdActual] = useState(Number(id));
  const [detalle, setDetalle] = useState(null);
  const [error, setError] = useState(false);
  
  // El useEffect se dispara cada vez que cambia 'idActual'
  useEffect(() => {
    const fetchDataDetalle = async () => {
      try {
        // Buscamos en la API usando el ID del estado que va incrementando
        const response = await axios.get(`${apiDetalle}/${idActual}`);
        setDetalle(response.data);
        setError(false);
      } catch (error) {
        console.error("Error cargando detalle:", error);
        setError(true);
      }
    };
    fetchDataDetalle();
  }, [idActual]);

  // --- FUNCIONES DE LIMPIEZA CORREGIDAS ---
  const cleanArtist = (name) => {
    if (!name) return "";
    
    // 1. Convertimos a minúsculas, quitamos acentos y eliminamos TODOS los espacios intermedios
    const normalized = name.toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "") // Junta "Ariel Camacho" en "arielcamacho"
      .trim();

    // 2. Buscamos la clave ya limpia en tu diccionario artistMappings
    if (artistMappings[normalized]) return artistMappings[normalized];
    
    // 3. Si no ocupa mapeo manual, quitamos cualquier otro carácter raro sobrante
    return normalized.replace(/[^a-z0-9]/g, "");    
  };

  const cleanTitle = (title, trackId) => {
    if (!title) return "";
    if (trackId && songMappings[trackId.toString()]) return songMappings[trackId.toString()];
    return title.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[()]/g, "").trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
  };



  if (error) {
    return (
      <div className="loading text-danger text-center">
        <p>Error al cargar la canción con ID: {idActual}</p>
      </div>
    );
  }
  
  if (!detalle) return <div className="loading">Cargando detalles del ID {idActual}...</div>;

  const artistUrl = cleanArtist(detalle.artist?.name);
  const titleUrl = cleanTitle(detalle.title, detalle.id);

  const activarMusica = () => {
    if (detalle && onPlay) {
      let scUrlManual = titleUrl.includes('/') ? `https://soundcloud.com/${titleUrl}` : `https://soundcloud.com/${artistUrl}/${titleUrl}`;
      onPlay(scUrlManual); 
    }
  };

  const handleAtras=()=>{
    setIdActual(prevId => prevId - 10);
  }
  const handleSiguiente =()=> {
    setIdActual(prevId => prevId + 10);
  }
  return (
    <div className="menu-container">
      {/* DIV DE DEPURACIÓN */}
      <div style={{ position: 'fixed', top: '70px', left: '10px', background: 'rgba(0,0,0,0.8)', padding: '10px', borderRadius: '10px', fontSize: '12px', zIndex: 1000, color: '#00ff00', border: '1px solid #00ff00' }}>
        <div><strong>Artista URL:</strong> {artistUrl}</div>
        <div><strong>Título URL:</strong> {titleUrl}</div>
        <div><strong>id:</strong> {idActual}</div>
        <div style={{ marginTop: '5px', color: '#ff00ff', borderTop: '1px solid #333', paddingTop: '5px' }}>
          <strong>URL Final SC:</strong> {titleUrl.includes('/') ? `https://soundcloud.com/${titleUrl}` : `https://soundcloud.com/${artistUrl}/${titleUrl}`}
        </div>
      </div>

      <div className="glass-card animate__animated animate__fadeIn">
        <div className="album-wrapper">
          <img 
            src={detalle.album?.cover_xl || detalle.album?.cover_big} 
            alt={detalle.title} 
            className="album-cover shadow-lg" 
          />
        </div>

        <div className="info-section text-center mt-4">
          <h1 className="song-title text-white">{detalle.title}</h1>
          <h4 className="artist-name text-info">{detalle.artist?.name}</h4>
          
          <div className="stats-container d-flex justify-content-center gap-3 my-3">
            <span className="badge bg-dark text-secondary border border-secondary">
              {Math.floor(detalle.duration / 60)}:{(detalle.duration % 60).toString().padStart(2, '0')}
            </span>
            <span className="badge bg-dark text-secondary border border-secondary">
              {detalle.release_date?.split('-')[0]}
            </span>
          </div>

          <button className="btn-reproducir-cel mt-2" onClick={activarMusica}>
             <i className="bi bi-play-fill"></i> REPRODUCIR AHORA
          </button>
          <div className="d-flex justify-content-between align-items-center w-100 px-4 mt-4">
            <button
              onClick={handleAtras}
              className="btn btn-outline-primary"
            >Atras</button>
            <button
              onClick={handleSiguiente}
              className="btn btn-outline-primary"
            >Siguiente</button>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
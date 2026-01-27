import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Menu.css"; 

export default function Menu({ onPlay }) {
  const { name } = useParams();
  const [cancion, setCancion] = useState(null);

  useEffect(() => {
    const buscarAudio = async () => {
      try {
        // API de Audius: Gratis, sin bloqueos en celular, entrega MP3 real.
        const res = await axios.get(`https://discoveryprovider.audius.co/v1/tracks/search?query=${name}&app_name=MI_APP_MUSICA`);
        const track = res.data.data[0];
        
        if (track) {
          setCancion({
            title: track.title,
            artist: track.user.name,
            cover: track.artwork['480x480'] || 'https://via.placeholder.com/480',
            url: `https://discoveryprovider.audius.co/v1/tracks/${track.id}/stream?app_name=MI_APP_MUSICA`
          });
        }
      } catch (err) {
        console.error("Error buscando audio:", err);
      }
    };
    if (name) buscarAudio();
  }, [name]);

  if (!cancion) return <div className="loading">Buscando audio compatible...</div>;

  return (
    <div className="menu-container">
      <div className="glass-card">
        <img src={cancion.cover} alt={cancion.title} className="album-cover" />
        <h2 className="text-white mt-3">{cancion.title}</h2>
        <p className="text-secondary">{cancion.artist}</p>
        
        <button className="btn-reproducir-cel" onClick={() => onPlay(cancion)}>
          REPRODUCIR AHORA
        </button>
      </div>
    </div>
  );
}
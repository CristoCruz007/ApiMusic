import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import Layout from "./component/layout/Layout";
import Inicio from "./component/inicio/Inicio";
import Menu from "./component/menu/Menu";
import GeneroId from "./component/generoId/GeneroId";
import Artista from "./component/artista/Artista";
import ResultadoBusqueda from "./component/resultadoBusqueda/ResultadoBusqueda";
import ScrollToTop from "./ScrollToTop";
import "./App.css";

function App() {
  const [urlGlobal, setUrlGlobal] = useState("");

  const reproducirMusica = (url) => {
    setUrlGlobal(url);
  };

  const renderReproductor = () => {
    if (!urlGlobal) return null;

    const isYouTube = urlGlobal.includes("youtube.com") || urlGlobal.includes("youtu.be");

    return (
      <div className="reproductor-fijo-soundcloud">
        <button className="btn-cerrar-sc" onClick={() => setUrlGlobal("")}>×</button>
        
        {isYouTube ? (
          <iframe
            width="100%" height="100"
            src={urlGlobal.replace("watch?v=", "embed/") + "?autoplay=1"}
            title="YouTube" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            width="100%" height="100" scrolling="no" frameBorder="no"
            allow="autoplay; encrypted-media" 
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(urlGlobal)}&color=%238a2be2&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
          ></iframe>
        )}
      </div>
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div id="root-container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="menu/:id/:name" element={<Menu onPlay={reproducirMusica} />} />
            <Route path="genero/:name/:id" element={<GeneroId />} />
            <Route path="buscar/:termino" element={<ResultadoBusqueda />} />
            {/* <Route path=":name/:id" element={<GeneroId />} />  */}
            <Route path="artista/:name/:id" element={<Artista />} />
          </Route>
        </Routes>
        {renderReproductor()}
      </div>
    </BrowserRouter>
  );
}

export default App;
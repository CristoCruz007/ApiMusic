import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import Layout from "./component/layout/Layout";
import Inicio from "./component/inicio/Inicio";
import Menu from "./component/menu/Menu";
import GeneroId from "./component/generoId/GeneroId";
import Artista from "./component/artista/Artista";
import ScrollToTop from "./ScrollToTop";
import "./App.css";

function App() {
  // Estado para la URL de SoundCloud que usará el Iframe
  const [urlGlobal, setUrlGlobal] = useState("");

  const reproducirMusica = (url) => {
    setUrlGlobal(url);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="menu/:id/:name" element={<Menu onPlay={reproducirMusica} />} />
          <Route path=":name/:id" element={<GeneroId />} /> 
          <Route path="artista/:name/:id" element={<Artista />} />
        </Route>
      </Routes>


{urlGlobal && (
  <div className="reproductor-fijo-soundcloud">
    <button className="btn-cerrar-sc" onClick={() => setUrlGlobal("")}>×</button>
    <iframe
      width="100%"
      height="100"
      scrolling="no"
      frameBorder="no"
      /* Agregamos autoplay en allow para asegurar compatibilidad */
      allow="autoplay; encrypted-media" 
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(urlGlobal)}&color=%238a2be2&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
    ></iframe>
  </div>
)}
    </BrowserRouter>
  );
}

export default App;
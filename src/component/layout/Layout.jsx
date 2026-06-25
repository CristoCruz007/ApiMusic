import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const apiGenero = `${process.env.REACT_APP_API_URL}/api/genres`;

export default function Layout() {
    const [musicaGenero, setGenero] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();
    
    // Referencia para cerrar el menú de Bootstrap en móviles automáticamente
    const navbarCollapseRef = useRef(null);

    useEffect(() => {
        fetchDataGenero();
    }, []);

    const fetchDataGenero = async () => {
        try {
            const response = await axios.get(apiGenero);
            setGenero(response.data.data);
        } catch (error) {
            console.error("Error cargando géneros:", error);
        }
    };

    // Función para cerrar el menú desplegable (Navbar)
    const cerrarMenu = () => {
        if (window.bootstrap && navbarCollapseRef.current) {
            const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapseRef.current);
            if (bsCollapse) bsCollapse.hide();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (busqueda.trim()) {
            // IMPORTANTE: La ruta debe ser /buscar/... NO /genero/...
            navigate(`/buscar/${encodeURIComponent(busqueda.trim())}`);
            setBusqueda(""); 
            cerrarMenu();
        }
    };
    return (
        <div className="min-vh-100 bg-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container-fluid">
                    <Link 
                        className="navbar-brand fw-bold" 
                        to="/" 
                        onClick={() => { window.scrollTo(0, 0); cerrarMenu(); }}
                    >
                        CCCPLAY
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div 
                        className="collapse navbar-collapse" 
                        id="navbarSupportedContent" 
                        ref={navbarCollapseRef}
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Géneros
                                </a>
                                
                                <ul
                                    className="dropdown-menu p-3 shadow-lg"
                                    aria-labelledby="navbarDropdown"
                                    style={{ minWidth: "280px", maxWidth: "800px", border: "none" }}
                                >
                                    <div className="row g-2">
                                        {musicaGenero.map((mGenero) => (
                                            <div key={mGenero.id} className="col-6 col-md-4">
                                                <Link 
                                                    className="dropdown-item text-wrap rounded text-center py-2" 
                                                    to={`/genero/${encodeURIComponent(mGenero.name)}/${mGenero.id}`}                                                    onClick={cerrarMenu}
                                                    style={{ fontSize: '0.85rem', backgroundColor: '#f8f9fa', marginBottom: '2px' }}
                                                >
                                                    {mGenero.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </ul>
                            </li>
                        </ul>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <a class="nav-link" href="#">My Favorito</a>

                            </li>
                            

                        </ul>
                        {/* FORMULARIO DE BÚSQUEDA */}
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Artista, canción..."
                                aria-label="Search"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* CONTENIDO DINÁMICO */}
            <div className="container mt-4 pb-5">
                <Outlet />
            </div>
        </div>
    );
}
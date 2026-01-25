import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
const apiGenero = "http://192.168.1.73:3001/api/genres"


export default function Layout() {

    const [musicaGenero,setGenero] = useState([]);

    useEffect(()=> {
        fetchDataGenero();
    },[]);

    const fetchDataGenero = async () => {
        try{
            const response = await axios.get(apiGenero);
            setGenero(response.data.data);
        }catch(error){
            console.log(error);
        }
    }
    return(
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link
        className="navbar-brand"
        to="/"
        onClick={() => window.scrollTo(0, 0)}
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            className="dropdown-menu p-3"
            aria-labelledby="navbarDropdown"
            style={{ minWidth: "280px", maxWidth: "800px" }}
            >
            <div className="row g-2">
                {musicaGenero.map((mGenero) => (
                <div
                    key={mGenero.id}
                    className="col-6 col-md-4 col-lg-3"
                >

                    <Link className="dropdown-item text-wrap text-center" to={`${mGenero.name}/${mGenero.id}`}>
                    {mGenero.name}
                    </Link>
                </div>
                ))}
            </div>
            </ul>


            </li>

          </ul>

          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar música"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
      
    </nav>
    <div className="container mt-2">
        <Outlet />
      </div>
    </div>
  );
}

import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myMoviesList = localStorage.getItem("@movielibrary");
    setMovies(JSON.parse(myMoviesList) || [])
  }, [])

  return(
    <div>
      <h1>Página de Favoritos</h1>

      <ul>
        {movies.map((item)=>{
          return(
            <li key={item.id}>
              <span>{item.name}</span>
              <div>
                <button>
                  <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                </button>
                <button>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Favorites;
import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

function Favorites(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myMoviesList = localStorage.getItem("@movielibrary");
    setMovies(JSON.parse(myMoviesList) || [])
  }, [])

  function deleteMovie(id){
    let filterMovies = movies.filter((item) => {
      return(item.id !== id)
    })

    setMovies(filterMovies);
    localStorage.setItem("@movielibrary", JSON.stringify(filterMovies))
    toast.success("Filme removido com sucesso!")
  }

  return(
    <div className="absolute my-20">
      <h1>Página de Favoritos</h1>

      {movies.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

      <ul>
        {movies.map((item)=>{
          return(
            <li key={item.id}>
              <span>{item.name}</span>
              <div>
                <button>
                  <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                </button>
                <button onClick={ () => deleteMovie(item.id) }>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Favorites;
import React from "react";
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'

// API URL: /tv/popular?api_key=fedd1180bea199228b93bece9b17a8df&language=pt-BR

function Home(){
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("tv/popular", {
        params: {
          api_key:"fedd1180bea199228b93bece9b17a8df",
          language: "pt-BR",
          page: 1,
        }
      })
      console.log(response.data.results.slice(0, 15));
      setFilmes(response.data.results.slice(0, 10))

    }
    loadFilmes();
  }, [])

  return(
    <div className="w-full h-screen uppercase flex flex-col relative top-20">
      <h1>Olá mundo</h1>
      <div className="w-20 flex justify-between items-center m-16">
        {filmes.map((filme) => {
          return(
            <div key={filme.id} >
              <h2 className="text-black">{filme.name}</h2>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.name} />
              <button><Link to={`/filme/${filme.id}`}>Acessar</Link></button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;
import React from "react";
import { useState, useEffect } from 'react';
import api from '../../services/api';

// API URL: /tv/popular?api_key=fedd1180bea199228b93bece9b17a8df&language=pt-BR

function Home(){
  const [filmes, setFimes] = useState([]);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("tv/popular", {
        params: {
          api_key:"fedd1180bea199228b93bece9b17a8df",
          language: "pt-BR",
          page: 1,
        }
      })
      // console.log(response.data.results.slice(0, 15));
      setFimes(response.data.results.slice(0, 15))
      
    }
    loadFilmes();
  }, [])

  return(
    <div className="w-full h-screen uppercase flex flex-col relative top-20">
      <h1 >Bem-vindo</h1>
    </div>
  )
}

export default Home;
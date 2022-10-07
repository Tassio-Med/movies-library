import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Puff } from  'react-loader-spinner';


// API URL: /tv/popular?api_key=fedd1180bea199228b93bece9b17a8df&language=pt-BR

function Home(){
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("/tv/popular", {
        params: {
          api_key:"fedd1180bea199228b93bece9b17a8df",
          language: "pt-BR",
          page: 1,
        }
      })
      // console.log(response.data.results.slice(0, 15));
      setFilmes(response.data.results.slice(0, 10))
      setLoading(false);
    }
    loadFilmes();
  }, [])


  if(loading){
    return(
      <div className='w-full flex justify-center items-center mt-20 absolute bg-green-400'>
        <h2>Carregando filmes...  <Puff height = "80" width = "100" color = 'blue' ariaLabel = 'Loading'/></h2>
        
      </div>
    )
  }

  return (
    <div className=" w-full h-full uppercase relative">
      <div className="">
          {filmes.map((filme)=>{
            return(
              <div key={filme.id}>
                <h2 className="text-lg font-bold">{filme.name}</h2>
                <img className="w-full h-full object-cover rounded-xl" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.name}/>
                <button className='w-34 h-10 px-4 py-1 rounded-lg bg-indigo-600  hover:bg-indigo-800 flex justify-center items-center tracking-wider'>
                  <Link className="font-bold text-slate-50 flex items-center" to={`/movie/${filme.id}`} > Acessar </Link>
                </button>
              </div>
            )
          })}
      </div>
    </div>
  );
}
 
export default Home;
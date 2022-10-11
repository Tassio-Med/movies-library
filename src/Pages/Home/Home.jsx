import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import ClipLoader from "react-spinners/ClipLoader";

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
      setFilmes(response.data.results);
      setLoading(false);
    }
    loadFilmes();
  }, [])


  if(loading){
    return(
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='block justify-center items-center'>
          <ClipLoader className="text-indigo-600" loading={loading}  size={60} aria-label="Loading Spinner" />
        </div>
      </div>
    )
  }
 
  return (
    <div className='w-full h-full relative top-20 flex justify-center items-center bg-slate-100'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
        {filmes.map((filme)=>{
            return(
              <div className="w-64 m-4 drop-shadow-lg hover:scale-105 ease-in-out duration-300" key={filme.id}>
                <img className="w-full rounded-t-2xl" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.name}/>
                <button className='w-full flex rounded-b-2xl justify-center items-center h-10 px-4 py-1 bg-indigo-600  hover:bg-indigo-800'>
                  <Link className="w-full h-full font-bold text-slate-50 flex justify-center items-center" to={`/movie/${filme.id}`} > Acessar </Link>
                </button>
              </div>
            )
          })}
      </div>
    </div>
  );
}
 
export default Home;
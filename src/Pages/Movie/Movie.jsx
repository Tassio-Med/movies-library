import React from "react";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '../../services/api';

function Movie(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilmes(){
      await api.get(`/tv/${id}`, {
        params:{
          api_key:"fedd1180bea199228b93bece9b17a8df",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        // console.log('Filme não encontrado');
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilmes();

    return () => {
      console.log("O componente foi desmontado")
    }
  }, [navigate, id])

  function saveMovie(){
    const myMovieList = localStorage.getItem("@movielibrary");

    let moviesOnCloud = JSON.parse(myMovieList) || [];

    const hasMovie = moviesOnCloud.some((saved) => saved.id === filme.id)

    if(hasMovie){
      toast.warn("Esse filme já foi salvo anteriormente!");
      return;
    }

    moviesOnCloud.push(filme);
    localStorage.setItem("@movielibrary", JSON.stringify(moviesOnCloud));
    toast.success("Filme salvo com sucesso!")
  }

  if(loading){
    return(
      <div className='w-full flex justify-center align-center mt-20 absolute bg-green-400'>
        <h2>Carregando detalhes</h2>
      </div>
    )
  }

  return(
    <div>
      <h1>{filme.name}</h1>
      <img className="w-full h-full" src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.name} />

      <h3>Sinopse</h3>
      <div>{filme.overview}</div>

      <strong>Nota: {filme.vote_average}</strong>

      <div>
        <button onClick={ saveMovie } >Salvar</button>
        <button >
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.name} Trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Movie;
import React from "react";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FaPlay } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'

import { toast } from 'react-toastify';

import ClipLoader from "react-spinners/ClipLoader";

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
      <div className="w-full h-screen justify-center items-center ">
        <div className='flex justify-center items-center'>
          <ClipLoader className="text-indigo-600" loading={loading}  size={60} aria-label="Loading Spinner" />
        </div>
      </div>
    )
  }

  return(
    <div className="w-full h-screen">
      <div className="absolute w-full h-screen">
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.name} />
      </div>

      <div className=" bg-slate-50 py-8 px-8 rounded-xl drop-shadow-lg relative flex justify-center items-center mx-3 top-[150px]  sm:w-[600px] sm:h-[400px] sm:justify-start sm:p-10 md:w-[700px]">
        <div className="block justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold mb-3 text-indigo-600 sm:text-4xl">{filme.name}</h1>
            <strong className="flex items-center justify-start"><AiFillStar className="text-yellow-500 mr-2 text-[18px]"/>{filme.vote_average}</strong>
          </div>
          <div className="my-4 text-lg">{filme.overview}</div>
          <div className='block items-center sm:flex sm:justify-start'>
            <button className="p-1 w-full mb-3 flex justify-center items-center text-white font-bold rounded-lg bg-blue-600  hover:bg-blue-800 sm:mr-10 sm:w-32 sm:mb-auto" onClick={ saveMovie } >Salvar<MdAdd className="ml-2 text-[20px]"/></button>
            <button className="p-1 w-full flex justify-center items-center text-white font-bold rounded-lg bg-red-600  hover:bg-red-800 sm:mr-10 sm:w-32" >
              <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.name} Trailer`}>
                Trailer
              </a> 
              <FaPlay className="ml-2 text-[12px]"/>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Movie;
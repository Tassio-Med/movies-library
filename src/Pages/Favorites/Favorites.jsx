import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {BsFillTrashFill} from 'react-icons/bs';
import {CgDetailsMore} from 'react-icons/cg'

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
    <div className="absolute w-full h-full flex justify-center items-center bg-slate-100">
      {/* <h1>Página de Favoritos</h1> */}

      {movies.length === 0 && <span className=" text-indigo-800 text-3xl font-bold mr-10">Você não possui nenhum filme salvo :(</span>}

      <ul className={movies.length === 0 ? "bg-inherit" :  "w-[500px] p-4 block justify-center items-center bg-slate-50 rounded-xl shadow-xl sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"}>
        {movies.map((item)=>{
          return(
            <li key={item.id} className="block justify-center items-center p-3 mb-2 rounded-xl border-2 border-indigo-200 hover:bg-slate-300 md:flex sm:justify-between">
              <h2 className="flex justify-center items-center text-xl tracking-wide text-indigo-900 font-bold mb-2 sm:mr-10">{item.name}</h2>
              <div className="flex justify-center">
                <button className="mr-10 p-1 w-40 flex justify-center items-center text-white font-bold rounded-lg bg-blue-600  hover:bg-blue-800">
                  <Link to={`/movie/${item.id}`} className="w-full h-full flex justify-center items-center"> Ver detalhes </Link>
                  <CgDetailsMore className="mr-2 text-2xl"/>
                </button>
                <button className="p-1 w-32 flex justify-center items-center text-white font-bold rounded-lg bg-red-600  hover:bg-red-800" onClick={ () => deleteMovie(item.id) }>
                  Excluir
                  <BsFillTrashFill className="ml-2"/>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Favorites;
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import api from '../../services/api';

import ClipLoader from "react-spinners/ClipLoader";

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// API URL: /tv/popular?api_key=fedd1180bea199228b93bece9b17a8df&language=pt-BR

function Home(){
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [background, setBackground] = useState();

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
      console.log(filmes);
    }
    loadFilmes();
  }, [filmes])


  if(loading){
    return(
      <div className='w-full flex justify-center items-center mt-20 absolute'>
        <h2>Carregando filmes... <ClipLoader lclassName="text-indigo-600" loading={loading}  size={80} aria-label="Loading Spinner" /></h2>
        
      </div>
    )
  }

  const handleClick =(img)=>{
    setBackground(`https://image.tmdb.org/t/p/original/${img}`)
    const imgBg = filmes.find((f)=> f[0].backdrop_path);
    console.log(imgBg);
  }

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      {/* <img src={filme.backdrop_path} height="300" width="500" />  */}
      <img src={background}   className='w-full h-screen object-cover' alt="/"/> 
      <div className='relative flex items-center'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='slider'
          className='w-[1200px] h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
          >
            {filmes.map((filme)=> (
                <img className='w-[150px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' onClick={()=>handleClick(filme.backdrop_path)} src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.name}/>
            ))}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />     
      </div>
    </div>
  );
}
 
export default Home;
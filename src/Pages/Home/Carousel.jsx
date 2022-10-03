// App.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Slider from "react-slick";

import api from '../../services/api';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// API URL: /tv/popular?api_key=fedd1180bea199228b93bece9b17a8df&language=pt-BR

function Carousel(){
  const [filmes, setFilmes] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {

    setNav1(slider1);
    setNav2(slider2);

  });

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


  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px'
  };

  return (
    <div className="className=w-full h-screen uppercase flex flex-col relative">
       <div className="slider-wrapper">  

        {/* CAPA */}

        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={slider => (setSlider1(slider))}
        >

          {filmes.map((filme) =>

            <div className="slick-slide" key={filme.id}>
              <h2 className="slick-slide-title bg-indigo-400">{filme.name}</h2>
              <img className="w-full h-full object-cover mix-blend-overlay" src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.name} />
              {/* <label className="slick-slide-label">{filme.label}</label> */}
            </div>

          )}

        {/* THUMBNAIL */}

        </Slider>
        <div className="thumbnail-slider-wrap m-7">

          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={slider => (setSlider2(slider))}
            >

            {filmes.map((filme) =>

              <div style={{ display: 'grid !important' }} className="slick-slide shadow-lg mx-5 p-28 rounded-lg" key={filme.id}>
                <h2 className="text-lg font-bold">{filme.name}</h2>
                <img className="slick-slide-image  object-cover" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.name}/>
                <button><Link to={`/filme/${filme.id}`}>Acessar</Link></button>
              </div>

            )}

          </Slider>
        </div>
      </div>
     
    </div>
  );
}


 
export default Carousel;
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
      // console.log(response.data.results.slice(0, 15));
      setFilmes(response.data.results.slice(0, 15))

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
    centerPadding: '20px'
  };

  return (
    <div className=" w-full h-screen uppercase  relative overflow-x-hidden">
       <div className="slider-wrapper">  

        {/* CAPA */}

        <div className=' relative z-0'>
          <Slider
            {...settingsMain}
            asNavFor={nav2}
            ref={slider => (setSlider1(slider))}
            className="w-full absolute"
          >
            {filmes.map((filme) =>
              <div className="slick-slide" key={filme.id}>
                <h2 className="slick-slide-title text-white absolute inset-0 z-10">{filme.name}</h2>
                <div className='w-full' key={filme.id}>
                  <img className="w-full h-full" src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.name} />
                </div>
                {/* <button className='absolute'><Link to={`/filme/${filme.id}`}>Acessar</Link></button> */}
              </div>
            )}
          </Slider>
          {/* THUMBNAIL */}
          <div className="thumbnail-slider-wrap absolute inset-0 z-10 w-full h-full left-16">
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={slider => (setSlider2(slider))}
              className="w-[550px] m-10 grid-rows-3"
              >

              {filmes.map((filme) =>

                <div className="card p-full m-5 " key={filme.id}>
                  {/* <h2 className="text-lg font-bold">{filme.name}</h2> */}
                  <img className="w-full h-full object-cover rounded-xl" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.name}/>
                
                </div>

              )}

            </Slider>
          </div>
        </div>
        
      </div>
     
    </div>
  );
}


 
export default Carousel;
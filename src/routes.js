import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Movie from './Pages/Movie/Movie';
import Favorites from './Pages/Favorites/Favorites';

import Error from './Pages/Error/Error';

import Header from './Components/Header/Header';

function RoutesApp(){
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/movie/:id" element={ <Movie/> }/>
        <Route path="/favorites" element={ <Favorites/> }/>

        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;
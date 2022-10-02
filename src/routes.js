import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Movie from './Pages/Movie/Movie';

import Header from './Components/Header/Header';

function RoutesApp(){
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/movie:id" element={ <Movie/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;
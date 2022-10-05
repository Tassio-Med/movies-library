import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Movie from './Pages/Movie/Movie';

import Error from './Pages/Error/Error';

import Header from './Components/Header/Header';

function RoutesApp(){
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/filme/:id" element={ <Movie/> }/>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;
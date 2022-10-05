import React from "react";

import { Link } from 'react-router-dom';

function Error(){
  return(
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-100">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="my-8 text-2xl">Página não encontrada!</h2>
      <Link to="/" className="underline decoration-1 text-lg text-blue-500">Veja todos os filmes aqui.</Link>
    </div>
  )
}

export default Error;
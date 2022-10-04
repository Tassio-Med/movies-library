import { Link } from 'react-router-dom'
import {BiCameraMovie, BiStar} from 'react-icons/bi'

function Header(){
  return(
    <header className='w-screen h-20 shadow-bottom z-20 fixed drop-shadow-md flex justify-between items-center'>
      <div className='mx-5'>
        <Link to="/" className=''>
          <BiCameraMovie className='text-5xl text-indigo-800 md:text:3xl'/>
        </Link>
      </div>
      <button className='w-30 h-10 mx-5 px-4 py-1 bg-indigo-600 rounded-lg flex items-center hover:bg-indigo-800'>
        <Link to="/favoritos" className='w-full h-full font-bold text-slate-50 flex items-center'>Favoritos</Link>
        <BiStar className='text-2xl text-slate-50'/>
      </button>
    </header>
  )
}

export default Header;
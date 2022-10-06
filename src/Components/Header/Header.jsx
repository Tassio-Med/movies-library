import { Link } from 'react-router-dom'
import {BiCameraMovie, BiStar} from 'react-icons/bi'

function Header(){
  return(
    <header className='w-screen h-24 bg-gradient-to-b from-gray-900 shadow-bottom z-20 fixed drop-shadow-md flex justify-between items-center'>
      <div className='mx-10'>
        <Link to="/" className=''>
          <BiCameraMovie className='text-5xl text-indigo-600 md:text:3xl'/>
        </Link>
      </div>
      <button className=' tracking-wider w-36 h-10 mx-10 px-4 py-1 bg-indigo-600 rounded-lg flex items-center hover:bg-indigo-800'>
        <Link to="/favorites" className='w-full h-full font-bold text-slate-50 flex items-center'>Favoritos</Link>
        <BiStar className='text-2xl text-slate-50'/>
      </button>
    </header>
  )
}

export default Header;


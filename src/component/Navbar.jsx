import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearData } from '../Redux/slice/todos/allTodos';


export default function Navbar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const resName = localStorage.getItem('name')

  useEffect(() => {
    setName(resName);
  }, [resName]);

  const logout = ()=>{
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('name')
    localStorage.removeItem('msg')
    setName(null)
    dispatch(clearData())
  }

  return (
    <div className='flex p-2 items-center px-6 text-stone-600 gap-28 border'>
        <div className='flex gap-4'>
          <div  className='rounded-full hover:bg-stone-100  h-10 w-10 flex justify-center items-center cursor-pointer'><MenuIcon/></div>
          <h1 className='mt-2 font-semibold cursor-pointer'>ShortNotes</h1>
        </div>
        <div className='mx-2 hidden sm:flex items-center flex-grow h-10 rounded-md cursor-pointer bg-stone-200'>
          <SearchIcon fontSize='medium' className='m-2'/>
          <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-r-md focus:outline-none bg-stone-200 ' type="text" placeholder='Search' />
        </div>
        <div className='flex gap-6'>
          <div className='hover_effect'><ReplayIcon/></div>
          <div  className='hover_effect'><DragHandleIcon/></div>
          <div  className='hover_effect'><SettingsIcon/></div>
          <div onClick={()=>{
            name? logout() : navigate("/")
          }}  className='hover_effect'>
            {(name)? name: <AccountCircleIcon/>}
            
            </div>
        </div>
        

    </div>
  )
}

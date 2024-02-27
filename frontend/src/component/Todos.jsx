/* eslint-disable react/prop-types */
import ColorLensIcon from '@mui/icons-material/ColorLensOutlined';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import UndoIcon from '@mui/icons-material/UndoOutlined';
import RedoIcon from '@mui/icons-material/RedoOutlined';
import AddAlertIcon from '@mui/icons-material/AddAlertOutlined'; 
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { remove } from '../Redux/slice/todos/allTodos';
import { baseUrl} from '../../config';

function Todos({_id,title,description}) {

  const dispatch = useDispatch();
  const headerToken = localStorage.getItem('jwtToken')

  const handleClick = () => {
    axios.delete(
      `${baseUrl}/user/deleteTodo/${_id}`, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${headerToken}`,
        }
      }     
    )

    .then((res)=>{
      console.log(res)
      dispatch(remove({_id:_id}))
    })

    .catch((err)=>{
      console.log(err)
    })
    
  }

  return (
    <div className="relative text-left border shadow-lg px-3 py-3 rounded-lg pb-7">
      <div>        
        <h1 className="font-bold">{title}</h1>
        <h3>{description}</h3>
      </div>
      <div className='h-10'/>
      <div className=' justify-between text-stone-600 absolute bottom-2 right-0 flex items-center'>
        <div className='flex gap-3 px-2'>
          <div className='hover_effect'><AddAlertIcon/></div>
          <div className='hover_effect'><ColorLensIcon/></div>
          <div className='hover_effect'><ImageIcon/></div>
          <div className='hover_effect'><UndoIcon/></div>
          <div className='hover_effect'><RedoIcon/></div>
        </div> 
        <div className='text-red-500 hover_effect' onClick={handleClick}><DeleteIcon/></div> 
 
      </div>


    </div>
  )
}

export default Todos
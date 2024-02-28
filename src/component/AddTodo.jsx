import ColorLensIcon from '@mui/icons-material/ColorLensOutlined';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import UndoIcon from '@mui/icons-material/UndoOutlined';
import RedoIcon from '@mui/icons-material/RedoOutlined';
import AddAlertIcon from '@mui/icons-material/AddAlertOutlined';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../Redux/slice/todos/allTodos';
import { baseUrl} from '../../config';
import { useNavigate } from 'react-router-dom';



function AddTodo() {
  const navigate=useNavigate()
  const headerToken = localStorage.getItem('jwtToken')

  const dispatch = useDispatch()
  const name = localStorage.getItem('name')

  const[todo,setTodo]=useState({
    title:"",
    description:""
  })

  const handleChange =(event)=>{
    const{value,name}=event.target

    setTodo(prevalue=>{
      if(name === "title"){
        return {
          title:value,
          description:prevalue.description
        }
      }else if(name === "description"){
        return{
          title:prevalue.title,
          description:value
        }
      }
    })
  }

  const handleClick = () => {
    axios.post(
      `${baseUrl}/user/addtodo`,
      {
        title: todo.title,
        description: todo.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${headerToken}`,
        },
      }
    )
      .then((res) => {
        console.log(res);

        dispatch(add({
            _id: res.data.todoId,
            title: todo.title,
            description: todo.description,
        }))

        setTodo({
          title: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
  })
  };




  return (
    <div className=" flex flex-col flex-grow border max-w-[600px] gap-5 py-2 pr-10 pl-2 shadow-xl rounded-mdfss">
        <input onChange={handleChange} type="text" name='title' className=" h-7 px-3 focus:outline-none" placeholder="Title" value={todo.title}/>
        <input onChange={handleChange} type="text" name='description' className=" h-7 px-3 focus:outline-none" placeholder="Description..." value={todo.description}/>
        <div className='flex justify-between text-stone-600'>
            <div className='flex gap-5 px-2'>
                <div className='hover_effect'><AddAlertIcon/></div>
                <div className='hover_effect'><ColorLensIcon/></div>
                <div className='hover_effect'><ImageIcon/></div>
                <div className='hover_effect'><UndoIcon/></div>
                <div className='hover_effect'><RedoIcon/></div>
            </div>
            <button onClick={handleClick}  className='ml-16 bg-yellow-300 hover:bg-yellow-400 h-10 w-14 rounded-lg'>Add</button>
        </div>
    </div>
  )
}

export default AddTodo
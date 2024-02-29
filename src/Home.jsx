/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from './component/Navbar';
import './App.css';
import AddTodo from './component/AddTodo';
import Todos from './component/Todos';
import {useEffect } from 'react';
import axios from "axios";
import {useDispatch,useSelector} from 'react-redux'
import { setData } from './Redux/slice/todos/allTodos';
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';







function Home() { 
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const headerToken = localStorage.getItem('jwtToken')
  const name = localStorage.getItem('name')

  if(!name){
    navigate("/")
  }

  useEffect(()=>{
    if (name) {
      axios.get(`${baseUrl}/user/todos`, {
          headers: {
            Authorization: `Bearer ${headerToken}`
          }
        })
        .then((res) => {
          console.log(res)
          dispatch(setData(res.data.todos));
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },[name,dispatch])

  const todoss = useSelector((state)=>state.allTodos.data)

  return (
    <div>
    {/* Navbar here */}
    <Navbar/>

    <div className='flex flex-col justify-center items-center mt-14'>
      <AddTodo/>
    </div>

    <main className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center mt-10 gap-4 mx-10 mb-10'>


      {Array.isArray(todoss) ? (
        todoss.map(todo => (
          // Your mapping logic here
          <Todos key={todo._id} _id={todo._id} title={todo.title} description={todo.description}/>
        ))
      ) : (
        // Handle the case where todos is not an array
        <p className='text-center w-screen mt-20 text-gray-400'>No todos available</p>
      )} 
 
    </main>
      
    </div>
  )
}

export default Home

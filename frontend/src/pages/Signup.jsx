import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

function Signup() {
  const navigate = useNavigate();
  const [user,setUser]=useState({
    name:"",
    username:"",
    password:""
  })

  const handleChange = (event)=>{
    const{value,name}=event.target

    setUser(prevalue =>{
      if(name === "username"){
        return{
          username:value,
          name:prevalue.name,
          password:prevalue.password
        }
      }
      else if(name === "password"){
        return{
          username:prevalue.username,
          name:prevalue.name,
          password:value
        }
      }
      else if(name === "name"){
        return{
          username:prevalue.username,
          name:value,
          password:prevalue.password
        }
      }
    })
  }


  const handleClick=() =>{
    axios.post(`${baseUrl}/user/signup`,{
      name:user.name,
      username: user.username,
      password:user.password
    })

    .then((res)=>{
      const jwtToken = res.data.token
      const name = res.data.name
      localStorage.setItem("jwtToken",jwtToken)
      localStorage.setItem("name",name)
      navigate("/")
    })

    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-stone-100">
      <div className="flex flex-col border shadow-md h-auto w-96 p-10 bg-white gap-4 rounded-sm">


        <h1 className="text-xl font-semibold">SignUp</h1>

        <div className="flex flex-col flex-grow ">
        <input onChange={handleChange} 
        name="name" 
        className="border shadow-md p-1 rounded-md" placeholder="Name" 
        type="text" 
        value={user.name} />
      </div>

      <div className="flex flex-col flex-grow ">
        <input onChange={handleChange} 
        name="username" 
        className="border shadow-md p-1 rounded-md" placeholder="Username" 
        type="text" 
        value={user.username} />
      </div>

      <div className="flex flex-col flex-grow ">
        <input onChange={handleChange} 
        name="password" 
        className="border shadow-md p-1 rounded-md" placeholder="Password" 
        type="text" 
        value={user.password} />
      </div>

        <div className="flex justify-between">

          <div className="flex gap-2">
          <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <h1>Remember me</h1>
          </div>

          <h1 className="text-[#4398e1] font-semibold">Forget Password?</h1>

        </div>
        <button 
        className="border p-1 w-40 bg-[#4398e1] text-white rounded-lg"
        onClick={handleClick}
        >Register</button>
        <h1>
          You already have an account <span onClick={()=>{
            navigate('/login')
          }} className="text-[#4398e1] font-semibold cursor-pointer">Login?</span>
        </h1>
      </div>

    </div>
  )
}

export default Signup
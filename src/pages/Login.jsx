import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { baseUrl} from "../../config";



function Login() {
  const msg = localStorage.getItem("msg")
  const navigate = useNavigate();
  const [user,setUser]=useState({
    username:"",
    password:""
  })


  const handleChange = (event)=>{
    const{value,name}=event.target

    setUser(prevalue =>{
      if(name === "username"){
        return{
          username:value,
          password:prevalue.password
        }
      }
      else if(name === "password"){
        return{
          username:prevalue.username,
          password:value
        }
      }
    })
  }


  const handleClick = () =>{
    axios.post(`${baseUrl}/user/signin`,{
      username: user.username,
      password:user.password
    })

    .then((res)=>{
      const jwtToken = res.data.token
      const name = res.data.name
      const msg = res.data.msg
      localStorage.setItem("msg",msg)
      localStorage.setItem("jwtToken",jwtToken)
      localStorage.setItem("name",name)
      navigate("/home")
    })

    .catch((err)=>{
      console.log(err)
    })
  }




  return (
    <div className="flex justify-center items-center h-screen bg-stone-100">
    <div className="flex flex-col border shadow-md h-auto w-96 p-10 bg-white gap-4 rounded-sm">


      <h1 className="text-xl font-semibold">LogIn</h1>


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
        type="password" 
        value={user.password} />
      </div>

      <div className="text-red-500">{msg}</div>

      <div className="flex justify-between">

        <div className="flex gap-2">
        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <h1>Remember me</h1>
        </div>

        <h1 className="text-[#4398e1] font-semibold">Forget Password?</h1>

      </div>
      <button 
      onClick={handleClick}
      className="border p-1 w-40 bg-[#4398e1] text-white rounded-lg">Login</button>

      <h1>
        Don&apos;t have an account <span onClick={()=>{
            navigate('/')
          }} className="text-[#4398e1] font-semibold cursor-pointer">SignUp?</span>
        </h1>
    </div>

  </div>
  )
}

export default Login
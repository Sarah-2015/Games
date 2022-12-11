import axios from 'axios'
import Joi, { object } from 'joi'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import login from '../../images/gaming.ebaf2ffc84f4451d.jpg'
import logo from '../../images/logo.png'

export default function Login() {
  let {saveUserData}=useContext(AuthContext)
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [errorList, setErrorList] = useState([])
  const [errorMsg, setErrorMsg] = useState("")
  let navigate=useNavigate()

  let getInputValue=(e)=>{
    let myUser={...user}
   myUser[e.target.name]=e.target.value;
 
   setUser(myUser)

  }
  let LoginValidation=()=>{
    let schema=Joi.object({
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(/^[a-z]\w{7,14}$/)
    })
    return schema.validate(user,{abortEarly:false})
  }

  let submitFormData=async(e)=>{
    e.preventDefault();
    let validateResponse=LoginValidation();
    if(validateResponse.error)
    {
      setErrorList(validateResponse.error.details)
    }
    else
    {
      let{data}=await axios.post('https://sticky-note-fe.vercel.app/signin',user)
      console.log(data);
      if(data.message=="success")
      {
        localStorage.setItem("token",data.token);
        saveUserData();
        navigate("/")
      }
      else{
        setErrorMsg(data.message)

      }
    }

  }

  return (
    <div className='row py-5 my-5 align-items-center '>
      <div className="col-md-6">
        <img className='w-100' src={login}/>
      </div>
      <div className="col-md-6 text-center">
        <img className='w-25 p-2' src={logo}/>
    
    {errorMsg? <div className='alert alert-danger p-1 '>{errorMsg}</div>:""}
        <h2 className='text-white' >Log in to GameOver</h2>
        <form onSubmit={submitFormData} className='my-3' >
    
          <input onChange={getInputValue} className='form-control my-2' type='email' placeholder='Email'name='email' />
          {errorList.map((error,index)=>error.context.label=='email'?<p key={index} className=' text-danger text-start'>Email {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
 
          <input onChange={getInputValue} className='form-control my-2' type='password' placeholder='Password' name='password'/>
          {errorList.map((error,index)=>error.context.label=="password"?<p key={index} className='text-danger text-start '>password must be at least 8 characters and starts with a letter</p>:"")}
          <div className="">
       <button className='btn btn-outline-primary my-3 w-100 '>Login</button>
       </div>

        </form>
        <hr/>
        <div  className="text-center">
          <span  className="small">Not a member yet? </span>
          <Link  routerlink="/register" className="small a2 text-decoration-none" to="/register"> Create Account
          <i className="fas fa-chevron-right small"></i>
          </Link>
          </div>
       
      
        
        </div>
    </div>
  )
}

import axios from 'axios'
import Joi, { object } from 'joi'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import bg from '../../images/bg.jpg'
import logo from '../../images/logo.png'
import styles from './Login.module.css'

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
    <div className={` ${styles.bg} position-absolute  start-0 end-0 overflow-hidden`}>
    <div className= {`m-auto w-50 container h-50 `}>
     
      <div className=" text-center">
      <h2 className='text-white' >Log in to GameOver</h2>
    
    {errorMsg? <div className='alert alert-danger p-1 '>{errorMsg}</div>:""}
        
        <form onSubmit={submitFormData} className='my-3' >
            <div className='my-2'>
          <input onChange={getInputValue} className='form-control ' type='email' placeholder='Email'name='email' />
          {errorList.map((error,index)=>error.context.label=='email'?<p key={index} className='alert alert-danger text-start p-0'>Email {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
          </div>
         <div className='my-2'>
         <input onChange={getInputValue} className='form-control  ' type='password' placeholder='Password' name='password'/>
          {errorList.map((error,index)=>error.context.label=="password"?<p key={index} className=' alert alert-danger p-0 text-start '>password must be at least 8 characters and starts with a letter</p>:"")}
         </div>

          <div className=" my-3">
       <button className='btn btn-primary w-100 '>Login</button>
       </div>

        </form>
        
        <div  className="text-center my-4">
          <span  className=" text-white h6">Not a member yet? </span>
          <Link   className=" ms-1 text-decoration-none btn btn-primary" to="/register"> Create Account
          <i className="fas fa-chevron-right small"></i>
          </Link>
          </div>
       
      
        
        </div>
    </div>
    </div>
  )
}

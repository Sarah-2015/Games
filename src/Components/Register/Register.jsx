import axios from 'axios'
import Joi, { object } from 'joi'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../../images/gaming.ebaf2ffc84f4451d.jpg'
import styles from './Register.module.css'



export default function Register() {
  const [user, setUser] = useState({
    
    first_name: "",
    last_name: "",
    age: "",
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

  let RegisterValidation=()=>{
    let schema=Joi.object({
      first_name:Joi.string().alphanum().required().min(3).max(7),
      last_name:Joi.string().alphanum().required().min(3).max(7),
      age:Joi.number().required().min(18).max(80),
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(/^[a-z]\w{7,14}$/)
    })
    return schema.validate(user,{abortEarly:false})
  }
  
  let submitFormData=async(e)=>{
    e.preventDefault();
    let validateResponse=RegisterValidation();
    if(validateResponse.error)
    {
      setErrorList(validateResponse.error.details)
      console.log(validateResponse.error.details);
    }
    else
    {
      let{data}=await axios.post('https://sticky-note-fe.vercel.app/signup',user)
      console.log(data);
      if(data.message=="success")
      {
        navigate("/login")
      }
      else{
        setErrorMsg(data.message)

      }
    }

  }


  return (

    <div className={` ${styles.bg} position-absolute  start-0 end-0 overflow-hidden `}>
      <div className= {`mx-auto w-50 container text-center  ${styles.h}  pt-4 rounded-4`}>
        
      <h2 className='text-white'>Create My Account!</h2>

    {errorMsg? <div className='alert alert-danger p-1 '>{errorMsg.split(" ").slice(4,10).join(" ")}</div>:""}
        
        <form onSubmit={submitFormData} className='mt-3 ' >
          <div className="row mb-2">
            <div className="col-sm-6 ">
            <input onChange={getInputValue} className='form-control  ' type='text' placeholder='First name' name='first_name' />
          {errorList.map((error,index)=>error.context.label=='first_name'?<p key={index} className='text-start alert alert-danger p-0 '>First name {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
            </div>
            <div className="col-sm-6 ">
            <input onChange={getInputValue} className='form-control ' type='text' placeholder='Last name' name='last_name' />
            {errorList.map((error,index)=>error.context.label=='last_name'?<p key={index} className='text-start alert alert-danger p-0 '>Last name {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
            </div>
          </div>
          <div className='mt-2'>
          <input onChange={getInputValue} className='form-control ' type='email' placeholder='Email'name='email' />
          {errorList.map((error,index)=>error.context.label=='email'?<p key={index} className='alert alert-danger text-start p-0'>Email {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
          </div>
          <div className='mt-2'>
          <input onChange={getInputValue} className='form-control ' type='number' placeholder='Age' name='age'/>
          {errorList.map((error,index)=>error.context.label=='age'?<p key={index} className='alert  alert-danger text-start p-0 '>Age {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
          </div>

         <div className='mt-2'>
         <input onChange={getInputValue} className='form-control' type='password' placeholder='Password' name='password'/>
          {errorList.map((error,index)=>error.context.label=="password"?<p key={index} className=' alert alert-danger text-start p-0'>password must be at least 8 characters and starts with a letter</p>:"")}
         </div>

          
          
       <button className='btn btn-primary  w-100 my-3 '>Create Account</button>
      

        </form>
       
       
        <div  className="text-center mt-3">
          <span className="text-white h6">Already a member?</span>
          <Link to="/login" className="  cursor ms-2 btn btn-primary text-decoration-none" >Log In<i  className="fas fa-chevron-right small"></i>
          </Link>
          </div>
        
        </div>
    </div>
  )
}

import axios from 'axios'
import Joi, { object } from 'joi'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../../images/gaming.ebaf2ffc84f4451d.jpg'




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
      let{data}=await axios.post('https://route-egypt-api.herokuapp.com/signup',user)
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

    <div className='row py-5 my-5 align-items-center'>
      <div className="col-md-6">
      <img className='w-100' src={login}/>
      </div>
 
      <div className="col-md-6 text-center">
      
    {errorMsg? <div className='alert alert-danger p-1 '>{errorMsg.split(" ").slice(4,10).join(" ")}</div>:""}
        <h2 className='text-white' >Create My Account!</h2>
        <form onSubmit={submitFormData} className='my-3' >
          <div className="row g-2">
            <div className="col-sm-6 ">
            <input onChange={getInputValue} className='form-control ' type='text' placeholder='First name' name='first_name' />
          {errorList.map((error,index)=>error.context.label=='first_name'?<p key={index} className='text-start text-danger '>First name {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
            </div>
            <div className="col-sm-6 ">
            <input onChange={getInputValue} className='form-control ' type='text' placeholder='Last name' name='last_name' />
            {errorList.map((error,index)=>error.context.label=='last_name'?<p key={index} className='text-start text-danger '>Last name {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
            </div>
          </div>
          <input onChange={getInputValue} className='form-control my-2' type='email' placeholder='Email'name='email' />
          {errorList.map((error,index)=>error.context.label=='email'?<p key={index} className=' text-danger text-start'>Email {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}
          <input onChange={getInputValue} className='form-control my-2' type='number' placeholder='Age' name='age'/>
          {errorList.map((error,index)=>error.context.label=='age'?<p key={index} className=' text-danger text-start'>Age {error.message.split(" ").slice(1,10).join(" ")}</p>:"")}

          <input onChange={getInputValue} className='form-control my-2' type='password' placeholder='Password' name='password'/>
          {errorList.map((error,index)=>error.context.label=="password"?<p key={index} className='text-danger text-start '>password must be at least 8 characters and starts with a letter</p>:"")}

          
          <div className="">
       <button className='btn btn-outline-primary my-3 w-100 '>Create Account</button>
       </div>

        </form>
        <div className="text-muted small">This site is protected by reCAPTCHA and the Google
        <a  href="https://policies.google.com/privacy" className="text-secondary">Privacy Policy</a> and 
        <a  href="https://policies.google.com/terms" className="text-secondary">Terms of Service</a> apply.
        </div>
        <hr/>
        <div  className="text-center">
          <span className="small">Already a member?</span>
          <Link to="/login" className="small a2 cursor ms-2 text-decoration-none" >Log In<i  className="fas fa-chevron-right small"></i>
          </Link>
          </div>
        
        </div>
    </div>
  )
}

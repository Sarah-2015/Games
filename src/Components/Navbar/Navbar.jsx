import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import logo from '../../images/logo.png'
import { NavLink } from "react-router-dom";



export default function Navbar() {
  let {userData,logout} = useContext(AuthContext)
 

  
  return (
   
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container">
    <a className="navbar-brand " >
      <img  width="90" height="40" src={logo} alt=""/>Game Over</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userData?<ul className="navbar-nav ms-5 mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? ' nav-link text-white fw-bold ' : ' active nav-link ')}  to={""}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  className={({ isActive }) => (isActive ? ' nav-link text-white fw-bold' : ' active  nav-link')}
              to={"all"}>All</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink  className={({ isActive }) => (isActive ? ' nav-link  dropdown-toggle active ' : ' dropdown-toggle nav-link ')}  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Platforms
          </NavLink>
          <ul className="dropdown-menu  ">
            <li><Link className="dropdown-item" to={`/platforms/pc`}>Pc</Link></li>
            <li><Link className="dropdown-item " to={`/platforms/browser`}>Browser</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <NavLink className={({ isActive }) => (isActive ? ' nav-link  dropdown-toggle active ' : ' dropdown-toggle nav-link ')} role="button" data-bs-toggle="dropdown" aria-expanded="false">
          sort-by
          </NavLink>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item"  to={"/sort-by/release-date"} >Release-date</Link></li>
            <li><Link className="dropdown-item" to={"/sort-by/popularity"}>Popularity</Link></li>
            <li><Link className="dropdown-item" to={"/sort-by/alphabetical"} >Alphabetical</Link></li>
            <li><Link className="dropdown-item" to={"/sort-by/relevance"} >Relevance</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <NavLink className={({ isActive }) => (isActive ? ' nav-link  dropdown-toggle active ' : ' dropdown-toggle nav-link ')}  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories
          </NavLink>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item"  to={"/categories/racing"} >racing</Link></li>
            <li><Link className="dropdown-item" to={"/categories/sports"}>sports</Link></li>
            <li><Link className="dropdown-item" to={"/categories/social"} >social</Link></li>
            <li><Link className="dropdown-item" to={"/categories/shooter"} >shooter</Link></li>
            <li><Link className="dropdown-item" to={"/categories/open-world"} >open-world</Link></li>
            <li><Link className="dropdown-item" to={"/categories/zombie"} >zombie</Link></li>
            <li><Link className="dropdown-item" to={"/categories/fantasy"} >fantasy</Link></li>
            <li><Link className="dropdown-item" to={"/categories/action-rpg"} >action-rpg</Link></li>
            <li><Link className="dropdown-item" to={"/categories/action"} >action</Link></li>
            <li><Link className="dropdown-item" to={"/categories/flight"} >flight</Link></li>
            <li><Link className="dropdown-item" to={"/categories/battle-royale"} >battle-royale</Link></li>
          </ul>
        </li>
      </ul>:""}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {userData?<li className="nav-item ">
            <Link className="nav-link btn btn-primary text-white " onClick={logout}  >Logout</Link>
          </li>:
          <>
            <li className="nav-item text-center">
          <Link className="nav-link text-white"  to={"login"}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white btn btn-primary" aria-current="page" to={"register"}>Join Free</Link>
        </li></>
      
}
       
        </ul>
     
    </div>
  </div>
</nav>
  )
}

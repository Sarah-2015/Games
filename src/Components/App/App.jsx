
import './App.scss';
import React, { useEffect, useState } from 'react'
import { createBrowserRouter,createHashRouter,Navigate, RouterProvider } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";
import MasterLayout from '../MasterLayout/MasterLayout';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Platforms from '../Platforms/Platforms';

import All from '../All/All';

import NotFound from '../NotFound/NotFound';
import jwtDecode from 'jwt-decode';
import SortBy from '../SortBy/SortBy';
import Categories from '../Categories/Categories';
import Details from '../Details/Details';




function App() {
  const [userData, setUserData] = useState(null)

  let saveUserData=()=>{
    let encodedToken= localStorage.getItem("token");
    let decodedToken=jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }
  useEffect(() => {
    if(localStorage.getItem('token'))
  {
    saveUserData();
  }
  }, [])

  let logout=()=>{
    localStorage.removeItem('token')
    setUserData(null)
    return <Navigate to="login"/>

  }

  let routes=createHashRouter([{
    path:'/',element:<MasterLayout userData={userData} logout={logout}/>,children:[
      {index:true,element:<ProtectedRoute userData={userData}><Home /></ProtectedRoute>},
    
     
      {path:"all",element:<ProtectedRoute userData={userData}><All/></ProtectedRoute> },
      {path:"/platforms/:type",element:<ProtectedRoute userData={userData}><Platforms/></ProtectedRoute> },
      {path:"/sort-by/:sort",element:<ProtectedRoute userData={userData}><SortBy/></ProtectedRoute>  },
      {path:"/categories/:cat",element:<ProtectedRoute userData={userData}><Categories/></ProtectedRoute>  },
      {path:"/details/:id",element:<ProtectedRoute userData={userData}><Details/></ProtectedRoute>  },
      {path:"login",element:<Login saveUserData={saveUserData} /> },
      {path:"register",element:<Register/> },
      {path:"*",element:<NotFound/>}
    ]

  }])
  return (
  <>
  <RouterProvider router={routes}/>
  <Offline><div className='offline shadow bg-danger'>You are offline</div></Offline>

  </>
  );
}

export default App;

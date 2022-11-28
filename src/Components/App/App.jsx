
import './App.scss';
import React, { useContext, useEffect, useState } from 'react'
import { createBrowserRouter,createHashRouter,Navigate, RouterProvider } from 'react-router-dom';
import  { AuthContext } from '../../Context/AuthContext';
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
  let {userData,logout,saveUserData} = useContext(AuthContext);

  let routes=createHashRouter([{
    path:'/',element:<MasterLayout/>,children:[
      {index:true,element:<ProtectedRoute><Home /></ProtectedRoute>},
    
     
      {path:"all",element:<ProtectedRoute ><All/></ProtectedRoute> },
      {path:"/platforms/:type",element:<ProtectedRoute ><Platforms/></ProtectedRoute> },
      {path:"/sort-by/:sort",element:<ProtectedRoute ><SortBy/></ProtectedRoute>  },
      {path:"/categories/:cat",element:<ProtectedRoute ><Categories/></ProtectedRoute>  },
      {path:"/details/:id",element:<ProtectedRoute ><Details/></ProtectedRoute>  },
      {path:"login",element:<Login /> },
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

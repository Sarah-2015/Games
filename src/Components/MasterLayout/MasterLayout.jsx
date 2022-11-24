import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout({logout,userData}) {
  return (
    <>
    <Navbar userData={userData} logout={logout}/>
    <div className="container">
    <Outlet></Outlet>
    </div>
    </>
  )
}

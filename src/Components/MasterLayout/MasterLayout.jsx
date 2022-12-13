import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout() {
  return (
    <>
    <Navbar/>
    <div className="container py-5">
    <Outlet></Outlet>
    </div>
    </>
  )
}

import React from 'react'
import './layout.css'
import { Outlet } from "react-router-dom";
import Header from './../common/Header/Header'
import Footer from './../common/Footer/Footer'
import Arrow from '../common/arrow/Arrow';


const Layout = () => {
  return (
    <div className="Layout">
      <Header />
      
      <Outlet />
      <Footer/>
      <Arrow/>
      
    </div>
  );
}

export default Layout
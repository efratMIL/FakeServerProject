import { Outlet} from "react-router-dom";
import React ,{useState,useContext}from "react"
import Header from "../componnents/Header";
import Footer from "../componnents/Footer";
import './pages.css'

export default function Layout({setShowHeaders}) {
  return (
      <div className="site-wrapper">
          <Header setShowHeaders={setShowHeaders}/>
          <main>
              <Outlet />
          </main>
          <Footer />
      </div>
  )
}
 


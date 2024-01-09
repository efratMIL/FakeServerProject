import { Outlet} from "react-router-dom";
import React from "react"
import Header from "../componnents/Header";
import Footer from "../componnents/Footer";
import './pages.css'

export default function Layout() {
  return (
      <div className="site-wrapper">
          <Header />
          <main>
              <Outlet />
          </main>
          <Footer />
      </div>
  )
}
 


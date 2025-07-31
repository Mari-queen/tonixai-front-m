import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navigation from "./Navigation"

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;
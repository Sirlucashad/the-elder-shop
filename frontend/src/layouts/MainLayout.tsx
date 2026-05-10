import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <div>
        <Header />
        <div>
            <Outlet />
        </div>       
        <Footer />
        <Toaster/>
    </div>
  )
}

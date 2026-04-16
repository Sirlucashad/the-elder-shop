import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterView from "./views/RegisterView"
import LoginView from "./views/LoginView"
import MainLayout from "./layouts/MainLayout"
import HomeView from "./views/HomeView"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >

          <Route index element={<HomeView />} />

          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

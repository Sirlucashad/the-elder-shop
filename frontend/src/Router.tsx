import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterView from "./views/RegisterView"
import LoginView from "./views/LoginView"
import MainLayout from "./layouts/MainLayout"
import HomeView from "./views/HomeView"
import ConfirmEmailView from "./views/ConfirmEmailView"
import ShopView from "./views/ShopView"
import AdminDashboardView from "./views/AdminDashBoardView"
import CreateProductView from "./views/CreateProductView"

export default function Router() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LAYOUT PRINCIPAL */}
        <Route path="/" element={<MainLayout />}>

          {/* HOME */}
          <Route
            index
            element={<HomeView />}
          />

          {/* AUTH */}
          <Route
            path="login"
            element={<LoginView />}
          />

          <Route
            path="register"
            element={<RegisterView />}
          />

          <Route
            path="confirm-email"
            element={<ConfirmEmailView />}
          />

          {/* SHOP */}
          <Route
            path="shop"
            element={<ShopView />}
          />


          {/* ADMIN */}
          <Route path="admin">

            {/* /admin */}
            <Route
              index
              element={<AdminDashboardView />}
            />

            {/* /admin/create-product */}
            <Route
              path="create-product"
              element={<CreateProductView />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
 

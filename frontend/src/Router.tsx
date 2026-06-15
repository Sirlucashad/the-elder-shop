// src/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";
import ConfirmEmailView from "./views/ConfirmEmailView";
import ShopView from "./views/ShopView";
import AdminDashboardView from "./views/AdminDashBoardView";
import CreateProductView from "./views/CreateProductView";
import ProductsView from "./views/ProductsView";
import EditProduct from "./views/EditProduct";
import CheckoutView from "./views/CheckoutView";
import OrderDetailView from "./views/OrderDetailView"; 
import CartSidebar from "./components/CartSidebar";

export default function Router() {
  return (
    <BrowserRouter>
      <CartSidebar />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="confirm-email" element={<ConfirmEmailView />} />
          <Route path="shop" element={<ShopView />} />

          {/* CHECKOUT & ORDENES */}
          <Route path="checkout" element={<CheckoutView />} />
          <Route path="ordenes/:id" element={<OrderDetailView />} /> {/* 👈 Registrada */}

          {/* ADMIN */}
          <Route path="admin">
            <Route index element={<AdminDashboardView />} />
            <Route path="create-product" element={<CreateProductView />} />
            <Route path="products" element={<ProductsView />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
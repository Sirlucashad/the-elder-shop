import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Router from './Router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx' // Importamos el proveedor del carrito
import CartSidebar from './components/CartSidebar.tsx' // Importamos la barra lateral del carrito

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <CartProvider>
         
          <CartSidebar />

          <Router />
        </CartProvider>
      </AuthProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
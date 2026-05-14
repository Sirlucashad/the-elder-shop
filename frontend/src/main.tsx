import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Router from './Router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <Router />
      </AuthProvider>

      <ReactQueryDevtools />

    </QueryClientProvider>

  </StrictMode>,
)

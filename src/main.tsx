import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'
import { OrderProvider } from './context/OrderContext'
import { CartProvider } from './context/CartContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <OrderProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrderProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
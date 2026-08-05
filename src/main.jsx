import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext'
import { HelmetProvider } from 'react-helmet-async'
import MainLayout from './layouts/MainLayout'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import DishDetails from './pages/DishDetails'
import Reservations from './pages/Reservations'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Events from './pages/Events'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <CartProvider>
      <BrowserRouter >
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<DishDetails />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </CartProvider>
    </HelmetProvider>
  </StrictMode>,
)

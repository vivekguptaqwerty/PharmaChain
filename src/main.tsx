import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import Manufacturer from "./pages/Manufacturer-dashboard.tsx";
import Wholesaler from "./pages/Wholesaler-dashboard.tsx";
import Distributor from "./pages/Distributor-dashboard.tsx";
import Admin from './pages/Admin.tsx'
import Retailer from "./pages/Retailer-dashboard.tsx";
import './index.css'
import Cart from './pages/Cart.tsx'
import PlaceOrder from './pages/PlaceOrder.tsx'
import PaymentMethod from './pages/PaymentMethod.tsx'
import PaymentSuccess from './pages/PaymentSuccess.tsx'
import TrackOrder from './pages/TrackOrder.tsx'
import NotFound from './pages/NotFound.tsx'
import ResetPassword from './pages/ResetPassword.tsx'
import VerifyEmail from './pages/VerifyEmail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/wholesaler" element={<Wholesaler />} /> {/* Fixed typo: wholsaler -> wholesaler */}
        <Route path="/distributor" element={<Distributor />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/track-order/:orderId" element={<TrackOrder />} />
        <Route path="/verify-email-otp" element={<VerifyEmail />} /> {/* Updated to /verify-email-otp */}
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
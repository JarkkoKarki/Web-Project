import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Menu from './views/Menu';
import About from './views/About';
import Login from './views/Login';
import Reservation from './views/Reservation';
import './assets/i18n';
import {UserProvider} from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './views/Profile';
import Logout from './views/Logout';
import WorkHub from './views/WorkHub';
import {LanguageProvider} from './contexts/LanguageContext';
import {ToastContainer} from 'react-toastify';
import {ShoppingCartProvider} from './contexts/ShoppingCartContext';
import Register from './views/Register';
import PaymentSuccess from './views/PaymentSuccess';
import PaymentCancel from './views/PaymentCancel';
import ViewOrder from './views/ViewOrder';
import {Checkout} from './views/Checkout';

function App() {
  return (
    <BrowserRouter>
      {/* Removed the basename property as it is not needed for root deployment */}
      <LanguageProvider>
        <ShoppingCartProvider>
          {/* ToastContainer for global toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <UserProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/order/view" element={<ViewOrder />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/workhub/*"
                  element={
                    <ProtectedRoute roles={['admin', 'employee']}>
                      <WorkHub />
                    </ProtectedRoute>
                  }
                />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/about" element={<About />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </UserProvider>
        </ShoppingCartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

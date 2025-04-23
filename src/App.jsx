import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Menu from './views/Menu';
import About from './views/About';
import Login from './views/Login';
import Reservation from './views/Reservation';
import "./assets/i18n";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './views/Profile';
import Logout from './views/Logout';


function App() {
  const { i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
          </Route>
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

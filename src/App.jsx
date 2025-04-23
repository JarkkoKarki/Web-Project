import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Menu from './views/Menu';
import About from './views/About';
import Login from './views/Login';
import Reservation from './views/Reservation';
import RegisterForm from './components/forms/RegisterForm';
import "./assets/i18n";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';


function App() {
  const { i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

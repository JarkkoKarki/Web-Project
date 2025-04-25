import { useEffect } from 'react';
import { useLanguageContext } from '../contexts/LanguageContext';
import { useUserContext } from './hooks/contextHooks';
import { Link, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const { language, changeLanguage } = useLanguageContext();
  const { user, handleAutoLogin } = useUserContext();
  const {t} = useTranslation();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="bg-[#0d0f0e] text-white font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-[#0d0f0e] border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <img src="https://placehold.co/20x20" alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-white">KEBULA</h1>
        </div>
        <nav>
          <ul className="flex space-x-8 text-sm text-white tracking-wider underline underline-offset-4">
            <li>
              <Link to="/" className="hover:text-yellow-500">
                {t('header.home')}
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-yellow-500">
              {t('header.menu')}
              </Link>
            </li>
            <li>
              <Link to="/reservation" className="hover:text-yellow-500">
              {t('header.reservation')}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500">
              {t('header.about')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex space-x-2">
            {language === 'fi' ? (
              <button className="text-yellow-500 font-bold">Suomi</button>
            ) : (
              <button
                onClick={() => changeLanguage('fi')}
                className="hover:text-yellow-500 cursor-pointer"
              >
                Suomi
              </button>
            )}
            <span>|</span>
            {language === 'en' ? (
              <button className="text-yellow-500 font-bold">English</button>
            ) : (
              <button
                onClick={() => changeLanguage('en')}
                className="hover:text-yellow-500 cursor-pointer"
              >
                English
              </button>
            )}
          </div>

          <img
            src="/icons8-search-50.png"
            alt="Search"
            className="w-6 h-6 cursor-pointer"
          />

          {!user ? (
            <>
              <Link
                to="/login"
                className="border border-yellow-500 px-4 py-1 rounded-sm text-sm hover:bg-yellow-500 hover:text-black transition"
              >
                {t('header.sign-in')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>

              {user && (user.role === 'employee' || user.role === 'admin') && (
                <>
                  <Link
                    to="/workhub"
                    className="border border-yellow-500 px-4 py-1 rounded-sm text-sm hover:bg-yellow-500 hover:text-black transition"
                  >
                    {t('header.workhub')}
                  </Link>
                </>
              )}

              <Link
                to="/logout"
                className="border border-yellow-500 px-4 py-1 rounded-sm text-sm hover:bg-yellow-500 hover:text-black transition"
              >
                {t('header.sign-out')}
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="p-8">
        <Outlet />
      </main>
      <footer className="text-center py-8 bg-[#0d0f0e] border-t border-gray-800 text-sm text-gray-500">
        &copy; {t('footer.footer')}
      </footer>
    </div>
  );
};

export default Layout;

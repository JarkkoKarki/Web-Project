import {useEffect} from 'react';
import {useLanguageContext} from '../contexts/LanguageContext';
import {useUserContext} from './hooks/contextHooks';
import {Link, Outlet} from 'react-router';
import {useTranslation} from 'react-i18next';
import {logoUrl} from '../utils/variables';

const Layout = () => {
  const {language, changeLanguage} = useLanguageContext();
  const {user, handleAutoLogin} = useUserContext();
  const {t} = useTranslation();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="bg-[#0d0f0e] font-sans text-white">
      <header className="flex items-center justify-between border-b border-gray-800 bg-[#0d0f0e] px-8 py-4">
        <div className="flex items-center space-x-3">
          <img src={logoUrl} alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-white">KEBULA</h1>
        </div>
        <nav>
          <ul className="flex space-x-8 text-sm tracking-wider text-white underline underline-offset-4">
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
              <button className="font-bold text-yellow-500">Suomi</button>
            ) : (
              <button
                onClick={() => changeLanguage('fi')}
                className="cursor-pointer hover:text-yellow-500"
              >
                Suomi
              </button>
            )}
            <span>|</span>
            {language === 'en' ? (
              <button className="font-bold text-yellow-500">English</button>
            ) : (
              <button
                onClick={() => changeLanguage('en')}
                className="cursor-pointer hover:text-yellow-500"
              >
                English
              </button>
            )}
          </div>

          <img
            src="/icons8-search-50.png"
            alt="Search"
            className="h-6 w-6 cursor-pointer"
          />

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
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
                    className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
                  >
                    {t('header.workhub')}
                  </Link>
                </>
              )}

              <Link
                to="/logout"
                className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
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
      <footer className="border-t border-gray-800 bg-[#0d0f0e] py-8 text-center text-sm text-gray-500">
        &copy; {t('footer.footer')}
      </footer>
    </div>
  );
};

export default Layout;

import {useEffect} from 'react';
import {useUserContext} from './hooks/contextHooks';
import {Link, Outlet, useLocation} from 'react-router';
import {useTranslation} from 'react-i18next';
import {rootUrl} from '../utils/variables';
import ShoppingCartElement from './ShoppingCartElement';
import LanguageChange from './LanguageChange';
import kebulaLogo from '../assets/images/kebula-logo.svg';

const Layout = () => {
  const {t} = useTranslation();
  const {user, handleAutoLogin} = useUserContext();
  const location = useLocation();
  console.log('user', user);

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0e] text-white">
      <header className="flex flex-col items-center justify-between space-y-4 border-b border-gray-800 bg-[#0d0f0e] px-4 py-2 md:flex-row md:space-y-0 md:px-6 md:py-4">
        <div className="flex w-full flex-row items-center justify-between space-x-3 md:w-auto">
          <div className="flex space-x-2 md:hidden">
            <LanguageChange />
          </div>
          <div className="flex justify-center space-x-1 md:justify-start">
            <img src={kebulaLogo} alt="Logo" className="h-12 w-12 bg-white" />
            <h1 className="hidden self-center text-xl font-bold text-white md:block">
              KEBULA
            </h1>
          </div>
          <div className="flex md:hidden">
            {!user ? (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
                >
                  {t('header.sign-in')}
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/profile"
                  title={t('header.profile')}
                  // className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
                >
                  {/* {t('header.profile')} */}
                  <img
                    src={rootUrl + user.filename}
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </Link>

                {user &&
                  (user.role === 'employee' || user.role === 'admin') && (
                    <Link
                      to="/workhub"
                      className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
                    >
                      {t('header.workhub')}
                    </Link>
                  )}

                <Link
                  to="/logout"
                  className="hidden rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black md:block"
                >
                  {t('header.sign-out')}
                </Link>
              </>
            )}
          </div>
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

        <div className="hidden items-center space-x-4 md:flex">
          {/* KIELET */}
          <LanguageChange />
          {!user ? (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
              >
                {t('header.sign-in')}
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/profile"
                title={t('header.profile')}
                // className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
              >
                {/* {t('header.profile')} */}
                <img
                  src={rootUrl + user.filename}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
              </Link>

              {user && (user.role === 'employee' || user.role === 'admin') && (
                <Link
                  to="/workhub"
                  className="rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
                >
                  {t('header.workhub')}
                </Link>
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
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* KAIKKI OSTOKORIIN LIITTYVÄ, -> näkyy vaan noissa osotteissa + vain jos on kirjautunut */}
      {user && (
        <>
          {['/', '/menu', '/about'].includes(location.pathname) && (
            <ShoppingCartElement />
          )}
        </>
      )}
      <footer className="border-t border-gray-800 bg-[#0d0f0e] py-8 text-center text-sm text-gray-500">
        &copy; {t('footer.footer')}
      </footer>
    </div>
  );
};

export default Layout;

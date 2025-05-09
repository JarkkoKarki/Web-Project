import React from 'react';
import {useTranslation} from 'react-i18next';
import {Map} from './Map.jsx';
import Contact from '../components/forms/Contact.jsx';
import finedining from '../assets/images/finedining.png';
import finedining2 from '../assets/images/finedining2.png';
import {useLocation} from 'react-router';

const About = () => {
  const {t} = useTranslation();
  const location = useLocation();
  const onHomePage = location.pathname === '/';

  return (
    <>
      <section id="about-us" className="bg-[#0f1110] py-20 text-center">
        <p className="text-yellow-500 italic">
          {t('aboutPage.special-moments')}
        </p>
        <h3 className="mb-12 text-4xl font-bold tracking-wide text-white">
          {t('aboutPage.about-us')}
        </h3>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center space-y-6 space-x-0 md:flex-row md:space-y-0 md:space-x-6 md:px-6">
          <img
            src={finedining}
            className="h-[250px] w-[370px] rounded-lg object-cover shadow-lg"
            alt="About Us"
          />
          <div className="w-full text-center md:w-1/3 md:text-left">
            <p className="text-yellow-500 italic">
              {t('aboutPage.taste-perception')}
            </p>
            <h4 className="mb-4 text-2xl font-bold text-white">
              {t('aboutPage.trad-modern')}
            </h4>
            <p className="mb-4 px-4 text-sm text-gray-400 md:px-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              dolorem. Aliquid numquam totam temporibus odit doloremque, ex nam
              rerum. Minus itaque recusandae voluptatum repellat repudiandae
              veritatis libero harum consequatur culpa.
            </p>
            <a
              href="/about"
              className="mt-8 inline-block border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              {t('aboutPage.read-more')}
            </a>
          </div>
          <img
            src={finedining2}
            className="h-[250px] w-[370px] rounded-lg object-cover shadow-lg"
            alt="About Us"
          />
        </div>
      </section>
      <div className="flex w-full flex-col">
        {!onHomePage && <Map />}
        {!onHomePage && (
          <div className="flex justify-center">
            <Contact />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(About);

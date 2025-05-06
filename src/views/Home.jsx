import React, {useEffect, useState} from 'react';
import About from './About';
import {useTranslation} from 'react-i18next';
import useMenu from '../components/hooks/menuHooks';
import MenuItem from '../components/MenuRowItem';
import facebookIcon from '../assets/images/facebook.svg';
import instagramIcon from '../assets/images/instagram.svg';
import tiktokIcon from '../assets/images/tiktok.svg';
import backgroundImage from '../assets/images/top-view-lula-kebab-with-onion-herbs-grilled-vegetables-wooden-board.jpg';

const Home = () => {
  const {t} = useTranslation();
  const {favoritesMenuArray} = useMenu();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % favoritesMenuArray.length,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [favoritesMenuArray]);

  return (
    <>
      <section
        className="relative flex h-[90vh] items-center justify-center bg-cover bg-center text-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Social Media Icons */}
        <div className="absolute bottom-6 left-6 z-10 flex space-x-2 md:bottom-10 md:left-10">
          <img
            src={facebookIcon}
            alt="Facebook"
            className="h-8 w-8 rounded bg-yellow-500 md:h-12 md:w-12"
          />
          <img
            src={instagramIcon}
            alt="Instagram"
            className="h-8 w-8 rounded bg-yellow-500 md:h-12 md:w-12"
          />
          <img
            src={tiktokIcon}
            alt="TikTok"
            className="h-8 w-8 rounded bg-yellow-500 md:h-12 md:w-12"
          />
          <h3 className="self-center font-bold text-yellow-500 italic">
            {t('homePage.follow-us')}
          </h3>
        </div>

        {/* Welcome Message */}
        <div className="bg-opacity-60 max-w-lg rounded-lg bg-[#101211] p-6 sm:p-10 md:max-w-xl">
          <p className="mb-2 text-sm text-yellow-500 italic sm:text-base">
            {t('homePage.welcome-message')}
          </p>
          <h2 className="text-3xl font-bold tracking-wider text-yellow-400 sm:text-5xl">
            {t('homePage.slogan')}
          </h2>
          <p className="mx-auto mt-4 text-xs text-white sm:text-sm md:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
            quasi ipsum qui aliquam ut quibusdam veniam. Voluptatibus ducimus,
            qui optio deserunt exercitationem pariatur consequuntur sit, at
            similique debitis hic nesciunt!
          </p>
          <a
            href="/Web-Project-Frontend/about"
            className="mt-6 inline-block border border-yellow-500 px-4 py-2 text-sm text-yellow-500 transition hover:bg-yellow-500 hover:text-black sm:px-6 sm:py-2 sm:text-base"
          >
            {t('homePage.learn-more')}
          </a>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Menu Section */}
      <section id="menu" className="bg-[#101211] py-20">
        <h3 className="mb-12 text-center text-3xl font-bold text-white">
          {t('homePage.trending-meals')}
        </h3>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-center gap-10 px-6 md:flex-row">
          <div className="w-full items-center justify-center space-y-6 px-8 md:w-1/2 md:px-0">
            <ul className="space-y-6">
              <li>
                {favoritesMenuArray.slice(0, 3).map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
              </li>
            </ul>
            <div className="flex w-full items-center justify-center">
              <a
                href="/Web-Project-Frontend/menu"
                className="mt-8 inline-block border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
              >
                {t('homePage.view-more')}
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-4 text-center font-bold">
              {favoritesMenuArray[currentImageIndex]?.name}
            </h3>
            <img
              src={
                favoritesMenuArray[currentImageIndex]?.src ||
                'https://placehold.co/560x370'
              }
              alt={favoritesMenuArray[currentImageIndex]?.name || 'Placeholder'}
              className="h-[370px] w-[560px] rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

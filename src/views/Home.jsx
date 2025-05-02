import React, {useEffect, useState} from 'react';
import About from './About';
import {useTranslation} from 'react-i18next';
import useMenu from '../components/hooks/menuHooks';
import MenuItem from '../components/MenuRowItem';

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
          backgroundImage:
            "url('src/assets/images/top-view-lula-kebab-with-onion-herbs-grilled-vegetables-wooden-board.jpg')",
        }}
      >
        <div className="bg-opacity-60 rounded-lg bg-[#101211] p-10">
          <p className="mb-2 text-yellow-500 italic">
            {t('homePage.welcome-message')}
          </p>
          <h2 className="text-5xl font-bold tracking-wider text-yellow-400">
            {t('homePage.slogan')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
            quasi ipsum qui aliquam ut quibusdam veniam. Voluptatibus ducimus,
            qui optio deserunt exercitationem pariatur consequuntur sit, at
            similique debitis hic nesciunt!
          </p>
          <a
            href="/about"
            className="mt-6 inline-block border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            {t('homePage.learn-more')}
          </a>
        </div>
      </section>
      <About />
      {/* Menu Section */}
      <section id="menu" className="bg-[#101211] py-20">
        <h3 className="mb-12 text-center text-3xl font-bold text-white">
          {t('homePage.trending-meals')}
        </h3>
        <div className="mx-auto flex max-w-6xl items-start justify-center gap-10 px-6">
          <div className="w-1/2 space-y-6">
            <ul className="space-y-6">
              <li>
                {favoritesMenuArray.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
              </li>
            </ul>
            <a
              href="/menu"
              className="mt-8 inline-block border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              {t('homePage.view-more')}
            </a>
          </div>
          <img
            src={
              favoritesMenuArray[currentImageIndex]?.src ||
              'https://placehold.co/560x370'
            }
            alt={favoritesMenuArray[currentImageIndex]?.name || 'Placeholder'}
            className="h-[370px] w-[560px] rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>
    </>
  );
};

export default Home;

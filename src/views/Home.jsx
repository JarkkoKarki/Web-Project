import React from 'react';
import About from './About';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const {t} = useTranslation();
  return (
    <>
     <section
          className="relative bg-cover bg-center h-[90vh] flex items-center justify-center text-center"
          style={{
            backgroundImage:
              "url('src/assets/images/top-view-lula-kebab-with-onion-herbs-grilled-vegetables-wooden-board.jpg')",
          }}
        >
          <div className="bg-[#101211] bg-opacity-60 p-10 rounded-lg">
            <p className="text-yellow-500 italic mb-2">
            {t('homePage.welcome-message')}
            </p>
            <h2 className="text-5xl text-yellow-400 font-bold tracking-wider">
              {t("homePage.slogan")}
            </h2>
            <p className="text-white mt-4 text-sm max-w-lg mx-auto">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
              quasi ipsum qui aliquam ut quibusdam veniam. Voluptatibus ducimus,
              qui optio deserunt exercitationem pariatur consequuntur sit, at
              similique debitis hic nesciunt!
            </p>
            <a
              href="#about-us"
              className="mt-6 px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition inline-block"
            >
              {t("homePage.learn-more")}
            </a>
          </div>
        </section>
          <About />
        {/* Menu Section */}
      <section id="menu" className="py-20 bg-[#101211]">
        <h3 className="text-center text-3xl font-bold text-white mb-12">
        {t("homePage.trending-meals")}
        </h3>
        <div
          className="flex justify-center items-start gap-10 px-6 max-w-6xl mx-auto"
        >
          <div className="w-1/2 space-y-6">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <p>KEBAB CLASSIC</p>
              <p>$25</p>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <p>SUPER KEBAB</p>
              <p>$32</p>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <p>KINGSIZE KEBAB</p>
              <p>$45</p>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <p>VEGGIE MIX</p>
              <p>$23</p>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <p>SPICY SPECIAL</p>
              <p>$27</p>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <p>CHEFS SPECIAL</p>
              <p>$48</p>
            </div>
            <a
              href="./assets/htmls/menu.html"
              className="mt-8 px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition inline-block"
            >
              {t("homePage.view-more")}
            </a>
          </div>
          <img
            src="https://placehold.co/560x370"
            className="w-1/2 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>
    </>
  );
};

export default Home;

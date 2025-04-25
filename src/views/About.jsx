import React from 'react';
import {useTranslation} from 'react-i18next';
import {Map} from './Map.jsx';

const About = () => {
  const {t} = useTranslation();

  return (
    <>
      <Map />
      <section id="about-us" className="bg-[#0f1110] py-20 text-center">
        <p className="text-yellow-500 italic">
          {t('aboutPage.special-moments')}
        </p>
        <h3 className="mb-12 text-4xl font-bold tracking-wide text-white">
          {t('aboutPage.about-us')}
        </h3>
        <div className="mx-auto flex max-w-6xl items-center justify-center space-x-6 px-6">
          <img
            src="https://placehold.co/370x250"
            className="w-1/3 rounded-lg object-cover shadow-lg"
            alt="About Us"
          />
          <div className="w-1/3 text-left">
            <p className="text-yellow-500 italic">
              {t('aboutPage.taste-perception')}
            </p>
            <h4 className="mb-4 text-2xl font-bold text-white">
              {t('aboutPage.trad-modern')}
            </h4>
            <p className="mb-4 text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              dolorem. Aliquid numquam totam temporibus odit doloremque, ex nam
              rerum. Minus itaque recusandae voluptatum repellat repudiandae
              veritatis libero harum consequatur culpa.
            </p>
            <button className="border border-yellow-500 px-4 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black">
              {t('aboutPage.read-more')}
            </button>
          </div>
          <img
            src="https://placehold.co/370x250"
            className="w-1/3 rounded-lg object-cover shadow-lg"
            alt="About Us"
          />
        </div>
      </section>
    </>
  );
};

export default About;

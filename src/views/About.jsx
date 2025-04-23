import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const {t} = useTranslation();

  return (
  <section id="about-us" className="py-20 text-center bg-[#0f1110]">
          <p className="text-yellow-500 italic">special moments</p>
          <h3 className="text-4xl font-bold text-white tracking-wide mb-12">
            {t('aboutPage.about-us')}
          </h3>
          <div className="flex justify-center items-center space-x-6 px-6 max-w-6xl mx-auto">
            <img
              src="https://placehold.co/370x250"
              className="w-1/3 object-cover rounded-lg shadow-lg"
              alt="About Us"
            />
            <div className="w-1/3 text-left">
              <p className="text-yellow-500 italic">Taste perception</p>
              <h4 className="text-2xl font-bold text-white mb-4">
                TRADITIONAL & MODERN
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
                dolorem. Aliquid numquam totam temporibus odit doloremque, ex nam
                rerum. Minus itaque recusandae voluptatum repellat repudiandae
                veritatis libero harum consequatur culpa.
              </p>
              <button className="px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
                READ MORE
              </button>
            </div>
            <img
              src="https://placehold.co/370x250"
              className="w-1/3 object-cover rounded-lg shadow-lg"
              alt="About Us"
            />
          </div>
        </section>)
};

export default About;

import i18n from 'i18next'
import  {initReactI18next} from 'react-i18next'

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  defaultNS: 'translations',
  // TODO: Translate components (& Add more languages)
  resources: {
    en: {
      translations: {
        homePage: {
          "welcome-message": 'welcome to our delicious restaurant',
          "slogan": 'BEST FAMOUS DISHES'
        },
        aboutPage: {
          "about-us": 'ABOUT US'
        },
        menuPage: {

        },
        loginPage: {

        },
        registerPage: {

        },
        reservationPage: {

        },
      }

    },
    fi: {
      translations: {
        homePage: {
          "welcome-message": 'tervetuloa meidän herkulliseen ravintolaan',
          "slogan": 'KUULUISAT PARHAAT RUOAT'
        },
        aboutPage: {
          "about-us": 'MEISTÄ'
        },
        menuPage: {

        },
        loginPage: {

        },
        registerPage: {

        },
        reservationPage: {

        },
      }

    }
  }
});

export default i18n

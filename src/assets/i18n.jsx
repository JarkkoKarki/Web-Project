import i18n from 'i18next'
import  {initReactI18next} from 'react-i18next'

// HOW TO USE: Use the useTranslation hook in your components
//
// const { t } = useTranslation();
// t('homePage.welcome-message') // This will return the translated string based on the current language
// add translations under key 'homePage' (in this example) in the resources object
// with key-value pair 'welcome-message': 'translation string' for each language

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
        profilePage: {
          "profile": 'Profile',
          "profile-picture": 'Profile Picture',
          "user-information": 'User Information',
          "name": 'Name',
          "username": 'Username',
          "password": 'Password',
          "email": 'Email',
          "address": 'Address',
          "phone-number": 'Phone Number',
          "view": 'View',
          "change": 'Change',

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
        profilePage: {
          "profile": 'Profiili',
          "profile-picture": 'Profiilikuva',
          "user-information": 'Käyttäjätiedot',
          "name": 'Nimi',
          "username": 'Käyttäjätunnus',
          "password": 'Salasana',
          "email": 'Sähköposti',
          "address": 'Osoite',
          "phone-number": 'Puhelinnumero',
          "view": 'Näytä',
          "change": 'Vaihda',

        },
      }

    }
  }
});

export default i18n

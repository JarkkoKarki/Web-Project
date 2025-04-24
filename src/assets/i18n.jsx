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

        header: {
          "home" : "Home",
          "menu" : "Menu",
          "reservation" : "Reservation",
          "about" : "About Us",
          "sign-in" : "Sign in",
          "sign-out" : "Sign Out",
        },

        footer: {
          "footer" : "2025 Kebula. All rights reserved.",
        },

        homePage: {
          "welcome-message": 'Welcome to our delicious restaurant',
          "slogan": 'Best Famous Dishes',
          "learn-more": "Learn More",
          "trending-meals": "Trending Meals",
          "view-more": "View More",
        },
        aboutPage: {
          "special-moments": "special Moments",
          "about-us": 'About Us',
          "taste-perception": "Taste Perception",
          "trad-modern": "Traditional & Modern",
          "read-more" : "READ MORE",
        },
        menuPage: {},
        loginPage: {},
        registerPage: {},
        reservationPage: {},
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
          "delete-user": 'Delete User',
        },
      }
    },
    fi: {
      translations: {

        header: {
          "home" : "Koti",
          "menu" : "Menu",
          "reservation" : "Varaaminen",
          "about" : "Meistä",
          "sign-in" : "Kirjaudu Sisään",
          "sign-out" : "Kirjaudu Ulos",
        },

        footer: {
          "footer" : "2025 Kebula. Kaikki oikeudet pidätetään",
        },

        homePage: {
          "welcome-message": 'Tervetuloa herkulliseen ravintolaamme',
          "slogan": 'Parhaat Kuuluisat Ruoat',
          "learn-more": "Lisätietoja",
          "trending-meals": "Trendaavat Ruoat",
          "view-more": "Näytä Lisää",
        },
        aboutPage: {
          "special-moments": "erityiset Hetket",
          "about-us": 'Meistä',
          "taste-perception": "Makuvaikutelma",
          "trad-modern": "Perinteinen & Moderni",
          "read-more" : "LUE LISÄÄ",
        },
        menuPage: {},
        loginPage: {},
        registerPage: {},
        reservationPage: {},
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
          "delete-user": 'Poista käyttäjä',
        },
      }
    }
  }
});

export default i18n

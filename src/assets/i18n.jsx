import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

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
  // prettier-ignore
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
          "delete-user": 'Delete User',
          "save": 'Save',
          "cancel": 'Cancel',
          "all-fields-required": 'All fields are required',
          "current-password": 'Current Password',
          "new-password": 'New Password',
          "confirm-password": 'Confirm Password',
          "change-password": 'Change Password',
          "passwords-do-not-match": 'Passwords do not match',
          "delete-user-confirmation": 'Are you sure you want to delete your account? This action cannot be undone.',
          "delete-user-success": 'User deleted successfully',
          "change-name": 'Change First and Last Name',
          "name-length-error": 'Name must be at least 2 characters long',
          "first-name": 'First Name',
          "last-name": 'Last Name',
          "change-username": 'Change Username',
          "change-email": 'Change Email',
          "change-address": 'Change Address',
          "change-phone": 'Change Phone Number',

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
          "delete-user": 'Poista käyttäjä',
          "save": 'Tallenna',
          "cancel": 'Peruuta',
          "all-fields-required": 'Kaikki kentät ovat pakollisia',
          "current-password": 'Nykyinen salasana',
          "new-password": 'Uusi salasana',
          "confirm-password": 'Vahvista salasana',
          "change-password": 'Vaihda salasana',
          "passwords-do-not-match": 'Salasanat eivät täsmää',
          "delete-user-confirmation": 'Oletko varma, että haluat poistaa tilisi? Tätä toimintoa ei voi peruuttaa.',
          "delete-user-success": 'Käyttäjä poistettu onnistuneesti',
          "change-name": 'Vaihda etu- ja sukunimi',
          "name-length-error": 'Nimen on oltava vähintään 2 merkkiä pitkä',
          "first-name": 'Etunimi',
          "last-name": 'Sukunimi',
          "change-username": 'Vaihda käyttäjätunnus',
          "change-email": 'Vaihda sähköposti',
          "change-address": 'Vaihda osoite',
          "change-phone": 'Vaihda puhelinnumero',

        },
      }

    }
  },
});

export default i18n;

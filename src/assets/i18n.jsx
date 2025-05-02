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

        header: {
          "home": "Home",
          "menu": "Menu",
          "reservation": "Reservation",
          "about": "About Us",
          "sign-in": "Sign in",
          "sign-out": "Sign Out",
          'workhub': 'Workhub',
          'search': 'Search',
          'profile': 'Profile',
          'search-placeholder': 'Search...',
        },

        footer: {
          "footer": "2025 Kebula. All rights reserved.",
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
          "read-more": "READ MORE",
        },
        menuPage: {},
        loginPage: {},
        registerPage: {},
        reservationPage: {
          "book-table": "Book a Table",
          "date": "Date",
          "time": "Time",
          "table-size": "Table Size",
          "table-2-seater": "2-Seater Table",
          "table-4-seater": "4-Seater Table",
          "table-6-seater": "6-Seater Table",
          "table-8-seater": "8-Seater Table",
          "table-10-seater": "10-Seater Table",
          "table-large": "Large Table (12+ Seats)",
          "name": "Name",
          "name-placeholder": "Your Name",
          "phone-number": "Phone Number",
          "phone-placeholder": "Your Phone Number",
          "special-requests": "Special Requests",
          "special-requests-placeholder": "Any special requests? (Optional)",
          "reserve-now": "Reserve Now",
          "confirmation-message": "Your reservation is confirmed! We look forward to seeing you."
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
          "save-img": 'Save Image',
        },
        workhubHeader: {
          'workhub': 'Workhub',
          'manage-menu': 'Manage Menu',
          'orders': 'Orders'
        },
        manageMenu: {
          'menu-item-name': 'Name',
          'menu-item-description': 'Description',
          'menu-item-price': 'Price',
          'menu-item-categories': 'Categories',
          'menu-item-diets': 'Diets',
          'menu-item-file': 'Picture',
          'menu-item-submit': 'Add',
          'menu-item-button': 'Upload File',
          "all-fields-required": 'All fields are required',
          'file-field-required': 'Please select a file!',
          'add-menu-title': 'Add Menu item',
          'menu-item-delete': 'Delete',
          'menu-item-modify': 'Change'
        }
      }
    },
    fi: {
      translations: {

        header: {
          "home": "Koti",
          "menu": "Menu",
          "reservation": "Varaaminen",
          "about": "Meistä",
          "sign-in": "Kirjaudu Sisään",
          "sign-out": "Kirjaudu Ulos",
          "workhub": "Työtila",
          "search": "Haku",
          "profile": "Käyttäjätili",
          "search-placeholder": "Hae...",
        },

        footer: {
          "footer": "2025 Kebula. Kaikki oikeudet pidätetään",
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
          "read-more": "LUE LISÄÄ",
        },
        menuPage: {},
        loginPage: {},
        registerPage: {},
        reservationPage: {
          "book-table": "Varaa pöytä",
          "date": "Päivämäärä",
          "time": "Aika",
          "table-size": "Pöydän koko",
          "table-2-seater": "2-hengen pöytä",
          "table-4-seater": "4-hengen pöytä",
          "table-6-seater": "6-hengen pöytä",
          "table-8-seater": "8-hengen pöytä",
          "table-10-seater": "10-hengen pöytä",
          "table-large": "Iso pöytä (12+ henkilöä)",
          "name": "Nimi",
          "name-placeholder": "Sinun nimesi",
          "phone-number": "Puhelinnumero",
          "phone-placeholder": "Sinun puhelinnumerosi",
          "special-requests": "Erityistoiveet",
          "special-requests-placeholder": "Onko erityistoiveita? (Valinnainen)",
          "reserve-now": "Varaa nyt",
          "confirmation-message": "Varaus on vahvistettu! Odotamme innolla tapaamistasi."
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
          "save-img": 'Tallenna kuva',

        },
        workhubHeader: {
          'workhub': 'Työtila',
          'manage-menu': 'Muokkaa  menua',
          'orders': 'Tilaukset'
        },
        manageMenu: {
          'menu-item-name': 'Nimi',
          'menu-item-description': 'Kuvaus',
          'menu-item-price': 'Hinta',
          'menu-item-categories': 'Kategoriat',
          'menu-item-diets': 'Allergeenit',
          'menu-item-file': 'Kuva',
          'menu-item-submit': 'Lisää',
          'menu-item-button': 'Lisää kuva',
          "all-fields-required": 'Kaikki kentät pitää täyttää',
          'file-field-required': 'Kuvan lisääminen on pakollinen',
          'add-menu-title': 'Lisää Ruoka',
          'menu-item-delete': 'Poista',
          'menu-item-modify': 'Muuta'
        }
      }
    }
  },
});

export default i18n;

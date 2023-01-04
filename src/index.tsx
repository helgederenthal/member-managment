import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import './index.css'
import App from './App'
import en from './locales/en.json'
import de from './locales/de.json'
import moment from 'moment'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
  })

moment.updateLocale('en', {
  months: en.months,
})

moment.updateLocale('de', {
  months: de.months,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

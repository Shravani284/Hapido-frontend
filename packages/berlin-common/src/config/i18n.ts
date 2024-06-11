import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "../constants/translations/english.json";
import translation_hi from "../constants/translations/hindi.json";
import translation_ar from "../constants/translations/arabic.json";
import { lang, localeLang } from "../../../berlin-consumer/src/utils/getLang";

const resources = {
  en: {
    translation: translation_en,
  },
  ar: {
    translation: translation_ar,
  },
};
let currentLang: string;
// const localeLangString = localStorage.getItem("language");
// const localeLang = localeLangString ? JSON.parse(localeLangString) : "en";

if (localeLang === "ar") {
  currentLang = "ar";
} else {
  currentLang = "en";
}

i18n.use(initReactI18next).init({
  resources,
  lng: currentLang,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

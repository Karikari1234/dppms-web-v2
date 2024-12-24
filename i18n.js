// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng:
      typeof window !== "undefined"
        ? document.cookie.split("NEXT_LOCALE=")[1]?.split(";")[0] || "en"
        : "en",
    supportedLngs: ["en", "bn"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

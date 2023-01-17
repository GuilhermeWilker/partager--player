import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

export default createI18n({
  locale: "pt",
  fallbackLocale: "pt",
  messages: {
    en,
    pt,
  },
});

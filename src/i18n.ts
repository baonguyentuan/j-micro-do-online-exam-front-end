import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HEADER_EN from './locales/eng/header.json';
import FOOTER_EN from "./locales/eng/footer.json";
import BANNER_EN from './locales/eng/banner.json';
import CARD_EN from './locales/eng/card.json';
import PARTNER_EN from './locales/eng/partner.json';
import FEEDBACK_EN from './locales/eng/feedback.json';
import SKILLS_EN from './locales/eng/skills.json';
import CHAT_EN from './locales/eng/chat.json';
import LOGIN_EN from './locales/eng/login.json';
import HEADER_VN from './locales/vni/header.json';
import FOOTER_VN from './locales/vni/footer.json';
import BANNER_VN from './locales/vni/banner.json';
import CARD_VN from './locales/vni/card.json';
import PARTNER_VI from './locales/vni/partner.json';
import FEEDBACK_VN from './locales/vni/feedback.json';
import SKILLS_VN from './locales/vni/skills.json';
import CHAT_VN from './locales/vni/chat.json';
import LOGIN_VN from './locales/vni/login.json';
export const defaultNS = 'header'
export const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN,
    banner: BANNER_EN,
    card: CARD_EN,
    partner: PARTNER_EN,
    chat: CHAT_EN,
    skills: SKILLS_EN,
    feedback: FEEDBACK_EN,
    login: LOGIN_EN
  },
  vn: {
    header: HEADER_VN,
    footer: FOOTER_VN,
    banner: BANNER_VN,
    card: CARD_VN,
    partner: PARTNER_VI,
    chat: CHAT_VN,
    skills: SKILLS_VN,
    feedback: FEEDBACK_VN,
    login: LOGIN_VN
  }
} as const;

i18n.use(initReactI18next).init({
  lng: 'vn',
  ns: ['header', 'footer', 'banner', 'card', 'partner', 'chat', 'skills', 'feedback', 'login'],
  defaultNS,
  resources,
});
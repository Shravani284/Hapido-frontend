const currentLocation = window.location.pathname;

const localStore = localStorage.getItem('language');
let lang;
if (currentLocation.includes('ae-ar')) {
  lang = 'ae-ar';
} else if (currentLocation.includes('ae-en')) {
  lang = 'ae-en';
} else if (localStore) {
  lang = localStore === 'ar' ? 'ae-ar' : 'ae-en';
} else {
  lang = 'ae-en';
}

let localeLang;
if (lang === 'ae-en' || lang === 'ae-ar') {
  localeLang = lang.replace('ae-', '');
  localStorage.setItem('language', localeLang);
} else {
  localeLang = 'en';
}

document.documentElement.lang = localeLang;
document.body.classList.add(`lang-${localeLang}`);

export { lang, localeLang };

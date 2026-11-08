export const brand = {
  name: 'Normal Food',
  phone: '+48 728 830 787',
  phoneHref: 'tel:+48728830787',
  email: 'kontakt@normalfood.pl',
  street: 'Łukowska 46',
  postalCode: '04-133',
  city: 'Warszawa',
  source: 'https://normalfood.pl/',
  verifiedOn: '2026-09-08',
} as const;

export const navigation = [
  { label: 'Nasze diety', href: '/diety' },
  { label: 'Menu', href: '/menu' },
  { label: 'Dostawa', href: '/dostawa' },
  { label: 'O nas', href: '/o-nas' },
] as const;

export const home = {
  title: 'Normal Food — domowe jedzenie z dostawą w całej Polsce',
  description: 'Znane smaki, więcej czasu dla siebie. Poznaj diety Standard, Wege, Sport i Lunch. Domowe posiłki z dostawą w całej Polsce.',
  eyebrow: 'Domowa kuchnia polska',
  headline: ['Domowe smaki.', 'Twój wolny czas.'],
  intro: 'Znane smaki, więcej czasu dla siebie. Domowe posiłki prosto pod Twoje drzwi.',
  offerTitle: 'Wybierz coś dla siebie.',
  offerDescription: 'Cztery propozycje. Ten sam domowy smak.',
} as const;

export const pages = {
  diets: { title: 'Nasze diety — Standard, Wege, Sport i Lunch | Normal Food', description: 'Wybierz domowe posiłki na cały dzień lub sam obiad. Poznaj cztery propozycje cateringu Normal Food z dostawą w całej Polsce.' },
  menu: { title: 'Przykładowe menu na pięć dni | Normal Food', description: 'Zobacz przykładowe dania diet Standard, Wege, Sport i Lunch. Domowe śniadania, obiady i kolacje. To inspiracja, nie aktualny jadłospis.' },
  delivery: { title: 'Dostawa cateringu w całej Polsce | Normal Food', description: 'Normal Food dostarcza domowe posiłki na terenie całej Polski. Dostępność pod konkretnym adresem sprawdzisz podczas zamówienia.' },
  about: { title: 'O nas — domowe jedzenie i znane smaki | Normal Food', description: 'Poznaj Normal Food. Warszawski catering, domowa kuchnia polska i zespół z doświadczeniem w gastronomii od 2001 roku.' },
  contact: { title: 'Kontakt — telefon, e-mail i adres | Normal Food', description: 'Skontaktuj się z Normal Food: +48 728 830 787, kontakt@normalfood.pl. Znajdziesz nas przy Łukowskiej 46 w Warszawie.' },
} as const;

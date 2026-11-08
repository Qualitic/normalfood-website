export type DietId = 'standard' | 'wege' | 'sport' | 'lunch';

export interface Diet {
  id: DietId;
  name: string;
  teaser: string;
  description: string;
  details: string[];
  example: { title: string; description: string };
  metaDescription: string;
}

// Oferta i przykłady: https://normalfood.pl/, odczyt 08.09.2026.
// Celowo bez historycznych cen, promocji i zakresów kalorycznych.
export const diets: Diet[] = [
  {
    id: 'standard', name: 'Standard', teaser: 'Domowe klasyki na co dzień.',
    description: 'Dla tych, którzy lubią znane smaki i chcą mieć gotowe posiłki pod ręką. Śniadanie, obiad, kolacja i coś pomiędzy — bez planowania zakupów i stania przy kuchence.',
    details: ['Całodzienne menu z posiłkami mięsnymi i bezmięsnymi.', 'W przykładowym jadłospisie znajdziesz pięć posiłków.', 'Domowe zupy, tradycyjne obiady i proste śniadania.'],
    example: { title: 'Rosół i bitka wieprzowa', description: 'Z makaronem, kaszą gryczaną i buraczkami zasmażanymi.' },
    metaDescription: 'Dieta Standard Normal Food: domowe klasyki i całodzienne menu. Poznaj przykładowe posiłki z dostawą w całej Polsce.',
  },
  {
    id: 'wege', name: 'Wege', teaser: 'Pełnia smaku bez mięsa.',
    description: 'Domowa kuchnia ma wiele bezmięsnych odsłon. Wege to propozycja dla osób, które rezygnują z mięsa lub po prostu mają ochotę na coś innego.',
    details: ['Menu bez mięsa, z warzywami, nabiałem i jajkami.', 'W przykładowym jadłospisie znajdziesz pięć posiłków.', 'To dieta wegetariańska; przykłady zawierają produkty mleczne i jaja.'],
    example: { title: 'Kopytka z sosem grzybowym', description: 'Zupa jarzynowa i buraczki zasmażane do obiadu.' },
    metaDescription: 'Dieta Wege Normal Food: domowe jedzenie bez mięsa. Poznaj wegetariańskie dania z nabiałem i jajkami, z dostawą w całej Polsce.',
  },
  {
    id: 'sport', name: 'Sport', teaser: 'Więcej białka dla aktywnych.',
    description: 'Gdy w Twoim dniu jest miejsce na ruch, dobrze mieć też czas na spokojny posiłek. Sport to propozycja o zwiększonej zawartości białka, przygotowana z myślą o osobach aktywnych.',
    details: ['Oferta o zwiększonej zawartości białka i węglowodanów.', 'W menu produkty pełnoziarniste, owoce i warzywa.', 'Dokładny wariant i dostępne parametry wybierzesz podczas zamówienia.'],
    example: { title: 'Pieczone udko z ryżem', description: 'Zupa ogórkowa i surówka z marchewki, pora i jabłka.' },
    metaDescription: 'Dieta Sport Normal Food: domowe posiłki o zwiększonej zawartości białka dla osób aktywnych. Poznaj ofertę z dostawą w całej Polsce.',
  },
  {
    id: 'lunch', name: 'Lunch', teaser: 'Domowy obiad w ciągu dnia.',
    description: 'Przerwa od pracy. Chwila dla siebie. I obiad, który już na Ciebie czeka. Lunch to same obiady z dostawą pod wskazany adres.',
    details: ['Same obiady, zamiast zestawu na cały dzień.', 'Możliwość wyboru obiadu z dostępnego menu.', 'Oferta na stronie Normal Food wskazuje minimum 3 obiady dziennie. Szczegóły zamówienia sprawdź w FoodFlow lub potwierdź z nami.'],
    example: { title: 'Kotlet schabowy z ziemniakami', description: 'Przykład z menu Standard: z krupnikiem i kapustą zasmażaną.' },
    metaDescription: 'Lunch Normal Food: domowy obiad z dostawą pod wskazany adres w całej Polsce. Poznaj ofertę i warunki zamówienia.',
  },
];

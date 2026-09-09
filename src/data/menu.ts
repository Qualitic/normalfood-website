import type { DietId } from './diets';

export interface Meal { label: string; name: string; description: string }
export interface MenuDay { id: string; name: string; short: string; meals: Meal[] }
export interface DietMenu { diet: DietId; note: string; days: MenuDay[] }

// Przepisane przykłady z tabel Standard, Wege i Sport na normalfood.pl (08.09.2026).
// Lunch prezentuje wyłącznie obiady z tabeli Standard, a nie odrębny jadłospis.
type Dish = readonly [name: string, description: string];
const days = [
  ['poniedzialek', 'Poniedziałek', 'Pon.'], ['wtorek', 'Wtorek', 'Wt.'],
  ['sroda', 'Środa', 'Śr.'], ['czwartek', 'Czwartek', 'Czw.'], ['piatek', 'Piątek', 'Pt.'],
] as const;
const breakfast: Dish[] = [
  ['Owsianka z jabłkami', 'Płatki migdałowe i mleko.'],
  ['Pieczywo żytnie z polędwicą sopocką', 'Masło, rukola i zielony ogórek.'],
  ['Pieczywo razowe z pastą jajeczną', 'Szczypiorek, ogórek kiszony i pomidorki koktajlowe.'],
  ['Jogurt z orzechowym musli', 'Z dodatkiem suszonych owoców.'],
  ['Pieczywo żytnie z kiełbasą krakowską', 'Masło, sałata i kolorowa papryka.'],
];
const secondBreakfast: Dish[] = [
  ['Kefir i wafle z ciecierzycy', 'Prosta przekąska między posiłkami.'],
  ['Granola orzechowa z jogurtem', 'Połączenie jogurtu i orzechowej granoli.'],
  ['Serek homogenizowany', 'Z musem truskawkowym.'],
  ['Banan i wafle ryżowe', 'Z masłem orzechowym.'],
  ['Pudding jaglany', 'Z musem śliwkowym i jabłkiem.'],
];
const lunch: Dish[] = [
  ['Rosół i bitka wieprzowa', 'Rosół z makaronem, bitka w sosie własnym, kasza gryczana i buraczki zasmażane.'],
  ['Zupa ogórkowa i pieczone udko', 'Ryż i surówka z marchewki, pora i jabłka.'],
  ['Krupnik i kotlet schabowy', 'Ziemniaki i kapusta zasmażana.'],
  ['Kwaśnica i placek po zbójnicku', 'Z dodatkiem ogórka kiszonego.'],
  ['Żurek z jajkiem i pieczony pstrąg', 'Filet z pstrąga, ziemniaki opiekane i surówka z kiszonej kapusty.'],
];
const vegetarianLunch: Dish[] = [
  ['Zupa jarzynowa i kopytka', 'Sos grzybowy i buraczki zasmażane.'],
  ['Zupa ogórkowa i faszerowana papryka', 'Nadzienie z ryżu i warzyw, surówka z marchewki, pora i jabłka.'],
  ['Krem z zielonych warzyw i kotlet z selera', 'Ser mozzarella, ziemniaki i kapusta zasmażana.'],
  ['Zupa pomidorowa z ryżem i makaron', 'Makaron z sosem pomidorowym, oliwkami, mozzarellą i rukolą.'],
  ['Barszcz ukraiński i kotlety ziemniaczane', 'Sos pieczarkowy i surówka z kiszonej kapusty.'],
];
const snack: Dish[] = [
  ['Ciastka owsiane', 'Owsiana propozycja na podwieczorek.'],
  ['Sałatka owocowa', 'Owocowa przerwa w ciągu dnia.'],
  ['Ciasto marchewkowe', 'Słodki akcent z marchewką.'],
  ['Kasza manna z malinami', 'Do tego gruszka.'],
  ['Ciasto z owocami', 'Owocowy podwieczorek.'],
];
const supper: Dish[] = [
  ['Twarożek z ziołami', 'Suszone pomidory i pieczywo pełnoziarniste.'],
  ['Naleśniki ze szpinakiem', 'Z serem feta.'],
  ['Frankfurterki z pieczywem', 'Pieczywo pszenne, masło, ketchup i musztarda.'],
  ['Pomidory z mozzarellą', 'Bazylia, oliwa z oliwek i bagietka.'],
  ['Pierogi ruskie', 'Domowy klasyk na kolację.'],
];

function meal(label: string, dishes: Dish[], index: number): Meal {
  const dish = dishes[index];
  if (!dish) throw new Error(`Brak dania: ${label}, dzień ${index}`);
  return { label, name: dish[0], description: dish[1] };
}

export const menus: DietMenu[] = (['standard', 'wege', 'sport', 'lunch'] as const).map((diet) => ({
  diet,
  note: diet === 'sport' ? 'Przykłady z oferty Sport o zwiększonej zawartości białka. Gramatury i parametry zależą od wybranego wariantu.'
    : diet === 'lunch' ? 'Przykładowe obiady z menu Standard. Dostępne warianty Lunch sprawdzisz podczas zamówienia.'
    : diet === 'wege' ? 'Menu wegetariańskie. Przykłady zawierają nabiał i jajka.' : 'Domowe smaki przez cały dzień.',
  days: days.map(([id, name, short], index) => {
    const meals = diet === 'lunch' ? [meal('Obiad', lunch, index)] : [
      meal('Śniadanie', breakfast, index), meal('II śniadanie', secondBreakfast, index),
      meal('Obiad', diet === 'wege' ? vegetarianLunch : lunch, index),
      meal('Podwieczorek', snack, index), meal('Kolacja', supper, index),
    ];
    if (diet === 'wege') {
      if (index === 1) meals[0] = { label: 'Śniadanie', name: 'Pieczywo żytnie z cheddarem', description: 'Masło, rukola i zielony ogórek.' };
      if (index === 4) meals[0] = { label: 'Śniadanie', name: 'Pieczywo żytnie z serem żółtym', description: 'Masło, sałata i kolorowa papryka.' };
      if (index === 2) meals[4] = { label: 'Kolacja', name: 'Parówki sojowe z pieczywem', description: 'Pieczywo pszenne, masło, ketchup i musztarda.' };
    }
    return { id, name, short, meals };
  }),
}));

export const menuDays = days.map(([id, name, short]) => ({ id, name, short }));

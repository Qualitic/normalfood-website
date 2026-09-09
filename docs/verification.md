# Weryfikacja lokalna — 08.09.2026

Gotowa witryna statyczna działa pod http://127.0.0.1:4321. Środowisko: Windows, PowerShell, Node.js 24.18.0, npm 11.16.0, Astro 7.3.2, Tailwind 4.3.3.

## Wykonane kontrole

- `npm run check`: **0 błędów, 0 ostrzeżeń, 0 wskazówek** (27 plików).
- `npm run build`: **sukces**, 11 stron, statyczny robots.txt, sitemap i zoptymalizowane obrazy.
- `npm run test:e2e`: **10 testów zakończonych sukcesem**, Chromium, 12,9 s.
- Wszystkie 11 stron sprawdzone przy **360, 390, 768 i 1440 px**: bez poziomego przewijania, błędów JavaScriptu i niedziałających obrazów; po jednym h1; unikalne tytuły, opisy, canonical i Open Graph.
- Menu mobilne: otwieranie klawiaturą, przechodzenie Tab do linków, zamykanie Escape z przywróceniem focusu, kliknięcie poza menu, przejście do /menu.
- Dolny przycisk: obecny na telefonie; przy przewinięciu do końca nie zasłania stopki. CSS uwzględnia safe area.
- Menu: **4 diety × 5 dni**, prawidłowa liczba posiłków, przełączanie strzałkami, wybór diety z linku podstrony, zmiana podpisu mobilnego przycisku.
- Bez JavaScriptu: treść hero i zdjęcie, natywne rozwijane menu nawigacji, wszystkie dni i rozwijanie jadłospisu Wege.
- Wszystkie lokalne linki odpowiadają; linki zamówienia wskazują adres zastępczy FoodFlow. `tel:` i `mailto:` mają potwierdzone adresy.
- Nieznany adres zwraca **HTTP 404** i własny widok błędu. Bezpośredni /404 to istniejący statyczny dokument, więc lokalny serwer zwraca dla niego 200; ma `noindex` i jest pominięty w sitemap.
- Axe: **0 naruszeń** w automatycznych regułach WCAG 2 A/AA, 2.1 AA i 2.2 AA na wszystkich 11 stronach przy 390 i 1440 px, także z otwartą nawigacją mobilną.
- Ręcznie obejrzane zrzuty strony głównej przy 390, 768 i 1440 px oraz menu na telefonie i desktopie; porównane z dwiema dostarczonymi białymi makietami. Poprawiono położenie zdjęcia na telefonie, odstępy logo i układ tabletowy.

Zrzuty są w `test-results/screenshots/` (odtwarzane testami). Kopia końcowych zrzutów: `docs/verification/`.

## Granice sprawdzenia

Nie uruchamiano Lighthouse ani testów na fizycznym telefonie, Safari lub Firefox. Wynik axe nie zastępuje pełnego ręcznego audytu dostępności. Nie wysyłano zamówień, nie wykonywano połączeń telefonicznych ani wiadomości e-mail. Nie potwierdzono ścieżki konfiguratora Normal Food w FoodFlow — przyciski korzystają z podanego adresu aplikacji. Konfiguracja `.env` dla niestandardowej domeny i linków diet wymaga sprawdzenia po podaniu ich docelowych wartości.

Przed publikacją pozostają: właściwy URL zamówienia, rzeczywiste zdjęcie dania lub akceptacja grafiki koncepcyjnej oraz potwierdzenie bieżących warunków oferty (szczególnie minimum Lunch). Szczegóły w README.

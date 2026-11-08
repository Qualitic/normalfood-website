# Materiały

## Zatwierdzona strona główna (2026-11-08)

`public/normalfood/` zachowuje materiały zaakceptowane w propozycji „Domowe smaki. Twój wolny czas.”:

- Logo i `schabowy.webp`: dotychczasowa strona `https://normalfood.qualitic.pl`. Schabowy pozostaje oznaczony w tekście alternatywnym jako wizualizacja.
- `klopsy.jpg`, `zupa.jpg`, `sniadanie.jpg`, `danie-06.jpg`: rzeczywiste zdjęcia galerii Normal Food (`https://normalfood.pl/images/gallery/02.JPG`, `01.JPG`, `03.JPG`, `06.JPG`), pobrane w trakcie przygotowania zaakceptowanej propozycji.
- Bricolage Grotesque 700 i DM Sans 400/600: lokalne pliki fontów i obie licencje OFL w tym samym katalogu. Przeglądarka nie potrzebuje zewnętrznego serwera fontów.

## Wcześniejsze materiały zachowane w repozytorium

- `public/logo.png`: pobrane bez modyfikacji z https://normalfood.pl/images/logo.png, 08.09.2026. Oryginalny znak i proporcje. `public/favicon.png` to pomniejszona wersja tego znaku z usuniętymi pustymi marginesami.
- `src/assets/normalfood-klopsy.jpg`: rzeczywiste zdjęcie pobrane do analizy z https://normalfood.pl/images/gallery/02.JPG. Nie jest wyświetlane w witrynie; ciemne tło nie pasuje do zaakceptowanej kompozycji.
- `src/assets/hero-schabowy.png`: **grafika koncepcyjna wygenerowana wbudowanym narzędziem imagegen**, 08.09.2026. Wymaga zastąpienia rzeczywistym zdjęciem dania Normal Food lub akceptacji użycia wizualizacji. `public/og-normalfood.jpg` to jej wariant Open Graph. Zoptymalizowane warianty hero generuje Astro przy budowaniu.
- `docs/design/*.png`: dwie oryginalne makiety dostarczone w katalogu projektu, zachowane bez zmian. Strona wykorzystuje ich kierunek wizualny; nie osadza makiet jako obrazu interfejsu.

Prompt użyty do hero (wbudowane imagegen, bez CLI):

> Use case: photorealistic-natural. Asset type: standalone food photograph for a Polish catering website hero, NOT a webpage mockup. Create a square photorealistic overhead photograph of one light warm-white subtly speckled ceramic dinner plate containing a golden crispy Polish pork schnitzel (kotlet schabowy), boiled potatoes with fresh dill, and Polish thinly sliced cucumber salad with sour cream (mizeria). Schnitzel occupies lower left half, potatoes upper portion and cucumbers right. Entire round plate is visible with generous clean white margin on all sides, plate takes approximately 85% of image width. Pure white seamless background blending into #FFFFFF website, very soft natural daylight and delicate realistic shadow beneath the plate. Delicious home cooking, honest natural food texture, calm minimal editorial photography, no extra props, no cutlery, no napkin, no text, no logo, no watermark. Output a single square image.

(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  function closeMenu(returnFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Otwórz menu');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  const diets = {
    standard: {
      name: 'Dieta Standard', title: 'Dobrze znane.\nCodziennie lubiane.',
      description: 'Dla tych, którzy lubią jeść po domowemu. Urozmaicone posiłki, znajome składniki i klasyki, do których chce się wracać.',
      features: ['Tradycyjne smaki w codziennym menu', 'Całodzienne wyżywienie', 'Kaloryczność do wyboru przy zamówieniu'],
      image: '/normalfood/klopsy.jpg', alt: 'Klopsy z purée, marchewką i brokułami', caption: 'Z naszej kuchni: klopsy z purée i warzywami'
    },
    wege: {
      name: 'Dieta Wege', title: 'Bez mięsa.\nZ całym smakiem.',
      description: 'Warzywa i lubiane domowe potrawy w roli głównej. Dla tych, którzy nie jedzą mięsa albo po prostu mają ochotę na więcej różnorodności.',
      features: ['Posiłki bez mięsa', 'Różnorodne składniki i domowe inspiracje', 'Kaloryczność do wyboru przy zamówieniu'],
      image: '/normalfood/zupa.jpg', alt: 'Krem z pomidorów ze śmietaną i bazylią', caption: 'Z naszej kuchni: krem z pomidorów'
    },
    sport: {
      name: 'Dieta Sport', title: 'Na dni\npełne ruchu.',
      description: 'Propozycja dla osób aktywnych, z większym zapotrzebowaniem na energię. Więcej białka i domowe jedzenie, które pasuje do Twojego rytmu.',
      features: ['Dieta z większą ilością białka', 'Dla osób aktywnych fizycznie', 'Dostępne warianty w panelu zamówień'],
      image: '/normalfood/sniadanie.jpg', alt: 'Jajka, twarożek, łosoś i pieczywo na talerzu', caption: 'Z naszej kuchni: zestaw śniadaniowy z łososiem'
    },
    lunch: {
      name: 'Plan Lunch', title: 'Domowy obiad.\nBez gotowania.',
      description: 'Gdy potrzebujesz przede wszystkim dobrego obiadu. Znajome smaki, które umilą przerwę w pracy albo czekają na spokojny posiłek w domu.',
      features: ['Plan obejmujący obiady', 'Domowe dania z dostawą', 'Szczegóły i warunki w panelu zamówień'],
      image: '/normalfood/danie-06.jpg', alt: 'Mięso w sosie z kluskami śląskimi i buraczkami', caption: 'Z naszej kuchni: obiad z kluskami śląskimi'
    }
  };
  const tabs = [...document.querySelectorAll('[data-diet]')];
  function selectDiet(tab, focus = false) {
    const diet = diets[tab.dataset.diet];
    if (!diet) return;
    tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
    document.querySelector('#diet-panel').setAttribute('aria-labelledby', tab.id);
    document.querySelector('#diet-name').textContent = diet.name;
    const title = document.querySelector('#diet-title');
    title.replaceChildren();
    diet.title.split('\n').forEach((line, i) => { if (i) title.append(document.createElement('br')); title.append(document.createTextNode(line)); });
    document.querySelector('#diet-description').textContent = diet.description;
    document.querySelector('#diet-features').replaceChildren(...diet.features.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    const img = document.querySelector('#diet-image');
    img.src = diet.image; img.alt = diet.alt;
    document.querySelector('#diet-caption').textContent = diet.caption;
    document.querySelector('[data-diet-order]').href = tab.dataset.orderUrl;
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectDiet(tab));
    tab.addEventListener('keydown', e => {
      let target;
      if (e.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') target = 0;
      if (e.key === 'End') target = tabs.length - 1;
      if (target !== undefined) { e.preventDefault(); selectDiet(tabs[target], true); }
    });
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/diety', '/diety/standard', '/diety/wege', '/diety/sport', '/diety/lunch', '/menu', '/dostawa', '/o-nas', '/kontakt', '/404'];

for (const width of [360, 390, 768, 1440]) {
  test(`Strony, obrazy, SEO i brak przewijania poziomego — ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const titles = new Set<string>();
    for (const route of routes) {
      const response = await page.goto(route);
      // /404 is the existing static document; unknown paths must return HTTP 404 (tested below).
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
      const title = await page.title();
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://normalfood.pl${route === '/' ? '/' : route}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://normalfood.pl/og-normalfood.jpg');
      await page.evaluate(() => document.fonts.ready);
      // The new home includes real lazy-loaded gallery images below the fold.
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true);
        await expect(image).not.toHaveJSProperty('naturalWidth', 0);
      }
      await page.evaluate(() => scrollTo(0, 0));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((img): img is HTMLImageElement => img instanceof HTMLImageElement).filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src));
      expect(brokenImages).toEqual([]);
      for (const href of await page.locator('[data-order-link]').evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
        expect(href).toBe('https://foodflow.qualitic.pl');
      }
      if ((route === '/' || route === '/menu') && width !== 360) {
        await page.screenshot({ path: `.artifacts/screenshots/${route === '/' ? 'home' : 'menu'}-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('Menu mobilne: klawiatura, Escape, kliknięcie poza menu i nawigacja', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/diety');
  const toggle = page.locator('.mobile-menu > summary');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator('#mobile-navigation a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.locator('#mobile-navigation a[href="/menu"]').click();
  await expect(page).toHaveURL('/menu');
  await toggle.click();
  await page.mouse.click(5, 600);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.mobile-order-link')).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  const footer = await page.locator('.site-footer').boundingBox();
  const bar = await page.locator('.mobile-order').boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(bar!.y);
});

test('Jadłospis: cztery diety, pięć dni, klawiatura i adres z podstrony', async ({ page }) => {
  await page.goto('/diety/wege');
  await page.getByRole('link', { name: 'Zobacz przykładowe menu' }).click();
  await expect(page.locator('input[name="menu-diet"][value="wege"]')).toBeChecked();
  await expect(page.locator('.menu-group:not([hidden])')).toHaveAttribute('data-diet', 'wege');
  for (const diet of ['standard', 'wege', 'sport', 'lunch']) {
    await page.locator(`input[name="menu-diet"][value="${diet}"]`).check({ force: true });
    for (const day of ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek']) {
      await page.locator(`input[name="menu-day"][value="${day}"]`).check({ force: true });
      const selected = page.locator('.menu-group:not([hidden]) .menu-day:not([hidden])');
      await expect(selected).toHaveCount(1);
      await expect(selected).toHaveAttribute('data-menu-day', day);
      await expect(selected.locator('li')).toHaveCount(diet === 'lunch' ? 1 : 5);
    }
  }
  await page.locator('input[name="menu-day"][value="poniedzialek"]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('input[name="menu-day"][value="wtorek"]')).toBeChecked();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.mobile-order-link')).toHaveText('Wybieram Lunch');
});

test('Witryna bez JavaScriptu: treść, diety i natywna nawigacja', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${process.env['NORMALFOOD_PREVIEW_PORT'] || '4321'}/`);
  await expect(page.locator('h1')).toContainText('Domowe smaki.');
  await expect(page.locator('.hero-plate')).toBeVisible();
  await page.locator('.footer-links a[href="/menu"]').click();
  await expect(page).toHaveURL(/\/menu$/);
  await page.locator('.mobile-menu summary').click();
  await page.locator('#mobile-navigation a[href="/kontakt"]').click();
  await page.goto(`http://127.0.0.1:${process.env['NORMALFOOD_PREVIEW_PORT'] || '4321'}/menu`);
  await expect(page.locator('.menu-controls')).toBeHidden();
  await expect(page.locator('#standard .menu-day')).toHaveCount(5);
  await page.locator('#wege > summary').click();
  await expect(page.locator('#wege .menu-day').last()).toBeVisible();
  await expect(page.locator('#wege')).toContainText('kopytka');
  await context.close();
});

test('Kontakt, linki lokalne, sitemap, robots i własna strona 404', async ({ page, request }) => {
  await page.goto('/kontakt');
  await expect(page.locator('.contact-grid a[href="tel:+48728830787"]')).toHaveCount(1);
  await expect(page.locator('.contact-grid a[href="mailto:kontakt@normalfood.pl"]')).toHaveCount(1);
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((items) => items.map((item) => item.getAttribute('href')!))) links.add(href);
  }
  for (const href of links) expect((await request.get(href)).ok()).toBe(true);
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('https://normalfood.pl/sitemap-index.xml');
  const sitemap = await request.get('/sitemap-0.xml');
  expect(await sitemap.text()).toContain('https://normalfood.pl/diety/wege');
  expect(await sitemap.text()).not.toContain('/404');
  expect((await request.get('/og-normalfood.jpg')).ok()).toBe(true);
  expect((await request.get('/favicon.png')).ok()).toBe(true);
  const missing = await page.goto('/nie-ma-takiej-strony');
  expect(missing?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Tu nic się nie gotuje.');
});

for (const width of [390, 1440]) {
  test(`Dostępność axe WCAG 2.2 AA — ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations, `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`).toEqual([]);
    }
    if (width === 390) {
      await page.locator('.mobile-menu > summary').click();
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    }
  });
}

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 390, 768, 1440]) {
  test(`Zatwierdzone hero, linki i układ — ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('#hero-heading .hero-heading-line')).toHaveText(['Domowe smaki.', 'Twój wolny czas.']);
    const metrics = await page.locator('#hero-heading').evaluate((heading) => {
      const lines = [...heading.querySelectorAll('span')].map((span) => {
        const range = document.createRange();
        range.selectNodeContents(span);
        return { rows: range.getClientRects().length, width: range.getBoundingClientRect().width, available: span.getBoundingClientRect().width };
      });
      return { lines, size: parseFloat(getComputedStyle(heading).fontSize), pageWidth: document.documentElement.scrollWidth, viewport: innerWidth };
    });
    expect(metrics.lines.every(line => line.rows === 1 && line.width <= line.available + 1)).toBe(true);
    expect(metrics.pageWidth).toBeLessThanOrEqual(metrics.viewport);
    if (width === 1440) expect(metrics.size).toBeCloseTo(78.336, 1);
    if (width === 390) expect(metrics.size).toBeCloseTo(42.4, 1);
    await expect(page.locator('.hero-plate')).toHaveJSProperty('naturalWidth', 1080);
    const order = page.locator('[data-diet-order]');
    await page.locator('#tab-wege').click();
    await expect(page.locator('#diet-name')).toHaveText('Dieta Wege');
    await expect(page.locator('#diet-image')).toHaveAttribute('src', '/normalfood/zupa.jpg');
    await expect(order).toHaveAttribute('href', await page.locator('#tab-wege').getAttribute('data-order-url') || '');
    await page.locator('#tab-wege').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-sport')).toBeFocused();
    await expect(page.locator('#diet-name')).toHaveText('Dieta Sport');
    await page.locator('#tab-standard').click();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `.artifacts/screenshots/hero-${width}.png` });
    if (width < 901) {
      await page.locator('.menu-toggle').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#main-nav')).toBeVisible();
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(axe.violations).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(page.locator('.menu-toggle')).toBeFocused();
      await expect(page.locator('#main-nav')).toBeHidden();
    }
  });
}

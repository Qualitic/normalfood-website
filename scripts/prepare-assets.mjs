import sharp from 'sharp';

await sharp('src/assets/hero-schabowy.png')
  .resize(1200, 630, { fit: 'contain', background: '#ffffff' })
  .jpeg({ quality: 85 }).toFile('public/og-normalfood.jpg');
await sharp('public/logo.png').trim()
  .resize(128, 128, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png().toFile('public/favicon.png');
console.log('Przygotowano obraz Open Graph i favicon z oryginalnego logo.');
